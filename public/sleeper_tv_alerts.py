#!/usr/bin/env python3
"""
Sleeper -> TV fantasy alerts (PiPup on Vseebox / Android TV)

Full-screen broadcast-style alerts with sound when a starter on any watched Sleeper team:
  - scores a TOUCHDOWN
  - makes a BIG PLAY (20+ yard run/catch, 30+ yard completion)
  - hits a MILESTONE (100-yard game, 300 passing yards, 2nd TD, 3 TD passes...)
Screen 2 shows the player card + your live matchup with win probability.
When your OPPONENT scores, a red bar pops up at the bottom with a sad trombone.
Each owner gets their own touchdown / big-play sound.

Data: Sleeper (points, projections) + ESPN's free scoreboard and play-by-play.

COMMANDS (run in Terminal from this folder)
  python3 sleeper_tv_alerts.py --preview        # watch every graphic in your Mac browser, no TV needed
  python3 sleeper_tv_alerts.py --test           # send one of each to the TV
  caffeinate -i python3 sleeper_tv_alerts.py    # game day (keeps the Mac awake)

Keep the "sounds" folder next to this file. No installs needed.
"""
import html, json, math, os, queue, re, socket, subprocess, sys, threading, time, urllib.parse, urllib.request, webbrowser
from datetime import datetime
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

# ================= CONFIG =================
SLEEPER_USERNAMES = ["gspot05", "dobbs11", "DDxColt45"]
TV_IP = "192.168.68.54"         # your Vseebox V6 Plus
LEAGUE_NAME_CONTAINS = ""       # blank = every league those usernames are in
STARTERS_ONLY = True
BIG_PLAY_YARDS = 20             # runs and catches this long = BIG PLAY ALERT
BIG_PASS_YARDS = 30             # QB completions this long = BIG PLAY ALERT
OPPONENT_ALERTS = True          # red bar when the team you're playing scores
MILESTONE_ALERTS = True         # 100-yard games, 2nd TD, 300 passing yards...
WIN_PROBABILITY = True          # win % on the matchup card
SWING_POINTS = 25               # win % jump that triggers the MOMENTUM SWING screen
LEADERBOARD = True              # rank the watched teams on screen 2
SOUND_ON = "tv"                 # "tv" = from the TV, "mac" = from the Mac's speakers, "both", or "off"
MAC_VOLUME = 1.0                # Mac sound volume, 0.0 to 2.0
OVERLAY_SEE_THROUGH = True      # False = solid background (use if the game shows white behind it)
OVERLAY_DIM = 0.45              # how dark the see-through background is: 0 = clear, 1 = solid
STREAM_DELAY_SECONDS = 30       # hold alerts this long so they land when the play shows on your (delayed) stream
POLL_SECONDS = 20
OVERLAY_SECONDS = 13
OPP_SECONDS = 9
OVERLAY_PORT = 8765
OVERLAY_WIDTH, OVERLAY_HEIGHT = 1920, 1080   # full screen on the V6 Plus
OPP_HEIGHT = 300                # height of the opponent bar
# ==========================================

API = "https://api.sleeper.app/v1"
ESPN = "https://site.api.espn.com/apis/site/v2/sports/football/nfl"
TEAM_FIX = {"WAS": "WSH"}       # Sleeper vs ESPN team codes
HERE = os.path.dirname(os.path.abspath(__file__))
PLAYERS_CACHE = os.path.join(HERE, "sleeper_players_v3.json")
# label: (accent, text on accent, accent readable on white)
LABELS = {"TOUCHDOWN": ("#d50a0a", "#ffffff", "#d50a0a"),
          "BIG PLAY ALERT": ("#ffc400", "#0c0d10", "#e0a100"),
          "MILESTONE": ("#0a6cff", "#ffffff", "#0a6cff")}
MIN_TRIGGER = 2.0               # points jump that makes us check what happened
SEEN_PLAYS, STATS, PENDING, ESPN_CACHE = set(), {}, {}, {}
RAW_PROJ, LEAGUE_PROJ = {}, {}
CURRENT = {"week": 1, "season": "", "season_type": "regular"}
PLAYERS = {}
LOCAL_IP = "127.0.0.1"


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 tv-fantasy-alerts"})
    with urllib.request.urlopen(req, timeout=20) as r:
        return json.load(r)


def load_players():
    """Sleeper's full player list is big, so download it once a day and cache it."""
    if os.path.exists(PLAYERS_CACHE) and time.time() - os.path.getmtime(PLAYERS_CACHE) < 86400:
        with open(PLAYERS_CACHE) as f:
            return json.load(f)
    print("Downloading Sleeper player list (once a day)...")
    slim = {}
    for pid, p in get(f"{API}/players/nfl").items():
        first, last = p.get("first_name") or "", p.get("last_name") or ""
        slim[pid] = {"name": p.get("full_name") or f"{first} {last}".strip() or pid,
                     "pos": p.get("position"), "team": p.get("team"), "first": first, "last": last,
                     "espn_id": p.get("espn_id")}
    with open(PLAYERS_CACHE, "w") as f:
        json.dump(slim, f)
    return slim


def league_info(league_id, user_id):
    """Returns (your roster_id, {roster_id: fantasy team name}) for one league."""
    rosters = get(f"{API}/league/{league_id}/rosters") or []
    names = {}
    for u in get(f"{API}/league/{league_id}/users") or []:
        names[u["user_id"]] = (u.get("metadata") or {}).get("team_name") or u.get("display_name") or "TEAM"
    mine = None
    for r in rosters:
        if r.get("owner_id") == user_id or user_id in (r.get("co_owners") or []):
            mine = r["roster_id"]
    return mine, {r["roster_id"]: names.get(r.get("owner_id"), f"TEAM {r['roster_id']}") for r in rosters}


def find_opp(matchups, mine):
    if mine.get("matchup_id") is None:
        return None
    return next((m for m in matchups if m.get("matchup_id") == mine["matchup_id"]
                 and m.get("roster_id") != mine["roster_id"]), None)


def collect(leagues, week):
    """Points for every starter on your teams and on the teams you're playing."""
    cache = {}
    for lg in leagues:
        if lg["league_id"] not in cache:
            cache[lg["league_id"]] = get(f"{API}/league/{lg['league_id']}/matchups/{week}") or []
    pts, opp_of = {}, {}
    for lg in leagues:
        lid, ms = lg["league_id"], cache[lg["league_id"]]
        mine = next((m for m in ms if m.get("roster_id") == lg["my_roster_id"]), None)
        if not mine:
            continue
        opp = find_opp(ms, mine)
        sides = [(mine, mine.get("starters") if STARTERS_ONLY else mine.get("players"))]
        if opp:
            sides.append((opp, opp.get("starters")))
            opp_of.setdefault((lid, opp["roster_id"]), []).append(lg)
        for m, watch in sides:
            pp = m.get("players_points") or {}
            for pid in watch or []:
                if pid and pid != "0":
                    pts[(lid, m["roster_id"], pid)] = pp.get(pid) or 0
    return pts, cache, opp_of


def matchup_summary(lg, matchups):
    mine = next((m for m in matchups if m.get("roster_id") == lg["my_roster_id"]), None)
    if not mine:
        return None
    opp = find_opp(matchups, mine)
    return {"league": lg["name"], "my_team": lg["team_names"].get(mine["roster_id"], "MY TEAM"),
            "my_score": mine.get("points") or 0,
            "opp_team": lg["team_names"].get(opp["roster_id"], "OPPONENT") if opp else "",
            "opp_score": (opp.get("points") or 0) if opp else None}


# ---------- ESPN: games, play-by-play, box scores ----------

def espn(path, fresh=False):
    if fresh or path not in ESPN_CACHE:
        ESPN_CACHE[path] = get(f"{ESPN}/{path}")
    return ESPN_CACHE[path]


def game_for(team, fresh=False):
    """(event id, competition) for this NFL team's game this week."""
    if not team:
        return None, None
    team = TEAM_FIX.get(team, team)
    for ev in espn("scoreboard", fresh).get("events", []):
        comp = (ev.get("competitions") or [{}])[0]
        if team in [c.get("team", {}).get("abbreviation") for c in comp.get("competitors", [])]:
            return ev.get("id"), comp
    return None, None


def describe(p, text, name_at):
    up = text.upper()
    yds = p.get("statYardage")
    if not isinstance(yds, int):
        m = re.search(r"for (-?\d+) yards?", text)
        yds = int(m.group(1)) if m else None
    td = "TOUCHDOWN" in up and "NULLIFIED" not in up
    pass_at = up.find(" PASS ")
    kind = ("PASS" if name_at < pass_at else "RECEPTION") if pass_at != -1 else "RUN"
    words = {("RECEPTION", True): "TD CATCH", ("RUN", True): "TD RUN", ("PASS", True): "TD PASS",
             ("RECEPTION", False): "RECEPTION", ("RUN", False): "RUN", ("PASS", False): "COMPLETION"}[(kind, td)]
    fs = (p.get("start") or {}).get("yardsToEndzone")
    fe = None
    if isinstance(fs, int):
        fe = 0 if td else (max(0, min(100, fs - yds)) if yds is not None else None)
    return {"td": td, "yards": yds, "kind": kind, "fs": fs, "fe": fe,
            "detail": f"{yds}-YARD {words}" if yds is not None else words}


def espn_recent_play(info):
    """This player's newest play in his live game (within the last 5 minutes), or None."""
    last, first = info.get("last"), info.get("first") or ""
    event, _ = game_for(info.get("team"), fresh=True)
    if not event or not last:
        return None
    drives = espn(f"summary?event={event}", fresh=True).get("drives") or {}
    plays = []
    for dr in drives.get("previous") or []:
        plays += dr.get("plays") or []
    plays += (drives.get("current") or {}).get("plays") or []
    # ESPN writes names like "I.Likely", "Ja.Chase", "A.St. Brown"
    who = re.compile((re.escape(first[:1]) + r"[A-Za-z']*\.\s?" if first else "") + re.escape(last) + r"\b")
    cutoff = time.time() - 300
    for p in reversed(plays[-40:]):
        text = p.get("text") or ""
        m = who.search(text)
        up = text.upper()
        if not m or p.get("id") in SEEN_PLAYS or "INCOMPLETE" in up or "NO PLAY" in up:
            continue
        wc = p.get("wallclock")
        if wc:
            try:
                if datetime.fromisoformat(wc.replace("Z", "+00:00")).timestamp() < cutoff:
                    return None
            except ValueError:
                pass
        SEEN_PLAYS.add(p.get("id"))
        return describe(p, text, m.start())
    return None


def decide(info, delta):
    """Returns (label, play description) or None."""
    pos = info.get("pos")
    if pos == "K":
        return None
    if pos == "DEF":
        return ("TOUCHDOWN", "DEFENSIVE TOUCHDOWN", None) if delta >= 6 else None
    play = None
    for _ in range(3):  # ESPN can trail Sleeper by a few seconds
        try:
            play = espn_recent_play(info)
        except Exception as e:
            print("ESPN lookup failed:", e)
            break
        if play:
            break
        time.sleep(5)
    if play:
        if play["td"]:
            return ("TOUCHDOWN", play["detail"], play)
        limit = BIG_PASS_YARDS if play["kind"] == "PASS" else BIG_PLAY_YARDS
        if (play["yards"] or 0) >= limit:
            return ("BIG PLAY ALERT", play["detail"], play)
    if delta >= (4 if pos == "QB" else 5.5):
        return ("TOUCHDOWN", "", None)
    if not play and delta >= 3:
        return ("BIG PLAY ALERT", "", None)
    return None


# ---------- milestones ----------

MILESTONES = [  # (stat, threshold, headline, label for the number)
    ("rushingYards", 100, "100-YARD GAME", "RUSHING YARDS"), ("rushingYards", 150, "150-YARD GAME", "RUSHING YARDS"),
    ("rushingYards", 200, "200-YARD GAME", "RUSHING YARDS"),
    ("receivingYards", 100, "100-YARD GAME", "RECEIVING YARDS"), ("receivingYards", 150, "150-YARD GAME", "RECEIVING YARDS"),
    ("receivingYards", 200, "200-YARD GAME", "RECEIVING YARDS"),
    ("passingYards", 300, "300-YARD GAME", "PASSING YARDS"), ("passingYards", 400, "400-YARD GAME", "PASSING YARDS"),
    ("tds", 2, "2ND TD TODAY", "TOUCHDOWNS"), ("tds", 3, "HAT TRICK", "TOUCHDOWNS"), ("tds", 4, "4 TOUCHDOWNS", "TOUCHDOWNS"),
    ("passingTouchdowns", 3, "3 TD PASSES", "TD PASSES"), ("passingTouchdowns", 4, "4 TD PASSES", "TD PASSES"),
    ("passingTouchdowns", 5, "5 TD PASSES", "TD PASSES"),
]


def norm(n):
    n = re.sub(r"[^a-z ]", "", (n or "").lower())
    return " ".join(w for w in n.split() if w not in ("jr", "sr", "ii", "iii", "iv", "v"))


def box_stats(info):
    """This player's live box score from ESPN, e.g. {"rushingYards": 87, "tds": 1, ...}."""
    eid, comp = game_for(info.get("team"))
    if not eid or ((comp.get("status") or {}).get("type") or {}).get("state") == "pre":
        return None
    want, out, found = norm(info.get("name")), {}, False
    for tb in (espn(f"summary?event={eid}").get("boxscore") or {}).get("players") or []:
        for cat in tb.get("statistics") or []:
            keys = cat.get("keys") or []
            for a in cat.get("athletes") or []:
                if norm((a.get("athlete") or {}).get("displayName")) != want:
                    continue
                found = True
                for k, v in zip(keys, a.get("stats") or []):
                    if "/" in str(v):
                        out[k + "_raw"] = str(v)
                    try:
                        out[k] = float(str(v).split("/")[0])
                    except ValueError:
                        pass
    if not found:
        return None
    out["tds"] = out.get("rushingTouchdowns", 0) + out.get("receivingTouchdowns", 0)
    return out


def milestone_check(pid, info):
    """Newest milestone crossed since the last check, as (headline, detail), or None."""
    if info.get("pos") in ("K", "DEF"):
        return None
    try:
        now = box_stats(info)
    except Exception:
        return None
    if now is None:
        return None
    prev = STATS.get(pid)
    STATS[pid] = now
    if prev is None:
        return None
    best = {}
    for stat, t, head, word in MILESTONES:
        if prev.get(stat, 0) < t <= now.get(stat, 0):
            best[stat] = (head, f"{int(now[stat])} {word}")
    return list(best.values())[-1] if best else None


# ---------- win probability ----------

def raw_proj(week):
    if week in RAW_PROJ:
        return RAW_PROJ[week]
    data = {}
    try:
        q = urllib.parse.urlencode([("season_type", CURRENT["season_type"])] +
                                   [("position[]", p) for p in ("QB", "RB", "WR", "TE", "K", "DEF")])
        res = get(f"https://api.sleeper.app/projections/nfl/{CURRENT['season']}/{week}?{q}")
        items = res if isinstance(res, list) else [dict(v, player_id=k) for k, v in (res or {}).items()]
        for it in items:
            st = it.get("stats") or {}
            if it.get("player_id") and st:
                data[str(it["player_id"])] = st
    except Exception as e:
        print("Projections unavailable, win % turned off this week:", e)
    RAW_PROJ[week] = data
    return data


def league_proj(lg):
    key = (lg["league_id"], CURRENT["week"])
    if key not in LEAGUE_PROJ:
        sc = lg.get("scoring") or {}
        LEAGUE_PROJ[key] = {pid: sum(v * sc[k] for k, v in st.items() if k in sc and isinstance(v, (int, float)))
                            for pid, st in raw_proj(CURRENT["week"]).items()}
    return LEAGUE_PROJ[key]


def game_progress(team):
    _, comp = game_for(team)
    if not comp:
        return 1.0  # bye week or no game: nothing left to score
    st = comp.get("status") or {}
    state = (st.get("type") or {}).get("state")
    if state == "pre":
        return 0.0
    if state == "post":
        return 1.0
    period, clock = st.get("period") or 1, st.get("clock") or 0
    return 0.98 if period > 4 else min(0.99, ((period - 1) * 900 + (900 - clock)) / 3600)


def team_left(starters, lg):
    proj, mean, var = league_proj(lg), 0.0, 0.0
    for pid in starters or []:
        if not pid or pid == "0":
            continue
        p = max(0.0, proj.get(pid, 0.0))
        left = 1 - game_progress((PLAYERS.get(pid) or {}).get("team"))
        mean += p * left
        var += (0.65 * p) ** 2 * left
    return mean, var


def win_prob(lg, matchups, my_adj=0.0, opp_adj=0.0):
    """Your chance to win this matchup, 0-100, or None if unavailable."""
    if not WIN_PROBABILITY or not raw_proj(CURRENT["week"]):
        return None
    mine = next((m for m in matchups if m.get("roster_id") == lg["my_roster_id"]), None)
    opp = find_opp(matchups, mine) if mine else None
    if not opp:
        return None
    try:
        mm, mv = team_left(mine.get("starters"), lg)
        om, ov = team_left(opp.get("starters"), lg)
    except Exception:
        return None
    diff = ((mine.get("points") or 0) - my_adj + mm) - ((opp.get("points") or 0) - opp_adj + om)
    sd = math.sqrt(mv + ov)
    if sd < 0.5:
        return 100 if diff > 0 else 0 if diff < 0 else 50
    return max(1, min(99, round(100 * 0.5 * (1 + math.erf(diff / sd / math.sqrt(2))))))


# ---------- sounds ----------

def sound_file(name):
    """sounds/<name>.mp3 beats sounds/<name>.wav, so you can drop in your own sound."""
    if not re.fullmatch(r"[a-z0-9_]+", name or ""):
        return None
    for ext in (".mp3", ".wav"):
        f = os.path.join(HERE, "sounds", name + ext)
        if os.path.exists(f):
            return f
    return None


def pick_sound(kind, owners):
    for o in owners[:1]:
        if sound_file(f"{kind}_{o.lower()}"):
            return f"{kind}_{o.lower()}"
    return kind


def play_on_mac(name):
    f = sound_file(name)
    if f and sys.platform == "darwin":
        subprocess.Popen(["afplay", "-v", str(MAC_VOLUME), f])


# ---------- extra info for the graphics ----------

def stat_line(st, pos):
    """e.g. "8 REC · 112 YDS · 2 TD" from the live box score."""
    parts = []
    if "passingYards" in st and (pos == "QB" or st["passingYards"] > 0):
        ca = st.get("completions/passingAttempts_raw")
        parts.append((f"{ca} · " if ca else "") + f"{int(st['passingYards'])} PASS YDS")
        if st.get("passingTouchdowns"):
            parts.append(f"{int(st['passingTouchdowns'])} PASS TD")
    if "receptions" in st:
        parts.append(f"{int(st['receptions'])} REC · {int(st.get('receivingYards', 0))} YDS")
    if "rushingAttempts" in st and (pos == "RB" or st.get("rushingYards", 0) >= 10 or not parts):
        parts.append(f"{int(st['rushingAttempts'])} CAR · {int(st.get('rushingYards', 0))} RUSH YDS")
    if st.get("tds"):
        parts.append(f"{int(st['tds'])} TD")
    return " · ".join(parts[:4])


def team_colors(team):
    _, comp = game_for(team)
    want = TEAM_FIX.get(team, team)
    for c in (comp or {}).get("competitors", []):
        t = c.get("team") or {}
        if t.get("abbreviation") == want and t.get("color"):
            return "#" + t["color"], "#" + (t.get("alternateColor") or "000000")
    return "", ""


def leaderboard(leagues, cache, owners):
    count = {}
    for lg in leagues:
        count[lg["owner"]] = count.get(lg["owner"], 0) + 1
    rows = []
    for lg in leagues:
        m = next((x for x in cache.get(lg["league_id"], []) if x.get("roster_id") == lg["my_roster_id"]), None)
        if m:
            label = "@" + lg["owner"] + (f" · {lg['name']}" if count[lg["owner"]] > 1 else "")
            rows.append([label, round(m.get("points") or 0, 1), lg["owner"] in owners])
    rows.sort(key=lambda r: -r[1])
    return rows[:5]


def enrich(q, pid, info, play, label, milestone, leagues, cache, owners):
    """Adds the cut-out photo, team colors, stat line, field drive, ON FIRE and leaderboard."""
    try:
        st = STATS.get(pid) or box_stats(info) or {}
    except Exception:
        st = {}
    if st:
        q["sl"] = stat_line(st, info.get("pos"))
    hot_hits = ("2ND TD TODAY", "HAT TRICK", "4 TOUCHDOWNS", "3 TD PASSES", "4 TD PASSES", "5 TD PASSES")
    if label == "TOUCHDOWN" and (st.get("tds", 0) >= 2 or st.get("passingTouchdowns", 0) >= 3 or milestone in hot_hits):
        q["fire"] = "1"
    try:
        tc, tc2 = team_colors(info.get("team"))
    except Exception:
        tc, tc2 = "", ""
    if tc:
        q["tc"], q["tc2"] = tc, tc2
    if play and isinstance(play.get("fs"), int) and isinstance(play.get("fe"), int) and play["fs"] > play["fe"]:
        q["fs"], q["fe"] = str(play["fs"]), str(play["fe"])
    if info.get("espn_id"):
        q["cut"] = f"https://a.espncdn.com/i/headshots/nfl/players/full/{info['espn_id']}.png"
    if LEADERBOARD and len(leagues) > 1:
        q["lb"] = json.dumps(leaderboard(leagues, cache, owners))
    return q


# ---------- the TV graphics ----------

def headshot(pid, info):
    if info.get("pos") == "DEF":
        return f"https://sleepercdn.com/images/team_logos/nfl/{pid.lower()}.png"
    return f"https://sleepercdn.com/content/nfl/players/{pid}.jpg"


def main_q(label, hero, pid, info, gain, total, owners, detail, milestone, mu, wp, sound):
    q = {"t": label, "h": hero, "n": info.get("name") or pid, "img": headshot(pid, info),
         "pos": info.get("pos") or "", "tm": info.get("team") or "", "gain": f"{gain:.1f}",
         "total": f"{total:.1f}", "wk": str(CURRENT["week"]), "o": " & ".join("@" + o for o in owners),
         "d": detail or label, "m": milestone or "", "snd": sound}
    if mu:
        q.update({"lg": mu["league"], "mt": mu["my_team"], "ms": f"{mu['my_score']:.1f}"})
        if mu["opp_score"] is not None:
            q.update({"ot": mu["opp_team"], "os": f"{mu['opp_score']:.1f}"})
    if wp and wp[1] is not None:
        q.update({"wp0": str(wp[0]), "wp1": str(wp[1])})
    return q


def opp_q(label, pid, info, gain, detail, victims, mu, wp):
    q = {"t": label, "n": info.get("name") or pid, "img": headshot(pid, info), "d": detail or label,
         "gain": f"{gain:.1f}", "o": " & ".join("@" + v["owner"] for v in victims), "snd": "opponent"}
    if mu and mu["opp_score"] is not None:
        q.update({"mt": mu["my_team"], "ms": f"{mu['my_score']:.1f}", "ot": mu["opp_team"], "os": f"{mu['opp_score']:.1f}"})
    if wp and wp[1] is not None:
        q.update({"wp0": str(wp[0]), "wp1": str(wp[1])})
    return q


def send(page, q, seconds, position, height):
    uri = f"http://{LOCAL_IP}:{OVERLAY_PORT}/{page}?{urllib.parse.urlencode(q)}"
    payload = {"duration": seconds, "position": position, "backgroundColor": "#00000000",
               "media": {"web": {"uri": uri, "width": OVERLAY_WIDTH, "height": height}}}
    req = urllib.request.Request(f"http://{TV_IP}:7979/notify", data=json.dumps(payload).encode(),
                                 headers={"Content-Type": "application/json"}, method="POST")
    try:
        urllib.request.urlopen(req, timeout=10)
        if SOUND_ON in ("mac", "both"):
            play_on_mac(q.get("snd"))
        print(f"{time.strftime('%I:%M:%S %p')}  {'OPPONENT ' if page == 'opp' else ''}{q.get('h') or q['t']}: "
              f"{q['n']} {q['d']} +{q['gain']}  {q.get('o', '')}")
    except Exception as e:
        print(f"Couldn't reach the TV at {TV_IP}:7979 - is PiPup open? ({e})")
    time.sleep(seconds + 1)


def is_swing(q):
    return "wp0" in q and "wp1" in q and int(q["wp1"]) - int(q["wp0"]) >= SWING_POINTS


ALERTS = queue.Queue()
CYCLE = {"start": 0.0, "live": False}


def alert_worker():
    """Plays queued alerts one at a time, each held until its stream-delay time is up."""
    while True:
        due, args = ALERTS.get()
        wait = due - time.time()
        if wait > 0:
            time.sleep(wait)
        try:
            send(*args)
        except Exception as e:
            print("Alert failed:", e)


def queue_alert(*args):
    if CYCLE["live"]:  # game day: wait for the stream to catch up
        ALERTS.put((CYCLE["start"] + STREAM_DELAY_SECONDS, args))
    else:              # --test: right away
        send(*args)


def fire_main(q):
    queue_alert("overlay", q, OVERLAY_SECONDS + (2 if is_swing(q) else 0), 4, OVERLAY_HEIGHT)


def fire_opp(q):
    queue_alert("opp", q, OPP_SECONDS, 2, OPP_HEIGHT)


OVERLAY_HTML = r"""<!doctype html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,800;1,700;1,800;1,900&display=swap" rel="stylesheet">
<script>function fb(el){var f=el.getAttribute("data-fb");if(f&&el.src.indexOf(f)<0){el.parentNode.className+=" flat";el.src=f;}else{el.style.visibility="hidden";}}</script>
<style>
:root{--a:__ACCENT__;--a2:__ACCENT2__;--at:__ACCENTTEXT__;--tc:__TC__;--tc2:__TC2__;--ink:#0c0d10;--char:#1b1d23;--up:#1fcf6e;--dn:#e8293b}
html,body{margin:0;height:100%;overflow:hidden;background:transparent;color:#fff;font-family:'Barlow Condensed','Arial Narrow',Impact,sans-serif;text-transform:uppercase}
.bg{position:absolute;top:0;left:0;right:0;bottom:0;background:__BG__}
.streak{position:absolute;top:-30vh;bottom:-30vh;transform:skewX(-24deg);background:linear-gradient(90deg,transparent,rgba(255,255,255,.07),transparent)}
.st1{left:10vw;width:14vw}.st2{left:58vw;width:22vw}
.scene{position:absolute;top:0;left:0;right:0;bottom:-6vh;display:flex;flex-direction:column;align-items:center;justify-content:center}
.wipe{position:absolute;top:-20vh;bottom:-20vh;width:70vw;left:-120vw;transform:skewX(-22deg);z-index:20}
.w1{background:var(--a);animation:wipe .55s cubic-bezier(.7,0,.3,1) both}
.w2{background:#fff;width:10vw;animation:wipe .55s .07s cubic-bezier(.7,0,.3,1) both}
.w3{background:var(--tc);animation:wipe .55s .12s cubic-bezier(.7,0,.3,1) both}
.xa{background:var(--a);width:110vw;animation:wipe2 .75s 3s cubic-bezier(.7,0,.3,1) both}
.xb{background:#fff;width:8vw;animation:wipe2 .75s 3.08s cubic-bezier(.7,0,.3,1) both}
.xc{background:var(--tc);width:110vw;animation:wipe2 .75s 5.2s cubic-bezier(.7,0,.3,1) both}
.xd{background:#fff;width:8vw;animation:wipe2 .75s 5.28s cubic-bezier(.7,0,.3,1) both}
.scene.gone{visibility:hidden!important}
/* ---------- scene 1 ---------- */
.s1{animation:shake .32s .62s both}
.hero{position:relative;z-index:2;font-weight:900;font-style:italic;font-size:19vh;line-height:.85;letter-spacing:-.2vh;padding:0 4vh;
 text-shadow:.8vh .8vh 0 rgba(0,0,0,.65);animation:slamIn .45s .5s cubic-bezier(.2,1.5,.4,1) both}
.hero:before,.hero:after{content:"";position:absolute;left:-2vh;right:-2vh;transform:skewX(-22deg) scaleX(0);transform-origin:left;z-index:-1}
.hero:before{top:50%;height:7.5vh;background:var(--a);animation:barIn .4s .62s cubic-bezier(.2,1,.3,1) both}
.hero:after{top:calc(50% + 8.3vh);height:2vh;left:6vh;right:-6vh;background:var(--tc);animation:barIn .4s .72s cubic-bezier(.2,1,.3,1) both}
.hero.long{font-size:15vh}
.hero>span{position:relative;display:inline-block}
.hero.hot{text-shadow:none}
.hero.hot>span{color:transparent;background:linear-gradient(180deg,#fff 10%,#ffe14d 45%,#ff7a00 80%);-webkit-background-clip:text;background-clip:text;
 filter:drop-shadow(.8vh .8vh 0 rgba(0,0,0,.6)) drop-shadow(0 0 2.5vh rgba(255,120,0,.8));padding-right:.15em}
.idrow{position:relative;z-index:2;display:flex;align-items:stretch;margin-top:6.5vh;animation:upIn .45s .85s cubic-bezier(.2,1.2,.4,1) both}
.cut{position:relative;width:38vh;height:28vh;flex:0 0 38vh}
.cut .bk{position:absolute;top:0;left:0;right:0;bottom:0;transform:skewX(-10deg);background:linear-gradient(160deg,var(--tc) 0%,var(--tc2) 120%);border:.7vh solid #fff;box-shadow:1vh 1vh 0 var(--a)}
.cut img{position:absolute;bottom:.7vh;left:50%;height:128%;transform:translateX(-50%);filter:drop-shadow(0 1vh 1.4vh rgba(0,0,0,.65));animation:popUp .5s 1s cubic-bezier(.2,1.5,.4,1) both}
.cut.flat{overflow:hidden;transform:skewX(-10deg);border:.7vh solid #fff;box-sizing:border-box}
.cut.flat .bk{transform:none;border:0;box-shadow:none}
.cut.flat img{left:-12%;bottom:0;top:0;width:124%;height:100%;object-fit:cover;transform:skewX(10deg);animation:none}
.idtext{display:flex;flex-direction:column;justify-content:center;margin-left:5vh}
.bar{display:inline-block;transform:skewX(-14deg);padding:.4vh 2.6vh;margin:.5vh 0;align-self:flex-start}
.bar>span{display:block;transform:skewX(14deg)}
.nm{background:#fff;color:var(--ink);font-weight:900;font-style:italic;font-size:9vh;line-height:1}
.dt{background:var(--a);color:var(--at);font-weight:800;font-style:italic;font-size:5vh}
.pt{background:var(--ink);color:#fff;font-weight:700;font-style:italic;font-size:3.4vh;letter-spacing:.4vh;border-left:1vh solid var(--tc)}
.msb{background:#ffc400;color:#0c0d10;font-weight:900;font-style:italic;font-size:4vh;animation:pop2 .35s 1.4s cubic-bezier(.2,1.6,.4,1) both}
.stamp{position:absolute;right:-9vh;top:56%;font-weight:900;font-style:italic;font-size:6.5vh;padding:.2vh 2vh;border:.7vh solid #ffb000;color:#ffe14d;
 background:rgba(120,20,0,.75);transform:rotate(-10deg);text-shadow:0 0 2vh #ff6a00;box-shadow:0 0 3vh rgba(255,100,0,.7);animation:stampIn .4s 1.3s cubic-bezier(.2,1.6,.4,1) both,burn .5s 1.8s ease-in-out infinite alternate}
/* field drive */
.field{position:relative;z-index:2;width:68vw;height:6.5vh;margin-top:3.2vh;border:.4vh solid #fff;opacity:0;animation:upIn .4s 1.1s ease-out both;
 background:repeating-linear-gradient(90deg,rgba(255,255,255,.5) 0 .25vh,transparent .25vh 7.5%),linear-gradient(180deg,#2f7d3a,#246a2f);background-position:8.33% 0,0 0;background-size:83.4% 100%,100% 100%;background-repeat:no-repeat}
.ez{position:absolute;top:0;bottom:0;width:8.33%;background:rgba(0,0,0,.35)}
.ez.l{left:0}.ez.r{right:0;background:var(--tc);display:flex;align-items:center;justify-content:center}
.ez.r span{font-weight:900;font-style:italic;font-size:2.2vh;writing-mode:vertical-rl;transform:rotate(180deg)}
.ez.r.td{animation:ezflash .3s 2.3s 4}
.trail{position:absolute;top:35%;height:30%;width:0;background:linear-gradient(90deg,rgba(255,255,255,0),var(--a));transition:width 1.1s cubic-bezier(.5,0,.2,1)}
.ball{position:absolute;top:50%;width:3.6vh;height:2.3vh;margin:-1.15vh 0 0 -1.8vh;border-radius:50%;background:#8a4b1f;border:.3vh solid #fff;box-shadow:0 0 2vh #fff;transition:left 1.1s cubic-bezier(.5,0,.2,1)}
.flab{position:absolute;bottom:100%;margin-bottom:.6vh;transform:translateX(-50%);font-weight:900;font-style:italic;font-size:3vh;white-space:nowrap;text-shadow:0 .3vh .8vh #000}
.flab.b{bottom:auto;top:100%;margin:.6vh 0 0;color:var(--a2);opacity:0;animation:fadeIn .3s 2.3s both}
/* flames */
.flames{position:absolute;left:0;right:0;bottom:12vh;height:24vh;pointer-events:none;opacity:.75}
.fl{position:absolute;bottom:-4vh;width:14vw;border-radius:50% 50% 20% 20%;mix-blend-mode:screen;opacity:.85;
 background:radial-gradient(ellipse at 50% 100%,#fff3a0 0%,#ffb000 25%,#ff5a00 50%,rgba(255,40,0,0) 72%);transform-origin:50% 100%;animation:flick .45s ease-in-out infinite alternate}
/* momentum swing */
.sw{visibility:hidden}
.sw.on{visibility:visible}
.swk{font-weight:800;font-style:italic;font-size:7vh;letter-spacing:2vh;padding-left:2vh;color:var(--a2)}
.sw.on .swk{animation:dropIn2 .4s .15s ease-out both}
.swh{font-weight:900;font-style:italic;font-size:30vh;line-height:.8;text-shadow:1vh 1vh 0 rgba(0,0,0,.6),0 0 6vh var(--up)}
.sw.on .swh{animation:slamIn .45s .25s cubic-bezier(.2,1.5,.4,1) both,shake .32s .55s both}
.swp{margin-top:4vh;font-weight:800;font-style:italic;font-size:5vh;letter-spacing:.3vh;background:var(--ink);padding:.6vh 3vh;transform:skewX(-14deg);border-left:1.2vh solid var(--up)}
.swp b{font-size:8vh;font-weight:900;margin:0 1vh;color:var(--up)}
.swp .was{color:#9aa1b1}
.sw.on .swp{animation:upIn .4s .6s ease-out both}
/* ---------- scene 2 ---------- */
.s2{visibility:hidden}
.s2.on{visibility:visible}
.tag{display:flex;transform:skewX(-16deg);margin-bottom:3vh;opacity:0}
.tag>div{padding:.6vh 3vh;font-weight:900;font-style:italic;font-size:5.6vh}
.tag>div>span{display:block;transform:skewX(16deg)}
.tag .t1{background:var(--a);color:var(--at)} .tag .t2{background:#fff;color:var(--ink)} .tag .t3{background:#ffc400;color:#0c0d10}
.s2.on .tag{animation:dropIn .4s .55s cubic-bezier(.2,1.3,.4,1) both}
.cards{display:flex;align-items:stretch;width:92vw}
.card{position:relative;opacity:0;box-shadow:1.2vh 1.2vh 0 rgba(0,0,0,.45)}
.pc{flex:0 0 43%;background:#fff;color:var(--ink);display:flex;align-items:center;padding:3vh 3vh 2.5vh;box-sizing:border-box;border-bottom:1.2vh solid var(--a)}
.mc{flex:1;min-width:0;margin-left:2vw;background:var(--char);border-bottom:1.2vh solid var(--a)}
.s2.on .pc{animation:inL .5s .65s cubic-bezier(.2,1.1,.4,1) both}
.s2.on .mc{animation:inR .5s .8s cubic-bezier(.2,1.1,.4,1) both}
.pc .cut{width:23vh;height:18vh;flex:0 0 23vh}
.pc .cut .bk{border-color:var(--ink)}
.pc .cut img{animation:none}
.pinfo{margin-left:3.5vh;min-width:0;overflow:hidden}
.meta{font-weight:800;font-size:3vh;letter-spacing:.4vh;color:#6a6f7c}
.n2{font-weight:900;font-style:italic;font-size:6vh;line-height:.95}
.gain{font-weight:900;font-style:italic;font-size:12vh;line-height:.9;color:var(--a2)}
.today{font-weight:800;font-style:italic;font-size:3.4vh;letter-spacing:.2vh}
.today b{font-size:4.4vh;margin:0 .5vh;font-weight:900}
.sl{margin-top:.8vh;font-weight:800;font-style:italic;font-size:3vh;color:#3d424d;border-left:.8vh solid var(--tc);padding-left:1.2vh;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fire2{position:absolute;top:-2.5vh;right:-1.5vh;font-weight:900;font-style:italic;font-size:4vh;padding:0 1.5vh;border:.5vh solid #ffb000;color:#ffe14d;background:#7a1400;transform:rotate(-8deg);box-shadow:0 0 2vh rgba(255,100,0,.8)}
.mh{display:flex;justify-content:space-between;background:var(--a);color:var(--at);font-weight:900;font-style:italic;font-size:3.4vh;letter-spacing:.3vh;padding:.8vh 2.5vh}
.row{display:flex;align-items:center;padding:1.6vh 2.5vh;border-bottom:.3vh solid rgba(255,255,255,.08)}
.row .tick{width:1vh;align-self:stretch;margin-right:2vh;background:#555a66}
.row.me .tick{background:var(--a)}
.tw{flex:1;min-width:0}
.tn{font-weight:900;font-style:italic;font-size:4.8vh;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-right:.3em}
.tu{font-weight:600;font-size:2.8vh;opacity:.65;text-transform:none}
.sc{font-weight:900;font-style:italic;font-size:8vh;line-height:1;min-width:19vh;text-align:right}
.row.opp{opacity:.8}
.chip{display:inline-block;margin-left:1.5vh;background:var(--a);color:var(--at);font-weight:900;font-style:italic;font-size:3.2vh;padding:.2vh 1.2vh;transform:skewX(-12deg)}
.foot{display:flex;align-items:center;justify-content:space-between;padding:1.6vh 2.5vh}
.mbar{flex:1;height:1.6vh;background:rgba(255,255,255,.15);transform:skewX(-22deg);overflow:hidden;margin-right:3vh;position:relative}
.fill{position:absolute;left:0;top:0;bottom:0;background:var(--a);transition:width 1.2s cubic-bezier(.2,1,.3,1)}
.status{font-weight:900;font-style:italic;font-size:4.4vh;padding:.2vh 2.4vh;transform:skewX(-14deg);opacity:0}
.status.up{background:var(--up);color:var(--ink)}.status.dn{background:var(--dn)}.status.even{background:#fff;color:var(--ink)}
.s2.on .status{animation:pop .35s 2.1s cubic-bezier(.2,1.6,.4,1) both}
.s2.on .status.flip{animation:pop .35s 2.1s cubic-bezier(.2,1.6,.4,1) both,blink .3s 2.5s 5}
.wprow{display:flex;align-items:center;padding:0 2.5vh 1.8vh;font-weight:800;font-style:italic;font-size:3.1vh;letter-spacing:.3vh}
.wprow b{font-size:5.2vh;font-weight:900;margin:0 1.5vh 0 2vh;letter-spacing:0}
.wd{font-weight:900;font-size:4vh}.wd.up{color:var(--up)}.wd.dn{color:var(--dn)}
/* leaderboard */
.lb{display:flex;align-items:stretch;width:92vw;margin-top:2.6vh;opacity:0;background:var(--ink);box-shadow:1vh 1vh 0 rgba(0,0,0,.4)}
.s2.on .lb{animation:upIn .4s 1.2s ease-out both}
.lb .h{background:#fff;color:var(--ink);font-weight:900;font-style:italic;font-size:3.2vh;padding:.8vh 2.5vh;display:flex;align-items:center}
.lb .e{flex:1;display:flex;align-items:center;justify-content:center;font-weight:800;font-style:italic;font-size:3.3vh;border-left:.3vh solid rgba(255,255,255,.1);white-space:nowrap;overflow:hidden;padding:0 1vh}
.lb .e .r{font-weight:900;color:#9aa1b1;margin-right:1.2vh}
.lb .e b{margin-left:1.5vh;font-weight:900;font-size:3.8vh}
.lb .e.hi{background:var(--a);color:var(--at)}
.lb .e.hi .r{color:inherit}
/* bottom line ticker */
.ticker{position:absolute;left:0;right:0;bottom:0;height:7vh;background:var(--ink);display:flex;align-items:center;overflow:hidden;border-top:.5vh solid var(--a);
 transform:translateY(8vh);animation:tickUp .4s .9s ease-out forwards;z-index:10}
.ticker .lab{flex:0 0 auto;height:100%;display:flex;align-items:center;background:var(--a);color:var(--at);font-weight:900;font-style:italic;font-size:3.6vh;padding:0 3vh;z-index:2}
.ticker .run{white-space:nowrap;font-weight:800;font-size:3.5vh;letter-spacing:.2vh;padding-left:100vw;animation:scroll __TICKSEC__s 1s linear both}
.ticker .run b{color:var(--a2)}
body.out{animation:fade .5s ease-in forwards}
@keyframes wipe{0%{left:-120vw}100%{left:150vw}}
@keyframes wipe2{0%{left:-140vw}100%{left:150vw}}
@keyframes slamIn{0%{transform:scale(2.6);opacity:0}100%{transform:scale(1);opacity:1}}
@keyframes barIn{0%{transform:skewX(-22deg) scaleX(0)}100%{transform:skewX(-22deg) scaleX(1)}}
@keyframes upIn{0%{transform:translateY(8vh);opacity:0}100%{transform:none;opacity:1}}
@keyframes popUp{0%{transform:translateX(-50%) translateY(6vh) scale(.6);opacity:0}100%{transform:translateX(-50%);opacity:1}}
@keyframes dropIn{0%{transform:skewX(-16deg) translateY(-6vh);opacity:0}100%{transform:skewX(-16deg);opacity:1}}
@keyframes dropIn2{0%{transform:translateY(-6vh);opacity:0}100%{transform:none;opacity:1}}
@keyframes inL{0%{transform:translateX(-60vw);opacity:0}100%{transform:none;opacity:1}}
@keyframes inR{0%{transform:translateX(60vw);opacity:0}100%{transform:none;opacity:1}}
@keyframes pop{0%{transform:skewX(-14deg) scale(0);opacity:0}100%{transform:skewX(-14deg) scale(1);opacity:1}}
@keyframes pop2{0%{transform:skewX(-14deg) scale(0)}100%{transform:skewX(-14deg) scale(1)}}
@keyframes stampIn{0%{transform:rotate(-10deg) scale(3);opacity:0}100%{transform:rotate(-10deg) scale(1);opacity:1}}
@keyframes burn{to{box-shadow:0 0 5vh rgba(255,140,0,.95);filter:brightness(1.25)}}
@keyframes flick{0%{transform:scaleY(.85) scaleX(1.05)}100%{transform:scaleY(1.15) scaleX(.92) translateY(-1vh)}}
@keyframes ezflash{50%{filter:brightness(2)}}
@keyframes fadeIn{to{opacity:1}}
@keyframes blink{50%{filter:brightness(1.7)}}
@keyframes shake{0%,100%{transform:none}25%{transform:translate(-1.2vh,.8vh)}50%{transform:translate(1vh,-.6vh)}75%{transform:translate(-.5vh,.3vh)}}
@keyframes tickUp{to{transform:none}}
@keyframes scroll{to{transform:translateX(-100%)}}
@keyframes fade{to{opacity:0}}
</style></head><body>
<audio id="snd" src="__SOUND__" preload="auto"></audio>
<audio id="snd2" src="__SOUND2__" preload="auto"></audio>
<audio id="snd3" src="__SOUND3__" preload="auto"></audio>
<div class="bg"></div><div class="streak st1"></div><div class="streak st2"></div>
<div class="wipe w1"></div><div class="wipe w2"></div><div class="wipe w3"></div>
<div class="wipe xa"></div><div class="wipe xb"></div><div class="wipe xc" id="xc"></div><div class="wipe xd" id="xd"></div>
<div class="scene s1" id="s1">
 <div class="flames" id="flames"></div>
 <div class="hero __LCLASS__"><span>__HERO__</span></div>
 <div class="idrow">
  <div class="cut __CUTCLASS__"><div class="bk"></div><img src="__CUT__" data-fb="__IMG__" onerror="fb(this)"></div>
  <div class="idtext">
   <div class="bar nm"><span>__NAME__</span></div>
   <div class="bar dt"><span>__DETAIL__</span></div>
   <div class="bar pt"><span>__POS__ &middot; __TEAM__ &middot; +__GAIN__ PTS</span></div>
   <div class="bar msb" style="__MSSTYLE__"><span>&#9733; __MILESTONE__</span></div>
  </div>
  <div class="stamp" style="__FIRESTYLE__">ON FIRE</div>
 </div>
 __FIELD__
</div>
<div class="scene sw" id="sw">
 <div class="swk">MOMENTUM</div>
 <div class="swh">SWING</div>
 <div class="swp">WIN PROBABILITY <b class="was">__WP0__%</b>&#10132;<b><span id="swb">__WP0__</span>%</b></div>
</div>
<div class="scene s2" id="s2">
 <div class="tag"><div class="t1"><span>__HERO__</span></div><div class="t2"><span>__DETAIL__</span></div><div class="t3" style="__MSSTYLE__"><span>&#9733; __MILESTONE__</span></div></div>
 <div class="cards">
  <div class="card pc">
   <div class="cut __CUTCLASS__"><div class="bk"></div><img src="__CUT__" data-fb="__IMG__" onerror="fb(this)"></div>
   <div class="pinfo">
    <div class="meta">__POS__ &middot; __TEAM__</div>
    <div class="n2">__NAME__</div>
    <div class="gain">+__GAIN__</div>
    <div class="today">TODAY<b id="pt">__PSTART__</b>PTS</div>
    <div class="sl" style="__SLSTYLE__">__SL__</div>
   </div>
   <div class="fire2" style="__FIRESTYLE__">&#128293; ON FIRE</div>
  </div>
  <div class="card mc" style="__PRSTYLE__">
   <div class="mh"><span>__LEAGUE__</span><span>WEEK __WEEK__</span></div>
   <div class="row me"><div class="tick"></div><div class="tw"><div class="tn">__MYTEAM__</div><div class="tu">__OWNER__</div></div>
    <div class="sc"><span id="ms">__MSTART__</span></div><span class="chip">+__GAIN__</span></div>
   <div class="row opp" style="__OPPSTYLE__"><div class="tick"></div><div class="tw"><div class="tn">__OPPTEAM__</div><div class="tu">OPPONENT</div></div>
    <div class="sc">__OPPSCORE__</div><span class="chip" style="visibility:hidden">+0.0</span></div>
   <div class="foot" style="__OPPSTYLE__"><div class="mbar"><div class="fill" id="fill" style="width:__PCT0__%"></div></div>
    <div class="status __STCLASS__">__STATUS__</div></div>
   <div class="wprow" style="__WPSTYLE__">WIN PROBABILITY <b><span id="wp">__WP0__</span>%</b><span class="wd __WDCLASS__">__WD__</span></div>
  </div>
 </div>
 __LB__
</div>
<div class="ticker"><div class="lab">FANTASY ALERT</div><div class="run">__TICKER__</div></div>
<script>
var SW=__SWING__,FIRE=__FIREON__,T2=SW?5600:3400;
function $(i){return document.getElementById(i);}
function play(id){try{var au=$(id);if(!au.getAttribute("src"))return;var pr=au.play();if(pr&&pr.catch)pr.catch(function(){});}catch(e){}}
play("snd");if(FIRE)play("snd2");
if(!SW){$("xc").style.display="none";$("xd").style.display="none";}
if(FIRE){for(var i=0;i<16;i++){var d=document.createElement("div");d.className="fl";d.style.left=(i*6.6-4+Math.random()*3)+"vw";
 d.style.height=(16+Math.random()*18)+"vh";d.style.animationDuration=(.3+Math.random()*.35)+"s";d.style.animationDelay=(-Math.random())+"s";$("flames").appendChild(d);}}
function count(id,s,e,ms,dp){var el=$(id),t0=Date.now();dp=dp===undefined?1:dp;
 (function step(){var k=Math.min(1,(Date.now()-t0)/ms);el.textContent=(s+(e-s)*(1-Math.pow(1-k,3))).toFixed(dp);if(k<1)requestAnimationFrame(step);})();}
setTimeout(function(){var b=$("ball"),t=$("trail");if(b){b.style.left=b.getAttribute("data-to")+"%";t.style.width=t.getAttribute("data-w")+"%";}},1350);
setTimeout(function(){$("s1").className+=" gone";
 if(SW){$("sw").className+=" on";var a=$("snd");try{var v=1,iv=setInterval(function(){v-=.1;a.volume=Math.max(0,v);if(v<=0){clearInterval(iv);a.pause();}},30);}catch(e){}
  play("snd3");setTimeout(function(){count("swb",__WP0__,__WP1__,1200,0);},700);}
 else{$("s2").className+=" on";}},3400);
if(SW)setTimeout(function(){$("sw").className+=" gone";$("s2").className+=" on";},T2);
setTimeout(function(){count("pt",__PSTART__,__PTOTAL__,1100);},T2+900);
setTimeout(function(){count("ms",__MSTART__,__MTOTAL__,1300);$("fill").style.width="__PCT1__%";},T2+1350);
setTimeout(function(){count("wp",__WP0__,__WP1__,1300,0);},T2+1800);
setTimeout(function(){document.body.className="out"},__FADE__);
</script></body></html>"""


OPP_HTML = r"""<!doctype html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,800;1,700;1,800;1,900&display=swap" rel="stylesheet">
<style>
:root{--red:#d50a0a;--ink:#0c0d10;--char:#1b1d23;--up:#1fcf6e;--dn:#e8293b}
html,body{margin:0;height:100%;overflow:hidden;background:transparent;color:#fff;font-family:'Barlow Condensed','Arial Narrow',Impact,sans-serif;text-transform:uppercase}
.bar{position:absolute;left:0;right:0;bottom:0;height:100%;display:flex;align-items:stretch;background:linear-gradient(90deg,var(--char),#121318);
 border-top:1.5vh solid var(--red);transform:translateY(110%);animation:up .45s cubic-bezier(.2,1.1,.4,1) forwards}
.tab{flex:0 0 auto;display:flex;flex-direction:column;justify-content:center;background:var(--red);padding:0 6vh 0 4vh;margin-right:4vh;
 clip-path:polygon(0 0,100% 0,88% 100%,0 100%);font-weight:900;font-style:italic;line-height:.95}
.tab .a{font-size:15vh;opacity:.9}.tab .b{font-size:24vh;animation:blink .35s .5s 4}
.frame{flex:0 0 auto;align-self:center;width:62vh;height:62vh;transform:skewX(-10deg);overflow:hidden;background:#2a2e38;border:2.5vh solid #fff;position:relative}
.frame img{position:absolute;left:-12%;top:0;width:124%;height:100%;object-fit:cover;transform:skewX(10deg)}
.info{flex:1;min-width:0;display:flex;flex-direction:column;justify-content:center;margin-left:5vh}
.nm{font-weight:900;font-style:italic;font-size:26vh;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-right:.3em}
.dt{font-weight:800;font-style:italic;font-size:14vh;color:#ff6b6b;white-space:nowrap}
.dt b{color:#fff;margin-left:2vh}
.mu{flex:0 1 auto;max-width:44vw;display:flex;flex-direction:column;justify-content:center;align-items:flex-end;padding:0 4vh;border-left:.8vh solid rgba(255,255,255,.12)}
.tms{font-weight:800;font-style:italic;font-size:9vh;opacity:.7;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}
.sc{font-weight:900;font-style:italic;font-size:17vh;line-height:1.05;white-space:nowrap}
.row2{display:flex;align-items:center;margin-top:2vh}
.st{font-weight:900;font-style:italic;font-size:11vh;padding:.5vh 3vh;transform:skewX(-14deg)}
.st.up{background:var(--up);color:var(--ink)}.st.dn{background:var(--dn)}.st.even{background:#fff;color:var(--ink)}
.wp{font-weight:900;font-style:italic;font-size:11vh;margin-left:3vh}
.wp .d{color:var(--dn);margin-left:1vh}
.who{font-weight:700;font-size:8vh;opacity:.7;text-transform:none;margin-top:1vh}
body.out .bar{animation:down .4s ease-in forwards}
@keyframes up{to{transform:none}}
@keyframes down{from{transform:none}to{transform:translateY(110%)}}
@keyframes blink{50%{opacity:.35}}
</style></head><body>
<audio id="snd" src="__SOUND__" preload="auto"></audio>
<div class="bar">
 <div class="tab"><div class="a">OPPONENT</div><div class="b">__KIND__</div></div>
 <div class="frame"><img src="__IMG__" onerror="this.style.visibility='hidden'"></div>
 <div class="info"><div class="nm">__NAME__</div><div class="dt">__DETAIL__<b>+__GAIN__</b></div></div>
 <div class="mu" style="__MUSTYLE__">
  <div class="tms">__MYTEAM__ vs __OPPTEAM__</div>
  <div class="sc">__MYSCORE__ &ndash; __OPPSCORE__</div>
  <div class="row2"><div class="st __STCLASS__">__STATUS__</div><div class="wp" style="__WPSTYLE__">WIN __WP1__%<span class="d">&#9660;__WD__</span></div></div>
  <div class="who">__OWNER__</div>
 </div>
</div>
<script>
try{var au=document.getElementById("snd");var pr=au.play();if(pr&&pr.catch)pr.catch(function(){});}catch(e){}
setTimeout(function(){document.body.className="out"},__FADE__);
</script></body></html>"""


def num(s, default=0.0):
    try:
        return float(s)
    except (TypeError, ValueError):
        return default


def status_of(diff0, diff1, lead_text):
    if diff1 > 0 and diff0 <= 0 and lead_text:
        return lead_text, "up flip"
    if diff1 > 0:
        return f"UP {diff1:.1f}", "up"
    if diff1 < 0:
        return f"DOWN {-diff1:.1f}", "dn"
    return "ALL TIED UP", "even"


def hex_rgb(h, default=(42, 46, 56)):
    h = (h or "").lstrip("#")
    try:
        return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))
    except ValueError:
        return default


def yard_label(yte):
    if yte <= 0:
        return "END ZONE"
    if yte == 50:
        return "50"
    return f"OWN {100 - yte}" if yte > 50 else f"OPP {yte}"


def field_html(fs, fe):
    x = lambda yte: round((10 + 100 - yte) / 120 * 100, 2)
    x0, x1 = x(fs), x(fe)
    return (f'<div class="field"><div class="ez l"></div><div class="ez r{" td" if fe <= 0 else ""}"><span>END ZONE</span></div>'
            f'<div class="trail" id="trail" style="left:{x0}%" data-w="{round(x1 - x0, 2)}"></div>'
            f'<div class="ball" id="ball" style="left:{x0}%" data-to="{x1}"></div>'
            f'<div class="flab" style="left:{x0}%">{yard_label(fs)}</div>'
            f'<div class="flab b" style="left:{min(x1, 94)}%">{yard_label(fe)}</div></div>')


def render_main(g, q):
    e = html.escape
    label = g("t") if g("t") in LABELS else "TOUCHDOWN"
    accent, accent_text, accent2 = LABELS[label]
    hero = g("h") or label
    gain, ptotal = num(g("gain")), num(g("total"))
    has_mu, has_opp, has_wp = "ms" in q, "os" in q, "wp1" in q
    my1, opp = num(g("ms")), num(g("os"))
    my0 = max(0.0, my1 - gain)
    status, stc = status_of(my0 - opp, my1 - opp, "TAKES THE LEAD!")
    wp0, wp1 = int(num(g("wp0"))), int(num(g("wp1")))
    wd = wp1 - wp0
    swing = has_wp and has_opp and wd >= SWING_POINTS
    fire = g("fire") == "1"
    tc = g("tc") if re.fullmatch(r"#[0-9a-fA-F]{6}", g("tc")) else "#2a2e38"
    tc2 = g("tc2") if re.fullmatch(r"#[0-9a-fA-F]{6}", g("tc2")) else "#0c0d10"
    r, gg, b = hex_rgb(tc)
    bits = [f"<b>{e(g('n'))}</b> {e(g('d'))} +{gain:.1f}"]
    if g("sl"):
        bits.append(e(g("sl")))
    if g("m"):
        bits.append(e(g("m")))
    if has_mu:
        bits.append(f"{e(g('mt'))} <b>{my1:.1f}</b>" + (f" &ndash; {opp:.1f} {e(g('ot'))}" if has_opp else ""))
        if has_wp:
            bits.append(f"WIN PROBABILITY <b>{wp1}%</b>")
        bits.append(f"{e(g('lg'))} &middot; WEEK {e(g('wk'))}")
    pct = lambda m: 50.0 if m + opp <= 0 else round(100 * m / (m + opp), 1)
    tv_sound = SOUND_ON in ("tv", "both")
    snd = g("snd") if sound_file(g("snd")) and tv_sound else ""
    snd2 = "onfire" if fire and sound_file("onfire") and tv_sound else ""
    snd3 = "swing" if swing and sound_file("swing") and tv_sound else ""
    field = ""
    if g("fs") and g("fe"):
        fs, fe = int(num(g("fs"))), int(num(g("fe")))
        if 0 <= fe < fs <= 100:
            field = field_html(fs, fe)
    lb = ""
    try:
        rows = json.loads(g("lb") or "[]")
    except ValueError:
        rows = []
    if rows:
        lb = ('<div class="lb"><div class="h">LEADERBOARD</div>' + "".join(
            f'<div class="e{" hi" if hi else ""}"><span class="r">{i + 1}</span>{e(str(name))}<b>{num(pts):.1f}</b></div>'
            for i, (name, pts, hi) in enumerate(rows)) + "</div>")
    cut = g("cut") if g("cut").startswith("https://") else ""
    hide = "display:none"
    extra = 2.2 if swing else 0
    return {
        "__ACCENT__": accent, "__ACCENTTEXT__": accent_text, "__ACCENT2__": accent2, "__TC__": tc, "__TC2__": tc2,
        "__LCLASS__": ("long " if hero != "TOUCHDOWN" else "") + ("hot" if fire else ""), "__HERO__": e(hero),
        "__SOUND__": f"/sound/{snd}" if snd else "", "__SOUND2__": f"/sound/{snd2}" if snd2 else "",
        "__SOUND3__": f"/sound/{snd3}" if snd3 else "", "__TICKER__": " &nbsp;&nbsp;&bull;&nbsp;&nbsp; ".join(bits),
        "__BG__": (f"radial-gradient(ellipse at 50% 50%,rgba({r},{gg},{b},{OVERLAY_DIM * .9:.2f}) 0%,"
                   f"rgba(14,15,19,{OVERLAY_DIM:.2f}) 55%,rgba(8,8,10,{OVERLAY_DIM * .35:.2f}) 100%)"
                   if OVERLAY_SEE_THROUGH else f"radial-gradient(ellipse at 30% 45%,rgb({r},{gg},{b}) 0%,#0c0d10 70%)"),
        "__CUT__": e(cut or g("img"), quote=True), "__CUTCLASS__": "" if cut else "flat",
        "__NAME__": e(g("n")), "__IMG__": e(g("img"), quote=True), "__TEAM__": e(g("tm")), "__POS__": e(g("pos")),
        "__DETAIL__": e(g("d")), "__OWNER__": e(g("o")), "__WEEK__": e(g("wk")), "__MILESTONE__": e(g("m")),
        "__MSSTYLE__": "" if g("m") else hide, "__SL__": e(g("sl")), "__SLSTYLE__": "" if g("sl") else hide,
        "__FIRESTYLE__": "" if fire else hide, "__FIREON__": "1" if fire else "0", "__SWING__": "1" if swing else "0",
        "__FIELD__": field, "__LB__": lb,
        "__LEAGUE__": e(g("lg")), "__MYTEAM__": e(g("mt")), "__OPPTEAM__": e(g("ot")), "__OPPSCORE__": f"{opp:.1f}",
        "__GAIN__": f"{gain:.1f}", "__PSTART__": f"{max(0.0, ptotal - gain):.1f}", "__PTOTAL__": f"{ptotal:.1f}",
        "__MSTART__": f"{my0:.1f}", "__MTOTAL__": f"{my1:.1f}", "__PCT0__": str(pct(my0)), "__PCT1__": str(pct(my1)),
        "__STATUS__": status, "__STCLASS__": stc,
        "__WP0__": str(wp0), "__WP1__": str(wp1), "__WPSTYLE__": "" if (has_wp and has_opp) else hide,
        "__WD__": ("&#9650; " if wd >= 0 else "&#9660; ") + str(abs(wd)), "__WDCLASS__": "up" if wd >= 0 else "dn",
        "__PRSTYLE__": "" if has_mu else hide, "__OPPSTYLE__": "" if has_opp else hide,
        "__TICKSEC__": str(round(11 + extra, 1)),
        "__FADE__": str(int((max(6, OVERLAY_SECONDS - 0.7) + extra) * 1000)),
    }


def render_opp(g, q):
    e = html.escape
    gain, my, opp = num(g("gain")), num(g("ms")), num(g("os"))
    status, stc = status_of(my - (opp - gain), my - opp, "")
    if my - opp < 0 and my - (opp - gain) >= 0:
        status, stc = "LOSES THE LEAD", "dn"
    wp0, wp1 = int(num(g("wp0"))), int(num(g("wp1")))
    snd = "opponent" if sound_file("opponent") and SOUND_ON in ("tv", "both") else ""
    return {
        "__KIND__": "SCORES" if g("t") == "TOUCHDOWN" else "BIG PLAY", "__SOUND__": f"/sound/{snd}" if snd else "",
        "__NAME__": e(g("n")), "__IMG__": e(g("img"), quote=True), "__DETAIL__": e(g("d")), "__GAIN__": f"{gain:.1f}",
        "__MYTEAM__": e(g("mt")), "__OPPTEAM__": e(g("ot")), "__MYSCORE__": f"{my:.1f}", "__OPPSCORE__": f"{opp:.1f}",
        "__STATUS__": status, "__STCLASS__": stc, "__OWNER__": e(g("o")),
        "__MUSTYLE__": "" if "os" in q else "display:none", "__WPSTYLE__": "" if "wp1" in q else "display:none",
        "__WP1__": str(wp1), "__WD__": str(max(0, wp0 - wp1)),
        "__FADE__": str(int(max(4, OPP_SECONDS - 0.6) * 1000)),
    }


class Overlay(BaseHTTPRequestHandler):
    def do_GET(self):
        u = urllib.parse.urlparse(self.path)
        if u.path.startswith("/sound/"):
            f = sound_file(u.path.rsplit("/", 1)[-1])
            if not f:
                self.send_error(404)
                return
            with open(f, "rb") as fh:
                self._reply(fh.read(), "audio/mpeg" if f.endswith(".mp3") else "audio/wav")
            return
        if u.path not in ("/overlay", "/opp"):
            self.send_error(404)
            return
        q = urllib.parse.parse_qs(u.query)
        g = lambda k, d="": q.get(k, [d])[0]
        page, values = (OVERLAY_HTML, render_main(g, q)) if u.path == "/overlay" else (OPP_HTML, render_opp(g, q))
        for k, v in values.items():
            page = page.replace(k, v)
        self._reply(page.encode(), "text/html; charset=utf-8")

    def _reply(self, body, ctype):
        self.send_response(200)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, *args):
        pass


def find_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect((TV_IP, 7979))
        return s.getsockname()[0]
    except OSError:
        return "127.0.0.1"
    finally:
        s.close()


# ---------- main ----------

def samples(leagues, by_key):
    """Sample alerts built from your real teams, for --preview / --test."""
    pts, cache, _ = collect(leagues, CURRENT["week"])
    key = next((k for k in pts if k[:2] in by_key), None)
    if not key:
        sys.exit("No starters found this week to use as a sample.")
    lg = by_key[key[:2]]
    pid, info, owners = key[2], PLAYERS.get(key[2], {"name": key[2]}), [lg["owner"]]
    mu = matchup_summary(lg, cache.get(lg["league_id"], []))
    if mu and mu["my_score"] < 20:  # games haven't started - use sample scores
        mu = dict(mu, my_score=101.6, opp_score=98.2 if mu["opp_score"] is not None else None)
    opp_key = next((k for k in pts if k[:2] not in by_key and k[0] == lg["league_id"]), key)
    opid, oinfo = opp_key[2], PLAYERS.get(opp_key[2], {"name": opp_key[2]})
    omu = dict(mu, opp_score=(mu["opp_score"] or 0) + 7.4) if mu and mu["opp_score"] is not None else mu

    def dress(q, fs=None, fe=None, fire=False):
        enrich(q, pid, info, {"fs": fs, "fe": fe} if fs is not None else None, q["t"], q.get("m", ""), leagues, cache, owners)
        q.setdefault("sl", "6 REC · 88 YDS · 2 TD")
        q.setdefault("tc", "#241773"), q.setdefault("tc2", "#9e7c0c")
        if fire:
            q["fire"] = "1"
        if "lb" not in q:
            q["lb"] = json.dumps([["@" + u, sc, u == lg["owner"]] for u, sc in
                                  zip(SLEEPER_USERNAMES, (101.6, 96.4, 88.0))])
        return q

    return [
        ("overlay", dress(main_q("TOUCHDOWN", "TOUCHDOWN", pid, info, 6.8, 18.4, owners, "12-YARD TD CATCH", "2ND TD TODAY",
                                 mu, (41, 77), pick_sound("touchdown", owners)), 12, 0, fire=True)),
        ("overlay", dress(main_q("BIG PLAY ALERT", "BIG PLAY ALERT", pid, info, 4.5, 22.9, owners, "45-YARD RECEPTION", "",
                                 mu, (61, 70), pick_sound("bigplay", owners)), 72, 27)),
        ("overlay", dress(main_q("MILESTONE", "100-YARD GAME", pid, info, 1.2, 24.1, owners, "104 RECEIVING YARDS", "",
                                 mu, (70, 72), "milestone"))),
        ("opp", opp_q("TOUCHDOWN", opid, oinfo, 7.4, "8-YARD TD RUN", [lg], omu, (74, 55))),
    ]


def main():
    global LOCAL_IP, PLAYERS
    LOCAL_IP = find_local_ip()
    srv = ThreadingHTTPServer(("0.0.0.0", OVERLAY_PORT), Overlay)
    threading.Thread(target=srv.serve_forever, daemon=True).start()

    PLAYERS = load_players()
    state = get(f"{API}/state/nfl")
    CURRENT.update(week=state["week"], season=state.get("league_season") or state["season"],
                   season_type=state.get("season_type") or "regular")

    leagues, seen = [], set()
    for username in SLEEPER_USERNAMES:
        user = get(f"{API}/user/{username}")
        if not user:
            print(f"Skipping '{username}' - Sleeper username not found.")
            continue
        uid = user["user_id"]
        for lg in get(f"{API}/user/{uid}/leagues/nfl/{CURRENT['season']}") or []:
            if LEAGUE_NAME_CONTAINS and LEAGUE_NAME_CONTAINS.lower() not in lg["name"].lower():
                continue
            rid, team_names = league_info(lg["league_id"], uid)
            if rid and (lg["league_id"], rid) not in seen:
                seen.add((lg["league_id"], rid))
                leagues.append({"league_id": lg["league_id"], "name": lg["name"], "my_roster_id": rid,
                                "owner": username, "team_names": team_names,
                                "scoring": lg.get("scoring_settings") or {}})
    if not leagues:
        sys.exit(f"No {CURRENT['season']} Sleeper leagues found for those usernames.")
    for l in leagues:
        print(f"Watching: {l['owner']} ({l['team_names'].get(l['my_roster_id'])}) in {l['name']}")
    by_key = {(l["league_id"], l["my_roster_id"]): l for l in leagues}

    if "--preview" in sys.argv or "--test" in sys.argv:
        demo = samples(leagues, by_key)
        if "--preview" in sys.argv:
            for page, q in demo:
                url = f"http://127.0.0.1:{OVERLAY_PORT}/{page}?{urllib.parse.urlencode(q)}"
                print(f"\n{q.get('h') or ('OPPONENT ' + q['t'])}: {url}")
                webbrowser.open(url)
            print("\nOpened them in your browser. Click a page and refresh to replay with sound. Ctrl+C to quit.")
            while True:
                time.sleep(3600)
        for page, q in demo:
            (fire_main if page == "overlay" else fire_opp)(q)
        return

    last, week = {}, None
    CYCLE["live"] = True
    threading.Thread(target=alert_worker, daemon=True).start()
    print(f"Running. Alerts are held {STREAM_DELAY_SECONDS}s to match your stream. "
          "First check just records current scores; alerts start after that.")
    while True:
        try:
            CYCLE["start"] = time.time()
            ESPN_CACHE.clear()
            state = get(f"{API}/state/nfl")
            if state["week"] != week:
                week, last = state["week"], {}
                STATS.clear(), PENDING.clear()
                CURRENT.update(week=week, season=state.get("league_season") or state["season"],
                               season_type=state.get("season_type") or "regular")
                print(f"Week {week}")
            now, cache, opp_of = collect(leagues, week)
            first = not last
            mine, theirs = {}, {}
            for key, p in now.items():
                d = round(p - last.get(key, p), 2)
                if d <= 0:
                    continue
                lid, rid, pid = key
                if (lid, rid) in by_key:
                    e = mine.setdefault(pid, {"d": 0, "owners": [], "key": key, "total": p})
                    if by_key[(lid, rid)]["owner"] not in e["owners"]:
                        e["owners"].append(by_key[(lid, rid)]["owner"])
                    if d > e["d"]:
                        e.update(d=d, key=key, total=p)
                elif OPPONENT_ALERTS and (lid, rid) in opp_of:
                    e = theirs.setdefault(pid, {"d": 0, "victims": [], "key": key})
                    for v in opp_of[(lid, rid)]:
                        if v not in e["victims"]:
                            e["victims"].append(v)
                    if d > e["d"]:
                        e.update(d=d, key=key)
            last = now

            if MILESTONE_ALERTS:
                if first:  # snapshot current stats so old milestones don't fire
                    for key in now:
                        if key[:2] in by_key and key[2] not in STATS:
                            milestone_check(key[2], PLAYERS.get(key[2], {}))
                for pid, e in mine.items():
                    PENDING[pid] = {"left": 3, "key": e["key"], "owners": e["owners"]}

            done = set()
            for pid, e in mine.items():  # touchdowns and big plays
                info = PLAYERS.get(pid, {"name": pid})
                alert = decide(info, e["d"]) if e["d"] >= MIN_TRIGGER else None
                hit = milestone_check(pid, info) if MILESTONE_ALERTS else None
                lg = by_key[e["key"][:2]]
                ms = cache.get(lg["league_id"], [])
                wp = (win_prob(lg, ms, my_adj=e["d"]), win_prob(lg, ms))
                if alert:
                    kind = "touchdown" if alert[0] == "TOUCHDOWN" else "bigplay"
                    q = main_q(alert[0], alert[0], pid, info, e["d"], e["total"], e["owners"], alert[1],
                               hit[0] if hit else "", matchup_summary(lg, ms), wp, pick_sound(kind, e["owners"]))
                    fire_main(enrich(q, pid, info, alert[2], alert[0], hit[0] if hit else "", leagues, cache, e["owners"]))
                    done.add(pid)
                elif hit:
                    q = main_q("MILESTONE", hit[0], pid, info, e["d"], e["total"], e["owners"], hit[1], "",
                               matchup_summary(lg, ms), wp, "milestone")
                    fire_main(enrich(q, pid, info, None, "MILESTONE", hit[0], leagues, cache, e["owners"]))
                    done.add(pid)
            for pid in list(PENDING):  # ESPN's box score can lag: keep checking recent scorers
                pe = PENDING[pid]
                if pid in done or pid in mine:
                    if pid in done:
                        PENDING.pop(pid)
                    continue
                pe["left"] -= 1
                if pe["left"] <= 0:
                    PENDING.pop(pid)
                hit = milestone_check(pid, PLAYERS.get(pid, {}))
                if hit:
                    PENDING.pop(pid, None)
                    lg = by_key[pe["key"][:2]]
                    ms = cache.get(lg["league_id"], [])
                    wp = win_prob(lg, ms)
                    pinfo = PLAYERS.get(pid, {"name": pid})
                    q = main_q("MILESTONE", hit[0], pid, pinfo, 0.0, now.get(pe["key"], 0), pe["owners"], hit[1], "",
                               matchup_summary(lg, ms), (wp, wp), "milestone")
                    fire_main(enrich(q, pid, pinfo, None, "MILESTONE", hit[0], leagues, cache, pe["owners"]))
            for pid, e in theirs.items():  # the other team scored
                if e["d"] < MIN_TRIGGER:
                    continue
                info = PLAYERS.get(pid, {"name": pid})
                alert = decide(info, e["d"])
                if alert:
                    lg = e["victims"][0]
                    ms = cache.get(lg["league_id"], [])
                    wp = (win_prob(lg, ms, opp_adj=e["d"]), win_prob(lg, ms))
                    fire_opp(opp_q(alert[0], pid, info, e["d"], alert[1], e["victims"], matchup_summary(lg, ms), wp))
        except Exception as e:
            print("Error (will retry):", e)
        time.sleep(POLL_SECONDS)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nStopped.")

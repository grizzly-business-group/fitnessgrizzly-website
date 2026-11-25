import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import localFont from "next/font/local";
import { withShare } from "@/lib/seo";
import PageShell from "@/components/page/PageShell";
import GhlEmbed from "@/components/page/GhlEmbed";
import Countdown from "@/components/newlondon/Countdown";
import { ghl, newLondon, site } from "@/lib/data/site";
import { to } from "@/lib/paths";
import { networkRating } from "@/lib/data/locations";
import { testimonials } from "@/lib/data/content";
import "./nl.css";

import hero from "@/public/media/new-london/nl-real-main-floor-wide.jpg";
import entrance from "@/public/media/new-london/nl-real-entrance.jpg";
import mainFloor from "@/public/media/new-london/nl-real-main-floor.jpg";
import entranceWindows from "@/public/media/new-london/nl-real-entrance-windows.jpg";
import sideRoom from "@/public/media/new-london/nl-real-side-room.jpg";
import streetWindows from "@/public/media/new-london/nl-real-street-windows.jpg";

/**
 * /new-london — Grizzly Fitness New London, coming soon. "Mission Control" design (owner pick, 24 Nov 2026):
 * intentionally unlike the rest of the site. Styles live in ./nl.css, scoped under .nl. Two extra self-hosted
 * fonts (SIL OFL) are loaded on this page only: Orbitron 900 (headlines) and JetBrains Mono 500 (UI labels).
 *
 * PHOTOS (owner, 25 Nov 2026): real photos of the building at 210 Wisconsin St. as it stands before the remodel,
 * edited for exposure, colour and sharpness only (realtor sign cropped out). The earlier AI concept mockups were
 * retired so the page never promises a look the gym won't have; they're kept, unserved, in media-held/new-london-mockups.
 * Remodel list ("What's coming") = owner-confirmed only: fresh paint, rubber flooring, turf, lots of strength and cardio.
 * Founders list: GHL form `ghl.newLondonForm`. Offer phases + presale countdown: `newLondon.founders` (lib/data/site.ts).
 */
const orb = localFont({ src: "../fonts/Orbitron-900.woff2", weight: "900", variable: "--font-nl-orb", display: "swap" });
const mono = localFont({ src: "../fonts/JetBrainsMono-500.woff2", weight: "500", variable: "--font-nl-mono", display: "swap" });

export const metadata: Metadata = withShare({
  title: { absolute: "Grizzly Fitness New London, WI | Coming Soon — Founders Pricing" },
  description:
    "A new 24/7 Grizzly Fitness gym is coming to 210 Wisconsin St. in New London, WI. Founders pricing from $15 bi-weekly or $365 for a year — join the founders list for first access.",
  alternates: { canonical: "/new-london" },
});

const crumbs = [{ name: "Locations", path: "/locations" }, { name: "New London", path: "/new-london" }];

const gallery: { src: StaticImageData; alt: string; caption: string; wide?: boolean }[] = [
  { src: mainFloor, alt: "The empty main floor at 210 Wisconsin St. before the remodel: open carpeted space, drop ceiling with LED panels and two support columns", caption: "The main floor" },
  { src: entrance, alt: "The front entrance before the remodel: glass doors framed in cedar with built-in benches, a lobby area and a large street-side window", caption: "The front entrance" },
  { src: entranceWindows, alt: "The entry corner with cedar posts, wood-look flooring and tall windows, next to a raised ledge along the street-side windows", caption: "Entry & windows" },
  { src: sideRoom, alt: "A separate side room before the remodel with grey-green walls, carpet and an open doorway to the main floor", caption: "The side room" },
  { src: streetWindows, alt: "Big street-facing windows above a long raised ledge, letting daylight into the open floor", caption: "Street-side windows" },
];

/*
 * "What's coming" (owner, 25 Nov 2026). Confirmed: fresh paint, rubber flooring. Equipment from the owner's
 * New London Equipment Plan (not final — e.g. the G7 circuit is no longer coming), so the page uses rounded
 * "around" figures and categories, never promises a specific machine. Turf is planned after opening, not day one.
 * Counted from the plan (New London rows only, excluding undecided + G7): ~100 strength pieces, 19 cardio, 20+ brands.
 */
const remodelStats = [
  { v: "~100", l: "Strength machines" },
  { v: "~20", l: "Cardio machines" },
  { v: "20+", l: "Equipment brands" },
  { v: "24/7", l: "Key-fob access" },
];

const remodel: { t: string; b: string; tag?: string }[] = [
  { t: "Fresh paint", b: "New colors on every wall, top to bottom.", tag: "Confirmed" },
  { t: "Rubber flooring", b: "Gym-grade rubber across the training floor.", tag: "Confirmed" },
  { t: "Leg day, loaded", b: "Hack squats, a pendulum squat, specialty squat machines, leg presses, plus rows of leg curls and calf raises." },
  { t: "Push & pull", b: "Plate-loaded and selectorized chest presses, rows, pulldowns and shoulder presses from Hammer Strength, Nautilus, Cybex, Magnum and more." },
  { t: "Free weights", b: "Power racks, half racks, a Smith machine, brand-new dumbbell racks, plenty of benches and rubber bumper plates." },
  { t: "Cardio", b: "Treadmills, ellipticals, ClimbMills and bikes — about 20 cardio machines." },
  { t: "Old-school classics", b: "A few rare, vintage machines you won't find at a big-box gym." },
  { t: "Turf", b: "A turf area for sleds, carries and conditioning is planned after opening.", tag: "After opening" },
];

/* Three member reviews already used on the site (lib/data/content.ts). Wautoma's is shown in full. */
const reviews = [
  testimonials[0],
  { quote: "I have been working out at Grizzly Fitness for over a year now. Absolutely love it! My wife also enjoys the silver sneakers class in the mornings. This is a great place to be able to go to stay in shape. Just what Wautoma needed!", name: "Clarence Lont", context: "Wautoma" },
  testimonials[2],
];

const tierCopy: Record<string, { tier: string; tag: string; bar: string; bullets: string[] }> = {
  year: { tier: "Tier 01", tag: "Best value", bar: "100%", bullets: ["Paid in full · 12 months", "That's $1 a day", "24/7 key-fob access"] },
  six: { tier: "Tier 02", tag: "6-month", bar: "60%", bullets: ["Paid in full · 6 months", "One payment, done", "24/7 key-fob access"] },
  biweekly: { tier: "Tier 03", tag: "Bi-weekly", bar: "35%", bullets: ["Every 2 weeks, first year", "Then $20 bi-weekly", "24/7 key-fob access"] },
};

export default function NewLondonPage() {
  const phone = site.phone.value;
  const f = newLondon.founders;
  const claimOpen = f.phase === "open" && !!f.href;
  const closed = f.phase === "closed";
  const ticker = closed
    ? ["Coming soon", "New London", "24/7 key-fob access", "210 Wisconsin St"]
    : ["/// Founders list open", "$1 a day for a year", "/// Around 100 strength machines", "24/7 key-fob access", `Presale · list only · ${f.presaleDate}`, "/// 210 Wisconsin St"];
  const tierCta = claimOpen ? "Claim founders pricing" : "Get first access";
  const tierHref = claimOpen ? f.href : to("#founders");

  return (
    <PageShell crumbs={crumbs}>
      <div className={`nl ${orb.variable} ${mono.variable}`}>
        {/* HERO */}
        <section aria-labelledby="page-title" className="nl-hero">
          <div className="nl-wrap">
            <nav aria-label="Breadcrumb" className="nl-mono" style={{ marginBottom: 14 }}>
              <ol className="flex flex-wrap items-center gap-2">
                <li><a href={to("/")} className="hover:text-white">Home</a></li>
                <li aria-hidden>/</li>
                <li><a href={to("/locations")} className="hover:text-white">Locations</a></li>
                <li aria-hidden>/</li>
                <li aria-current="page" style={{ color: "var(--nl-txt)" }}>New London</li>
              </ol>
            </nav>
            <div className="nl-frame">
              <div className="nl-img">
                <Image src={hero} alt="The open main floor at 210 Wisconsin St. in New London before the remodel, with two dark support columns and a long back wall" fill preload fetchPriority="high" sizes="(min-width:1400px) 1360px, 100vw" quality={78} placeholder="blur" />
              </div>
              <i aria-hidden className="nl-br tl" />
              <i aria-hidden className="nl-br tr" />
              <i aria-hidden className="nl-br bl" />
              <i aria-hidden className="nl-br brr" />
              <span className="nl-mono nl-mock"><i aria-hidden className="nl-dot" />Real photo · Before the remodel</span>
              <div className="nl-hcopy">
                <p className="nl-mono nl-tag"><i aria-hidden className="nl-dot" />Location 06 · {closed ? "Coming soon" : "Founders list open"}</p>
                <h1 id="page-title" className="nl-orb nl-h1">
                  New<span>London</span>
                </h1>
                <p className="nl-sub">
                  A new 24/7 Grizzly Fitness is coming to {newLondon.address.street} in New London.{" "}
                  We&rsquo;re remodeling this space top to bottom to make it the best it can be.{" "}
                  {closed ? "Get on the list for opening-day news." : "Founders get our lowest rates, and the founders list gets in first."}
                </p>
                <div className="nl-cta">
                  <a className="nl-btn" href={to("#founders")}>{closed ? "Get opening updates ▸" : "Join the founders list ▸"}</a>
                  {!closed && <a className="nl-btn ghost" href={to("#pricing")}>See founders pricing</a>}
                </div>
              </div>
              <div className="nl-readout nl-mono">
                {!closed && (
                  <>
                    <div className="nl-row"><span>Presale unlocks</span><span className="v">{f.presaleDate}</span></div>
                    <Countdown to={f.presaleAt} />
                  </>
                )}
                <div className="nl-row"><span>Address</span><span className="v">{newLondon.address.street}</span></div>
                <div className="nl-row"><span>Access</span><span className="v">24/7 key fob</span></div>
                <div className="nl-row"><span>Status</span><span className="v" style={{ color: "var(--nl-red)" }}>Remodel underway</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* TICKER */}
        <div aria-hidden className="nl-ticker">
          <div className="nl-ticker-track">
            {[0, 1].map((r) => (
              <div key={r}>{[...ticker, ...ticker].map((w, i) => <span key={`${r}-${i}`}>{w}</span>)}</div>
            ))}
          </div>
        </div>

        {/* PRICING */}
        {!closed && (
          <section id="pricing" aria-labelledby="pricing-title" className="nl-wrap nl-sec">
            <div className="nl-sh">
              <div>
                <p className="nl-mono">{"// 01 — Access tiers"}</p>
                <h2 id="pricing-title" className="nl-orb nl-h2">Founders<br />pricing</h2>
              </div>
              <p className="nl-mono">
                {f.phase === "early" ? "Presale is open to the founders list. " : f.phase === "open" ? "Founders memberships are open. " : `Presale opens to the founders list ${f.presaleDate}. `}
                Every plan + {f.signupFee} sign-up. {f.deadline}.
              </p>
            </div>
            <ul className="nl-tiers">
              {f.offers.map((o) => {
                const c = tierCopy[o.id];
                const hot = !!o.badge;
                return (
                  <li key={o.id} className={`nl-tier ${hot ? "hot" : ""}`}>
                    <div className="id nl-mono">
                      <span>{c.tier}</span>
                      <span style={hot ? { color: "var(--nl-red)" } : undefined}>{hot && <i aria-hidden className="nl-dot" />}{c.tag}</span>
                    </div>
                    <h3>{o.name}</h3>
                    <p className="nl-orb nl-price">
                      {o.price}
                      {o.was && (<s><span className="sr-only">Regular price </span>{o.was}</s>)}
                    </p>
                    <div aria-hidden className="nl-bar"><i style={{ width: c.bar }} /></div>
                    <ul>{c.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                    <p className="nl-mono nl-fee">+ {f.signupFee} sign-up fee</p>
                    <a className={`nl-btn ${hot ? "" : "ghost"}`} href={tierHref} {...(claimOpen ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                      {tierCta}
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {/* DAY 0 — real photos */}
        <section aria-labelledby="space-title" className="nl-wrap nl-sec">
          <div className="nl-sh">
            <div>
              <p className="nl-mono">{"// 02 — Day 0"}</p>
              <h2 id="space-title" className="nl-orb nl-h2">The space.<br />Today.</h2>
            </div>
            <p className="nl-mono">
              <strong style={{ color: "var(--nl-txt)" }}>Real photos, no renders.</strong> This is 210 Wisconsin St. before we touch it: big, bright and wide open. Watch it turn into a gym.
            </p>
          </div>
          <ul className="nl-gal">
            {gallery.map((g, i) => (
              <li key={g.caption} className="nl-g" style={g.wide ? { gridColumn: "1 / -1" } : undefined}>
                <Image src={g.src} alt={g.alt} fill sizes={i === 0 ? "(min-width:900px) 50vw, 100vw" : "(min-width:900px) 25vw, 50vw"} quality={72} placeholder="blur" />
                <span className="nl-mono lab"><i aria-hidden className="nl-dot" />Real photo</span>
                <span className="nl-mono cap">{g.caption}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* THE REMODEL */}
        <section aria-labelledby="remodel-title" className="nl-wrap nl-sec">
          <div className="nl-sh">
            <div>
              <p className="nl-mono">{"// 03 — The remodel"}</p>
              <h2 id="remodel-title" className="nl-orb nl-h2">What&rsquo;s<br />coming</h2>
            </div>
            <p className="nl-mono">We&rsquo;re putting serious work into this building so it&rsquo;s the best it can be the day the doors open.</p>
          </div>
          <dl className="nl-stats nl-stats-row">
            {remodelStats.map((x) => (
              <div key={x.l}><dt className="nl-mono">{x.l}</dt><dd className="nl-orb">{x.v}</dd></div>
            ))}
          </dl>
          <ul className="nl-feat">
            {remodel.map((r, i) => (
              <li key={r.t}>
                <span className="nl-mono">
                  {String(i + 1).padStart(2, "0")}
                  {r.tag && <b className={`nl-chip ${r.tag === "Confirmed" ? "ok" : ""}`}>{r.tag}</b>}
                </span>
                <h3 className="nl-orb">{r.t}</h3>
                <p>{r.b}</p>
              </li>
            ))}
          </ul>
          <p className="nl-mono" style={{ marginTop: 16, textTransform: "none", letterSpacing: "0.02em" }}>
            The equipment list is still being finalized, so exact machines and counts may change before we open.
          </p>
        </section>

        {/* WHO WE ARE */}
        <section aria-labelledby="story-title" className="nl-wrap nl-sec">
          <div className="nl-story">
            <div>
              <p className="nl-mono">{"// 04 — Who we are"}</p>
              <h2 id="story-title" className="nl-orb nl-h2">Built in<br />small towns</h2>
              <p className="nl-sub">
                Grizzly Fitness started in 2017 as a small personal gym in Princeton, Wisconsin: about 400 square feet and a handful of equipment. Today we run five 24/7 gyms in Princeton, Berlin, Wautoma, Omro and Rosendale, built for the small towns the big chains overlook.
              </p>
              <p className="nl-sub">
                Old-school feel. A welcome for first-timers and serious lifters alike. New London is next.
              </p>
              <p className="nl-mono nl-tagline">&ldquo;We operate in small towns, but Grizzly Fitness is for Big Dreamers.&rdquo;</p>
            </div>
            <dl className="nl-stats">
              <div><dt className="nl-mono">Gyms</dt><dd className="nl-orb">5</dd></div>
              <div><dt className="nl-mono">Since</dt><dd className="nl-orb">2017</dd></div>
              <div><dt className="nl-mono">On Google, {networkRating.count} reviews</dt><dd className="nl-orb">{networkRating.rating.toFixed(1)}&#9733;</dd></div>
              <div><dt className="nl-mono">Access</dt><dd className="nl-orb">24/7</dd></div>
            </dl>
          </div>
        </section>

        {/* REVIEWS */}
        <section aria-labelledby="reviews-title" className="nl-wrap nl-sec">
          <div className="nl-sh">
            <div>
              <p className="nl-mono">{"// 05 — Member reviews"}</p>
              <h2 id="reviews-title" className="nl-orb nl-h2">Don&rsquo;t take<br />our word for it</h2>
            </div>
            <p className="nl-mono">{networkRating.rating.toFixed(1)}&#9733; on Google from {networkRating.count} reviews across our five gyms.</p>
          </div>
          <ul className="nl-reviews">
            {reviews.map((r) => (
              <li key={r.name}>
                <figure>
                  <p aria-hidden className="nl-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</p>
                  <blockquote>&ldquo;{r.quote}&rdquo;</blockquote>
                  <figcaption className="nl-mono">{r.name} · {r.context === "Member" ? "Grizzly member" : `Grizzly ${r.context}`}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>

        {/* FOUNDERS LIST */}
        <section id="founders" aria-labelledby="founders-title" className="nl-wrap">
          <div className="nl-enlist">
            <div>
              <p className="nl-mono">{"// 06 — Enlist"}</p>
              <h2 id="founders-title" className="nl-orb nl-h2">{closed ? <>Get opening<br />updates</> : <>Join the<br />founders list</>}</h2>
              {claimOpen && (
                <div style={{ marginTop: 22 }}>
                  <a className="nl-btn" href={f.href} target="_blank" rel="noopener noreferrer">Claim your founders membership ▸</a>
                  <p className="nl-mono" style={{ marginTop: 14 }}>Not ready yet? Join the list for opening-day updates.</p>
                </div>
              )}
              {!closed && !claimOpen && (
                <div className="nl-steps" style={{ marginTop: 24 }}>
                  <div><b>01</b><span>Enter your info. 30 seconds, no payment, no commitment.</span></div>
                  <div><b>02</b><span>{f.phase === "early" ? "We text you the presale link right away." : `${f.presaleDate}, we text you the presale link — before it goes public.`}</span></div>
                  <div><b>03</b><span>Lock in your founders rate. {f.deadline}.</span></div>
                </div>
              )}
              {closed && <p className="nl-sub">Founders pricing has ended. Leave your name, phone and email for opening-day news.</p>}
            </div>
            <div className="nl-term">
              <p className="nl-mono nl-term-head">&gt; founders_list.enlist()<span aria-hidden className="nl-cursor" /></p>
              <GhlEmbed
                embed={ghl.newLondonForm}
                fallback={
                  <div style={{ padding: 20 }}>
                    <p className="nl-sub" style={{ marginTop: 0 }}>Call or text us and we&rsquo;ll add you to the New London founders list.</p>
                    <div className="nl-cta">
                      <a className="nl-btn" href={to(`sms:${phone.tel}`)}>Text {phone.display}</a>
                      <a className="nl-btn ghost" href={to(`tel:${phone.tel}`)}>Call</a>
                    </div>
                  </div>
                }
              />
              <p className="nl-mono" style={{ padding: "12px 4px 0", textTransform: "none", letterSpacing: "0.02em" }}>
                How we handle your details: <a href={to("/privacy")} className="underline underline-offset-2 hover:text-white">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </section>

        {/* MORE */}
        <div className="nl-wrap nl-more">
          <div>
            <p className="nl-orb" style={{ fontSize: 28 }}>Can&rsquo;t wait?</p>
            <p className="nl-mono" style={{ marginTop: 8 }}>Train now at Princeton, Berlin, Wautoma, Omro or Rosendale.</p>
          </div>
          <div className="nl-cta" style={{ marginTop: 0 }}>
            <a className="nl-btn ghost" href={to("/locations")}>See our gyms ▸</a>
            <a className="nl-btn ghost" href={newLondon.facebook} target="_blank" rel="noopener noreferrer">New London on Facebook<span className="sr-only"> (opens in a new tab)</span></a>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

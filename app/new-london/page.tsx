import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import localFont from "next/font/local";
import { withShare } from "@/lib/seo";
import PageShell from "@/components/page/PageShell";
import GhlEmbed from "@/components/page/GhlEmbed";
import Countdown from "@/components/newlondon/Countdown";
import { ghl, newLondon, site } from "@/lib/data/site";
import { to } from "@/lib/paths";
import "./nl.css";

import rackRow from "@/public/media/new-london/nl-rack-row.jpg";
import mainFloor from "@/public/media/new-london/nl-main-floor.jpg";
import cardio from "@/public/media/new-london/nl-cardio-windows.jpg";
import cables from "@/public/media/new-london/nl-cable-crossover.jpg";
import turfDumbbells from "@/public/media/new-london/nl-turf-dumbbells.jpg";
import lobby from "@/public/media/new-london/nl-lobby-shop.jpg";
import cubbies from "@/public/media/new-london/nl-cubbies-lounge.jpg";

/**
 * /new-london — Grizzly Fitness New London, coming soon. "Mission Control" design (owner pick, 24 Nov 2026):
 * intentionally unlike the rest of the site. Styles live in ./nl.css, scoped under .nl. Two extra self-hosted
 * fonts (SIL OFL) are loaded on this page only: Orbitron 900 (headlines) and JetBrains Mono 500 (UI labels).
 *
 * PHOTOS: every image is an owner-supplied concept mockup, NOT a photo of the gym — labelled on the page and on
 * every image. Owner-approved exception to the no-AI/stock rule, for this page only. Swap for real photos later.
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
  { src: mainFloor, alt: "Concept mockup of a main floor with rows of treadmills along the windows and strength machines and racks across a dark rubber floor", caption: "Main floor" },
  { src: cardio, alt: "Concept mockup of a row of treadmills and stair climbers facing big windows, with the front desk on the left", caption: "Cardio" },
  { src: cables, alt: "Concept mockup of two cable crossover stations in front of mirrored dumbbell racks and benches", caption: "Cables & dumbbells" },
  { src: turfDumbbells, alt: "Concept mockup of a turf lane with a sled beside a dumbbell area and a functional trainer", caption: "Turf & functional" },
  { src: lobby, alt: "Concept mockup of a lobby with wood-trimmed entry doors, a lit front desk and an apparel display", caption: "Lobby" },
  { src: cubbies, alt: "Concept mockup of a lounge with cubbies, coat hooks, benches and leather chairs against a dark wall", caption: "Cubbies & lounge", wide: true },
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
    : ["/// Founders list open", "$1 a day for a year", "/// 24/7 key-fob access", `Presale · list only · ${f.presaleDate}`, "/// 210 Wisconsin St"];
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
                <Image src={rackRow} alt="Concept mockup of a row of black squat racks and benches in front of lit mirrors" fill preload fetchPriority="high" sizes="(min-width:1400px) 1360px, 100vw" quality={78} placeholder="blur" />
              </div>
              <i aria-hidden className="nl-br tl" />
              <i aria-hidden className="nl-br tr" />
              <i aria-hidden className="nl-br bl" />
              <i aria-hidden className="nl-br brr" />
              <span className="nl-mono nl-mock"><i aria-hidden className="nl-dot" />Concept mockup</span>
              <div className="nl-hcopy">
                <p className="nl-mono nl-tag"><i aria-hidden className="nl-dot" />Location 06 · {closed ? "Coming soon" : "Founders list open"}</p>
                <h1 id="page-title" className="nl-orb nl-h1">
                  New<span>London</span>
                </h1>
                <p className="nl-sub">
                  A new 24/7 Grizzly Fitness is coming to {newLondon.address.street} in New London.{" "}
                  {closed ? "Get on the list for opening-day news." : "Founders get our lowest rates — and the founders list gets in first."}
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
                <div className="nl-row"><span>Status</span><span className="v" style={{ color: "var(--nl-red)" }}>Build in progress</span></div>
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

        {/* GALLERY */}
        <section aria-labelledby="build-title" className="nl-wrap nl-sec">
          <div className="nl-sh">
            <div>
              <p className="nl-mono">{"// 02 — Facility renders"}</p>
              <h2 id="build-title" className="nl-orb nl-h2">The build</h2>
            </div>
            <p className="nl-mono">
              <strong style={{ color: "var(--nl-txt)" }}>These are mockups, not photos.</strong> Not exact or to scale — equipment and finishes will differ — but this is the idea we&rsquo;re going with. Real photos once the doors open.
            </p>
          </div>
          <ul className="nl-gal">
            {gallery.map((g, i) => (
              <li key={g.caption} className="nl-g" style={g.wide ? { gridColumn: "1 / -1" } : undefined}>
                <Image src={g.src} alt={g.alt} fill sizes={i === 0 ? "(min-width:900px) 50vw, 100vw" : "(min-width:900px) 25vw, 50vw"} quality={72} placeholder="blur" />
                <span className="nl-mono lab"><i aria-hidden className="nl-dot" />Mockup</span>
                <span className="nl-mono cap">{g.caption}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FOUNDERS LIST */}
        <section id="founders" aria-labelledby="founders-title" className="nl-wrap">
          <div className="nl-enlist">
            <div>
              <p className="nl-mono">{"// 03 — Enlist"}</p>
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

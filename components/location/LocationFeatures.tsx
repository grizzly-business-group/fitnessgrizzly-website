import Image from "next/image";
import type { Location } from "@/lib/data/locations";
import type { LocationPage } from "@/lib/data/location-pages";
import { Button, Eyebrow, Unverified } from "@/components/ui/primitives";
import { FramedPhoto } from "./LocationSections";
import { to } from "@/lib/paths";

/* Location-specific feature sections. Each renders only when the gym's data provides it, so a gym
   gets a section because it has something real to show there — never to match another page. */

const lift = (loc: Location) => ({ color: `color-mix(in srgb, ${loc.tint} 62%, #fff)` });

/* ---------- Berlin · Two levels: an editorial walk through the warehouse, zone by zone ---------- */
export function Levels({ loc, page }: { loc: Location; page: LocationPage }) {
  const lv = page.levels;
  if (!lv) return null;
  return (
    <section aria-labelledby="levels-title" className="relative">
      <div className="mx-auto max-w-[1440px] px-[var(--margin)] py-24 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-12" data-loc-reveal>
          <div className="lg:col-span-6">
            <Eyebrow style={lift(loc)}>{lv.eyebrow}</Eyebrow>
            <h2 id="levels-title" className="mt-4 font-display text-[clamp(48px,6vw,96px)] font-extrabold uppercase leading-[0.88]">
              {lv.heading[0]}
              {" "}<br />
              {lv.heading[1]}
            </h2>
          </div>
          <p className="text-[17px] leading-[1.65] text-bone-2 md:text-[19px] lg:col-span-5 lg:col-start-8 lg:self-end">{lv.intro}</p>
        </div>

        <ol className="relative mt-16 space-y-16 lg:mt-24 lg:space-y-24">
          {/* the "building section" line that ties the zones together */}
          <i aria-hidden className="absolute bottom-0 left-[11px] top-0 hidden w-[2px] lg:block" style={{ background: `linear-gradient(${loc.color}, transparent)` }} />
          {lv.zones.map((z, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={z.label} className="relative grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pl-12" data-loc-reveal>
                <i aria-hidden className="absolute left-[4px] top-1/2 hidden h-4 w-4 -translate-y-1/2 rounded-full border-2 border-iron lg:block" style={{ background: loc.tint }} />
                <figure className={`lg:col-span-6 ${flip ? "lg:order-2 lg:col-start-7" : ""}`}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-charcoal md:aspect-[16/11]">
                    <FramedPhoto p={z.photo} sizes="(min-width:1024px) 46vw, 100vw" />
                  </div>
                  <figcaption className="mt-2.5 text-[13px] text-steel">{z.photo.caption}</figcaption>
                </figure>
                <div className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}>
                  <p className="font-display text-[15px] font-extrabold uppercase tracking-[0.14em]" style={lift(loc)}>
                    {String(i + 1).padStart(2, "0")} · {z.label}
                  </p>
                  <h3 className="mt-3 font-display text-[clamp(34px,3.6vw,52px)] font-extrabold uppercase leading-[0.92]">{z.title}</h3>
                  <p className="mt-4 max-w-[480px] text-[17px] leading-[1.6] text-bone-2">{z.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Wautoma · Classes and the two studio rooms ---------- */
export function Classes({ loc, page }: { loc: Location; page: LocationPage }) {
  const c = page.classes;
  if (!c) return null;
  return (
    <section id="classes" aria-labelledby="classes-title" className="relative border-t border-[var(--line)] bg-charcoal">
      <i aria-hidden className="block h-1" style={{ background: loc.color, boxShadow: `inset 0 -1px 0 ${loc.tint}` }} />
      <div className="mx-auto max-w-[1440px] px-[var(--margin)] py-20 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-12" data-loc-reveal>
          <div className="lg:col-span-6">
            <Eyebrow style={lift(loc)}>{c.eyebrow}</Eyebrow>
            <h2 id="classes-title" className="mt-4 font-display text-[clamp(48px,6vw,96px)] font-extrabold uppercase leading-[0.88]">
              {c.heading[0]}
              {" "}<br />
              {c.heading[1]}
            </h2>
          </div>
          <p className="text-[17px] leading-[1.65] text-bone-2 md:text-[19px] lg:col-span-5 lg:col-start-8 lg:self-end">{c.intro}</p>
        </div>

        <ul className="mt-12 grid gap-3 md:grid-cols-2">
          {c.items.map((k) => (
            <li key={k.name} className="relative flex flex-col gap-4 bg-iron p-8 lg:p-10" data-loc-reveal>
              <i aria-hidden className="absolute inset-y-0 left-0 w-1.5" style={{ background: loc.color }} />
              <h3 className="font-display text-[clamp(32px,3.4vw,48px)] font-extrabold uppercase leading-[0.92]">
                {k.name}
                {k.note && <Unverified note={k.note} />}
              </h3>
              <p className="max-w-[520px] text-[18px] leading-[1.55] text-bone">{k.body}</p>
              {k.status && (
                <p className="mt-auto inline-flex self-start border border-[var(--line-strong)] px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-bone-2">{k.status}</p>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-6 grid gap-6 border border-[var(--line-strong)] p-6 md:grid-cols-[1fr_auto] md:items-center lg:p-8" data-loc-reveal>
          <p className="max-w-[720px] text-[16px] leading-[1.6] text-bone-2">{c.timesNote}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            {c.ctas.map((a, i) => (
              <Button key={a.href} href={to(a.href)} variant={i === 0 ? "primary" : "secondary"} size="sm">
                {a.label}
              </Button>
            ))}
          </div>
        </div>

        <h3 className="mt-16 text-[12px] font-bold uppercase tracking-[0.14em] text-steel" data-loc-reveal>Where classes happen</h3>
        <ul className="mt-5 grid gap-6 md:grid-cols-2">
          {c.studios.map((st) => (
            <li key={st.name} data-loc-reveal>
              <figure>
                <div className="relative aspect-[4/3] overflow-hidden bg-iron">
                  <FramedPhoto p={st.photo} sizes="(min-width:768px) 45vw, 100vw" />
                </div>
                <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <span className="font-display text-[28px] font-bold uppercase leading-none text-bone">
                    {st.name}
                    {st.photo.note && <Unverified note={st.photo.note} />}
                  </span>
                  <span className="text-[15px] text-bone-2">
                    {st.address} ·{" "}
                    <a href={to(st.mapsUrl)} target="_blank" rel="noopener noreferrer" className="font-semibold text-lamp underline-offset-4 hover:underline">
                      Map ↗<span className="sr-only"> for the {st.name} (opens Google Maps)</span>
                    </a>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Berlin build-out / Wautoma renovation · the "before" story, from our own galleries ---------- */
export function Archive({ loc, page }: { loc: Location; page: LocationPage }) {
  const a = page.archive;
  if (!a) return null;
  return (
    <section aria-labelledby="archive-title" className="border-t border-[var(--line)]">
      <div className="mx-auto max-w-[1440px] px-[var(--margin)] py-20 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-12" data-loc-reveal>
          <div className="lg:col-span-5">
            <Eyebrow style={lift(loc)}>{a.eyebrow}</Eyebrow>
            <h2 id="archive-title" className="mt-4 font-display text-[clamp(40px,4.4vw,68px)] font-extrabold uppercase leading-[0.9]">
              {a.heading[0]}
              {" "}<br />
              {a.heading[1]}
            </h2>
          </div>
          <p className="text-[16px] leading-[1.65] text-bone-2 md:text-[18px] lg:col-span-6 lg:col-start-7 lg:self-end">{a.body}</p>
        </div>
        <ul className={`mt-10 grid grid-cols-2 gap-2 ${a.photos.length > 4 ? "md:grid-cols-4 lg:grid-cols-7" : "md:grid-cols-4 lg:max-w-[960px]"}`}>
          {a.photos.map((p) => (
            <li key={p.asset} data-loc-reveal>
              <figure>
                <div className="relative aspect-[3/4] overflow-hidden bg-charcoal">
                  <Image src={p.src} alt={p.alt} fill sizes="(min-width:1024px) 22vw, 50vw" placeholder="blur" className="loc-archive object-cover" />
                </div>
                <figcaption className="mt-2 text-[13px] leading-[1.4] text-steel">{p.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import Image from "next/image";
import { joinHref, locations, type Location } from "@/lib/data/locations";
import type { LocationPage, Photo } from "@/lib/data/location-pages";
import { gymHref } from "@/lib/data/location-routes";
import { site } from "@/lib/data/site";
import { Button, Eyebrow, Unverified } from "@/components/ui/primitives";
import { to } from "@/lib/paths";

/* Server-rendered location-page sections. Content comes from lib/data; nothing here is gym-specific
   except through props, so each gym's page differs by its data, photos and colour. */

const addrNote = "Launch blocker #6 — Princeton address conflict (429 W. Water St. vs 101 Mechanic St.)";

/* ---------- 2–4 · Quick facts: hours, access, address, contact ---------- */
export function QuickFacts({ loc }: { loc: Location }) {
  const phone = site.phone.value;
  return (
    <section aria-label={`Grizzly Fitness ${loc.town} at a glance`} className="border-y border-[var(--line)] bg-charcoal" style={{ borderTopColor: loc.color }}>
      <i aria-hidden className="block h-1" style={{ background: loc.color, boxShadow: `inset 0 -1px 0 ${loc.tint}` }} />
      <dl className="mx-auto grid max-w-[1440px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="border-b border-[var(--line)] px-[var(--margin)] py-7 sm:border-r lg:border-b-0">
          <dt className="text-[12px] font-bold uppercase tracking-[0.14em] text-steel">Staffed hours</dt>
          <dd className="mt-2.5 text-[16px] leading-[1.6] text-bone">
            {loc.staffed.lines.map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
          </dd>
        </div>
        <div className="border-b border-[var(--line)] px-[var(--margin)] py-7 lg:border-b-0 lg:border-r">
          <dt className="text-[12px] font-bold uppercase tracking-[0.14em] text-steel">Access</dt>
          <dd className="mt-2.5 text-[16px] leading-[1.6] text-bone">
            24/7 · 365 with your key fob
            <span className="block text-bone-2">Unstaffed? Call and we can unlock the door remotely.</span>
          </dd>
        </div>
        <div className="border-b border-[var(--line)] px-[var(--margin)] py-7 sm:border-b-0 sm:border-r">
          <dt className="text-[12px] font-bold uppercase tracking-[0.14em] text-steel">Address</dt>
          <dd className="mt-2.5 text-[16px] leading-[1.6] text-bone">
            <address className="not-italic">
              {loc.address.street}
              {!loc.address.verified && <Unverified note={addrNote} />}
              <br />
              {loc.address.city} {loc.address.zip}
            </address>
            <a href={to(loc.mapsUrl)} target="_blank" rel="noopener noreferrer" className="mt-1.5 inline-block font-semibold text-lamp underline-offset-4 hover:underline">
              Get directions ↗<span className="sr-only"> to Grizzly Fitness {loc.town} (opens Google Maps)</span>
            </a>
          </dd>
        </div>
        <div className="px-[var(--margin)] py-7">
          <dt className="text-[12px] font-bold uppercase tracking-[0.14em] text-steel">Contact</dt>
          <dd className="mt-2.5 text-[16px] leading-[1.6] text-bone">
            Call/Text{" "}
            <a href={to(`tel:${phone.tel}`)} className="font-semibold hover:text-lamp">{phone.display}</a>

            <br />
            <a href={to(`mailto:${site.email}`)} className="hover:text-lamp">{site.email}</a>
          </dd>
        </div>
      </dl>
    </section>
  );
}

/* ---------- 5 · The space ---------- */
const lift = (loc: Location) => ({ color: `color-mix(in srgb, ${loc.tint} 62%, #fff)` });

/** Photo inside a fixed frame; `zoom` crops in around `position` for detail (macro) compositions. */
export function FramedPhoto({ p, sizes, className = "" }: { p: Photo; sizes: string; className?: string }) {
  return (
    <Image
      src={p.src}
      alt={p.alt}
      fill
      sizes={sizes}
      placeholder="blur"
      className={`loc-photo object-cover ${className}`}
      style={{ objectPosition: p.position, ...(p.zoom ? { transform: `scale(${p.zoom})`, transformOrigin: p.position ?? "50% 50%" } : {}) }}
    />
  );
}

export function Space({ loc, page }: { loc: Location; page: LocationPage }) {
  const space = page.space;
  if (!space) return null;
  const paper = space.surface === "paper";
  const [big, ...rest] = space.photos;
  return (
    <section aria-labelledby="space-title" className={paper ? "bg-paper text-ink" : ""}>
      <div className="mx-auto max-w-[1440px] px-[var(--margin)] py-24 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5" data-loc-reveal>
            <Eyebrow style={paper ? { color: "var(--color-ink-2)" } : lift(loc)}>
              {paper && <i aria-hidden className="mr-2.5 inline-block h-2.5 w-2.5 rounded-full align-[1px]" style={{ background: loc.color }} />}
              {space.eyebrow}
            </Eyebrow>
            <h2 id="space-title" className="mt-4 font-display text-[clamp(44px,5vw,80px)] font-extrabold uppercase leading-[0.9]">
              {space.heading[0]}
              {" "}<br />
              {space.heading[1]}
            </h2>
          </div>
          <div className={`space-y-5 text-[17px] leading-[1.65] md:text-[19px] lg:col-span-6 lg:col-start-7 ${paper ? "text-ink-2" : "text-bone-2"}`} data-loc-reveal>
            {space.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>

        {space.layout === "mosaic" ? (
          /* Omro: tight detail crops of the real equipment */
          <ul className="loc-mosaic mt-14 grid grid-cols-2 gap-2 md:grid-cols-6">
            {space.photos.map((p, i) => (
              <li key={p.asset + i} className={["col-span-2 row-span-2 md:col-span-4", "md:col-span-2", "md:col-span-2", "md:col-span-3", "md:col-span-3"][i] ?? "md:col-span-2"} data-loc-reveal>
                <figure className="h-full">
                  <div className={`relative overflow-hidden bg-charcoal ${i === 0 ? "aspect-[4/3] md:aspect-auto md:h-full md:min-h-[460px]" : "aspect-[4/3]"}`}>
                    <FramedPhoto p={p} sizes={i === 0 ? "(min-width:768px) 66vw, 100vw" : "(min-width:768px) 33vw, 50vw"} />
                  </div>
                  <figcaption className="mt-2 text-[13px] text-steel">{p.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr]">
            <figure className="relative md:row-span-2" data-loc-reveal>
              <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:h-full md:min-h-[520px]">
                <FramedPhoto p={big} sizes="(min-width:1024px) 56vw, (min-width:768px) 50vw, 100vw" />
              </div>
              <figcaption className={`mt-2.5 text-[13px] ${paper ? "text-ink-2" : "text-steel"}`}>{big.caption}</figcaption>
            </figure>
            {rest.map((p) => (
              <figure key={p.asset} data-loc-reveal>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <FramedPhoto p={p} sizes="(min-width:1024px) 40vw, (min-width:768px) 50vw, 100vw" />
                </div>
                <figcaption className={`mt-2.5 text-[13px] ${paper ? "text-ink-2" : "text-steel"}`}>{p.caption}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- 6 · Equipment and amenities ---------- */
export function Equipment({ loc, page }: { loc: Location; page: LocationPage }) {
  const eq = page.equipment;
  const style = eq.style ?? "groups";
  const head = (
    <div className={style === "index" ? "lg:col-span-12" : "lg:col-span-4"} data-loc-reveal>
      <Eyebrow style={lift(loc)}>{eq.eyebrow ?? "Equipment & amenities"}</Eyebrow>
      <h2 id="equip-title" className="mt-4 font-display text-[clamp(40px,4.4vw,68px)] font-extrabold uppercase leading-[0.9]">
        {eq.heading[0]}
        {" "}<br />
        {eq.heading[1]}
      </h2>
      <p className="mt-6 max-w-[420px] text-[15px] leading-[1.6] text-bone-2">{eq.intro}</p>
    </div>
  );
  return (
    <section aria-labelledby="equip-title" className="border-t border-[var(--line)] bg-charcoal">
      <div className="mx-auto max-w-[1440px] px-[var(--margin)] py-20 lg:py-28">
        {style === "index" ? (
          /* Berlin: the page's own feature list, set large and numbered */
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="grid gap-12 lg:col-span-12 lg:grid-cols-12">
              <div className="lg:col-span-4">{head}</div>
              <ol className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
                {eq.groups[0].items.map((it, i) => (
                  <li key={it} className="flex items-baseline gap-4 border-t border-[var(--line-strong)] py-4" data-loc-reveal>
                    <span className="w-7 shrink-0 font-display text-[15px] font-extrabold tracking-[0.1em]" style={{ color: loc.tint }}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-[clamp(22px,2.2vw,30px)] font-bold uppercase leading-[1.05]">{it}</span>
                  </li>
                ))}
              </ol>
            </div>
            {eq.footnote && (
              <p className="border-l-4 pl-5 font-display text-[clamp(26px,3vw,40px)] font-bold uppercase leading-[1.05] lg:col-span-8 lg:col-start-5" style={{ borderColor: loc.color }} data-loc-reveal>
                {eq.footnote}
              </p>
            )}
            {eq.groups.slice(1).map((g) => (
              <div key={g.group} className="lg:col-span-8 lg:col-start-5" data-loc-reveal>
                <h3 className="text-[12px] font-bold uppercase tracking-[0.14em] text-steel">{g.group}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <li key={it} className="border border-[var(--line-strong)] px-3.5 py-2 text-[15px] text-bone">{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : style === "roster" ? (
          /* Omro: a plain roster — area on the left, what's there on the right */
          <div className="grid gap-10 lg:grid-cols-12">
            {head}
            <dl className="lg:col-span-8">
              {eq.groups.map((g) => (
                <div key={g.group} className="grid gap-2 border-t border-[var(--line-strong)] py-5 sm:grid-cols-[180px_1fr] sm:gap-6" data-loc-reveal>
                  <dt className="font-display text-[22px] font-bold uppercase leading-none" style={{ color: `color-mix(in srgb, ${loc.tint} 70%, #fff)` }}>{g.group}</dt>
                  <dd>
                    <ul className="space-y-2 text-[17px] leading-[1.45] text-bone">
                      {g.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-12">
            {head}
            <div className={`grid gap-8 lg:col-span-8 ${eq.groups.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
              {eq.groups.map((g) => (
                <div key={g.group} data-loc-reveal>
                  <h3 className="border-t-2 pt-4 font-display text-[22px] font-bold uppercase tracking-[0.02em]" style={{ borderColor: loc.color }}>
                    {g.group}
                  </h3>
                  <ul className="mt-4 space-y-3 text-[16px] leading-[1.45] text-bone">
                    {g.items.map((it) => (
                      <li key={it} className="flex gap-3">
                        <i aria-hidden className="mt-[9px] h-[2px] w-3 shrink-0" style={{ background: loc.tint }} />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- 7 · Training services at this gym (only services this gym's own page lists) ---------- */
export function Services({ loc, page }: { loc: Location; page: LocationPage }) {
  const { items, heading, intro } = page.services;
  if (!items.length) return null;
  const cols = items.length === 4 ? "md:grid-cols-2 xl:grid-cols-4" : items.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3";
  return (
    <section aria-labelledby="svc-title" className="bg-paper text-ink">
      <div className="mx-auto max-w-[1440px] px-[var(--margin)] py-20 lg:py-28">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between" data-loc-reveal>
          <div>
            <Eyebrow style={{ color: "var(--color-lamp-deep)" }}>Training at {loc.town}</Eyebrow>
            <h2 id="svc-title" className="mt-4 font-display text-[clamp(44px,5vw,80px)] font-extrabold uppercase leading-[0.9]">{heading ?? "Train with us."}</h2>
          </div>
          <p className="max-w-[460px] text-[16px] leading-[1.6] text-ink-2">{intro ?? `Coaching and tools offered at Grizzly Fitness ${loc.town}, on top of 24/7 access to the whole gym.`}</p>
        </div>
        <ul className={`mt-12 grid gap-[2px] border-2 border-paper-2 bg-paper-2 ${cols}`}>
          {items.map((s, i) => (
            <li key={s.id} id={`svc-${s.id}`} className="flex flex-col gap-3.5 bg-paper p-8 lg:p-9" data-loc-reveal>
              <span className="font-display text-[15px] font-extrabold tracking-[0.12em] text-lamp-deep">0{i + 1}</span>
              <h3 className="font-display text-[28px] font-bold uppercase leading-none">{s.title}</h3>
              <p className="text-[17px] leading-[1.55] text-ink-2">
                {s.body}
                {s.note && <Unverified note={s.note} />}
              </p>
              {s.cta && (
                <Button href={to(s.cta.href)} variant="ink" size="sm" className="mt-auto self-start">
                  {s.cta.label}
                </Button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Testimonials (verbatim from this gym's current page) ---------- */
export function Testimonials({ loc, page }: { loc: Location; page: LocationPage }) {
  if (!page.testimonials.length) return null;
  return (
    <section aria-labelledby="say-title" className="mx-auto max-w-[1440px] px-[var(--margin)] py-24 lg:py-28">
      <h2 id="say-title" className="text-[12px] font-semibold uppercase tracking-[0.16em] md:text-[13px]" style={{ color: `color-mix(in srgb, ${loc.tint} 62%, #fff)` }} data-loc-reveal>
        What {loc.town} members say
      </h2>
      <ul className="mt-10 grid gap-10 md:grid-cols-3">
        {page.testimonials.map((t) => (
          <li key={t.name} data-loc-reveal>
            <figure className="border-t-2 pt-6" style={{ borderColor: loc.color }}>
              <span aria-hidden className="font-display text-[56px] leading-[0.6] text-lamp">&ldquo;</span>
              <blockquote className="mt-2 text-[18px] leading-[1.55] text-bone md:text-[20px]">{t.quote}</blockquote>
              <figcaption className="mt-5 text-[13px] font-bold uppercase tracking-[0.14em] text-bone-2">{t.name}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- 9–10 · Membership + contact ---------- */
export function Membership({ loc }: { loc: Location }) {
  const phone = site.phone.value;
  const byAppointment = /appointment/i.test(loc.staffed.label);
  return (
    <section id="join" aria-labelledby="join-title" className="border-t border-[var(--line)] bg-charcoal">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-[var(--margin)] py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-7" data-loc-reveal>
          <Eyebrow>Membership</Eyebrow>
          <h2 id="join-title" className="mt-4 font-display text-[clamp(44px,5vw,80px)] font-extrabold uppercase leading-[0.9]">
            Make {loc.town}
            {" "}<br />
            your home gym.
          </h2>
          <p className="mt-6 max-w-[600px] text-[17px] leading-[1.6] text-bone-2">
            Bi-weekly memberships with full 24/7 access, plus 1-day and 7-day passes. Discounts for students, military and seniors. Prices, passes and terms are shown in our GymMaster sign-up portal.
          </p>
          <ol className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["Join online", `Sign up in GymMaster and choose Grizzly ${loc.town} as your home gym.`],
              ["Get your fob", "We prepare your key fob and email you when it's ready for pickup at your gym."],
              [
                "Pick it up",
                byAppointment
                  ? `${loc.town} is staffed by appointment — we'll set a pickup time with you when your fob is ready.`
                  : `Come in during staffed hours (${loc.staffed.label}). Unstaffed? Call and we'll unlock the door remotely.`,
              ],
            ].map(([t, d], i) => (
              <li key={t} className="border-t border-[var(--line-strong)] pt-4">
                <span className="font-display text-[15px] font-extrabold tracking-[0.12em] text-lamp">0{i + 1}</span>
                <p className="mt-1.5 font-display text-[22px] font-bold uppercase leading-none">{t}</p>
                <p className="mt-2 text-[15px] leading-[1.55] text-bone-2">{d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={to(joinHref(loc))} arrow>
              Join online<span className="sr-only"> at Grizzly Fitness {loc.town}</span>
            </Button>
          </div>
          <p className="mt-6 text-[14px] text-bone-2">
            Insurance fitness programs accepted: {site.insurancePrograms.join(" · ")}.
          </p>
        </div>
        <div role="group" aria-labelledby="contact-title" className="self-start border border-[var(--line-strong)] p-7 lg:col-span-4 lg:col-start-9 lg:p-8" data-loc-reveal>
          <h3 id="contact-title" className="font-display text-[26px] font-bold uppercase leading-none">Questions first?</h3>
          <ul className="mt-6 space-y-4 text-[16px]">
            <li>
              <span className="block text-[12px] font-bold uppercase tracking-[0.14em] text-steel">Call or text</span>
              <a href={to(`tel:${phone.tel}`)} className="font-semibold text-bone hover:text-lamp">{phone.display}</a>

            </li>
            <li>
              <span className="block text-[12px] font-bold uppercase tracking-[0.14em] text-steel">Email</span>
              <a href={to(`mailto:${site.email}`)} className="text-bone hover:text-lamp">{site.email}</a>
            </li>
            <li>
              <span className="block text-[12px] font-bold uppercase tracking-[0.14em] text-steel">Visit</span>
              <span className="text-bone">
                {loc.address.street}
                {!loc.address.verified && <Unverified note={addrNote} />}, {loc.address.city}
              </span>
              <a href={to(loc.mapsUrl)} target="_blank" rel="noopener noreferrer" className="block font-semibold text-lamp underline-offset-4 hover:underline">
                Get directions ↗<span className="sr-only"> to Grizzly Fitness {loc.town} (opens Google Maps)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- The other four gyms ---------- */
export function OtherGyms({ loc }: { loc: Location }) {
  const others = locations.filter((l) => l.slug !== loc.slug);
  return (
    <section aria-labelledby="others-title" className="mx-auto max-w-[1440px] px-[var(--margin)] py-20 lg:py-24">
      <h2 id="others-title" className="text-[12px] font-semibold uppercase tracking-[0.16em] text-lamp md:text-[13px]" data-loc-reveal>
        The other four gyms
      </h2>
      <p className="mt-3 max-w-[620px] text-[15px] text-bone-2" data-loc-reveal>
        Insurance members can train at all five. Every gym is open 24/7 with your key fob.
      </p>
      <ul className="mt-8 grid grid-cols-2 gap-2 lg:grid-cols-4">
        {others.map((o) => (
          <li key={o.slug} data-loc-reveal>
            <a href={to(gymHref(o.slug))} className="group relative block aspect-[4/5] overflow-hidden bg-charcoal focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-bone sm:aspect-[4/3]">
              <Image src={o.showcase.src} alt="" fill sizes="(min-width:1024px) 25vw, 50vw" placeholder="blur" className="object-cover brightness-[.55] transition-[filter,transform] duration-500 group-hover:scale-[1.03] group-hover:brightness-[.75]" style={{ objectPosition: o.showcase.position }} />
              <i aria-hidden className="absolute inset-x-0 top-0 h-1.5" style={{ background: o.color, boxShadow: `inset 0 -1px 0 ${o.tint}` }} />
              <i aria-hidden className="absolute inset-x-0 bottom-0 h-3/4 bg-[linear-gradient(0deg,rgba(14,13,11,.92)_0%,rgba(14,13,11,.55)_45%,rgba(14,13,11,0)_100%)]" />
              <span className="absolute inset-x-4 bottom-4 lg:inset-x-5 lg:bottom-5">
                <span className="block font-display text-[28px] font-extrabold uppercase leading-none lg:text-[34px]">{o.town}</span>
                <span className="mt-1 block text-[13px] text-bone-2">{o.tag}</span>
              </span>
              <span className="sr-only"> — Grizzly Fitness {o.town}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- 11 · Closing CTA ---------- */
export function ClosingCta({ loc, page }: { loc: Location; page: LocationPage }) {
  const phone = site.phone.value;
  const bg = page.closing.photo;
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden py-28 lg:py-36">
      <div data-loc-parallax className="absolute -inset-y-[10%] -inset-x-[5%] -z-10">
        <Image src={bg.src} alt="" fill sizes="100vw" placeholder="blur" className="object-cover [filter:contrast(1.08)_saturate(.75)_brightness(.32)]" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(70%_70%_at_50%_50%,rgba(14,13,11,.15),rgba(14,13,11,.85))]" />
      <div className="mx-auto max-w-[1100px] px-[var(--margin)] text-center" data-loc-reveal>
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-lamp md:text-[13px]">Open 24/7 · 365</p>
        <h2 id="cta-title" className="mt-5 font-display text-[clamp(56px,9vw,140px)] font-extrabold uppercase leading-[0.86]">
          Start in {loc.town}.
          {" "}<br />
          <span className="text-lamp">Get your fob.</span>
        </h2>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={to(joinHref(loc))} arrow>
            Join online<span className="sr-only"> at Grizzly Fitness {loc.town}</span>
          </Button>
          <Button href={to(loc.mapsUrl)} variant="secondary">
            Get directions<span className="sr-only"> to Grizzly Fitness {loc.town}</span>
          </Button>
          <Button href={to(`tel:${phone.tel}`)} variant="secondary">
            Call / text {phone.display}
          </Button>
        </div>
      </div>
    </section>
  );
}

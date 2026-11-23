import Image from "next/image";
import type { CSSProperties } from "react";
import { joinHref, staffedPhrase, type Location } from "@/lib/data/locations";
import type { LocationPage, Photo } from "@/lib/data/location-pages";
import { Button, FobDot, Grain, Unverified } from "@/components/ui/primitives";
import { to } from "@/lib/paths";

/**
 * Location hero — one component, five compositions (page.hero.variant):
 *   fullbleed  · Princeton  — left-weighted type over the full-bleed mural photo
 *   split      · Berlin     — type and scale counters beside a tall portrait frame
 *   wide       · Wautoma    — wide room photo with a classes panel in the first screen
 *   monument   · Omro       — oversized town name over a monochrome equipment photo
 *   storefront · Rosendale  — dark type column beside the bright, untreated storefront photo
 * Shared everywhere: breadcrumb, eyebrow, chips (24/7 · staffed · address), Join + Directions.
 * Entrance is a short CSS reveal (≤1.2 s); address, hours and Join are never held back.
 */

const addrNote = "Launch blocker #6 — Princeton address conflict (429 W. Water St. vs 101 Mechanic St.)";
const lift = (loc: Location) => ({ color: `color-mix(in srgb, ${loc.tint} 62%, #fff)` });

function HeroImage({ photo, sizes, className = "", style }: { photo: Photo; sizes: string; className?: string; style?: CSSProperties }) {
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      preload
      fetchPriority="high"
      sizes={sizes}
      quality={75}
      placeholder="blur"
      className={`loc-hero-photo object-cover ${className}`}
      style={{ objectPosition: photo.position, ...style }}
    />
  );
}

function Breadcrumb({ loc, className = "" }: { loc: Location; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={`hero-halo relative z-10 text-[13px] text-bone-2 ${className}`}>
      <ol className="flex flex-wrap items-center gap-2">
        <li><a href={to("/")} className="hover:text-bone">Home</a></li>
        <li aria-hidden>/</li>
        <li><a href={to("/locations")} className="hover:text-bone">Locations</a></li>
        <li aria-hidden>/</li>
        <li aria-current="page" className="text-bone">{loc.town}</li>
      </ol>
    </nav>
  );
}

function EyebrowLine({ loc, page, className = "" }: { loc: Location; page: LocationPage; className?: string }) {
  return (
    <p className={`loc-in loc-in-1 hero-halo flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] md:text-[13px] ${className}`} style={lift(loc)}>
      <FobDot color={loc.color} size={11} />
      {page.hero.eyebrow} · Grizzly Fitness {loc.town}
    </p>
  );
}

function Chips({ loc, className = "" }: { loc: Location; className?: string }) {
  return (
    <ul className={`loc-in loc-in-3 flex flex-wrap gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] ${className}`}>
      <li className="inline-flex h-[30px] items-center gap-2 border border-lamp px-3 text-lamp"><i aria-hidden className="h-2 w-2 rounded-full bg-lamp" />Open 24/7 · key fob</li>
      <li className="inline-flex h-[30px] items-center border border-[var(--line-strong)] bg-iron/40 px-3 text-bone">{staffedPhrase(loc)}</li>
      <li className="inline-flex h-[30px] items-center border border-[var(--line-strong)] bg-iron/40 px-3 text-bone">
        {loc.address.street}
        {!loc.address.verified && <Unverified note={addrNote} />}
      </li>
    </ul>
  );
}

function Ctas({ loc, className = "" }: { loc: Location; className?: string }) {
  return (
    <div className={className}>
      <div className="loc-in loc-in-4 flex flex-col gap-3 sm:flex-row">
        <Button href={to(joinHref(loc))} arrow>
          Join online<span className="sr-only"> at Grizzly Fitness {loc.town}</span>
        </Button>
        <Button href={to(loc.mapsUrl)} variant="secondary">
          Get directions<span className="sr-only"> to Grizzly Fitness {loc.town}</span>
        </Button>
      </div>
      <p className="loc-in loc-in-4 mt-4 text-[14px] text-bone-2">
        At sign-up, choose <b className="font-semibold text-bone">Grizzly {loc.town}</b> as your home gym.
      </p>
    </div>
  );
}

function Title({ loc, className }: { loc: Location; className: string }) {
  return (
    <h1 id="loc-title" className={`loc-in loc-in-2 font-display font-extrabold uppercase ${className}`}>
      <span className="sr-only">Grizzly Fitness </span>
      {loc.town}
    </h1>
  );
}

export default function LocationHero({ loc, page }: { loc: Location; page: LocationPage }) {
  switch (page.hero.variant) {
    case "split":
      return <SplitHero loc={loc} page={page} />;
    case "wide":
      return <WideHero loc={loc} page={page} />;
    case "monument":
      return <MonumentHero loc={loc} page={page} />;
    case "storefront":
      return <StorefrontHero loc={loc} page={page} />;
    default:
      return <FullbleedHero loc={loc} page={page} />;
  }
}

/* ---------- Princeton ---------- */
function FullbleedHero({ loc, page }: { loc: Location; page: LocationPage }) {
  const { photo, lead } = page.hero;
  return (
    <section aria-labelledby="loc-title" className="loc-hero relative isolate flex min-h-[min(100svh,920px)] items-end overflow-hidden bg-iron pb-14 pt-[calc(var(--header-h)+48px)] lg:pb-20">
      <div data-loc-parallax className="absolute inset-y-0 -left-[4%] -right-[4%] -z-10">
        <HeroImage photo={photo} sizes="108vw" className="loc-hero-grade" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(14,13,11,.92)_0%,rgba(14,13,11,.72)_38%,rgba(14,13,11,.15)_75%),linear-gradient(0deg,rgba(14,13,11,.95)_0%,rgba(14,13,11,0)_45%),linear-gradient(180deg,rgba(14,13,11,.55)_0%,rgba(14,13,11,0)_20%)]" />
      {/* Phones: the type spans the whole photo width, so add an even wash behind it */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[rgba(14,13,11,.4)] md:hidden" />
      <Grain className="-z-10" />
      <div className="mx-auto w-full max-w-[1440px] px-[var(--margin)]">
        <Breadcrumb loc={loc} className="mb-8" />
        <EyebrowLine loc={loc} page={page} />
        <Title loc={loc} className="hero-halo mt-4 text-[clamp(72px,15vw,220px)] leading-[0.82] tracking-[-0.01em]" />
        <p className="hero-halo mt-6 max-w-[640px] text-[17px] leading-[1.55] text-bone md:text-[21px]">{lead}</p>
        <Chips loc={loc} className="mt-7" />
        <Ctas loc={loc} className="mt-8" />
      </div>
    </section>
  );
}

/* ---------- Berlin: scale. Type + counters left, a tall framed portrait right (mobile: photo behind). ---------- */
function SplitHero({ loc, page }: { loc: Location; page: LocationPage }) {
  const { photo, lead, stats = [] } = page.hero;
  return (
    <section aria-labelledby="loc-title" className="loc-hero relative isolate overflow-hidden bg-iron">
      <div aria-hidden className="absolute inset-0 -z-20 hidden bg-[radial-gradient(60%_70%_at_72%_40%,color-mix(in_srgb,var(--loc)_38%,transparent),transparent_70%)] lg:block" />
      <Grain className="-z-10" />
      <div className="mx-auto grid min-h-[min(100svh,960px)] w-full max-w-[1440px] items-end gap-10 px-[var(--margin)] pb-14 pt-[calc(var(--header-h)+48px)] lg:grid-cols-12 lg:items-center lg:pb-16">
        {/* Photo: background on phones/tablets, a framed column on desktop */}
        <div className="absolute inset-0 -z-10 lg:relative lg:inset-auto lg:z-0 lg:order-2 lg:col-span-5 lg:col-start-8 lg:h-[min(76svh,780px)]">
          <div className="absolute inset-0 overflow-hidden lg:border-l-[6px]" style={{ borderColor: loc.color }}>
            <div data-loc-parallax className="absolute -inset-[6%]">
              <HeroImage photo={photo} sizes="(min-width:1024px) 46vw, 110vw" className="loc-hero-grade" />
            </div>
          </div>
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgba(14,13,11,.97)_0%,rgba(14,13,11,.86)_45%,rgba(14,13,11,.62)_100%)] lg:hidden" />
          <p className="absolute bottom-3 right-3 hidden bg-iron/80 px-2.5 py-1 text-[12px] text-bone-2 lg:block">{photo.caption}</p>
        </div>
        <div className="relative lg:order-1 lg:col-span-7">
          <Breadcrumb loc={loc} className="mb-8" />
          <EyebrowLine loc={loc} page={page} />
          <Title loc={loc} className="hero-halo mt-4 text-[clamp(84px,14vw,210px)] leading-[0.82] tracking-[-0.01em]" />
          <p className="hero-halo mt-6 max-w-[600px] text-[17px] leading-[1.55] text-bone md:text-[20px]">{lead}</p>
          {stats.length > 0 && (
            <dl className="loc-in loc-in-3 mt-8 grid max-w-[600px] grid-cols-3 border-y border-[var(--line-strong)]">
              {stats.map((s, i) => (
                <div key={s.label} className={`flex flex-col-reverse py-4 ${i ? "border-l border-[var(--line-strong)] pl-4 md:pl-6" : ""}`}>
                  <dt className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-bone-2 md:text-[12px]">{s.label}</dt>
                  <dd className="font-display text-[clamp(40px,5vw,64px)] font-extrabold leading-none" style={{ color: `color-mix(in srgb, ${loc.tint} 55%, #fff)` }}>
                    {s.value}
                    {s.note && <Unverified note={s.note} />}
                  </dd>
                </div>
              ))}
            </dl>
          )}
          <Chips loc={loc} className="mt-7" />
          <Ctas loc={loc} className="mt-8" />
        </div>
      </div>
    </section>
  );
}

/* ---------- Wautoma: welcoming. Wide room photo, classes panel beside the CTAs. ---------- */
function WideHero({ loc, page }: { loc: Location; page: LocationPage }) {
  const { photo, lead, panel } = page.hero;
  return (
    <section aria-labelledby="loc-title" className="loc-hero relative isolate flex min-h-[min(100svh,940px)] items-end overflow-hidden bg-iron pb-14 pt-[calc(var(--header-h)+48px)] lg:pb-20">
      <div data-loc-parallax className="absolute inset-y-0 -left-[4%] -right-[4%] -z-10">
        <HeroImage photo={photo} sizes="108vw" className="loc-hero-grade" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(14,13,11,.97)_0%,rgba(14,13,11,.8)_38%,rgba(14,13,11,.35)_62%,rgba(14,13,11,.1)_85%),linear-gradient(90deg,rgba(14,13,11,.86)_0%,rgba(14,13,11,.62)_40%,rgba(14,13,11,0)_66%),linear-gradient(180deg,rgba(14,13,11,.6)_0%,rgba(14,13,11,0)_16%)]" />
      {/* Phones/tablets: the type covers most of the photo, so the bright room needs a deeper wash */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(14,13,11,.9)_0%,rgba(14,13,11,.72)_60%,rgba(14,13,11,.35)_100%)] lg:hidden" />
      <Grain className="-z-10" />
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-[var(--margin)] lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Breadcrumb loc={loc} className="mb-8" />
          <EyebrowLine loc={loc} page={page} />
          <Title loc={loc} className="hero-halo mt-4 text-[clamp(68px,12.5vw,196px)] leading-[0.82] tracking-[-0.01em]" />
          <p className="hero-halo mt-6 max-w-[620px] text-[17px] leading-[1.55] text-bone md:text-[20px]">{lead}</p>
          <Chips loc={loc} className="mt-7" />
          <Ctas loc={loc} className="mt-8" />
        </div>
        {panel && (
          <div role="group" aria-labelledby="hero-panel-title" className="loc-in loc-in-4 border-t-4 bg-iron/80 p-6 backdrop-blur-[3px] lg:col-span-4 lg:col-start-9 lg:p-7" style={{ borderColor: loc.color }}>
            <h2 id="hero-panel-title" className="font-display text-[28px] font-bold uppercase leading-none">{panel.title}</h2>
            <ul className="mt-5 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {panel.items.map((it) => (
                <li key={it.name} className="flex items-baseline justify-between gap-4 py-3">
                  <span className="text-[17px] font-semibold text-bone">{it.name}</span>
                  {it.detail && <span className="text-right text-[13px] text-bone-2">{it.detail}</span>}
                </li>
              ))}
            </ul>
            {panel.foot && <p className="mt-4 text-[14px] leading-[1.5] text-bone-2">{panel.foot}</p>}
            <a href={to(panel.href)} className="mt-5 inline-flex min-h-11 items-center font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">
              {panel.label} →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- Omro: the equipment is the identity. Monochrome photo, oversized name, lineage strap. ---------- */
function MonumentHero({ loc, page }: { loc: Location; page: LocationPage }) {
  const { photo, lead, strap } = page.hero;
  return (
    <section aria-labelledby="loc-title" className="loc-hero relative isolate flex min-h-[min(100svh,960px)] items-end overflow-hidden bg-iron pb-14 pt-[calc(var(--header-h)+48px)] lg:pb-16">
      <div data-loc-parallax className="absolute inset-y-0 -left-[4%] -right-[4%] -z-10">
        <HeroImage photo={photo} sizes="108vw" className="loc-hero-grade" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(14,13,11,.97)_0%,rgba(14,13,11,.78)_38%,rgba(14,13,11,.25)_72%,rgba(14,13,11,.5)_100%)]" />
      <Grain className="-z-10" />
      <div className="mx-auto w-full max-w-[1440px] px-[var(--margin)]">
        <Breadcrumb loc={loc} className="mb-8" />
        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <EyebrowLine loc={loc} page={page} />
          {strap && (
            <p className="loc-in loc-in-1 inline-flex h-[30px] items-center px-3 text-[12px] font-bold uppercase tracking-[0.14em] text-bone" style={{ background: loc.color, boxShadow: `inset 0 -2px 0 ${loc.tint}` }}>
              {strap}
            </p>
          )}
        </div>
        <Title loc={loc} className="hero-halo mt-3 text-[clamp(120px,30vw,420px)] leading-[0.78] tracking-[-0.02em]" />
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <p className="hero-halo max-w-[560px] text-[17px] leading-[1.55] text-bone md:text-[20px] lg:col-span-6">{lead}</p>
          <div className="lg:col-span-6 lg:justify-self-end">
            <Chips loc={loc} />
            <Ctas loc={loc} className="mt-6" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Rosendale: bright. Dark type column, untreated storefront photo with a red base rule. ---------- */
function StorefrontHero({ loc, page }: { loc: Location; page: LocationPage }) {
  const { photo, lead } = page.hero;
  return (
    <section aria-labelledby="loc-title" className="loc-hero relative isolate overflow-hidden bg-iron">
      <Grain className="-z-10" />
      <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-[var(--margin)] pb-14 pt-[calc(var(--header-h)+24px)] lg:min-h-[min(100svh,900px)] lg:grid-cols-12 lg:items-center lg:gap-12 lg:pb-16 lg:pt-[calc(var(--header-h)+40px)]">
        <figure className="relative lg:order-2 lg:col-span-7">
          <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
            <div data-loc-parallax className="absolute -inset-[4%]">
              <HeroImage photo={photo} sizes="(min-width:1024px) 56vw, 100vw" className="loc-hero-grade" />
            </div>
          </div>
          <i aria-hidden className="block h-1.5" style={{ background: loc.color, boxShadow: `inset 0 -1px 0 ${loc.tint}` }} />
          <figcaption className="mt-2.5 text-[13px] text-bone-2">{photo.caption}</figcaption>
        </figure>
        <div className="lg:order-1 lg:col-span-5">
          <Breadcrumb loc={loc} className="mb-7" />
          <EyebrowLine loc={loc} page={page} />
          <Title loc={loc} className="mt-4 text-[clamp(64px,8.4vw,124px)] leading-[0.84] tracking-[-0.01em]" />
          <p className="mt-6 max-w-[520px] text-[17px] leading-[1.55] text-bone md:text-[20px]">{lead}</p>
          <Chips loc={loc} className="mt-7" />
          <Ctas loc={loc} className="mt-8" />
        </div>
      </div>
    </section>
  );
}

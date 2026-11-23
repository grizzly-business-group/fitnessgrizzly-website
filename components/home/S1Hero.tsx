import Image from "next/image";
import hero from "@/public/media/princeton/princeton-front-desk-lamps.jpg";
import { locations } from "@/lib/data/locations";
import { links } from "@/lib/data/site";
import { Button, Chip, Grain, FobDot } from "@/components/ui/primitives";
import { gymHref } from "@/lib/data/location-routes";
import { to } from "@/lib/paths";

/**
 * S1 — Cinematic introduction ("Lights On").
 * Server-rendered and complete without JS. The intro is pure CSS (globals.css, M1): a dark gym switching on —
 * the table lamp sputters and warms up, the pendants click on front to back, the room comes up, then the type.
 */
export default function S1Hero() {
  return (
    <section id="top" data-scene="hero" className="relative isolate h-[100svh] min-h-[640px] max-h-[1080px] overflow-hidden bg-iron">
      <div data-hero-photo className="absolute inset-0 -z-10">
        <Image
          src={hero}
          alt="The front desk, table lamps and historic painted mural inside Grizzly Fitness Princeton"
          fill
          preload
          fetchPriority="high"
          sizes="100vw"
          placeholder="blur"
          quality={75}
          className="hero-img object-cover [filter:contrast(1.12)_saturate(.9)_brightness(.8)]"
        />
      </div>
      {/* Lamplight-preserving shade: bright centre-left, iron at the edges and base */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 55% at 32% 40%, rgba(14,13,11,0) 0%, rgba(14,13,11,.35) 55%, rgba(14,13,11,.9) 100%), linear-gradient(180deg, rgba(14,13,11,.5) 0%, rgba(14,13,11,0) 22%, rgba(14,13,11,0) 50%, rgba(14,13,11,.96) 100%)",
        }}
      />
      <Grain className="-z-10" />
      <div data-hero-dark aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-iron opacity-0" />
      {/* Intro only ("Lights On"): copies of the same photo, each masked to one light source, so each light
          can switch on by itself while the room is still dark. Hidden unless the intro is playing. */}
      <div data-hero-lights aria-hidden className="hero-lights pointer-events-none absolute inset-0 -z-10">
        {(["lamp", "p1", "p2", "back"] as const).map((k) => (
          <div key={k} data-light={k} className={`lit lit-${k} absolute inset-0`}>
            <Image src={hero} alt="" fill loading="eager" sizes="100vw" quality={75} className="hero-img object-cover [filter:contrast(1.12)_saturate(.9)_brightness(.8)]" />
            <i className="lit-glow absolute inset-0" />
          </div>
        ))}
      </div>

      <div className="absolute inset-x-[var(--margin)] bottom-[96px] md:bottom-[124px] lg:bottom-[118px]">
        <p data-hero-fade style={{ ["--d" as string]: "2.4s" }} className="hero-halo text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.16em] text-lamp">
          Grizzly Fitness · Five gyms in small-town Wisconsin
        </p>
        <h1 className="hero-halo mt-4 font-display font-extrabold uppercase leading-[0.84] tracking-[-0.005em] text-[clamp(60px,min(12.5vw,17svh),196px)]">
          <span className="block overflow-hidden pb-[0.04em]">
            <span data-hero-line className="block">Small towns.</span>
          </span>
          <span className="block overflow-hidden pb-[0.04em]">
            <span data-hero-line data-hero-line-2 className="block text-lamp">Big dreamers.</span>
          </span>
        </h1>
        <p data-hero-fade data-hero-lead className="hero-halo mt-6 max-w-[620px] text-[17px] md:text-[21px] leading-[1.55] text-bone">
          Five community-first gyms in Princeton, Berlin, Wautoma, Omro and Rosendale. Old-school equipment, coaching when you want it, and a key fob that works 24/7.
        </p>
        <div data-hero-cta className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={to(links.join.href)} arrow>
            Join now
          </Button>
          <Button href={to("#gyms")} variant="secondary">
            Find your gym
          </Button>
        </div>
      </div>

      {/* Town bar */}
      <nav data-hero-fade style={{ ["--d" as string]: "2.95s" }} aria-label="Our five gyms" className="absolute inset-x-0 bottom-0 hidden h-[86px] grid-cols-[repeat(5,1fr)_1.2fr] border-t border-[var(--line)] bg-iron/70 backdrop-blur-sm lg:grid">
        {locations.map((l) => (
          <a key={l.slug} href={to(gymHref(l.slug))} className="group flex flex-col justify-center border-r border-[var(--line)] px-6 xl:px-7 hover:bg-bone/5">
            <span className="flex items-center gap-2 font-display text-[26px] font-extrabold uppercase leading-none tracking-[0.02em]">
              <FobDot color={l.color} size={12} className="transition-transform duration-200 group-hover:scale-125" />
              {l.town}
            </span>
            <span className="mt-1.5 text-[12px] text-steel">{l.tag}</span>
          </a>
        ))}
        <div className="flex flex-col items-start justify-center gap-1.5 px-6">
          <Chip tone="lamp" dot="">Open 24/7 · 365</Chip>
          <span className="text-[12px] text-steel">Key fob access at every gym</span>
        </div>
      </nav>
      <div data-hero-fade className="absolute inset-x-[var(--margin)] bottom-6 flex items-center justify-between lg:hidden">
        <Chip tone="lamp" dot="">Open 24/7 · 365</Chip>
      </div>

      {/* Scroll indicator */}
      <a href={to("#statement")} data-hero-fade style={{ ["--d" as string]: "3.1s" }} aria-label="Scroll to learn more" className="absolute bottom-[120px] right-[var(--margin)] hidden flex-col items-center gap-3 md:bottom-[150px] md:flex">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-bone-2 [writing-mode:vertical-rl]">Scroll</span>
        <span className="relative block h-14 w-[2px] overflow-hidden bg-bone/20">
          <span className="scroll-cue absolute inset-x-0 top-0 h-5 bg-lamp" />
        </span>
      </a>
    </section>
  );
}

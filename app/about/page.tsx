import type { Metadata } from "next";
import { withShare } from "@/lib/seo";
import Image from "next/image";
import PageShell from "@/components/page/PageShell";
import { Ext } from "@/components/page/Blocks";
import { Button, Eyebrow, FobDot, Grain } from "@/components/ui/primitives";
import GymIndex from "@/components/about/GymIndex";
import TimelineProgress from "@/components/about/TimelineProgress";
import { locations, staffedPhrase } from "@/lib/data/locations";
import { locationPages } from "@/lib/data/location-pages";
import { about } from "@/lib/data/site-pages/about";
import { model, timeline, welcome } from "@/lib/data/site-pages/history";
import { serviceWhere } from "@/lib/data/site-pages/training";
import { links } from "@/lib/data/site";
import wBoxed from "@/public/media/wautoma/wautoma-2021-boxed-equipment.jpg";
import wCardioArrives from "@/public/media/wautoma/wautoma-2021-cardio-arrives.jpg";
import bForklift from "@/public/media/berlin/berlin-buildout-forklift.jpg";
import bBefore from "@/public/media/berlin/berlin-warehouse-before.jpg";
import bTurf from "@/public/media/berlin/berlin-turf-flags.jpg";
import wFloor from "@/public/media/wautoma/wautoma-main-floor.jpg";
import oLegs from "@/public/media/omro/omro-plate-loaded-legs.jpg";
import rStore from "@/public/media/rosendale/rosendale-storefront-racks.jpg";
import pRack from "@/public/media/princeton/princeton-rack-room.jpg";
import bPlate from "@/public/media/berlin/berlin-plate-loaded-cluster.jpg";
import pMural from "@/public/media/princeton/princeton-mural-machines.jpg";
// Owner's own archive (Downloads, 26 Oct 2026). Dates are the photos' camera dates; EXIF (incl. location) stripped.
import ogRoom from "@/public/media/history/princeton-2017-original-room.jpg";
import ogTraining from "@/public/media/history/princeton-2017-original-training.jpg";
import ogPlatform from "@/public/media/history/princeton-2017-original-platform.jpg";
import ogMoving from "@/public/media/history/princeton-2017-original-moving-equipment.jpg";
import p2Flags from "@/public/media/history/princeton-2020-second-flags.jpg";
import p3Floor from "@/public/media/history/princeton-2022-third-floor.jpg";
import bEmpty from "@/public/media/history/berlin-2021-01-empty-floor.jpg";
import wExterior from "@/public/media/history/wautoma-2021-05-exterior.jpg";
import { to } from "@/lib/paths";

/**
 * About — "Small towns. Big dreamers." (Phase 5 centrepiece). A documentary-style company story told in
 * eight short chapters. All history comes from lib/data/site-pages/history.ts, where every statement carries
 * its source (owner history / Wix / Phase 1 / creative interpretation) — see the Phase 5 fact register.
 * No current-facility photo is presented as archival: the 2017 chapters are typographic; the only dated
 * photos are the Berlin build-out and Wautoma 2021 renovation sets from the gyms' own galleries.
 * Motion: the shared light reveals (LocationMotion), a scroll-progress timeline line, scaled floor-plan
 * squares and a few image reveals. No pinning, no scroll hijacking, everything static under reduced motion.
 */
export const metadata: Metadata = withShare({
  title: { absolute: "Our Story | Grizzly Fitness — Small Towns. Big Dreamers." },
  description:
    "How Grizzly Fitness grew from a roughly 400-square-foot training studio in Princeton, Wisconsin in 2017 into five 24/7 gyms across Central Wisconsin: Princeton, Berlin, Wautoma, Omro and Rosendale.",
  alternates: { canonical: "/about" },
});

const crumbs = [{ name: "About", path: "/about" }];
const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.fitnessgrizzly.com/#organization",
  name: "Grizzly Fitness",
  url: "https://www.fitnessgrizzly.com",
  slogan: "Small towns. Big dreamers.",
  foundingDate: "2017",
  foundingLocation: { "@type": "Place", name: "Princeton, Wisconsin" },
  founder: { "@type": "Person", name: "Colton Burt" },
};

const gyms = locations.map((l) => {
  const hero = locationPages[l.slug]?.hero.photo ?? { ...l.showcase, position: l.showcase.position };
  return {
    slug: l.slug,
    town: l.town,
    tag: l.tag,
    summary: l.summary,
    staffed: `${staffedPhrase(l)} · open 24/7 with your key fob`,
    color: l.color,
    tint: l.tint,
    href: `/locations/${l.slug}`,
    photo: { src: hero.src, alt: hero.alt, position: hero.position },
  };
});

const town = (slug: string) => locations.find((l) => l.slug === slug)?.town ?? slug;

function ChapterMark({ n, label, tone = "dark" }: { n: string; label: string; tone?: "dark" | "paper" }) {
  return (
    <p className={`flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.18em] md:text-[13px] ${tone === "paper" ? "text-lamp-deep" : "text-lamp"}`}>
      <span className="font-display text-[15px] font-extrabold tracking-[0.12em]">{n}</span>
      <i aria-hidden className={`h-px w-10 ${tone === "paper" ? "bg-ink/30" : "bg-bone/30"}`} />
      {label}
    </p>
  );
}

function Fig({ src, alt, cap, aspect = "aspect-[3/4]", archival, sizes, className = "" }: { src: import("next/image").StaticImageData; alt: string; cap: string; aspect?: string; archival?: boolean; sizes: string; className?: string }) {
  return (
    <figure className={className} data-loc-reveal>
      <div className={`about-reveal relative ${aspect} overflow-hidden bg-iron`}>
        <Image src={src} alt={alt} fill sizes={sizes} placeholder="blur" className={`object-cover ${archival ? "loc-archive" : ""}`} />
      </div>
      <figcaption className="mt-2.5 text-[13px] text-steel">{cap}</figcaption>
    </figure>
  );
}

export default function AboutPage() {
  return (
    <PageShell crumbs={crumbs} extraLd={[orgLd]} className="about-page">
      {/* ── Opening: where it all began ─────────────────────────────────── */}
      <section aria-labelledby="page-title" className="loc-hero about-hero relative isolate overflow-hidden bg-iron pb-16 pt-[calc(var(--header-h)+40px)] lg:min-h-[min(92svh,900px)] lg:pb-24">
        <Grain className="-z-10" />
        <div aria-hidden className="about-lamp absolute -z-10" />
        <div aria-hidden data-loc-parallax className="about-year pointer-events-none absolute -z-10 select-none font-display font-black leading-none">
          2017
        </div>
        <div className="mx-auto flex h-full max-w-[1440px] flex-col px-[var(--margin)] lg:min-h-[calc(min(92svh,900px)-var(--header-h)-136px)]">
          <nav aria-label="Breadcrumb" className="hero-halo relative z-10 mb-7 text-[13px] text-bone-2">
            <ol className="flex flex-wrap items-center gap-2">
              <li><a href={to("/")} className="hover:text-bone">Home</a></li>
              <li className="flex items-center gap-2"><span aria-hidden>/</span><span aria-current="page" className="text-bone">About</span></li>
            </ol>
          </nav>
          <p className="loc-in loc-in-1 text-[12px] font-semibold uppercase tracking-[0.18em] text-lamp md:text-[13px]">Our story · Princeton, Wisconsin · 2017 to today</p>
          <h1 id="page-title" className="loc-in loc-in-2 mt-5 max-w-[1120px] font-display text-[clamp(60px,9.6vw,164px)] font-extrabold uppercase leading-[0.84]">
            Every big dream{" "}<br className="hidden sm:block" />
            starts <span className="text-lamp">somewhere.</span>
          </h1>
          <p className="mt-7 max-w-[640px] text-[18px] leading-[1.6] text-bone md:text-[21px]">
            Grizzly Fitness began in 2017 with a small training studio in Princeton, Wisconsin. Nearly a decade later it is five 24/7 gyms across small-town Central Wisconsin. This is how it grew.
          </p>
          <dl className="loc-in loc-in-4 mt-auto grid grid-cols-3 gap-4 border-t border-[var(--line-strong)] pt-6 max-lg:mt-12 sm:max-w-[720px]">
            {[
              ["2017", "Started in Princeton"],
              ["≈400", "Square feet to start"],
              ["5", "Gyms today"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="font-display text-[clamp(36px,4.6vw,64px)] font-extrabold leading-none">{v}</dd>
                <dd aria-hidden className="mt-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-bone-2 md:text-[13px]">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── 01 · 2017: the original 400 square feet ─────────────────────── */}
      <section aria-labelledby="ch1-title" className="border-t border-[var(--line)] bg-charcoal">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-[var(--margin)] py-24 lg:grid-cols-12 lg:gap-12 lg:py-32">
          <div className="lg:col-span-6" data-loc-reveal>
            <ChapterMark n="01" label="2017 · The beginning" />
            <h2 id="ch1-title" className="mt-5 font-display text-[clamp(44px,5.6vw,92px)] font-extrabold uppercase leading-[0.88]">
              It started in{" "}<br />400 square feet.
            </h2>
            <div className="mt-8 max-w-[600px] space-y-5 text-[17px] leading-[1.7] text-bone-2 md:text-[18px]">
              <p>
                <span className="text-bone">The story starts in 2017 with Priority Athlete</span> — a personal training and athletic development business founded by Colton Burt at 18 with around $3,000. It began at 101 Mechanic St. in Princeton, Wisconsin, in a small section of the building — about 400 square feet, with minimal equipment.
              </p>
              <p>The work was helping people get stronger, more athletic and fitter, on a modest budget that left no room for waste: making the most of limited space, equipment and money took resourcefulness and creativity.</p>
              <p>It wouldn&apos;t be the last Princeton address. Over the following years the gym moved more than once — through spaces of about 1,500 and 3,000 square feet — before reaching the gym Princeton members know today.</p>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:self-end" data-loc-reveal>
            <blockquote className="max-w-[600px] border-l-2 border-lamp pl-6">
              <p className="text-[19px] leading-[1.5] text-bone md:text-[22px]">&ldquo;{about.origin.split(". ")[0]}.&rdquo;</p>
              <footer className="mt-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-steel">From our original website</footer>
            </blockquote>
          </div>

        </div>
        <div className="mx-auto max-w-[1440px] px-[var(--margin)] pb-24 lg:pb-32">
          <div className="grid gap-3 md:grid-cols-12">
            <Fig src={ogRoom} alt="The original Princeton gym in 2017: plate-loaded machines, a rack and two people training in a white-walled room with exposed ductwork" cap="Princeton · December 2017" archival aspect="aspect-[4/3]" sizes="(min-width:768px) 50vw, 100vw" className="md:col-span-6" />
            <Fig src={ogTraining} alt="Plate-loaded machines in the original Princeton gym, with apparel on a slatwall behind" cap="Princeton · December 2017" archival aspect="aspect-[4/3]" sizes="(min-width:768px) 25vw, 100vw" className="md:col-span-3 md:mt-16" />
            <Fig src={ogPlatform} alt="A squat rack and lifting platform with blue and wood flooring in the original Princeton gym" cap="Princeton · December 2017" archival aspect="aspect-[4/3]" sizes="(min-width:768px) 25vw, 100vw" className="md:col-span-3" />
          </div>
        </div>
      </section>

      {/* ── 01b · Princeton, four times ──────────────────────────────────── */}
      <section id="princeton-rooms" aria-labelledby="rooms-title" className="bg-iron">
        <div className="mx-auto max-w-[1440px] px-[var(--margin)] py-24 lg:py-32">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end" data-loc-reveal>
            <div className="lg:col-span-7">
              <ChapterMark n="01" label="Princeton, four times" />
              <h2 id="rooms-title" className="mt-5 font-display text-[clamp(44px,5.6vw,92px)] font-extrabold uppercase leading-[0.88]">
                Same town.{" "}<br />Four rooms.
              </h2>
            </div>
            <p className="text-[17px] leading-[1.65] text-bone-2 lg:col-span-5">
              Princeton&apos;s journey wasn&apos;t simply a story of outgrowing one space after another. As property owners made new plans for their buildings, the business found itself having to relocate and start fresh more than once. But each move became another chapter in its story. Through spaces of approximately 1,500 and 3,000 square feet, Grizzly Fitness continued adapting, rebuilding, and moving forward until it found the home Princeton members know today.
            </p>
          </div>
          <ol className="about-rooms mt-14 grid grid-cols-2 gap-x-3 gap-y-8 lg:grid-cols-4">
            {[
              { n: "01", t: "The original", d: "101 Mechanic St.", when: "December 2017", src: ogRoom, alt: "The original Princeton gym in 2017, seen through a doorway", archival: true },
              { n: "02", t: "The second gym", d: "Princeton", when: "September 2020", src: p2Flags, alt: "The second Princeton gym in 2020: white plate-loaded machines under a row of black flags", archival: true },
              { n: "03", t: "The third gym", d: "Princeton", when: "March 2022", src: p3Floor, alt: "The third Princeton gym in 2022: a long open floor of machines and racks under white steel trusses and a wall of international flags", archival: true },
              { n: "04", t: "Today", d: "Grizzly Fitness Princeton", when: "Visit the Princeton gym →", src: pMural, alt: "Grizzly Fitness Princeton today: strength machines in front of the antique painted mural", archival: false, href: "/locations/princeton" },
            ].map((r) => (
              <li key={r.n} data-loc-reveal className="relative">
                <figure>
                  <div className="about-reveal relative aspect-[3/4] overflow-hidden bg-charcoal">
                    <Image src={r.src} alt={r.alt} fill sizes="(min-width:1024px) 24vw, (min-width:640px) 48vw, 100vw" placeholder="blur" className={`object-cover ${r.archival ? "loc-archive" : ""}`} />
                    <span aria-hidden className="absolute left-3 top-3 bg-iron/85 px-2.5 py-1 font-display text-[18px] font-extrabold text-lamp">{r.n}</span>
                  </div>
                  <figcaption className="mt-4 border-t border-[var(--line-strong)] pt-3">
                    <span className="block font-display text-[22px] font-bold uppercase leading-none md:text-[26px]">{r.t}</span>
                    <span className="mt-1.5 block text-[14px] text-bone-2">{r.d}</span>
                    {r.href ? (
                      <a href={to(r.href)} className="mt-2 inline-flex min-h-11 items-center text-[13px] font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">{r.when}</a>
                    ) : (
                      <span className="mt-2 block text-[12px] font-semibold uppercase tracking-[0.12em] text-steel">{r.when}</span>
                    )}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 02 · Equipment becomes an advantage ─────────────────────────── */}
      <section aria-labelledby="ch2-title" className="bg-iron">
        <div className="mx-auto max-w-[1440px] px-[var(--margin)] py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5" data-loc-reveal>
              <ChapterMark n="02" label="Built through experience" />
              <h2 id="ch2-title" className="mt-5 font-display text-[clamp(44px,5.6vw,92px)] font-extrabold uppercase leading-[0.88]">
                Equipment{" "}<br />became the{" "}<br /><span className="text-lamp">advantage.</span>
              </h2>
            </div>
            <div className="space-y-5 text-[17px] leading-[1.7] text-bone-2 md:text-[18px] lg:col-span-6 lg:col-start-7 lg:pt-14" data-loc-reveal>
              <p>
                Rather than relying only on expensive new commercial machines, the business went looking for used equipment — on Craigslist, Facebook Marketplace and anywhere else it turned up. Buying, selling, transporting, repairing and installing exercise equipment became a bigger and bigger part of the work.
              </p>
              <p>
                What began as a practical way to equip the gym grew into a separate business, <span className="text-bone">Priority Fitness</span> — commercial equipment sales, installation, servicing and maintenance. It&apos;s still its own company today. For Grizzly Fitness it built real experience in gym design, equipment sourcing and machine maintenance — an advantage as the gyms expanded into new towns.
              </p>
              <p className="text-bone">{about.equipment}</p>
            </div>
          </div>
          <ul aria-label="What the equipment work involved" className="about-verbs mt-16 flex flex-wrap gap-x-6 gap-y-1 border-y border-[var(--line)] py-6 lg:gap-x-10" data-loc-reveal>
            {["Source", "Transport", "Repair", "Install", "Maintain"].map((v, i) => (
              <li key={v} className="font-display text-[clamp(30px,4.4vw,72px)] font-extrabold uppercase leading-none" style={{ ["--i" as string]: i }}>
                {v}
                <span aria-hidden className="text-lamp">.</span>
              </li>
            ))}
          </ul>
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
            <Fig src={ogMoving} alt="Two people moving a plate-loaded machine on a pallet jack in the original Princeton gym" cap="Princeton · December 2017" archival aspect="aspect-[3/4]" sizes="(min-width:768px) 23vw, 48vw" />
            <Fig src={bForklift} alt="A forklift on the bare concrete floor of the Berlin warehouse during the build-out" cap="Berlin · before" archival sizes="(min-width:768px) 23vw, 48vw" className="md:mt-16" />
            <Fig src={wBoxed} alt="Boxed equipment and weight plates waiting in a freshly painted room at Wautoma" cap="Wautoma · 2021" archival sizes="(min-width:768px) 23vw, 48vw" />
            <Fig src={wCardioArrives} alt="Cardio machines lined up during the Wautoma renovation" cap="Wautoma · 2021" archival sizes="(min-width:768px) 23vw, 48vw" className="md:mt-16" />
          </div>
          <ul aria-label="Equipment brands across our gyms" className="mt-14 flex flex-wrap gap-x-7 gap-y-2 text-bone-2" data-loc-reveal>
            {about.brands.map((b) => (
              <li key={b} className="font-display text-[clamp(22px,2.4vw,34px)] font-bold uppercase leading-none">{b}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 03–07 · The expansion timeline ──────────────────────────────── */}
      <section aria-labelledby="tl-title" className="border-t border-[var(--line)] bg-charcoal">
        <div className="mx-auto max-w-[1440px] px-[var(--margin)] py-24 lg:py-32">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end" data-loc-reveal>
            <div className="lg:col-span-7">
              <ChapterMark n="03" label="The road to five gyms" />
              <h2 id="tl-title" className="mt-5 font-display text-[clamp(44px,5.6vw,92px)] font-extrabold uppercase leading-[0.88]">
                One step{" "}<br />at a time.
              </h2>
            </div>
            <p className="text-[17px] leading-[1.65] text-bone-2 lg:col-span-5">
              From one training studio to a network of gyms across Central Wisconsin. Some early dates aren&apos;t confirmed — where that&apos;s the case we show the order, not a guessed year.
            </p>
          </div>

          <ol data-timeline className="about-tl relative mt-16 lg:mt-24">
            <i aria-hidden className="about-tl-rail" />
            <i aria-hidden className="about-tl-fill" />
            {timeline.map((s) => (
              <li key={s.id} data-stage className="about-stage relative grid gap-6 pb-16 pl-12 last:pb-0 md:pl-16 lg:grid-cols-12 lg:gap-12 lg:pb-24 lg:pl-0">
                <span data-dot aria-hidden className="about-dot" />
                <div className="lg:col-span-4 lg:pr-12 lg:text-right" data-loc-reveal>
                  {s.dated ? (
                    <time dateTime={s.dateTime} className="about-when block font-display text-[clamp(44px,5vw,80px)] font-extrabold uppercase leading-[0.9]">
                      {s.when}
                    </time>
                  ) : (
                    <span className="about-when block font-display text-[clamp(28px,2.6vw,40px)] font-extrabold uppercase leading-[0.95] text-bone-2">{s.when}</span>
                  )}
                  {s.place && <span className="mt-2 block text-[12px] font-semibold uppercase tracking-[0.16em] text-steel md:text-[13px]">{s.place}</span>}
                </div>
                <div className="lg:col-span-7 lg:col-start-6" data-loc-reveal>
                  <h3 className="font-display text-[clamp(30px,3vw,46px)] font-extrabold uppercase leading-[0.95]">
                    {s.title}{" "}
                    {s.former && (
                      <span className="ml-3 inline-block translate-y-[-0.35em] border border-[var(--line-strong)] px-2 py-1 align-middle font-sans text-[11px] font-semibold tracking-[0.14em] text-bone-2">
                        Former facility
                      </span>
                    )}
                  </h3>
                  <p className="mt-4 max-w-[620px] text-[17px] leading-[1.65] text-bone-2">{s.body}</p>
                  {s.former && (
                    <p className="mt-3 max-w-[620px] text-[14px] leading-[1.55] text-steel">
                      Green Lake Fitness is a former gym location and is not part of the current Grizzly Fitness network.
                    </p>
                  )}
                  {s.id === "2021" && (
                    <div className="mt-8 grid max-w-[640px] grid-cols-3 gap-3">
                      <Fig src={bBefore} alt="The bare Berlin warehouse in January 2021, with a raised wooden deck along the back wall" cap="Berlin · January 2021" archival aspect="aspect-[4/5]" sizes="(min-width:1024px) 14vw, 30vw" />
                      <Fig src={bEmpty} alt="The empty Berlin warehouse floor in January 2021, looking toward the loading doors" cap="Berlin · January 2021" archival aspect="aspect-[4/5]" sizes="(min-width:1024px) 14vw, 30vw" />
                      <Fig src={bTurf} alt="The finished Berlin gym today: a green turf lane under a row of international flags" cap="Berlin · today" aspect="aspect-[4/5]" sizes="(min-width:1024px) 14vw, 30vw" />
                    </div>
                  )}
                  {s.id === "five" && (
                    <div className="mt-8 grid max-w-[640px] grid-cols-3 gap-3">
                      <Fig src={wExterior} alt="The Wautoma building from its parking lot in May 2021: a long white storefront with an orange stripe, before it became a gym" cap="Wautoma · May 2021" archival aspect="aspect-[4/5]" sizes="(min-width:1024px) 14vw, 30vw" />
                      <Fig src={oLegs} alt="Rows of white plate-loaded machines at Grizzly Fitness Omro" cap="Omro · today" aspect="aspect-[4/5]" sizes="(min-width:1024px) 14vw, 30vw" />
                      <Fig src={rStore} alt="Racks and benches facing the glass storefront at Grizzly Fitness Rosendale" cap="Rosendale · today" aspect="aspect-[4/5]" sizes="(min-width:1024px) 14vw, 30vw" />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
          <TimelineProgress />
        </div>
      </section>

      {/* ── 04 · The philosophy ─────────────────────────────────────────── */}
      <section aria-labelledby="why-title" className="relative isolate overflow-hidden bg-iron">
        <div data-loc-parallax aria-hidden className="absolute -inset-y-[12%] inset-x-0 -z-10">
          <Image src={wFloor} alt="" fill sizes="100vw" placeholder="blur" className="object-cover [filter:contrast(1.05)_saturate(.7)_brightness(.3)]" />
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(14,13,11,.92),rgba(14,13,11,.55))]" />
        <div className="mx-auto max-w-[1440px] px-[var(--margin)] py-28 lg:py-40" data-loc-reveal>
          <ChapterMark n="04" label="Why small towns" />
          <h2 id="why-title" className="mt-6 max-w-[1100px] font-display text-[clamp(44px,6.4vw,110px)] font-extrabold uppercase leading-[0.88]">
            Serious goals shouldn&apos;t need{" "}<span className="text-lamp">a big city.</span>
          </h2>
          <p className="mt-8 max-w-[640px] text-[18px] leading-[1.65] text-bone md:text-[20px]">
            Many rural communities lack easy access to well-equipped strength gyms, 24-hour access and professional fitness services — the towns larger chains often overlook. Grizzly Fitness was built so people there can chase serious goals without driving to a bigger city.
          </p>
          <ul aria-label="How Grizzly Fitness runs its gyms" className="mt-12 grid max-w-[1100px] gap-x-10 gap-y-4 border-t border-[var(--line-strong)] pt-8 sm:grid-cols-2 lg:grid-cols-3">
            {model.map((m, i) => (
              <li key={m} className="flex gap-4 text-[16px] leading-[1.5] text-bone">
                <span className="font-display text-[18px] font-extrabold text-lamp">{String(i + 1).padStart(2, "0")}</span>
                {m}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 05 · Five communities, one mission ──────────────────────────── */}
      <section aria-labelledby="five-title" className="bg-charcoal">
        <div className="mx-auto max-w-[1440px] px-[var(--margin)] py-24 lg:py-32">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end" data-loc-reveal>
            <div className="lg:col-span-7">
              <ChapterMark n="05" label="Five communities, one mission" />
              <h2 id="five-title" className="mt-5 font-display text-[clamp(44px,5.6vw,92px)] font-extrabold uppercase leading-[0.88]">
                Five towns.{" "}<br />Five characters.
              </h2>
            </div>
            <p className="text-[17px] leading-[1.65] text-bone-2 lg:col-span-5">
              No two Grizzly gyms are the same building — a historic downtown room, a warehouse, a Main Street hub, an old-school iron gym and a bright storefront. All five are open 24/7 with your key fob.
            </p>
          </div>
          <div className="mt-14">
            <GymIndex gyms={gyms} />
          </div>
        </div>
      </section>

      {/* ── 06 · Beyond equipment ───────────────────────────────────────── */}
      <section aria-labelledby="beyond-title" className="bg-paper text-ink">
        <div className="mx-auto max-w-[1440px] px-[var(--margin)] py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5" data-loc-reveal>
              <ChapterMark n="06" label="Beyond equipment" tone="paper" />
              <h2 id="beyond-title" className="mt-5 font-display text-[clamp(44px,5.6vw,92px)] font-extrabold uppercase leading-[0.88]">
                More than a{" "}<br />place to lift.
              </h2>
            </div>
            <div className="space-y-5 text-[17px] leading-[1.7] text-ink-2 md:text-[18px] lg:col-span-6 lg:col-start-7 lg:pt-14" data-loc-reveal>
              <p>
                Good equipment was the start, but equipment alone isn&apos;t always enough. Many people need structure, professional guidance, accountability and a program built for them. So Grizzly Fitness has grown its coaching: personal training, semi-private personal training — which includes nutrition guidance and ongoing accountability — and InBody body-composition assessments, all aimed at measurable, sustainable results.
              </p>
              <ul aria-label="Who our coaching is built for" className="grid gap-2 sm:grid-cols-2">
                {welcome.map((w) => (
                  <li key={w} className="flex gap-3 text-[15px] leading-[1.5] text-ink">
                    <i aria-hidden className="mt-[10px] h-[2px] w-3 shrink-0 bg-lamp-deep" />
                    {w}
                  </li>
                ))}
              </ul>
              <p className="text-[15px] text-ink-2">Coaching services aren&apos;t offered at every gym. Here&apos;s where each one is listed today:</p>
            </div>
          </div>
          <ul className="mt-14 grid gap-px border border-ink/15 bg-ink/15 md:grid-cols-2 lg:grid-cols-4">
            {serviceWhere
              .filter((s) => ["semi-private", "inbody", "pocket-trainer"].includes(s.id))
              .map((s) => (
                <li key={s.id} className="flex flex-col gap-3 bg-paper p-8" data-loc-reveal>
                  <h3 className="font-display text-[28px] font-bold uppercase leading-none">{s.title}</h3>
                  <p className="text-[15px] leading-[1.6] text-ink-2">{s.body}</p>
                  {s.extra && <p className="text-[14px] font-semibold leading-[1.5] text-ink">{s.extra}</p>}
                  <p className="mt-auto pt-2 text-[12px] font-bold uppercase tracking-[0.12em]">{s.listedAt.map(town).join(" · ")}</p>
                </li>
              ))}
            <li className="flex flex-col gap-3 bg-ink p-8 text-bone" data-loc-reveal>
              <h3 className="font-display text-[28px] font-bold uppercase leading-none">Start with a conversation</h3>
              <p className="text-[15px] leading-[1.6] text-bone-2">Tell us your goals and your home gym, and we&apos;ll point you to the right coaching.</p>
              <div className="mt-auto flex flex-wrap gap-2 pt-2">
                <Button href={to("/personal-training")} size="sm">Personal training</Button>
                <Button href={to("/training")} size="sm" variant="secondary">All training</Button>
              </div>
            </li>
          </ul>
          <ul className="mt-16 grid gap-10 md:grid-cols-2">
            {about.testimonials.map((t) => (
              <li key={t.name} data-loc-reveal>
                <figure className="border-t-2 border-ink pt-6">
                  <blockquote className="text-[19px] leading-[1.55] text-ink md:text-[21px]">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-5 text-[13px] font-bold uppercase tracking-[0.14em] text-ink-2">{t.name}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className="mt-12 border-t border-ink/15 pt-6 text-[15px] text-ink-2" data-loc-reveal>
            {about.insurance}{" "}
            <a href={to("/memberships#insurance")} className="font-semibold text-ink underline decoration-lamp-deep underline-offset-4">About insurance programs</a>
          </p>
        </div>
      </section>

      {/* ── Apparel & supps (Wix /about, verbatim) ──────────────────────── */}
      <section id="apparel" aria-labelledby="apparel-title" className="bg-iron">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-[var(--margin)] py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5" data-loc-reveal>
            <Eyebrow>Grizzly Apparel and supps</Eyebrow>
            <h2 id="apparel-title" className="mt-4 font-display text-[clamp(40px,4.4vw,72px)] font-extrabold uppercase leading-[0.9]">
              Wear it.{" "}<br />Fuel it.
            </h2>
          </div>
          <div className="space-y-5 text-[16px] leading-[1.65] text-bone-2 lg:col-span-6 lg:col-start-7" data-loc-reveal>
            {about.apparel.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
              <Button href={to(links.shop.href)} variant="secondary" size="sm">Shop The Grizzly Life</Button>
              <a href={to("/podcast")} className="text-[14px] font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">The Grizzly Life Podcast →</a>
              <a href={to("/careers")} className="text-[14px] font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">Work with us →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 07 · Closing: Small towns. Big dreamers. ────────────────────── */}
      <section aria-labelledby="close-title" className="relative isolate overflow-hidden border-t border-[var(--line)] bg-iron">
        <div aria-hidden className="absolute inset-0 -z-10 grid grid-cols-3">
          {[pRack, bPlate, oLegs].map((src, i) => (
            <div key={i} className="relative">
              <Image src={src} alt="" fill sizes="34vw" placeholder="blur" className="object-cover [filter:grayscale(.6)_contrast(1.1)_brightness(.2)]" />
            </div>
          ))}
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(70%_65%_at_50%_50%,rgba(14,13,11,.55),rgba(14,13,11,.85))]" />
        <div aria-hidden className="about-close-lamp absolute inset-0 -z-10" />
        <div className="mx-auto max-w-[1440px] px-[var(--margin)] py-28 text-center lg:py-40">
          <div data-loc-reveal>
            <ChapterMark n="07" label="The Grizzly Fitness of today" />
          </div>
          <h2 id="close-title" className="about-close mt-8 font-display font-black uppercase leading-[0.82]" data-loc-reveal>
            <span className="block text-[clamp(56px,10vw,180px)] text-bone">Small towns.</span>
            <span className="block text-[clamp(56px,10vw,180px)]">
              <span className="sr-only">Big dreamers.</span>
              <span aria-hidden>
                {"Big dreamers.".split("").map((ch, i) => (
                  <span key={i} className="about-letter" style={{ ["--i" as string]: i }}>
                    {ch}
                  </span>
                ))}
              </span>
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-[680px] text-[18px] leading-[1.6] text-bone md:text-[20px]" data-loc-reveal>
            {about.tagline} Grizzly Fitness exists to make quality fitness easier to reach in small-town Wisconsin — because ambitious goals can begin anywhere.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row" data-loc-reveal>
            <Button href={to("/locations")} arrow>Find your gym</Button>
            <Button href={to("/memberships")} variant="secondary">Explore memberships</Button>
            <Button href={to(links.join.href)} variant="secondary">Join online</Button>
          </div>
          <ul className="mx-auto mt-14 flex max-w-[900px] flex-wrap justify-center gap-x-6 gap-y-3 text-[14px] font-semibold" data-loc-reveal>
            {locations.map((l) => (
              <li key={l.slug}>
                <a href={to(`/locations/${l.slug}`)} className="inline-flex min-h-11 items-center gap-2 text-bone-2 hover:text-bone">
                  <FobDot color={l.color} size={9} />
                  {l.town}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[13px] text-steel">
            Follow along: <Ext href={to(links.instagram.href)} className="text-bone-2 hover:text-bone">Instagram</Ext> · <Ext href={to(links.facebook.href)} className="text-bone-2 hover:text-bone">Facebook</Ext> · <Ext href={to(links.youtube.href)} className="text-bone-2 hover:text-bone">YouTube</Ext>
          </p>
        </div>
      </section>
    </PageShell>
  );
}

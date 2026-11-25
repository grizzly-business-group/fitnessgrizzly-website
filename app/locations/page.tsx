import type { Metadata } from "next";
import { withShare } from "@/lib/seo";
import Image from "next/image";
import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import { CtaBand, Section, SectionHead } from "@/components/page/Blocks";
import nlTeaser from "@/public/media/new-london/nl-real-main-floor-wide.jpg";
import { Button, FobDot, Unverified } from "@/components/ui/primitives";
import { joinHref, locations, staffedPhrase } from "@/lib/data/locations";
import { pageFor } from "@/lib/data/location-pages";
import { serviceWhere } from "@/lib/data/site-pages/training";
import berlinDumbbells from "@/public/media/berlin/berlin-dumbbells-service-flags.jpg";
import { to } from "@/lib/paths";

export const metadata: Metadata = withShare({
  title: { absolute: "Grizzly Fitness Locations | Princeton, Berlin, Wautoma, Omro & Rosendale, WI" },
  description:
    "All five Grizzly Fitness gyms — Princeton, Berlin, Wautoma, Omro and Rosendale, Wisconsin. Open 24/7 with your key fob. Addresses, staffed hours, directions and what each gym offers.",
  alternates: { canonical: "/locations" },
});

const crumbs = [{ name: "Locations", path: "/locations" }];

export default function LocationsHub() {
  return (
    <PageShell crumbs={crumbs}>
      <PageHero
        crumbs={crumbs}
        eyebrow="Five gyms · open 24/7"
        title={<>Pick your<br />home gym.</>}
        lead="Five real gyms in five Wisconsin towns, each open 24/7 with your key fob. Every one has its own room, its own equipment and its own staffed hours."
      >
        <nav aria-label="Jump to a gym">
          <ul className="flex flex-wrap gap-2">
            {locations.map((l) => (
              <li key={l.slug}>
                <a href={to(`#${l.slug}`)} className="inline-flex min-h-11 items-center gap-2.5 border border-[var(--line-strong)] bg-iron/60 px-4 text-[14px] font-semibold hover:border-bone focus-visible:outline-2 focus-visible:outline-bone">
                  <FobDot color={l.color} size={11} />
                  {l.town}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <section aria-label="The five gyms" className="mx-auto max-w-[1440px] px-[var(--margin)] pb-10">
        <ol className="space-y-3">
          {locations.map((l, i) => {
            const page = pageFor(l.slug);
            const photo = page?.hero.photo;
            return (
              <li key={l.slug} id={l.slug} className="scroll-mt-[calc(var(--header-h)+16px)]" data-loc-reveal>
                <article aria-labelledby={`gym-${l.slug}-name`} className="grid overflow-hidden border border-[var(--line)] bg-charcoal md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                  <div className={`relative aspect-[4/3] md:aspect-auto md:min-h-[380px] ${i % 2 ? "md:order-2" : ""}`}>
                    {photo && <Image src={photo.src} alt={photo.alt} fill sizes="(min-width:768px) 42vw, 100vw" placeholder="blur" className="object-cover" style={{ objectPosition: photo.position }} />}
                    <i aria-hidden className="absolute inset-x-0 top-0 h-1.5" style={{ background: l.color, boxShadow: `inset 0 -1px 0 ${l.tint}` }} />
                  </div>
                  <div className="flex flex-col gap-5 p-7 lg:p-10">
                    <p className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] md:text-[13px]" style={{ color: `color-mix(in srgb, ${l.tint} 62%, #fff)` }}>
                      <FobDot color={l.color} size={11} />0{i + 1} — {l.tag}
                    </p>
                    <h2 id={`gym-${l.slug}-name`} className="font-display text-[clamp(52px,6vw,92px)] font-extrabold uppercase leading-[0.84]">
                      <span className="sr-only">Grizzly Fitness </span>
                      {l.town}
                    </h2>
                    <p className="max-w-[560px] text-[17px] leading-[1.55] text-bone-2">{l.summary}</p>
                    <dl className="grid gap-4 border-t border-[var(--line)] pt-5 text-[15px] sm:grid-cols-2">
                      <div>
                        <dt className="text-[12px] font-bold uppercase tracking-[0.14em] text-steel">Address</dt>
                        <dd className="mt-1 text-bone">
                          {l.address.street}
                          {!l.address.verified && <Unverified note="Launch blocker #6 — Princeton address conflict" />}, {l.address.city} {l.address.zip}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[12px] font-bold uppercase tracking-[0.14em] text-steel">Access</dt>
                        <dd className="mt-1 text-bone">24/7 key fob · {staffedPhrase(l)}</dd>
                      </div>
                    </dl>
                    <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
                      <Button href={to(`/locations/${l.slug}`)} arrow>
                        See the {l.town} gym
                      </Button>
                      <Button href={to(l.mapsUrl)} variant="secondary">
                        Directions<span className="sr-only"> to Grizzly Fitness {l.town}</span>
                      </Button>
                      <Button href={to(joinHref(l))} variant="secondary">
                        Join<span className="sr-only"> online at Grizzly Fitness {l.town}</span>
                      </Button>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </section>

      <Section labelledBy="compare-title" tone="charcoal">
        <SectionHead
          id="compare-title"
          eyebrow="Side by side"
          title={<>Compare<br />the five.</>}
          intro="Every gym is open 24/7 with your key fob. Services are listed only where that gym's own page lists them — ask us about anything else."
        />
        <div className="mt-12 overflow-x-auto" data-loc-reveal>
          <table className="w-full min-w-[760px] border-collapse text-left text-[15px]">
            <caption className="sr-only">Staffed hours and services at each Grizzly Fitness gym</caption>
            <thead>
              <tr className="border-b border-[var(--line-strong)] text-[12px] font-bold uppercase tracking-[0.14em] text-steel">
                <th scope="col" className="py-4 pr-4">Gym</th>
                <th scope="col" className="py-4 pr-4">Staffed</th>
                {serviceWhere.map((s) => (
                  <th key={s.id} scope="col" className="py-4 pr-4">{s.title.replace(" & exercise programming", "")}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {locations.map((l) => (
                <tr key={l.slug} className="border-b border-[var(--line)] align-top">
                  <th scope="row" className="py-4 pr-4">
                    <a href={to(`/locations/${l.slug}`)} className="inline-flex items-center gap-2 font-display text-[22px] font-bold uppercase leading-none hover:text-lamp">
                      <FobDot color={l.color} size={10} />
                      {l.town}
                    </a>
                  </th>
                  <td className="py-4 pr-4 text-bone-2">{l.staffed.lines.join(" · ")}</td>
                  {serviceWhere.map((s) => (
                    <td key={s.id} className="py-4 pr-4">
                      {s.listedAt.includes(l.slug) ? <span className="font-semibold text-bone">Yes</span> : <span className="text-steel">Ask us</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-8 max-w-[760px] text-[15px] leading-[1.6] text-bone-2" data-loc-reveal>
          Your membership is for the gym you sign up at. Insurance members can use all five.{" "}
          <a href={to("/memberships")} className="font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">Memberships</a>
        </p>
      </Section>

      <section aria-labelledby="nl-teaser-title" className="border-t border-[var(--line)] bg-iron">
        <a href={to("/new-london")} className="group mx-auto grid max-w-[1440px] items-stretch md:grid-cols-2">
          <span className="relative block aspect-[16/9] overflow-hidden md:aspect-auto md:min-h-[320px]">
            <Image src={nlTeaser} alt="The open floor at 210 Wisconsin St. in New London before the remodel" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover brightness-[.8] transition-[filter] duration-300 group-hover:brightness-100" />
            <span className="absolute left-3 top-3 bg-iron/80 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-bone">Real photo · Before the remodel</span>
          </span>
          <span className="flex flex-col justify-center gap-4 px-[var(--margin)] py-12 md:px-12">
            <span className="self-start -skew-x-12 bg-[#c8312b] px-4 py-1.5"><span className="block skew-x-12 font-display text-[22px] font-extrabold uppercase tracking-[0.12em] text-white">Coming soon</span></span>
            <h2 id="nl-teaser-title" className="font-display text-[clamp(52px,6vw,88px)] font-extrabold uppercase leading-[0.85] text-bone">New London</h2>
            <span className="text-[16px] text-bone-2">210 Wisconsin St. · 24/7 · Founders pricing from $15 bi-weekly</span>
            <span className="text-[15px] font-semibold text-lamp group-hover:text-lamp-hover">Join the founders list →</span>
          </span>
        </a>
      </section>

      <CtaBand title="Five towns." accent="One fob away." photo={berlinDumbbells} secondary={{ label: "Memberships", href: "/memberships" }} />
    </PageShell>
  );
}

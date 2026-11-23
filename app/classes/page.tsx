import type { Metadata } from "next";
import { withShare } from "@/lib/seo";
import Image from "next/image";
import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import { CtaBand, Section, SectionHead } from "@/components/page/Blocks";
import { Button } from "@/components/ui/primitives";
import { pageFor } from "@/lib/data/location-pages";
import { links, site } from "@/lib/data/site";
import wClassroom from "@/public/media/wautoma/wautoma-main-classroom.jpg";
import wMain from "@/public/media/wautoma/wautoma-main-floor.jpg";
import { to } from "@/lib/paths";

export const metadata: Metadata = withShare({
  title: { absolute: "Group Fitness Classes in Wautoma, WI | Grizzly Fitness" },
  description:
    "Group Fit and Senior Fit (Silver Sneakers) classes at Grizzly Fitness Wautoma, in the Main Classroom at 230 E. Main St. and the Dance Studio at 220 E. Main St. Call or text 920-990-2795 for current class times.",
  alternates: { canonical: "/classes" },
});

const crumbs = [{ name: "Classes", path: "/classes" }];
/** Class content lives once, in Wautoma's page data — this hub reads it so the two never disagree. */
const c = pageFor("wautoma")!.classes!;

export default function ClassesPage() {
  return (
    <PageShell crumbs={crumbs}>
      <PageHero
        crumbs={crumbs}
        eyebrow="Classes · Grizzly Fitness Wautoma"
        title={<>Classes on{" "}<br />Main Street.</>}
        lead="Group fitness at Grizzly Fitness runs at our Wautoma gym, across two rooms on East Main Street. Here's what's offered and where. Call or text 920-990-2795 for current class times."
        photo={{ src: wClassroom, alt: "The Main Classroom at 230 E. Main St., Wautoma: a long room with mirrors, rubber flooring, green LED trim and stability balls along the wall", position: "50% 55%" }}
      />

      <Section labelledBy="list-title">
        <SectionHead id="list-title" eyebrow="The classes" title={<>Two classes,{" "}<br />one town.</>} intro={c.intro} />
        <ul className="mt-12 grid gap-3 md:grid-cols-2">
          {c.items.map((k) => (
            <li key={k.name} className="relative flex flex-col gap-4 bg-charcoal p-8 lg:p-10" data-loc-reveal>
              <i aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-[var(--color-loc-wautoma)]" />
              <h3 className="font-display text-[clamp(32px,3.4vw,48px)] font-extrabold uppercase leading-[0.92]">
                {k.name}
              </h3>
              <p className="max-w-[520px] text-[18px] leading-[1.55] text-bone">{k.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="times-title" tone="charcoal">
        <SectionHead id="times-title" eyebrow="Class times" title={<>Call or text{" "}<br />for times.</>} intro={`Call or text ${site.phone.value.display} for current class times.`} />
        <div className="mt-10 flex flex-col gap-3 sm:flex-row" data-loc-reveal>
          <Button href={to(`tel:${site.phone.value.tel}`)}>Call {site.phone.value.display}</Button>
          <Button href={to(`sms:${site.phone.value.sms}`)} variant="secondary">
            Text us
          </Button>
        </div>
      </Section>

      <Section labelledBy="rooms-title">
        <SectionHead id="rooms-title" eyebrow="Where classes happen" title={<>Two rooms{" "}<br />on East Main.</>} intro="Silver Sneakers is one of the insurance fitness programs we accept." />
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {c.studios.map((st) => (
            <li key={st.name} data-loc-reveal>
              <figure>
                <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
                  <Image src={st.photo.src} alt={st.photo.alt} fill sizes="(min-width:768px) 45vw, 100vw" placeholder="blur" className="object-cover" style={{ objectPosition: st.photo.position }} />
                </div>
                <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <span className="font-display text-[28px] font-bold uppercase leading-none text-bone">{st.name}</span>
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
        <p className="mt-10 text-[16px] text-bone-2" data-loc-reveal>
          More about the gym:{" "}
          <a href={to("/locations/wautoma")} className="font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">Grizzly Fitness Wautoma</a>
          {" · "}
          <a href={to(links.facebook.href)} target="_blank" rel="noopener noreferrer" className="font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">
            Facebook ↗<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      </Section>

      <CtaBand title="Come for class." accent="Stay for the community." photo={wMain} secondary={{ label: "See Wautoma", href: "/locations/wautoma" }} />
    </PageShell>
  );
}

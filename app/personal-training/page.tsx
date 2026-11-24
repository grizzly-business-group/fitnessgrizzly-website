import type { Metadata } from "next";
import { withShare } from "@/lib/seo";
import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import { CtaBand, Section, SectionHead } from "@/components/page/Blocks";
import { Button, FobDot } from "@/components/ui/primitives";
import { locations } from "@/lib/data/locations";
import { serviceWhere, sppt } from "@/lib/data/site-pages/training";
import bPlatforms from "@/public/media/berlin/berlin-platforms-functional-trainer.jpg";
import pRacks from "@/public/media/princeton/princeton-racks-platform.jpg";
import { to } from "@/lib/paths";
import GhlEmbed from "@/components/page/GhlEmbed";
import { ghl, site } from "@/lib/data/site";

export const metadata: Metadata = withShare({
  title: { absolute: "Semi-Private Personal Training | Grizzly Fitness" },
  description:
    "Semi-private personal training at Grizzly Fitness: personalized coaching in a small group of 2–6, built around your goals — safe, effective strength and mobility work designed for people 40+.",
  alternates: { canonical: "/personal-training" },
});

const crumbs = [
  { name: "Training", path: "/training" },
  { name: "Personal training", path: "/personal-training" },
];
const where = serviceWhere.find((s) => s.id === "semi-private")!.listedAt;

function ConsultButtons({ tone = "dark" }: { tone?: "dark" | "paper" }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button href={to("#consult")} variant={tone === "paper" ? "ink" : "primary"} arrow>
        Book a consult
      </Button>
      <Button href={to(`tel:${site.phone.value.tel}`)} variant={tone === "paper" ? "ink-outline" : "secondary"}>
        Call / text {site.phone.value.display}
      </Button>
    </div>
  );
}

export default function PersonalTrainingPage() {
  return (
    <PageShell crumbs={crumbs}>
      <PageHero
        crumbs={crumbs}
        eyebrow={sppt.kicker}
        title={<>Two to six.{" "}<br />One coach.</>}
        lead={sppt.intro}
        photo={{ src: bPlatforms, alt: "A lifting platform with a barbell in front of a cable and functional trainer at Grizzly Fitness Berlin", position: "50% 60%" }}
      >
        <ConsultButtons />
      </PageHero>

      <Section labelledBy="what-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5" data-loc-reveal>
            <h2 id="what-title" className="font-display text-[clamp(40px,4.6vw,72px)] font-extrabold uppercase leading-[0.9]">{sppt.whatTitle}</h2>
          </div>
          <p className="text-[18px] leading-[1.65] text-bone md:text-[20px] lg:col-span-6 lg:col-start-7" data-loc-reveal>{sppt.what}</p>
        </div>
        <ul className="mt-14 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {sppt.features.map((f, i) => (
            <li key={f.title} className="flex flex-col gap-3 border-t-2 border-lamp bg-charcoal p-8" data-loc-reveal>
              <span className="font-display text-[15px] font-extrabold tracking-[0.12em] text-lamp">0{i + 1}</span>
              <h3 className="font-display text-[30px] font-bold uppercase leading-none">{f.title}</h3>
              <p className="text-[16px] leading-[1.6] text-bone-2">{f.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="foryou-title" tone="paper">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6" data-loc-reveal>
            <h2 id="foryou-title" className="font-display text-[clamp(40px,4.6vw,72px)] font-extrabold uppercase leading-[0.9]">{sppt.forYouTitle}</h2>
            <p className="mt-6 text-[18px] leading-[1.65] text-ink-2">{sppt.forYou}</p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8" data-loc-reveal>
            <h3 className="text-[12px] font-bold uppercase tracking-[0.14em] text-ink-2">Listed on these gyms&apos; pages</h3>
            <ul className="mt-4 grid gap-2">
              {locations
                .filter((l) => where.includes(l.slug))
                .map((l) => (
                  <li key={l.slug}>
                    <a href={to(`/locations/${l.slug}`)} className="flex min-h-14 items-center justify-between gap-3 border-2 border-paper-2 bg-paper px-5 font-display text-[26px] font-bold uppercase leading-none hover:border-ink">
                      <span className="flex items-center gap-3"><FobDot color={l.color} size={11} />{l.town}</span>
                      <span aria-hidden className="text-[18px]">→</span>
                    </a>
                  </li>
                ))}
            </ul>
            <p className="mt-4 text-[15px] leading-[1.55] text-ink-2">Training at Omro or Rosendale? Ask us what&apos;s available there.</p>
          </div>
        </div>
      </Section>


      <Section labelledBy="book-title" tone="charcoal" id="consult">
        <SectionHead
          id="book-title"
          eyebrow="Book a consult"
          title={<>Start with{" "}<br />a consult.</>}
          intro="Pick your gym and choose a time. Bring your goals and any limitations — we'll build your plan from there."
        />
        <ul className="mt-10 grid gap-3 sm:grid-cols-3">
          {locations
            .filter((l) => where.includes(l.slug) && ghl.consult[l.slug])
            .map((l) => (
              <li key={l.slug} className="flex flex-col gap-3 border border-[var(--line)] bg-iron p-6" style={{ borderTop: `6px solid ${l.color}` }} data-loc-reveal>
                <p className="font-display text-[34px] font-extrabold uppercase leading-none">{l.town}</p>
                <p className="text-[14px] text-bone-2">{l.address.street}, {l.address.city}</p>
                <Button href={to(ghl.consult[l.slug])} arrow className="mt-auto">
                  Book at {l.town}
                </Button>
              </li>
            ))}
        </ul>
        <p className="mt-6 text-[15px] text-bone-2">
          Prefer to talk first? Call or text <a href={to(`tel:${site.phone.value.tel}`)} className="font-semibold text-bone underline decoration-lamp underline-offset-4">{site.phone.value.display}</a>.
        </p>
        {ghl.ptForm.url && (
          <div className="mt-16">
            <h3 className="font-display text-[clamp(28px,3vw,40px)] font-extrabold uppercase leading-none">Rather we reach out?</h3>
            <p className="mt-3 max-w-[640px] text-bone-2">Leave your details and a coach will get in touch.</p>
            <GhlEmbed embed={ghl.ptForm} className="mt-6 max-w-[760px]" />
          </div>
        )}
      </Section>

      <CtaBand title="Coaching that" accent="fits you." photo={pRacks} secondary={{ label: "All training", href: "/training" }} />
    </PageShell>
  );
}

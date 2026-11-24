import type { Metadata } from "next";
import { withShare } from "@/lib/seo";
import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import { CtaBand, Section, SectionHead } from "@/components/page/Blocks";
import { Button, FobDot } from "@/components/ui/primitives";
import { locations } from "@/lib/data/locations";
import { consult, serviceWhere } from "@/lib/data/site-pages/training";
import { site } from "@/lib/data/site";
import pRackRoom from "@/public/media/princeton/princeton-rack-room.jpg";
import wTurf from "@/public/media/wautoma/wautoma-turf-perspective.jpg";
import { to } from "@/lib/paths";

export const metadata: Metadata = withShare({
  title: { absolute: "Training at Grizzly Fitness | Semi-Private Personal Training, InBody & More" },
  description:
    "Semi-private personal training in groups of 2–6, InBody scans, app-based pocket training, group classes at Wautoma and tanning at Berlin — and which Grizzly Fitness gym offers each.",
  alternates: { canonical: "/training" },
});

const crumbs = [{ name: "Training", path: "/training" }];
const byTown = Object.fromEntries(locations.map((l) => [l.slug, l]));

export default function TrainingHub() {
  return (
    <PageShell crumbs={crumbs}>
      <PageHero
        crumbs={crumbs}
        eyebrow="Training & services"
        title={<>A coach{" "}<br />in your corner.</>}
        lead="24/7 access is just the start. Train with a coach in a small group, track your body composition, or take a plan with you on your phone."
        photo={{ src: pRackRoom, alt: "A dark-walled rack room with squat racks and lifting platforms at Grizzly Fitness Princeton", position: "50% 55%" }}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={to("/personal-training")} arrow>
            Personal training
          </Button>
          <Button href={to(consult.email)} variant="secondary">
            Email us about training
          </Button>
        </div>
      </PageHero>

      <Section labelledBy="svc-title">
        <SectionHead
          id="svc-title"
          eyebrow="What we offer"
          title={<>Five ways{" "}<br />to train smarter.</>}
          intro="Each service lists the gyms where it's available. Training at Omro or Rosendale? Call or text us and we'll tell you what's on offer there."
        />
        <ul className="mt-12 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {serviceWhere.map((s, i) => (
            <li key={s.id} id={s.id} className="flex scroll-mt-[calc(var(--header-h)+16px)] flex-col gap-4 border border-[var(--line)] bg-charcoal p-8" data-loc-reveal>
              <span className="font-display text-[15px] font-extrabold tracking-[0.12em] text-lamp">0{i + 1}</span>
              <h3 className="font-display text-[32px] font-bold uppercase leading-[0.95]">{s.title}</h3>
              <p className="text-[16px] leading-[1.6] text-bone-2">{s.body}</p>
              {s.extra && <p className="border-l-2 border-lamp pl-3 text-[15px] font-semibold leading-[1.5] text-bone">{s.extra}</p>}
              <div className="mt-auto pt-2">
                <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-steel">Listed at</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {s.listedAt.map((g) => (
                    <li key={g}>
                      <a href={to(`/locations/${g}`)} className="inline-flex min-h-9 items-center gap-2 border border-[var(--line-strong)] px-3 text-[14px] font-semibold hover:border-bone">
                        <FobDot color={byTown[g].color} size={9} />
                        {byTown[g].town}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {s.href && (
                <a href={to(s.href)} className="inline-flex min-h-11 items-center self-start font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">
                  {s.id === "semi-private" ? "How semi-private training works" : s.id === "classes" ? "Classes" : "Tanning at Berlin"} →
                </a>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-16" data-loc-reveal>
          <h3 id="glance-title" className="font-display text-[clamp(28px,3vw,44px)] font-extrabold uppercase leading-none">At a glance</h3>
          <div className="mt-6 overflow-x-auto" role="region" aria-labelledby="glance-title" tabIndex={0}>
            <table className="w-full min-w-[640px] border-collapse text-left text-[15px]">
              <thead>
                <tr className="border-b border-[var(--line-strong)] text-[12px] font-bold uppercase tracking-[0.12em] text-steel">
                  <th scope="col" className="py-3 pr-6">Service</th>
                  <th scope="col" className="py-3 pr-6">What it is</th>
                  <th scope="col" className="py-3">Listed at</th>
                </tr>
              </thead>
              <tbody>
                {serviceWhere.map((s) => (
                  <tr key={s.id} className="border-b border-[var(--line)] align-top">
                    <th scope="row" className="py-4 pr-6 font-display text-[22px] font-bold uppercase leading-none">
                      <a href={to(`#${s.id}`)} className="hover:text-lamp">{s.title}</a>
                    </th>
                    <td className="py-4 pr-6 leading-[1.55] text-bone-2">{s.glance}</td>
                    <td className="py-4 leading-[1.55] text-bone">{s.listedAt.map((g) => byTown[g].town).join(" · ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[14px] text-bone-2">Omro and Rosendale don&apos;t list coaching services on their pages. Ask us what&apos;s available there.</p>
        </div>
      </Section>

      <Section labelledBy="consult-title" tone="paper">
        <SectionHead
          id="consult-title"
          tone="paper"
          eyebrow="Start with a conversation"
          title={<>Talk to us{" "}<br />about training.</>}
          intro={
            <>
              Tell us your goals and which gym you train at, and we&apos;ll point you to the right coach and program. Email{" "}
              <a href={to(consult.email)} className="font-semibold text-ink underline underline-offset-4">{site.email}</a> or call/text{" "}
              <a href={to(`tel:${site.phone.value.tel}`)} className="font-semibold text-ink underline underline-offset-4">{site.phone.value.display}</a>.
            </>
          }
        />
        <div className="mt-10 flex flex-col gap-3 sm:flex-row" data-loc-reveal>
          <Button href={to(consult.email)} variant="ink">
            Email us about training
          </Button>
          <Button href={to(`tel:${site.phone.value.tel}`)} variant="ink-outline">
            Call / text
          </Button>
        </div>
      </Section>

      <CtaBand title="Train with" accent="a plan." photo={wTurf} secondary={{ label: "Personal training", href: "/personal-training" }} />
    </PageShell>
  );
}

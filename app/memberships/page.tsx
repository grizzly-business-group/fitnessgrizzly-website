import type { Metadata } from "next";
import { withShare } from "@/lib/seo";
import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import { CtaBand, Section, SectionHead } from "@/components/page/Blocks";
import { Button, FobDot } from "@/components/ui/primitives";
import { joinHref, locations, staffedPhrase } from "@/lib/data/locations";
import { memberships } from "@/lib/data/site-pages/memberships";
import { faqCategories } from "@/lib/data/site-pages/faq";
import { links } from "@/lib/data/site";
import wDumbbells from "@/public/media/wautoma/wautoma-dumbbells-flags.jpg";
import rRoom from "@/public/media/rosendale/rosendale-whole-room.jpg";
import { to } from "@/lib/paths";

export const metadata: Metadata = withShare({
  title: { absolute: "Gym Memberships | Grizzly Fitness — 24/7 Key-Fob Access" },
  description:
    "Grizzly Fitness memberships: bi-weekly and prepaid memberships, 1-day and 7-day passes, discounts for students, military and seniors, and five insurance fitness programs. Join online through GymMaster.",
  alternates: { canonical: "/memberships" },
});

const crumbs = [{ name: "Memberships", path: "/memberships" }];
const signupSteps = (faqCategories[0].items[0].a[0] as { ol: string[] }).ol;

export default function MembershipsPage() {
  return (
    <PageShell crumbs={crumbs}>
      <PageHero
        crumbs={crumbs}
        eyebrow="Memberships"
        title={<>Your gym.{" "}<br />Your hours.</>}
        lead="Every membership comes with a key fob and 24/7 access, 365 days a year. Join online in a few minutes — prices, passes and terms are shown in our GymMaster sign-up portal."
        photo={{ src: wDumbbells, alt: "Dumbbell racks and benches under military flags beside an orange wall at Grizzly Fitness Wautoma", position: "50% 55%" }}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={to(links.join.href)} arrow>
            Join online
          </Button>
          <Button href={to("#join")} variant="secondary">
            How joining works
          </Button>
        </div>
      </PageHero>

      <Section labelledBy="options-title">
        <SectionHead
          id="options-title"
          eyebrow="Options"
          title={<>Pick how{" "}<br />you pay.</>}
          intro={
            <>
              Current prices and the full list of options live in our sign-up portal, so they&apos;re always up to date.
            </>
          }
        />
        <ul className="mt-12 grid gap-3 md:grid-cols-3">
          {memberships.options.map((o, i) => (
            <li key={o.title} className="flex flex-col gap-3 border-t-2 border-lamp bg-charcoal p-8" data-loc-reveal>
              <span className="font-display text-[15px] font-extrabold tracking-[0.12em] text-lamp">0{i + 1}</span>
              <h3 className="font-display text-[30px] font-bold uppercase leading-none">{o.title}</h3>
              <p className="text-[16px] leading-[1.6] text-bone-2">{o.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 grid gap-6 border border-[var(--line-strong)] p-7 lg:grid-cols-12 lg:p-9" data-loc-reveal>
          <h3 className="font-display text-[28px] font-bold uppercase leading-none lg:col-span-3">Good to know</h3>
          <ul className="space-y-3 text-[16px] leading-[1.6] text-bone-2 lg:col-span-9">
            {memberships.terms.map((t) => (
              <li key={t.slice(0, 20)} className="flex gap-3">
                <i aria-hidden className="mt-[11px] h-[2px] w-3 shrink-0 bg-lamp" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="access-title" tone="charcoal">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6" data-loc-reveal>
            <SectionHead id="access-title" eyebrow="Access" title={<>One gym{" "}<br />— or all five.</>} className="!block" />
            <p className="mt-6 text-[17px] leading-[1.65] text-bone-2">
              {memberships.access}
            </p>
          </div>
          <div id="insurance" className="scroll-mt-[calc(var(--header-h)+16px)] lg:col-span-5 lg:col-start-8" data-loc-reveal>
            <h3 className="text-[12px] font-bold uppercase tracking-[0.14em] text-steel">Insurance fitness programs we accept</h3>
            <ul className="mt-4 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {memberships.insurance.map((p) => (
                <li key={p} className="py-3.5 font-display text-[26px] font-bold uppercase leading-none">{p}</li>
              ))}
            </ul>
            <p className="mt-4 text-[15px] leading-[1.55] text-bone-2">
              Insurance members have access to all Grizzly Fitness locations.
            </p>
          </div>
        </div>
      </Section>

      <Section labelledBy="join-title" id="join">
        <SectionHead id="join-title" eyebrow="How to join" title={<>Join online{" "}<br />in six steps.</>} intro="Choose your home gym when the portal asks you to “Filter by Club”." />
        <ol className="mt-12 grid gap-x-8 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
          {signupSteps.map((s, i) => (
            <li key={s} className="flex gap-4 border-t border-[var(--line-strong)] pt-4" data-loc-reveal>
              <span className="font-display text-[22px] font-extrabold leading-none text-lamp">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[16px] leading-[1.55] text-bone">{s.replace(" (Join online, below)", "")}</span>
            </li>
          ))}
        </ol>
        <h3 className="mt-16 text-[12px] font-bold uppercase tracking-[0.14em] text-steel" data-loc-reveal>Your home gym</h3>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {locations.map((l) => (
            <li key={l.slug} className="flex flex-col gap-2 border border-[var(--line)] bg-charcoal p-5" data-loc-reveal>
              <a href={to(`/locations/${l.slug}`)} className="flex items-center gap-2.5 font-display text-[26px] font-bold uppercase leading-none hover:text-lamp">
                <FobDot color={l.color} size={11} />
                {l.town}
              </a>
              <p className="text-[13px] leading-[1.5] text-bone-2">Fob pickup: {staffedPhrase(l).replace(/^Staffed /, "")}</p>
              <a href={to(joinHref(l))} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex min-h-11 items-center text-[13px] font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">
                Join at {l.town} ↗<span className="sr-only"> (GymMaster sign-up for Grizzly {l.town}, opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row" data-loc-reveal>
          <Button href={to(links.join.href)} arrow>
            Join online
          </Button>
          <Button href={to("/members")} variant="secondary">
            Already a member? Renew &amp; support
          </Button>
          <Button href={to("/faq")} variant="secondary">
            Membership FAQ
          </Button>
        </div>
      </Section>

      <CtaBand title="Join tonight." accent="Train tomorrow." photo={rRoom} />
    </PageShell>
  );
}

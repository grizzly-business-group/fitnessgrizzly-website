import type { Metadata } from "next";
import { withShare } from "@/lib/seo";
import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import { OfferStrip, priceLine, RatingBadge } from "@/components/page/Offer";
import { CtaBand, Section, SectionHead } from "@/components/page/Blocks";
import { Button, FobDot } from "@/components/ui/primitives";
import { joinHref, locations, staffedPhrase } from "@/lib/data/locations";
import { memberships } from "@/lib/data/site-pages/memberships";
import { faqCategories } from "@/lib/data/site-pages/faq";
import { pricing, startHref } from "@/lib/data/site";
import wDumbbells from "@/public/media/wautoma/wautoma-dumbbells-flags.jpg";
import rRoom from "@/public/media/rosendale/rosendale-whole-room.jpg";
import { to } from "@/lib/paths";

export const metadata: Metadata = withShare({
  title: { absolute: "Gym Memberships | Grizzly Fitness — 24/7 Key-Fob Access" },
  description:
    "Grizzly Fitness memberships from $14 bi-weekly ($20 adult): 24/7 key-fob access, prepaid options, $15 day passes, student, military and senior rates, and five insurance fitness programs.",
  alternates: { canonical: "/memberships" },
});

const crumbs = [{ name: "Memberships", path: "/memberships" }];
/** Price rows for the three option cards, in the same order as memberships.options (bi-weekly, prepaid, passes). */
const priceRows: { plan: string; price: string; unit?: string }[][] = [
  pricing.biweekly.map((p) => ({ ...p, unit: "/ 2 wks" })),
  pricing.prepaid.map((p) => ({ ...p })),
  pricing.passes.map((p) => ({ plan: p.plan, price: p.price })),
];
const priceNotes = [
  `${pricing.signupFee} sign-up fee. Add family members for ${pricing.familyAddOn} bi-weekly each. 3-month minimum.`,
  `Adult prices; ${pricing.prepaidReduced.replace("Senior and student prepaid: ", "seniors and students: ")}. ${pricing.signupFee} sign-up fee.`,
  `The 1-day pass has no sign-up fee and no key fob (best during staffed hours). The 7-day pass adds a ${pricing.signupFee} sign-up fee.`,
];
const signupSteps = (faqCategories[0].items[0].a[0] as { ol: string[] }).ol;

export default function MembershipsPage() {
  return (
    <PageShell crumbs={crumbs}>
      <PageHero
        crumbs={crumbs}
        eyebrow="Memberships"
        title={<>Your gym.{" "}<br />Your hours.</>}
        lead="Every membership comes with a key fob and 24/7 access, 365 days a year. Pick your home gym and join online in a few minutes."
        photo={{ src: wDumbbells, alt: "Dumbbell racks and benches under military flags beside an orange wall at Grizzly Fitness Wautoma", position: "50% 55%" }}
      >
        <RatingBadge className="mb-3" />
        <OfferStrip className="mb-6 max-w-[720px]" />
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={to(startHref)} arrow>
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
              Same prices at all five gyms. Every option is bought online in our secure GymMaster sign-up portal.
            </>
          }
        />
        <ul className="mt-12 grid gap-3 md:grid-cols-3">
          {memberships.options.map((o, i) => (
            <li key={o.title} className="flex flex-col gap-3 border-t-2 border-lamp bg-charcoal p-8" data-loc-reveal>
              <span className="font-display text-[15px] font-extrabold tracking-[0.12em] text-lamp">0{i + 1}</span>
              <h3 className="font-display text-[30px] font-bold uppercase leading-none">{o.title}</h3>
              <p className="text-[16px] leading-[1.6] text-bone-2">{o.body}</p>
              <dl className="mt-auto divide-y divide-[var(--line)] border-t border-[var(--line)] pt-1">
                {priceRows[i]?.map((r) => (
                  <div key={r.plan} className="flex items-baseline justify-between gap-4 py-2.5">
                    <dt className="text-[15px] text-bone-2">{r.plan}</dt>
                    <dd className="shrink-0 whitespace-nowrap font-display text-[26px] font-bold leading-none text-bone">
                      {r.price}
                      {r.unit && <span className="ml-1 font-sans text-[13px] font-medium text-bone-2">{r.unit}</span>}
                    </dd>
                  </div>
                ))}
              </dl>
              {priceNotes[i] && <p className="text-[13px] leading-[1.5] text-steel">{priceNotes[i]}</p>}
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
              {priceLine(l.slug) && <p className="text-[15px] font-semibold text-bone">{priceLine(l.slug)}</p>}
              <a href={to(joinHref(l))} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex min-h-11 items-center text-[13px] font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">
                Join at {l.town} ↗<span className="sr-only"> (GymMaster sign-up for Grizzly {l.town}, opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row" data-loc-reveal>
          <Button href={to(startHref)} arrow>
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

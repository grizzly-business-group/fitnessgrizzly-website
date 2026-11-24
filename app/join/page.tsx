import type { Metadata } from "next";
import { withShare } from "@/lib/seo";
import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import { Section, SectionHead } from "@/components/page/Blocks";
import { OfferStrip, priceLine, RatingBadge } from "@/components/page/Offer";
import { Button, FobDot } from "@/components/ui/primitives";
import { joinHref, locations, staffedPhrase } from "@/lib/data/locations";
import { ghl, site } from "@/lib/data/site";
import GhlEmbed from "@/components/page/GhlEmbed";
import { to } from "@/lib/paths";

/**
 * /join — the single "Start" step (Nov 2026 audit). Every generic Join button on the site lands here: pick a
 * home gym, see its starting price (once supplied in lib/data/site.ts → pricing), then hand off to GymMaster with
 * that gym preselected. Analytics fires join_click + begin_checkout (with the gym) on the hand-off.
 */
export const metadata: Metadata = withShare({
  title: { absolute: "Join Grizzly Fitness | Pick Your Home Gym" },
  description: "Join Grizzly Fitness online in a few minutes. Pick your home gym in Princeton, Berlin, Wautoma, Omro or Rosendale, choose a membership and get your key fob.",
  alternates: { canonical: "/join" },
});

const crumbs = [{ name: "Join", path: "/join" }];
const steps = [
  { t: "Pick your gym", b: "Choose your home gym below. You'll see its memberships, day and 7-day passes in our secure GymMaster sign-up." },
  { t: "Sign up online", b: "Choose a membership, sign the waiver and pay — it takes a few minutes. Student, military and senior discounts are available." },
  { t: "Get your fob", b: "Pick up your key fob during staffed hours. After that, the gym is yours 24/7, 365 days a year." },
];

export default function JoinPage() {
  const phone = site.phone.value;
  return (
    <PageShell crumbs={crumbs}>
      <PageHero crumbs={crumbs} compact eyebrow="Join" title={<>Pick your{" "}<br />home gym.</>} lead="Every membership starts at one home gym. Insurance members can use all five. Not sure which one? Call or text us.">
        <RatingBadge />
        <OfferStrip className="mt-3 max-w-[720px]" />
      </PageHero>

      <section aria-label="Choose your home gym" className="mx-auto max-w-[1440px] px-[var(--margin)] pb-16">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {locations.map((l) => {
            const price = priceLine(l.slug);
            return (
              <li key={l.slug} className="flex flex-col gap-4 border border-[var(--line)] bg-charcoal p-6" style={{ borderTop: `6px solid ${l.color}` }}>
                <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em]" style={{ color: `color-mix(in srgb, ${l.tint} 62%, #fff)` }}>
                  <FobDot color={l.color} size={10} />
                  {l.tag}
                </p>
                <h2 className="font-display text-[44px] font-extrabold uppercase leading-[0.85]">
                  <span className="sr-only">Grizzly Fitness </span>
                  {l.town}
                </h2>
                <p className="text-[14px] leading-[1.55] text-bone-2">
                  {l.address.street}, {l.address.city}
                  <br />
                  {staffedPhrase(l)} · 24/7 key fob
                </p>
                {price && <p className="text-[17px] font-semibold text-bone">{price}</p>}
                <RatingBadge loc={l} className="-mt-2 text-[13px]" />
                <div className="mt-auto flex flex-col gap-2 pt-1">
                  <Button href={to(joinHref(l))} arrow>
                    Join at {l.town}
                  </Button>
                  <a href={to(`/locations/${l.slug}`)} className="py-2 text-center text-[14px] font-semibold text-bone-2 underline underline-offset-4 hover:text-bone">
                    See the {l.town} gym
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {ghl.tourForm.url && (
        <Section labelledBy="tour-title">
          <SectionHead id="tour-title" eyebrow="See it first" title={<>Take a{" "}<br />free tour.</>} intro="Want to look around before you join? Tell us which gym and we'll set up a time to show you around." />
          <GhlEmbed embed={ghl.tourForm} className="mt-10 max-w-[760px]" />
        </Section>
      )}

      <Section labelledBy="next-title" tone="charcoal">
        <SectionHead id="next-title" eyebrow="How it works" title={<>Three steps{" "}<br />to your fob.</>} />
        <ol className="mt-12 grid gap-3 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.t} className="border-t-2 border-lamp bg-iron p-7">
              <p className="font-display text-[44px] font-extrabold leading-none text-lamp">0{i + 1}</p>
              <h3 className="mt-3 font-display text-[28px] font-bold uppercase leading-none">{s.t}</h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-bone-2">{s.b}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 text-[15px] text-bone-2">
          Questions first? Call or text{" "}
          <a href={to(`tel:${phone.tel}`)} className="font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">{phone.display}</a>, or{" "}
          <a href={to("/memberships")} className="font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">compare membership options</a>.
        </p>
      </Section>
    </PageShell>
  );
}

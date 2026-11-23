import type { Metadata } from "next";
import { withShare } from "@/lib/seo";
import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import { Section } from "@/components/page/Blocks";
import { Button, SiteLink } from "@/components/ui/primitives";
import { site } from "@/lib/data/site";
import { to } from "@/lib/paths";

/**
 * Equipment repair request (Phase 5) — replaces Wix /repair (308 → here). Preserves the original journey:
 * "Notice a problem with a piece of equipment? Fill out the form to let us know!" → the existing Repair Request
 * Google Form (now linked by its public URL, not an embed with ?edit_requested=true). No new backend.
 * This is a members' "report a problem" page, not a repair service — kept out of search (noindex).
 * OWNER DECISION (launch check): the form's own description says gym equipment repairs go to
 * gymrepairnow.com, and its location list still includes Baraboo and non-gym properties.
 */
export const metadata: Metadata = withShare({
  title: { absolute: "Report an Equipment Problem | Grizzly Fitness" },
  description: "Notice a problem with a piece of equipment at a Grizzly Fitness gym? Let us know which gym and which machine.",
  alternates: { canonical: "/equipment-repair" },
  robots: { index: false, follow: true },
});

const crumbs = [
  { name: "Member support", path: "/members" },
  { name: "Equipment repair", path: "/equipment-repair" },
];
const phone = site.phone.value;

export default function EquipmentRepairPage() {
  return (
    <PageShell crumbs={crumbs}>
      <PageHero
        crumbs={crumbs}
        compact
        eyebrow="Equipment repair request"
        title={<>Notice a problem{" "}<br />with a machine?</>}
        lead="Fill out the form to let us know! Tell us which gym, which piece of equipment and what's wrong."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <SiteLink k="repairForm" variant="primary" arrow>
            Open the repair request form
          </SiteLink>
          <Button href={to(`mailto:${site.email}?subject=Equipment%20problem`)} variant="secondary">
            Or email us
          </Button>
        </div>
        <p className="mt-4 text-[14px] text-bone-2">
          The form opens in Google Forms in a new tab.
        </p>
      </PageHero>

      <Section labelledBy="tips-title" tone="charcoal" className="!py-16 lg:!py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2 id="tips-title" className="font-display text-[clamp(34px,4vw,56px)] font-extrabold uppercase leading-[0.92] lg:col-span-4" data-loc-reveal>
            What to include
          </h2>
          <ul className="grid gap-x-10 gap-y-4 text-[16px] leading-[1.6] text-bone md:grid-cols-2 lg:col-span-8">
            {[
              "Which gym you were at",
              "Which machine, and where it is in the gym",
              "What it's doing (or not doing)",
              "Your name and phone number, in case we have a question",
            ].map((t) => (
              <li key={t} className="flex gap-4 border-t border-[var(--line-strong)] pt-4" data-loc-reveal>
                <i aria-hidden className="mt-[12px] h-[2px] w-4 shrink-0 bg-lamp" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-12 border-l-2 border-lamp pl-5 text-[16px] leading-[1.6] text-bone" data-loc-reveal>
          If something is unsafe, please don&apos;t use it — leave it for us and call or text{" "}
          <a href={to(`tel:${phone.tel}`)} className="font-semibold underline decoration-lamp underline-offset-4 hover:text-lamp">{phone.display}</a>
.
        </p>
      </Section>
    </PageShell>
  );
}

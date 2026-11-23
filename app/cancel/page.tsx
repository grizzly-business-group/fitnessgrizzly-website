import type { Metadata } from "next";
import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import { Section } from "@/components/page/Blocks";
import { links, site } from "@/lib/data/site";
import { to } from "@/lib/paths";

/**
 * Hidden membership-cancellation page (owner, 23 Nov 2026): www.fitnessgrizzly.com/cancel/.
 * Not in any menu, not in the sitemap, noindex/nofollow. The only link to it is a small line at the bottom of
 * /members. It embeds the Grizzly Fitness Membership Cancellation Google Form (lib/data/site.ts → links.cancelForm);
 * docs.google.com is allowed in the CSP's frame-src for this. A plain link opens the form in a new tab as a fallback.
 */
export const metadata: Metadata = {
  title: { absolute: "Cancel your membership | Grizzly Fitness" },
  description: "Request to cancel your Grizzly Fitness membership.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/cancel" },
};

const crumbs = [{ name: "Members", path: "/members" }, { name: "Cancel", path: "/cancel" }];
const formUrl = links.cancelForm.href;
const phone = site.phone.value;

export default function CancelPage() {
  return (
    <PageShell crumbs={crumbs} structuredData={false}>
      <PageHero
        crumbs={crumbs}
        compact
        eyebrow="Members"
        title={<>Cancel your{" "}<br />membership.</>}
        lead="Sorry to see you go. Fill out the form below to request your cancellation. A 30-day notice is required: your membership stays active, and scheduled payments continue, during the notice period."
      />
      <Section labelledBy="cancel-form-title" className="!pt-0">
        <h2 id="cancel-form-title" className="sr-only">Cancellation form</h2>
        <div className="max-w-[760px]">
          <iframe
            src={`${formUrl}?embedded=true`}
            title="Grizzly Fitness membership cancellation form"
            loading="lazy"
            className="block h-[1100px] w-full rounded-[2px] border-0 bg-white"
          />
          <p className="mt-4 text-[14px] text-bone-2">
            Form not showing?{" "}
            <a href={formUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">
              Open the cancellation form in a new tab<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
          <p className="mt-8 border-t border-[var(--line)] pt-6 text-[15px] leading-[1.6] text-bone-2">
            Moving, or want to switch to a different Grizzly gym instead? Call or text{" "}
            <a href={to(`tel:${phone.tel}`)} className="font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">{phone.display}</a> or email{" "}
            <a href={to(`mailto:${site.email}`)} className="font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">{site.email}</a>.
          </p>
        </div>
      </Section>
    </PageShell>
  );
}

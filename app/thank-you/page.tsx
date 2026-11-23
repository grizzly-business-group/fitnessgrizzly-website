import type { Metadata } from "next";
import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import { Button } from "@/components/ui/primitives";
import LeadEvent from "@/components/layout/LeadEvent";
import { site } from "@/lib/data/site";
import { to } from "@/lib/paths";

/**
 * Post-submit page for GoHighLevel forms and the consult calendar: set each GHL form's "On submit" action to
 * redirect to https://www.fitnessgrizzly.com/thank-you/ — the page fires the generate_lead / Meta Lead event.
 * Not indexed and not in the sitemap.
 */
export const metadata: Metadata = {
  title: { absolute: "Thank you | Grizzly Fitness" },
  description: "Thanks for reaching out to Grizzly Fitness. We'll be in touch soon.",
  robots: { index: false, follow: true },
};

const crumbs = [{ name: "Thank you", path: "/thank-you" }];

export default function ThankYouPage() {
  return (
    <PageShell crumbs={crumbs} structuredData={false}>
      <PageHero crumbs={crumbs} eyebrow="Got it" title={<>Thanks for{" "}<br />reaching out.</>} lead={`We'll be in touch soon. Need us sooner? Call or text ${site.phone.value.display}.`}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={to("/")} arrow>
            Home
          </Button>
          <Button href={to("/locations")} variant="secondary">
            Our five gyms
          </Button>
        </div>
      </PageHero>
      <LeadEvent />
    </PageShell>
  );
}

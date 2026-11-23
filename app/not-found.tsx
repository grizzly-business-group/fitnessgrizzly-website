import type { Metadata } from "next";
import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import { Button } from "@/components/ui/primitives";
import { to } from "@/lib/paths";

/** Branded 404 (Phase 5). Root not-found: served with a real 404 status for unknown URLs. */
export const metadata: Metadata = {
  title: { absolute: "Page not found | Grizzly Fitness" },
  description: "We couldn't find that page. It may have moved when we rebuilt the Grizzly Fitness website.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <PageShell crumbs={[{ name: "Page not found", path: "/404" }]} structuredData={false}>
      <PageHero
        crumbs={[{ name: "Page not found", path: "/404" }]}
        eyebrow="404"
        title={<>Missed{" "}<br />that rep.</>}
        lead="We couldn't find that page. It may have moved when we rebuilt the website."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={to("/")} arrow>
            Home
          </Button>
          <Button href={to("/locations")} variant="secondary">
            Our five gyms
          </Button>
          <Button href={to("/members")} variant="secondary">
            Member support
          </Button>
        </div>
      </PageHero>
    </PageShell>
  );
}

import type { Metadata } from "next";
import { withShare } from "@/lib/seo";
import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import { accessibility } from "@/lib/data/site-pages/accessibility";
import { site } from "@/lib/data/site";
import { to } from "@/lib/paths";

export const metadata: Metadata = withShare({
  title: { absolute: "Accessibility | Grizzly Fitness" },
  description: "How the Grizzly Fitness website is built and tested for accessibility, and how to get help if something doesn't work for you.",
  alternates: { canonical: "/accessibility" },
});

const crumbs = [{ name: "Accessibility", path: "/accessibility" }];
const phone = site.phone.value;

export default function AccessibilityPage() {
  return (
    <PageShell crumbs={crumbs}>
      <PageHero
        crumbs={crumbs}
        compact
        eyebrow="Accessibility"
        title="Accessibility"
        lead={accessibility.intro}
      />
      <div className="mx-auto max-w-[1440px] px-[var(--margin)] pb-24 lg:pb-32">
        <article className="max-w-[760px] text-[16px] leading-[1.75] text-bone-2 md:text-[17px] lg:ml-[33.4%]">
          {accessibility.sections.map((s, i) => (
            <section key={s.h} aria-labelledby={`a11y-${i}`} className="mt-12 space-y-4 border-t border-[var(--line)] pt-8 first:mt-0">
              <h2 id={`a11y-${i}`} className="font-display text-[30px] font-extrabold uppercase leading-none text-bone">{s.h}</h2>
              {s.p.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </section>
          ))}
          <section aria-labelledby="a11y-help" className="mt-12 border-l-2 border-lamp pl-6">
            <h2 id="a11y-help" className="font-display text-[30px] font-extrabold uppercase leading-none text-bone">Need help or found a problem?</h2>
            <p className="mt-4">Tell us which page you were on and what happened, and we&apos;ll help you another way.</p>
            <p className="mt-3">
              Email{" "}
              <a href={to(`mailto:${site.email}?subject=Website%20accessibility`)} className="font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">{site.email}</a>{" "}
              or call/text{" "}
              <a href={to(`tel:${phone.tel}`)} className="font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">{phone.display}</a>
.
            </p>
          </section>
          <p className="mt-12 text-[14px] text-steel">Statement prepared {accessibility.prepared}.</p>
        </article>
      </div>
    </PageShell>
  );
}

import type { Metadata } from "next";
import { withShare } from "@/lib/seo";
import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import { Section, SectionHead } from "@/components/page/Blocks";
import { Button, FobDot, SiteLink } from "@/components/ui/primitives";
import { careers } from "@/lib/data/site-pages/careers";
import { locations } from "@/lib/data/locations";
import { links, site } from "@/lib/data/site";
import wFloor from "@/public/media/wautoma/wautoma-main-floor.jpg";
import { to } from "@/lib/paths";

/**
 * Careers (Phase 5). The Wix site's only employment pathway was "More ▸ Job Application" → the Google Form
 * below; this page gives it a home. No openings are invented: the roles are the ones the application lists.
 * The live form still offers Baraboo as a preferred location — an owner edit in Google Forms (launch check).
 */
export const metadata: Metadata = withShare({
  title: { absolute: "Careers | Work at Grizzly Fitness" },
  description:
    "Work at Grizzly Fitness: we're always looking for reliable, motivated people for gym staff, personal training and coaching, cleaning and general maintenance roles. See the roles and how to apply.",
  alternates: { canonical: "/careers" },
});

const crumbs = [{ name: "Careers", path: "/careers" }];

export default function CareersPage() {
  const formReady = links.careers.formReady;
  return (
    <PageShell crumbs={crumbs}>
      <PageHero
        crumbs={crumbs}
        eyebrow="Careers"
        title={<>Work at{" "}<br />Grizzly.</>}
        lead={careers.intro}
        photo={{ src: wFloor, alt: "The main floor at Grizzly Fitness Wautoma", position: "50% 55%" }}
      >
        {formReady ? (
          <SiteLink k="careers" variant="primary" arrow>
            Apply online
          </SiteLink>
        ) : (
          <Button href={to(careers.emailApply)} arrow>
            Email us to apply
          </Button>
        )}
      </PageHero>

      <Section labelledBy="roles-title">
        <SectionHead
          id="roles-title"
          eyebrow="Roles"
          title={<>The kind of{" "}<br />work we hire for.</>}
          intro="These are the roles listed on our employment application. We don't post individual openings here — apply and tell us what you're interested in."
        />
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {careers.roles.map((r, i) => (
            <li key={r} className="flex flex-col gap-3 border-t-2 border-lamp bg-charcoal p-7" data-loc-reveal>
              <span className="font-display text-[15px] font-extrabold tracking-[0.12em] text-lamp">0{i + 1}</span>
              <h3 className="font-display text-[28px] font-bold uppercase leading-none">{r}</h3>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="apply-title" tone="charcoal">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6" data-loc-reveal>
            <SectionHead id="apply-title" eyebrow="How to apply" title={<>Ready to{" "}<br />make an impact?</>} className="!block" />
            {formReady ? (
              <>
                <p className="mt-6 text-[17px] leading-[1.65] text-bone-2">{careers.process}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <SiteLink k="careers" variant="primary" arrow>
                    Open the application
                  </SiteLink>
                </div>
                <p className="mt-5 text-[14px] text-bone-2">
                  The application opens in Google Forms in a new tab. Questions? Email{" "}
                  <a href={to(`mailto:${site.email}?subject=Careers`)} className="font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">{site.email}</a>.
                </p>
              </>
            ) : (
              <>
                <p className="mt-6 text-[17px] leading-[1.65] text-bone-2">
                  {careers.interim}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button href={to(careers.emailApply)} arrow>
                    Email us to apply
                  </Button>
                </div>
                <p className="mt-5 text-[14px] text-bone-2">
                  Opens your email app, addressed to {site.email}, with the details we need already listed.
                </p>
              </>
            )}
          </div>
          <div className="lg:col-span-5 lg:col-start-8" data-loc-reveal>
            <h3 className="text-[12px] font-bold uppercase tracking-[0.14em] text-steel">Our five gyms</h3>
            <ul className="mt-4 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {locations.map((l) => (
                <li key={l.slug}>
                  <a href={to(`/locations/${l.slug}`)} className="flex items-center gap-3 py-3.5 font-display text-[26px] font-bold uppercase leading-none hover:text-lamp">
                    <FobDot color={l.color} size={11} />
                    {l.town}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}

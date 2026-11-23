import type { Metadata } from "next";
import { withShare } from "@/lib/seo";
import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import { Ext, Section, SectionHead } from "@/components/page/Blocks";
import { Button, FobDot, SiteLink, Unverified } from "@/components/ui/primitives";
import { locations, staffedPhrase } from "@/lib/data/locations";
import { ghl, links, site } from "@/lib/data/site";
import GhlEmbed from "@/components/page/GhlEmbed";
import { to } from "@/lib/paths";

/**
 * Contact (Phase 5). Wix had no contact page — phone and email sat in the utility bar and footer. This page
 * gathers the published contact methods and the five gyms. The GoHighLevel contact form (lib/data/site.ts →
 * ghl.contactForm) appears under the hero once its embed URL is set; until then the page has no form, because a
 * form that can't deliver would be a dead end. The SMS consent checkbox and Terms/Privacy links live inside the
 * GHL form itself (A2P requirement).
 */
export const metadata: Metadata = withShare({
  title: { absolute: "Contact Grizzly Fitness | Call, Text or Email" },
  description:
    "Contact Grizzly Fitness: call or text, email support, or visit one of our five 24/7 gyms in Princeton, Berlin, Wautoma, Omro and Rosendale during staffed hours.",
  alternates: { canonical: "/contact" },
});

const crumbs = [{ name: "Contact", path: "/contact" }];
const phone = site.phone.value;

export default function ContactPage() {
  return (
    <PageShell crumbs={crumbs}>
      <PageHero crumbs={crumbs} compact eyebrow="Contact" title={<>Talk to{" "}<br />a Grizzly.</>} lead="Call, text or email — or come in during staffed hours at any of our five gyms.">
        <ul className="grid gap-3 sm:grid-cols-3 lg:max-w-[980px]">
          <li>
            <a href={to(`tel:${phone.tel}`)} className="flex h-full flex-col gap-1 border border-[var(--line-strong)] bg-charcoal p-5 hover:border-bone">
              <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-steel">Call</span>
              <span className="font-display text-[28px] font-bold leading-none">
                {phone.display}

              </span>
            </a>
          </li>
          <li>
            <a href={to(`sms:${phone.sms}`)} className="flex h-full flex-col gap-1 border border-[var(--line-strong)] bg-charcoal p-5 hover:border-bone">
              <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-steel">Text</span>
              <span className="font-display text-[28px] font-bold leading-none">{phone.display}</span>
            </a>
          </li>
          <li>
            <a href={to(`mailto:${site.email}`)} className="flex h-full flex-col gap-1 border border-[var(--line-strong)] bg-charcoal p-5 hover:border-bone">
              <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-steel">Email</span>
              <span className="break-all text-[18px] font-semibold leading-tight">{site.email}</span>
            </a>
          </li>
        </ul>
      </PageHero>

      {ghl.contactForm.url && (
        <Section labelledBy="form-title">
          <SectionHead id="form-title" eyebrow="Message us" title={<>Send us{" "}<br />a message.</>} intro="We reply by phone, text or email — usually within one business day." />
          <GhlEmbed embed={ghl.contactForm} className="mt-10 max-w-[760px]" />
        </Section>
      )}

      <Section labelledBy="gyms-title" tone="charcoal">
        <SectionHead id="gyms-title" eyebrow="Visit" title={<>Five gyms,{" "}<br />open 24/7.</>} intro="Staffed hours are when you can pick up a key fob or talk to us in person. Members can get in any time with their fob." />
        <ul className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {locations.map((l) => (
            <li key={l.slug} className="flex flex-col gap-3 border border-[var(--line)] bg-iron p-6" data-loc-reveal>
              <a href={to(`/locations/${l.slug}`)} className="flex items-center gap-2.5 font-display text-[30px] font-bold uppercase leading-none hover:text-lamp">
                <FobDot color={l.color} size={12} />
                {l.town}
              </a>
              <address className="text-[15px] not-italic leading-[1.55] text-bone-2">
                {l.address.street}
                {!l.address.verified && <Unverified note="Launch blocker #6 — Princeton address conflict (429 W. Water St. vs 101 Mechanic St.)" />}
                <br />
                {l.address.city} {l.address.zip}
              </address>
              <p className="text-[14px] text-bone">{staffedPhrase(l)}</p>
              <a href={to(l.mapsUrl)} target="_blank" rel="noopener noreferrer" className="mt-auto text-[14px] font-semibold text-lamp hover:text-lamp-hover">
                Directions ↗<span className="sr-only"> to Grizzly Fitness {l.town} (opens Google Maps)</span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="routes-title">
        <SectionHead id="routes-title" eyebrow="Quick routes" title={<>Find the{" "}<br />right place.</>} />
        <ul className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Join", b: "Sign up online in a few minutes and pick your home gym.", el: <SiteLink k="join" variant="primary" size="sm" arrow>Join online</SiteLink> },
            { t: "Members", b: "Renew, billing, the app, key fobs and getting in.", el: <Button href={to("/members")} variant="secondary" size="sm">Member support</Button> },
            { t: "Training", b: "Ask about semi-private personal training and coaching.", el: <Button href={to("/personal-training")} variant="secondary" size="sm">Personal training</Button> },
            { t: "Equipment", b: "Something broken at the gym? Let us know.", el: <Button href={to("/equipment-repair")} variant="secondary" size="sm">Report a problem</Button> },
          ].map((r) => (
            <li key={r.t} className="flex flex-col gap-3 border-t-2 border-lamp bg-charcoal p-7" data-loc-reveal>
              <h3 className="font-display text-[28px] font-bold uppercase leading-none">{r.t}</h3>
              <p className="text-[15px] leading-[1.6] text-bone-2">{r.b}</p>
              <div className="mt-auto pt-2">{r.el}</div>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-[15px] text-bone-2" data-loc-reveal>
          Follow us:{" "}
          <Ext href={to(links.instagram.href)} className="font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">Instagram</Ext> ·{" "}
          <Ext href={to(links.facebook.href)} className="font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">Facebook</Ext> ·{" "}
          <Ext href={to(links.youtube.href)} className="font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">YouTube</Ext>
        </p>
      </Section>
    </PageShell>
  );
}

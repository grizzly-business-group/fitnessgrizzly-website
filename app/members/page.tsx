import type { Metadata } from "next";
import { withShare } from "@/lib/seo";
import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import { CtaBand, Ext, Section, SectionHead } from "@/components/page/Blocks";
import { Button, FobDot, SiteLink } from "@/components/ui/primitives";
import { locations, staffedPhrase } from "@/lib/data/locations";
import { access, renew } from "@/lib/data/site-pages/members";
import { faqCategories } from "@/lib/data/site-pages/faq";
import { links, site } from "@/lib/data/site";
import bDesk from "@/public/media/berlin/berlin-front-desk-supplements.jpg";
import pRacks from "@/public/media/princeton/princeton-racks-platform.jpg";
import { to } from "@/lib/paths";

/**
 * Member support hub (Phase 5). Replaces Wix /renew (308 → here) and gathers everything an existing member
 * needs. Renewals, billing and accounts stay in GymMaster — this page only links to the verified Grizzly
 * tenant (grizzlyfitness.gymmasteronline.com) and the official GymMaster Member app listings.
 */
export const metadata: Metadata = withShare({
  title: { absolute: "Member Support | Renew, Member Portal & Key Fob Help — Grizzly Fitness" },
  description:
    "Grizzly Fitness member support: how to renew in the GymMaster Member app, log in to the member portal, pick up your key fob, get in when the gym is unstaffed, report equipment problems and contact us.",
  alternates: { canonical: "/members" },
});

const crumbs = [{ name: "Member support", path: "/members" }];
const phone = site.phone.value;
const memberFaqs = faqCategories.flatMap((c) => c.items).filter((f) => ["key-fob", "all-locations", "cancellation", "app"].includes(f.id));

export default function MembersPage() {
  return (
    <PageShell crumbs={crumbs}>
      <PageHero
        crumbs={crumbs}
        eyebrow="Member support"
        title={<>Already a{" "}<br />Grizzly?</>}
        lead="Renew, update billing and manage your account in the GymMaster Member app or the member portal. Everything else — your key fob, getting in, a broken machine — starts here."
        photo={{ src: bDesk, alt: "The front desk at Grizzly Fitness Berlin with supplements on the shelves behind it", position: "50% 50%" }}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={to("#renew")} arrow>
            How to renew
          </Button>
          <SiteLink k="memberPortal">Member portal</SiteLink>
        </div>
      </PageHero>

      <nav aria-label="Member support: choose what you need" className="border-y border-[var(--line)] bg-charcoal">
        <ul className="mx-auto grid max-w-[1440px] gap-px bg-[var(--line)] px-0 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { h: links.join.href, t: "New here?", d: "Join online in a few minutes", ext: true },
            { h: "#renew", t: "Renew", d: "Three steps in the GymMaster app" },
            { h: "#app", t: "Your account", d: "App and member portal log-in" },
            { h: "#access", t: "Key fob & getting in", d: "Pickup, 24/7 access, unstaffed hours" },
            { h: "#help", t: "Something not right?", d: "Broken machine, home gym, anything else" },
          ].map((c) => (
            <li key={c.t} className="bg-charcoal">
              <a
                href={to(c.h)}
                {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex h-full flex-col gap-1 px-[var(--margin)] py-5 hover:bg-iron lg:px-6"
              >
                <span className="font-display text-[22px] font-bold uppercase leading-none group-hover:text-lamp">
                  {c.t} <span aria-hidden>{c.ext ? "↗" : "→"}</span>
                </span>
                <span className="text-[14px] text-bone-2">{c.d}</span>
                {c.ext && <span className="sr-only"> (opens GymMaster sign-up in a new tab)</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <Section labelledBy="renew-title" id="renew" className="scroll-mt-[var(--header-h)]">
        <SectionHead id="renew-title" eyebrow="Renew" title={<>Renew in{" "}<br />three steps.</>} intro="You renew in the GymMaster Member app — the same app you use to update billing and view your membership details." />
        <ol className="mt-12 grid gap-3 lg:grid-cols-3">
          {renew.steps.map((s, i) => (
            <li key={s.title} className="flex flex-col gap-4 border-t-2 border-lamp bg-charcoal p-8" data-loc-reveal>
              <span className="font-display text-[56px] font-extrabold leading-none text-lamp">{i + 1}</span>
              <h3 className="font-display text-[30px] font-bold uppercase leading-none">{s.title}</h3>
              <p className="text-[16px] leading-[1.6] text-bone-2">{s.body}</p>
              {s.app && (
                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  <SiteLink k="appStore" size="sm" />
                  <SiteLink k="googlePlay" size="sm" />
                </div>
              )}
            </li>
          ))}
        </ol>
        <p className="mt-8 text-[16px] text-bone-2" data-loc-reveal>
          Need help?{" "}
          <a href={to(`mailto:${site.email}?subject=Membership%20renewal`)} className="font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">
            Email us at {site.email}
          </a>
        </p>
      </Section>

      <Section labelledBy="app-title" id="app" tone="charcoal">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6" data-loc-reveal>
            <SectionHead id="app-title" eyebrow="App & portal" title={<>Your account,{" "}<br />two ways in.</>} className="!block" />
            <p className="mt-6 text-[17px] leading-[1.65] text-bone-2">
              Use the GymMaster Member app on your phone, or log in to the member portal in any browser. Both use the email address on your Grizzly Fitness account.
            </p>
          </div>
          <ul className="grid gap-3 lg:col-span-6" data-loc-reveal>
            <li className="border border-[var(--line-strong)] p-7">
              <h3 className="font-display text-[26px] font-bold uppercase leading-none">GymMaster Member app</h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-bone-2">Renew, update billing, view membership details, manage your account and book classes. Never used it? Tap “Get My Login”.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <SiteLink k="appStore" size="sm" />
                <SiteLink k="googlePlay" size="sm" />
              </div>
            </li>
            <li className="border border-[var(--line-strong)] p-7">
              <h3 className="font-display text-[26px] font-bold uppercase leading-none">Member portal (web)</h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-bone-2">The Grizzly Fitness GymMaster member log-in, for when you&apos;d rather not install the app.</p>
              <div className="mt-5">
                <SiteLink k="memberPortal" size="sm">Log in to the member portal</SiteLink>
              </div>
            </li>
          </ul>
        </div>
      </Section>

      <Section labelledBy="access-title" id="access">
        <SectionHead id="access-title" eyebrow="Access" title={access.title} intro="Every gym is open 24/7, 365 days a year. Staffed hours are when you can pick up a fob or talk to us in person." />
        <ul className="mt-12 grid gap-x-10 gap-y-5 md:grid-cols-2">
          {access.points.map((p) => (
            <li key={p.slice(0, 24)} className="flex gap-4 border-t border-[var(--line-strong)] pt-5 text-[17px] leading-[1.6] text-bone" data-loc-reveal>
              <i aria-hidden className="mt-[13px] h-[2px] w-4 shrink-0 bg-lamp" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row" data-loc-reveal>
          <Button href={to(`tel:${phone.tel}`)}>
            Call {phone.display}
          </Button>

        </div>
        <h3 className="mt-16 text-[12px] font-bold uppercase tracking-[0.14em] text-steel" data-loc-reveal>Staffed hours — fob pickup</h3>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {locations.map((l) => (
            <li key={l.slug} className="flex flex-col gap-2 border border-[var(--line)] bg-charcoal p-5" data-loc-reveal>
              <a href={to(`/locations/${l.slug}`)} className="flex items-center gap-2.5 font-display text-[26px] font-bold uppercase leading-none hover:text-lamp">
                <FobDot color={l.color} size={11} />
                {l.town}
              </a>
              <p className="text-[13px] leading-[1.5] text-bone-2">{staffedPhrase(l)}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="help-title" id="help" tone="charcoal">
        <SectionHead id="help-title" eyebrow="Help" title={<>Something{" "}<br />not right?</>} />
        <ul className="mt-12 grid gap-3 md:grid-cols-3">
          <li className="flex flex-col gap-3 border border-[var(--line-strong)] p-7" data-loc-reveal>
            <h3 className="font-display text-[26px] font-bold uppercase leading-none">A machine is broken</h3>
            <p className="text-[15px] leading-[1.6] text-bone-2">Notice a problem with a piece of equipment? Let us know which gym and which machine.</p>
            <a href={to("/equipment-repair")} className="mt-auto self-start text-[14px] font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">
              Report an equipment problem <span aria-hidden>→</span>
            </a>
          </li>
          <li className="flex flex-col gap-3 border border-[var(--line-strong)] p-7" data-loc-reveal>
            <h3 className="font-display text-[26px] font-bold uppercase leading-none">Change your home gym</h3>
            <p className="text-[15px] leading-[1.6] text-bone-2">Your membership is for the gym you signed up at. If you&apos;d like to switch your home location, just let us know.</p>
            <a href={to(`mailto:${site.email}?subject=Change%20my%20home%20gym`)} className="mt-auto self-start text-[14px] font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">
              Email us <span aria-hidden>→</span>
            </a>
          </li>
          <li className="flex flex-col gap-3 border border-[var(--line-strong)] p-7" data-loc-reveal>
            <h3 className="font-display text-[26px] font-bold uppercase leading-none">Anything else</h3>
            <p className="text-[15px] leading-[1.6] text-bone-2">
              Call or text {phone.display}
 or email {site.email}.
            </p>
            <a href={to("/contact")} className="mt-auto self-start text-[14px] font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">
              All the ways to reach us <span aria-hidden>→</span>
            </a>
          </li>
        </ul>
      </Section>

      <Section labelledBy="member-faq-title" id="member-faq">
        <SectionHead id="member-faq-title" eyebrow="FAQ" title={<>Member{" "}<br />questions.</>} intro={<>Quick answers from our FAQ. <a href={to("/faq")} className="font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">See all questions →</a></>} />
        <ul className="mt-12 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {memberFaqs.map((f) => (
            <li key={f.id} data-loc-reveal>
              <a href={to(`/faq#${f.id}`)} className="flex items-center justify-between gap-6 py-5 text-[18px] font-semibold hover:text-lamp md:text-[20px]">
                {f.q}
                <span aria-hidden className="text-lamp">→</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-[15px] text-bone-2" data-loc-reveal>
          Not a member yet? <Ext href={to(links.join.href)} className="font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">Join online</Ext> or{" "}
          <a href={to("/memberships")} className="font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">see membership options</a>.
        </p>
        {/* Small, deliberately quiet route to the hidden cancellation page (owner, 23 Nov 2026). */}
        <p className="mt-4 text-[13px] text-steel" data-loc-reveal>
          Need to cancel your membership?{" "}
          <a href={to("/cancel")} className="font-semibold text-bone-2 underline underline-offset-4 hover:text-bone">Cancel here</a>
        </p>
      </Section>

      <CtaBand title="1% better" accent="than yesterday." photo={pRacks} secondary={{ label: "Find your gym", href: "/locations" }} />
    </PageShell>
  );
}

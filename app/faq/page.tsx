import type { Metadata } from "next";
import { withShare } from "@/lib/seo";
import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import HashDetails from "@/components/page/HashDetails";
import { Section } from "@/components/page/Blocks";
import { Button, Unverified } from "@/components/ui/primitives";
import { faqCategories, type FaqBlock } from "@/lib/data/site-pages/faq";
import { site, startHref } from "@/lib/data/site";
import { to } from "@/lib/paths";

/**
 * FAQ (Phase 5) — all seven questions from Wix /faqs (308 → here), wording preserved. Native <details>
 * accordions: keyboard and screen-reader support built in, work without JavaScript, and Chrome's
 * find-in-page opens a closed answer. /faq#<id> opens that answer (HashDetails).
 */
export const metadata: Metadata = withShare({
  title: { absolute: "FAQ | Memberships, Key Fobs, Billing & the App — Grizzly Fitness" },
  description:
    "Answers to common Grizzly Fitness questions: signing up online, getting your key fob, access to all locations, minimum term and cancellation notice, discounts, and using the GymMaster Member app.",
  alternates: { canonical: "/faq" },
});

const crumbs = [{ name: "FAQ", path: "/faq" }];

const plain = (b: FaqBlock[]) => b.map((x) => ("p" in x ? x.p : x.ol.map((s, i) => `${i + 1}. ${s}`).join(" "))).join(" ");
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqCategories.flatMap((c) => c.items).map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: plain(f.a) },
  })),
};

const ext = (href: string) => /^https?:/.test(href);

export default function FaqPage() {
  return (
    <PageShell crumbs={crumbs} extraLd={[faqLd]}>
      <PageHero
        crumbs={crumbs}
        compact
        eyebrow="Frequently asked questions"
        title={<>Questions,{" "}<br />answered.</>}
        lead={
          <>
            Can&apos;t find what you&apos;re looking for? Email{" "}
            <a href={to(`mailto:${site.email}`)} className="font-semibold underline decoration-lamp underline-offset-4 hover:text-lamp">{site.email}</a>{" "}
            or call/text {site.phone.value.display}
.
          </>
        }
      >
        <ul className="flex flex-wrap gap-2">
          {faqCategories.map((c) => (
            <li key={c.id}>
              <a href={to(`#${c.id}-title`)} className="inline-flex min-h-11 items-center border border-[var(--line-strong)] px-4 text-[13px] font-semibold uppercase tracking-[0.1em] hover:border-bone">
                {c.title}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      {faqCategories.map((c, ci) => (
        <Section key={c.id} labelledBy={`${c.id}-title`} tone={ci % 2 ? "charcoal" : "dark"} className="!py-16 lg:!py-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <h2 id={`${c.id}-title`} className="scroll-mt-[calc(var(--header-h)+24px)] font-display text-[clamp(36px,4.4vw,64px)] font-extrabold uppercase leading-[0.92] lg:col-span-4" data-loc-reveal>
              {c.title}
            </h2>
            <div className="faq-list border-t border-[var(--line-strong)] lg:col-span-8">
              {c.items.map((f) => (
                <details key={f.id} id={f.id} className="faq-item group scroll-mt-[calc(var(--header-h)+24px)] border-b border-[var(--line-strong)]" data-loc-reveal>
                  <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-5 text-[18px] font-semibold leading-[1.35] hover:text-lamp md:text-[21px] [&::-webkit-details-marker]:hidden">
                    <span>{f.q}</span>
                    <span aria-hidden className="relative h-4 w-4 shrink-0">
                      <i className="absolute left-0 top-[7px] h-[2px] w-4 bg-lamp" />
                      <i className="absolute left-[7px] top-0 h-4 w-[2px] bg-lamp transition-transform duration-200 group-open:scale-y-0" />
                    </span>
                  </summary>
                  <div className="pb-7 pr-2 text-[16px] leading-[1.7] text-bone-2 md:text-[17px] md:pr-10">
                    {f.a.map((b, i) =>
                      "p" in b ? (
                        <p key={i} className="mt-0 [&+*]:mt-4">
                          {b.p}
                          {f.note && !f.public && i === f.a.length - 1 && <Unverified note={f.note} />}
                        </p>
                      ) : (
                        <ol key={i} className="space-y-2">
                          {b.ol.map((s, j) => (
                            <li key={s} className="flex gap-3">
                              <span className="w-6 shrink-0 font-display text-[19px] font-extrabold leading-[1.45] text-lamp">{j + 1}</span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ol>
                      ),
                    )}
                    {f.public && (
                      <p className="mt-4 border-l-2 border-lamp pl-4 text-[15px] text-bone">
                        {f.public}
                        <Unverified note={f.note} />
                      </p>
                    )}
                    {f.links && (
                      <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                        {f.links.map((l) => (
                          <li key={l.href}>
                            <a
                              href={to(l.href)}
                              {...(ext(l.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                              className="inline-flex min-h-11 items-center text-[14px] font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp"
                            >
                              {l.label}
                              {ext(l.href) ? (
                                <>
                                  &nbsp;<span aria-hidden>↗</span>
                                  <span className="sr-only"> (opens in a new tab)</span>
                                </>
                              ) : (
                                <span aria-hidden>&nbsp;→</span>
                              )}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Section>
      ))}

      <Section labelledBy="faq-more-title" className="!py-16 lg:!py-20">
        <div className="flex flex-col gap-6 border border-[var(--line-strong)] p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10" data-loc-reveal>
          <div>
            <h2 id="faq-more-title" className="font-display text-[34px] font-extrabold uppercase leading-none">Still need a hand?</h2>
            <p className="mt-3 text-[16px] text-bone-2">Members can renew and manage everything in the GymMaster Member app.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={to("/members")} variant="secondary">
              Member support
            </Button>
            <Button href={to(startHref)} arrow>
              Join online
            </Button>
          </div>
        </div>
      </Section>
      <HashDetails />
    </PageShell>
  );
}

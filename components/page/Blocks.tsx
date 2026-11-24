import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { startHref } from "@/lib/data/site";
import { Button, Eyebrow } from "@/components/ui/primitives";
import { to } from "@/lib/paths";

/** Shared building blocks for informational pages — one heading style, one card style, one CTA band. */

export function SectionHead({ id, eyebrow, title, intro, tone = "dark", className = "" }: { id: string; eyebrow?: string; title: ReactNode; intro?: ReactNode; tone?: "dark" | "paper"; className?: string }) {
  return (
    <div className={`grid gap-6 lg:grid-cols-12 lg:items-end ${className}`} data-loc-reveal>
      <div className="lg:col-span-7">
        {eyebrow && <Eyebrow style={tone === "paper" ? { color: "var(--color-lamp-deep)" } : undefined}>{eyebrow}</Eyebrow>}
        <h2 id={id} className="mt-4 font-display text-[clamp(40px,5vw,80px)] font-extrabold uppercase leading-[0.9]">
          {title}
        </h2>
      </div>
      {intro && <div className={`text-[16px] leading-[1.65] md:text-[18px] lg:col-span-5 ${tone === "paper" ? "text-ink-2" : "text-bone-2"}`}>{intro}</div>}
    </div>
  );
}

export function Section({ children, labelledBy, tone = "dark", id, className = "" }: { children: ReactNode; labelledBy: string; tone?: "dark" | "charcoal" | "paper"; id?: string; className?: string }) {
  const bg = tone === "paper" ? "bg-paper text-ink" : tone === "charcoal" ? "border-t border-[var(--line)] bg-charcoal" : "";
  return (
    <section id={id} aria-labelledby={labelledBy} className={bg}>
      <div className={`mx-auto max-w-[1440px] px-[var(--margin)] py-20 lg:py-28 ${className}`}>{children}</div>
    </section>
  );
}

/** Closing band shared by informational pages: one strong line, real photo, the three main actions. */
export function CtaBand({ title, accent, photo, secondary }: { title: string; accent: string; photo: StaticImageData; secondary?: { label: string; href: string } }) {
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden py-24 lg:py-32">
      <div data-loc-parallax className="absolute -inset-x-[5%] -inset-y-[10%] -z-10">
        <Image src={photo} alt="" fill sizes="100vw" placeholder="blur" className="object-cover [filter:contrast(1.08)_saturate(.75)_brightness(.32)]" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(70%_70%_at_50%_50%,rgba(14,13,11,.15),rgba(14,13,11,.85))]" />
      <div className="mx-auto max-w-[1100px] px-[var(--margin)] text-center" data-loc-reveal>
        <h2 id="cta-title" className="font-display text-[clamp(48px,7.5vw,120px)] font-extrabold uppercase leading-[0.88]">
          {title}
          {" "}<br />
          <span className="text-lamp">{accent}</span>
        </h2>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={to(startHref)} arrow>
            Join online
          </Button>
          <Button href={to(secondary?.href ?? "/locations")} variant="secondary">
            {secondary?.label ?? "Find your gym"}
          </Button>
        </div>
      </div>
    </section>
  );
}

/** External link with the standard "↗ (opens in a new tab)" affordance. */
export function Ext({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={to(href)} target="_blank" rel="noopener noreferrer" className={className}>
      {children} <span aria-hidden>↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

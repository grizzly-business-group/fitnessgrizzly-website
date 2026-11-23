import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { Grain } from "@/components/ui/primitives";
import { to } from "@/lib/paths";

/**
 * Informational-page hero. Two compositions:
 *   photo — a real gym photo full-bleed behind left-weighted type (About, Locations, Gallery…)
 *   plain — type only on iron, for utility pages (FAQ, legal, repair) so the task comes first
 * Shorter than the location heroes, and with the same short CSS entrance (none under reduced motion).
 */
export default function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  photo,
  children,
  compact = false,
}: {
  crumbs: { name: string; path: string }[];
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  photo?: { src: StaticImageData; alt: string; position?: string };
  children?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section
      aria-labelledby="page-title"
      className={`loc-hero relative isolate flex items-end overflow-hidden bg-iron pt-[calc(var(--header-h)+40px)] ${
        photo ? "min-h-[min(78svh,760px)] pb-14 lg:pb-20" : compact ? "pb-10 lg:pb-14" : "pb-14 lg:pb-20"
      }`}
    >
      {photo && (
        <>
          <div data-loc-parallax className="absolute inset-y-0 -left-[4%] -right-[4%] -z-10">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              preload
              fetchPriority="high"
              sizes="108vw"
              quality={75}
              placeholder="blur"
              className="loc-hero-photo loc-hero-grade object-cover"
              style={{ objectPosition: photo.position }}
            />
          </div>
          <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(14,13,11,.93)_0%,rgba(14,13,11,.74)_42%,rgba(14,13,11,.2)_80%),linear-gradient(0deg,rgba(14,13,11,.95)_0%,rgba(14,13,11,0)_50%),linear-gradient(180deg,rgba(14,13,11,.6)_0%,rgba(14,13,11,0)_22%)]" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-[rgba(14,13,11,.4)] md:hidden" />
        </>
      )}
      <Grain className="-z-10" />
      <div className="mx-auto w-full max-w-[1440px] px-[var(--margin)]">
        <nav aria-label="Breadcrumb" className="hero-halo relative z-10 mb-7 text-[13px] text-bone-2">
          <ol className="flex flex-wrap items-center gap-2">
            <li><a href={to("/")} className="hover:text-bone">Home</a></li>
            {crumbs.map((c, i) => (
              <li key={c.path} className="flex items-center gap-2">
                <span aria-hidden>/</span>
                {i === crumbs.length - 1 ? (
                  <span aria-current="page" className="text-bone">{c.name}</span>
                ) : (
                  <a href={to(c.path)} className="hover:text-bone">{c.name}</a>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="loc-in loc-in-1 hero-halo text-[12px] font-semibold uppercase tracking-[0.16em] text-lamp md:text-[13px]">{eyebrow}</p>
        <h1 id="page-title" className={`loc-in loc-in-2 hero-halo mt-4 max-w-[1100px] font-display font-extrabold uppercase leading-[0.86] ${compact ? "text-[clamp(48px,7vw,104px)]" : "text-[clamp(56px,9vw,148px)]"}`}>
          {title}
        </h1>
        {lead && <div className="hero-halo mt-6 max-w-[680px] text-[17px] leading-[1.6] text-bone md:text-[20px]">{lead}</div>}
        {children && <div className="loc-in loc-in-4 mt-8">{children}</div>}
      </div>
    </section>
  );
}

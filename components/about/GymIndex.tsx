"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import { to } from "@/lib/paths";

export type GymRow = {
  slug: string;
  town: string;
  tag: string;
  summary: string;
  staffed: string;
  color: string;
  tint: string;
  href: string;
  photo: { src: StaticImageData; alt: string; position?: string };
};

/**
 * "Five communities, one mission" — an editorial index of the five gyms. Complements the homepage's
 * Five Lights (one big lit room at a time) with a reading-list view: every gym is a plain link row, and on
 * wide screens a large preview beside the list follows hover/focus. The preview is decorative (each row
 * carries its own text), so nothing depends on it. Phones show each gym's photo inside its row instead.
 */
export default function GymIndex({ gyms }: { gyms: GymRow[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <ol className="border-t border-[var(--line-strong)] lg:col-span-7">
        {gyms.map((g, i) => (
          <li key={g.slug} className="border-b border-[var(--line-strong)]" data-loc-reveal>
            <a
              href={to(g.href)}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              data-active={active === i ? "" : undefined}
              className="about-gym group grid grid-cols-[52px_1fr] gap-x-4 py-6 md:grid-cols-[72px_1fr_auto] md:items-center md:py-7"
              style={{ ["--gym" as string]: g.color, ["--gym-tint" as string]: g.tint }}
            >
              <span className="font-display text-[22px] font-extrabold leading-none text-steel transition-colors duration-300 group-hover:text-[var(--gym-tint)] group-data-[active]:text-[var(--gym-tint)] md:text-[28px]">
                0{i + 1}
              </span>
              <span>
                <span className="block text-[12px] font-semibold uppercase tracking-[0.16em] text-bone-2">{g.tag}</span>
                <span className="mt-1.5 block font-display text-[clamp(44px,5.4vw,84px)] font-extrabold uppercase leading-[0.86] transition-colors duration-300 group-hover:text-lamp group-data-[active]:text-lamp">
                  {g.town}
                </span>
                <span className="mt-3 block max-w-[560px] text-[15px] leading-[1.55] text-bone-2 md:text-[16px]">{g.summary}</span>
                <span className="mt-2 block text-[13px] text-steel">{g.staffed}</span>
                <span className="relative mt-5 block aspect-[16/10] overflow-hidden lg:hidden">
                  <Image src={g.photo.src} alt="" fill sizes="(min-width:768px) 80vw, 92vw" placeholder="blur" className="object-cover brightness-[.86]" style={{ objectPosition: g.photo.position }} />
                  <i aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: g.color }} />
                </span>
              </span>
              <span aria-hidden className="col-start-2 mt-4 text-[13px] font-bold uppercase tracking-[0.12em] text-bone md:col-start-3 md:mt-0">
                Visit <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
              <span className="sr-only"> the Grizzly Fitness {g.town} page</span>
            </a>
          </li>
        ))}
      </ol>
      <div aria-hidden className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-[calc(var(--header-h)+32px)]">
          <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
            {gyms.map((g, i) => (
              <Image
                key={g.slug}
                src={g.photo.src}
                alt=""
                fill
                sizes="38vw"
                placeholder="blur"
                className={`about-gym-preview object-cover ${active === i ? "is-on" : ""}`}
                style={{ objectPosition: g.photo.position }}
              />
            ))}
            <i className="absolute inset-x-0 top-0 h-1.5 transition-colors duration-500" style={{ background: gyms[active].color }} />
            <span className="absolute bottom-4 left-4 bg-iron/80 px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-bone">
              Grizzly Fitness {gyms[active].town}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

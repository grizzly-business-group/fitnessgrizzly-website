"use client";

import { useEffect, useState } from "react";
import { links, site } from "@/lib/data/site";
import { to } from "@/lib/paths";

/** Sticky bottom bar on phones: appears once the hero has scrolled away. */
export default function MobileActionBar({ directions, join }: { directions?: { href: string; label: string }; join?: string } = {}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav
      aria-label="Quick actions"
      data-mobile-bar
      inert={!show}
      className={`fixed inset-x-0 bottom-0 z-40 grid h-[64px] grid-cols-[1fr_1fr_1.3fr] border-t border-[var(--line-strong)] bg-iron pb-[env(safe-area-inset-bottom)] text-[12px] font-bold uppercase tracking-[0.1em] transition-transform duration-300 lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a href={to(`tel:${site.phone.value.tel}`)} className="grid place-items-center border-r border-[var(--line)]">
        Call
      </a>
      {directions ? (
        <a href={to(directions.href)} target="_blank" rel="noopener noreferrer" className="grid place-items-center border-r border-[var(--line)]">
          {directions.label}
          <span className="sr-only"> (opens Google Maps)</span>
        </a>
      ) : (
        <a href={to("/locations")} className="grid place-items-center border-r border-[var(--line)]">
          Find a gym
        </a>
      )}
      <a href={to(join ?? links.join.href)} target="_blank" rel="noopener noreferrer" className="grid place-items-center bg-lamp text-iron">
        Join now<span className="sr-only"> (opens in a new tab)</span>
      </a>
    </nav>
  );
}

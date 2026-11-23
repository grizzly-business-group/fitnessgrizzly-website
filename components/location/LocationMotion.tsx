"use client";

import { useEffect } from "react";

/**
 * Location-page motion — deliberately light (Phase 4 brief): no pinning, no scroll hijacking.
 *  · reveals: [data-loc-reveal] fade/rise once as they enter. Only elements still below the fold are
 *    pre-hidden, and only after JS runs — so nothing is hidden without JS or above the fold.
 *  · parallax: [data-loc-parallax] drifts a few percent with scroll (desktop, fine pointer only).
 *  · reduced motion: nothing runs; everything is in place.
 */
export default function LocationMotion() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-loc-reveal]"));
    const below = els.filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.92);
    below.forEach((el) => el.classList.add("loc-pre"));
    // Reveal check runs on the same rAF-throttled scroll tick as the parallax (a plain rect test —
    // more dependable than IntersectionObserver under fast or programmatic scrolling).
    let pending = below.slice();
    const reveal = () => {
      if (!pending.length) return;
      const edge = window.innerHeight * 0.92;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top < edge) {
          el.classList.add("loc-shown");
          return false;
        }
        return true;
      });
    };
    // Never leave content hidden if a keyboard or screen-reader user moves focus into it first.
    // Instant (no fade) so a focused control is never drawn partly transparent.
    const onFocus = (e: FocusEvent) => {
      const t = e.target as Element | null;
      const el = t?.closest?.(".loc-pre");
      if (el) el.classList.add("loc-shown", "loc-instant");
      // Tabbing in before the hero entrance has finished: finish it at once.
      t?.closest?.(".loc-hero")?.getAnimations({ subtree: true }).forEach((a) => {
        try {
          a.finish();
        } catch {
          /* infinite animations can't finish — leave them */
        }
      });
    };
    document.addEventListener("focusin", onFocus);

    let raf = 0;
    const layers = Array.from(document.querySelectorAll<HTMLElement>("[data-loc-parallax]"));
    const fine = matchMedia("(min-width: 1024px) and (pointer: fine)");
    const tick = () => {
      raf = 0;
      reveal();
      if (!fine.matches) return layers.forEach((l) => (l.style.transform = ""));
      const vh = window.innerHeight;
      layers.forEach((l) => {
        const r = l.parentElement!.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const p = (r.top + r.height / 2 - vh / 2) / (vh + r.height); // -0.5 … 0.5 across the viewport
        l.style.transform = `translate3d(${(-p * 4).toFixed(2)}%, ${(p * 6).toFixed(2)}%, 0)`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    // Safety net: if a scroll tick is ever missed (busy main thread, programmatic jumps), re-check every
    // 400 ms until everything has been revealed. Cheap — one rect read per still-hidden element.
    const sweep = window.setInterval(() => {
      reveal();
      if (!pending.length) window.clearInterval(sweep);
    }, 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      document.removeEventListener("focusin", onFocus);
      window.clearInterval(sweep);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      els.forEach((el) => el.classList.remove("loc-pre", "loc-shown", "loc-instant"));
      layers.forEach((l) => (l.style.transform = ""));
    };
  }, []);
  return null;
}

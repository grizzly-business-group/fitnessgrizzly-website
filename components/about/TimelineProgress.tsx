"use client";

import { useEffect } from "react";

/**
 * Scroll-progress line for the About timeline. Sets --tl-p (0→1) on [data-timeline] from how far the
 * reader has scrolled through it, and marks each [data-stage] "passed" once its dot reaches the
 * reading line (40% down the viewport). No pinning, no scroll hijacking: it only reads scroll position.
 * Reduced motion: the line is drawn full and every stage shows as passed — nothing animates.
 */
export default function TimelineProgress() {
  useEffect(() => {
    const tl = document.querySelector<HTMLElement>("[data-timeline]");
    if (!tl) return;
    const stages = Array.from(tl.querySelectorAll<HTMLElement>("[data-stage]"));
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      tl.style.setProperty("--tl-p", "1");
      stages.forEach((s) => s.setAttribute("data-passed", ""));
      return;
    }
    let raf = 0;
    const tick = () => {
      raf = 0;
      const r = tl.getBoundingClientRect();
      const line = innerHeight * 0.4;
      const p = Math.min(1, Math.max(0, (line - r.top) / r.height));
      tl.style.setProperty("--tl-p", p.toFixed(4));
      stages.forEach((s) => {
        const dot = s.querySelector<HTMLElement>("[data-dot]") ?? s;
        s.toggleAttribute("data-passed", dot.getBoundingClientRect().top < line);
      });
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", on);
      removeEventListener("resize", on);
    };
  }, []);
  return null;
}

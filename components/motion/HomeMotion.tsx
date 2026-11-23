"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

/** Animated scroll for chapter / gym jumps. A GSAP tween (not native smooth scroll, which Chrome
 *  occasionally dropped mid-pin: 2 of 30 clicks in Milestone E testing). Stops if the user scrolls. */
const glideTo = (y: number) => gsap.to(window, { scrollTo: { y, autoKill: true }, duration: 0.8, ease: "power2.inOut", overwrite: true });

/** Set by fiveLights() while the pinned Five Lights scene exists: scrolls to gym i's lit position. */
let gymJump: ((i: number, smooth: boolean) => void) | null = null;
/** A deep link (/#gyms, /#gym-berlin…) is re-applied once, after pin spacing exists. */
let initialHashHandled = false;

/**
 * Back/forward return to the homepage (Phase 5C fix). The browser restores the old scroll position before
 * GSAP has added the pin spacing, so the page is still short and the position gets clamped (returning from a
 * gym page left visitors ~6,000 px above where they were). The homepage saves its own position on pagehide
 * and re-applies it once the pins exist. Fresh loads and deep links are unaffected.
 */
const SCROLL_KEY = "gf-home-scroll";
function isBackForward() {
  const nav = performance.getEntriesByType?.("navigation")[0] as PerformanceNavigationTiming | undefined;
  return nav?.type === "back_forward";
}

function applyInitialHash() {
  if (initialHashHandled) return;
  initialHashHandled = true;
  let saved: number | null = null;
  try {
    const v = sessionStorage.getItem(SCROLL_KEY);
    saved = v === null ? null : Number(v);
  } catch {
    /* storage unavailable */
  }
  if (isBackForward() && saved !== null && Number.isFinite(saved)) {
    window.scrollTo(0, saved);
    return;
  }
  const id = decodeURIComponent(location.hash.slice(1));
  const el = id ? document.getElementById(id) : null;
  if (!el) return;
  if (el.matches("[data-gym]") && gymJump) gymJump(Number(el.dataset.gym), false);
  else el.scrollIntoView();
}

/**
 * All homepage motion lives here and only here (Phase 2 Motion Design System).
 * Content is fully server-rendered; this component layers motion on top:
 *   M1 Lights On intro · M2 statement scrub · M3 pinned chapters · M4 Five Lights · R1 reveals · P1 parallax
 * gsap.matchMedia gives three modes and reverts everything when the mode changes:
 *   full    — ≥1024px, fine pointer, motion allowed  → pinned + scrubbed scenes
 *   lite    — <1024px or coarse pointer, motion allowed → un-pinned, enter-triggered reveals
 *   reduced — prefers-reduced-motion → no animation at all (final states)
 */
export default function HomeMotion() {
  useGSAP(() => {
    const root = document.documentElement;
    if (isBackForward()) history.scrollRestoration = "manual";
    const savePosition = () => {
      try {
        sessionStorage.setItem(SCROLL_KEY, String(Math.round(window.scrollY)));
      } catch {
        /* storage unavailable */
      }
    };
    window.addEventListener("pagehide", savePosition);
    const mm = gsap.matchMedia();

    mm.add(
      {
        full: "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        lite: "((max-width: 1023.98px) or (pointer: coarse)) and (prefers-reduced-motion: no-preference)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (ctx) => {
        const { full, reduce } = ctx.conditions as Record<string, boolean>;
        if (reduce) {
          root.dataset.motion = "reduced";
          return () => delete root.dataset.motion;
        }
        root.dataset.motion = full ? "full" : "lite";

        const cleanups: Array<() => void> = [];
        reveals();
        if (full) {
          statementScrub();
          cleanups.push(storyPinned(), fiveLights());
          parallax();
        } else {
          statementLite();
          storyLite();
        }
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          applyInitialHash();
        });
        return () => {
          cleanups.forEach((fn) => fn());
          delete root.dataset.motion;
          document.querySelectorAll<HTMLElement>("[data-gym]").forEach((g, i) => (g.dataset.active = i === 0 ? "true" : "false"));
        };
      },
    );
    return () => {
      window.removeEventListener("pagehide", savePosition);
      mm.revert();
    };
  });
  return null;
}

/* ---------------- M1 · Lights On intro ----------------
   Runs in pure CSS (globals.css, html[data-intro="play"]) so it starts on first paint,
   independent of hydration speed, and works without JS. The inline head script in
   app/layout.tsx decides whether it plays (once per session, not for reduced motion)
   and skips to the end on any interaction. */

/* ---------------- R1 · Enter reveals ---------------- */
function reveals() {
  const els = gsap.utils.toArray<HTMLElement>("[data-reveal]");
  gsap.set(els, { autoAlpha: 0, y: 40 });
  ScrollTrigger.batch(els, {
    start: "top 88%",
    once: true,
    onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.08, overwrite: true }),
  });
}

/* ---------------- M2 · Statement: letters of BIG DREAMERS switch on ---------------- */
function statementScrub() {
  const section = document.querySelector<HTMLElement>("[data-scene=statement]");
  const pin = section?.querySelector<HTMLElement>("[data-statement-pin]");
  if (!section || !pin) return;
  const letters = gsap.utils.toArray<HTMLElement>("[data-st-letter]", section);
  const tl = gsap.timeline({
    scrollTrigger: { trigger: section, start: "top top", end: "+=120%", pin, scrub: 1, anticipatePin: 1 },
    defaults: { ease: "none" },
  });
  tl.fromTo("[data-st-town]", { autoAlpha: 0.25 }, { autoAlpha: 1, stagger: 0.04, duration: 0.2 }, 0)
    .fromTo("[data-st-big]", { scale: 0.55 }, { scale: 1, duration: 0.8, ease: "power1.inOut" }, 0.05)
    .fromTo(letters, { opacity: 0.1 }, { opacity: 1, stagger: 0.055, duration: 0.12 }, 0.1)
    .to("[data-st-small], [data-st-but]", { opacity: 0.4, duration: 0.4 }, 0.45)
    .fromTo("[data-st-foot]", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.2 }, 0.8);
}

function statementLite() {
  const section = document.querySelector<HTMLElement>("[data-scene=statement]");
  if (!section) return;
  const tl = gsap.timeline({ scrollTrigger: { trigger: section, start: "top 70%", once: true } });
  tl.from("[data-st-small], [data-st-town], [data-st-but]", { autoAlpha: 0, y: 16, stagger: 0.06, duration: 0.5 })
    .from("[data-st-letter]", { opacity: 0.1, stagger: 0.05, duration: 0.25 }, "-=0.1")
    .from("[data-st-foot]", { autoAlpha: 0, y: 16, duration: 0.5 }, "-=0.2");
}

/* ---------------- M3 · Pinned four-chapter story ---------------- */
function storyPinned(): () => void {
  const section = document.querySelector<HTMLElement>("[data-scene=story]");
  const stage = section?.querySelector<HTMLElement>("[data-story-stage]");
  if (!section || !stage) return () => {};
  const chaptersEls = gsap.utils.toArray<HTMLElement>("[data-chapter]", section);
  const texts = gsap.utils.toArray<HTMLElement>("[data-ch-text]", section);
  const medias = gsap.utils.toArray<HTMLElement>("[data-ch-media]", section);
  const imgs = gsap.utils.toArray<HTMLElement>("[data-ch-img]", section);
  const jumps = gsap.utils.toArray<HTMLAnchorElement>("[data-story-jump]", section);
  const live = section.querySelector<HTMLElement>("[data-story-live]");
  const titles = jumps.map((j) => j.textContent?.replace(/^\d+/, "").trim() ?? "");
  const n = texts.length;

  // Opacity only (never visibility:hidden): every chapter stays in the accessibility tree and in the
  // Tab order, so screen-reader and keyboard users get all four chapters without scrolling.
  // Non-current chapters get pointer-events:none via [data-current] in globals.css.
  gsap.set(texts, { opacity: (i: number) => (i === 0 ? 1 : 0) });
  gsap.set(medias, { opacity: (i: number) => (i === 0 ? 1 : 0), "--beam": (i: number) => (i === 0 ? "150%" : "0%") });

  // Evenly spaced: chapter i is fully shown at time i; transitions occupy (i-0.55 → i).
  const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
  tl.addLabel("ch0", 0);
  for (let i = 1; i < n; i++) {
    const at = i - 0.55;
    tl.to(texts[i - 1], { opacity: 0, y: -14, duration: 0.2 }, at)
      .fromTo(medias[i], { opacity: 1, "--beam": "0%" }, { "--beam": "150%", duration: 0.5 }, at)
      .fromTo(imgs[i], { scale: 1.08 }, { scale: 1, duration: 0.55, ease: "power2.out" }, at)
      .fromTo(texts[i], { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.25 }, at + 0.25)
      .addLabel(`ch${i}`, i);
  }
  tl.to({}, { duration: 0.35 }); // short hold on the last chapter before release

  let current = -1;
  const setCurrent = (i: number) => {
    if (i === current) return;
    current = i;
    chaptersEls.forEach((c, k) => c.toggleAttribute("data-current", k === i));
    jumps.forEach((j, k) => (k === i ? j.setAttribute("aria-current", "step") : j.removeAttribute("aria-current")));
    if (live) live.textContent = `Chapter ${i + 1} of ${n}: ${titles[i]}`;
  };
  setCurrent(0);

  const labelTimes = Array.from({ length: n }, (_, i) => tl.labels[`ch${i}`]);
  const st = ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: () => `+=${window.innerHeight * (n - 0.65)}`,
    pin: stage,
    scrub: 0.6,
    animation: tl,
    anticipatePin: 1,
    snap: { snapTo: "labels", inertia: false, duration: { min: 0.2, max: 0.6 }, delay: 0.12, ease: "power1.inOut" },
    onUpdate: (self) => {
      const t = self.progress * tl.duration();
      let idx = 0;
      labelTimes.forEach((lt, k) => {
        if (t >= lt - 0.3) idx = k;
      });
      setCurrent(idx);
    },
  });

  const yFor = (i: number) => st.start + (st.end - st.start) * (labelTimes[i] / tl.duration()) + 2;
  let pending = -1;
  let pendingTimer = 0;

  // Chapter links: smooth-scroll to that chapter, then move focus to its heading so screen readers
  // announce it. Delegated, so it survives React re-renders; removed when the motion mode changes.
  const onJump = (e: MouseEvent) => {
    const a = (e.target as Element | null)?.closest<HTMLElement>("[data-story-jump]");
    if (!a) return;
    e.preventDefault();
    const i = Number(a.dataset.storyJump);
    pending = i;
    window.clearTimeout(pendingTimer);
    pendingTimer = window.setTimeout(() => (pending = -1), 1500);
    glideTo(yFor(i));
    chaptersEls[i]?.querySelector<HTMLElement>("h2")?.focus({ preventScroll: true });
  };
  // Keyboard focus entering a chapter that isn't showing (Tab, or a screen reader's virtual cursor)
  // brings that chapter up at once, so focus is never on invisible content.
  const onFocusIn = (e: FocusEvent) => {
    const ch = (e.target as Element | null)?.closest<HTMLElement>("[data-chapter]");
    if (!ch || !section.contains(ch)) return;
    const i = Number(ch.dataset.chapter);
    if (i === pending) return;
    const settle = () => {
      // Land exactly on the gym's step: anywhere in between, the directional snap would carry the
      // page on to the next gym and leave focus on hidden content.
      if (current === i && Math.abs(window.scrollY - yFor(i)) < 2) return;
      window.scrollTo({ top: yFor(i), behavior: "instant" });
      ScrollTrigger.update();
      st.getTween()?.progress(1);
      setCurrent(i);
    };
    settle();
    requestAnimationFrame(() => requestAnimationFrame(settle));
  };
  document.addEventListener("click", onJump);
  document.addEventListener("focusin", onFocusIn);
  return () => {
    window.clearTimeout(pendingTimer);
    document.removeEventListener("click", onJump);
    document.removeEventListener("focusin", onFocusIn);
    chaptersEls.forEach((c) => c.removeAttribute("data-current"));
  };
}

function storyLite() {
  gsap.utils.toArray<HTMLElement>("[data-ch-img]").forEach((img) => {
    gsap.fromTo(
      img,
      { opacity: 0.15, scale: 1.08 },
      { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out", scrollTrigger: { trigger: img, start: "top 80%", once: true } },
    );
  });
}

/* ---------------- M4 · Five Lights: scroll lights one gym at a time ---------------- */
function fiveLights(): () => void {
  const wrap = document.querySelector<HTMLElement>("[data-lights]");
  if (!wrap) return () => {};
  const gyms = gsap.utils.toArray<HTMLElement>("[data-gym]", wrap);
  const n = gyms.length;
  let current = -1;
  const setActive = (i: number) => {
    if (i === current) return;
    current = i;
    gyms.forEach((g, k) => (g.dataset.active = k === i ? "true" : "false"));
  };
  setActive(0);
  const st = ScrollTrigger.create({
    trigger: wrap,
    start: "top top",
    end: () => `+=${window.innerHeight * (n - 1) * 0.75}`,
    pin: true,
    anticipatePin: 1,
    snap: { snapTo: 1 / (n - 1), inertia: false, duration: { min: 0.2, max: 0.45 }, delay: 0.08 },
    onUpdate: (self) => setActive(Math.round(self.progress * (n - 1))),
  });
  const yFor = (i: number) => st.start + (st.end - st.start) * (i / (n - 1)) + 1;
  let pending = -1;
  let pendingTimer = 0;
  const jump = (i: number, smooth: boolean) => {
    pending = i;
    window.clearTimeout(pendingTimer);
    pendingTimer = window.setTimeout(() => (pending = -1), 1500);
    if (smooth) glideTo(yFor(i));
    else {
      window.scrollTo({ top: yFor(i), behavior: "instant" });
      setActive(i);
    }
    document.querySelectorAll<HTMLElement>("[data-gym]")[i]?.focus({ preventScroll: true });
  };
  gymJump = jump;

  // Keyboard focus moving into an unlit gym's details (Tab or a screen reader) lights that gym at once,
  // so focus never sits on invisible content. Mouse clicks on the column buttons are handled below.
  const onFocusIn = (e: FocusEvent) => {
    const t = e.target as Element | null;
    if (t?.closest("[data-gym-select]")) return;
    const g = t?.closest<HTMLElement>("[data-gym]");
    if (!g || !wrap.contains(g)) return;
    const i = Number(g.dataset.gym);
    if (i === pending) return;
    const settle = () => {
      // Land exactly on the gym's step: anywhere in between, the directional snap would carry the
      // page on to the next gym and leave focus on hidden content.
      if (current === i && Math.abs(window.scrollY - yFor(i)) < 2) return;
      window.scrollTo({ top: yFor(i), behavior: "instant" });
      setActive(i);
    };
    settle();
    // The browser's own scroll-into-view for the newly focused link can land a step off; re-check
    // after it has run so the focused gym is the lit one.
    requestAnimationFrame(() => requestAnimationFrame(settle));
  };

  // Unlit columns (buttons) and any same-page "#gym-<town>" link (header Locations menu, hero town bar) go to
  // that gym's lit position in the pin rather than the top of the section.
  const onSelect = (e: MouseEvent) => {
    const t = e.target as Element | null;
    const btn = t?.closest<HTMLElement>("[data-gym-select]");
    const found = t?.closest<HTMLAnchorElement>('a[href*="#gym-"]');
    const link = found && found.pathname === location.pathname ? found : null;
    let i = -1;
    if (btn) i = Number(btn.dataset.gymSelect);
    else if (link) {
      const target = document.getElementById(link.hash.slice(1));
      if (target?.matches("[data-gym]")) i = Number(target.dataset.gym);
    }
    if (i < 0) return;
    if (link) {
      e.preventDefault();
      history.replaceState(null, "", link.hash);
    }
    jump(i, true);
  };
  document.addEventListener("click", onSelect);
  document.addEventListener("focusin", onFocusIn);
  return () => {
    window.clearTimeout(pendingTimer);
    document.removeEventListener("click", onSelect);
    document.removeEventListener("focusin", onFocusIn);
    if (gymJump === jump) gymJump = null;
  };
}

/* ---------------- P1 · Gentle background parallax ---------------- */
function parallax() {
  gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
    gsap.fromTo(el, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
  });
}

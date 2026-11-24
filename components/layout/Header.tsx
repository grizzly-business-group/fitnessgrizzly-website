"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { locations } from "@/lib/data/locations";
import { primaryNav, secondaryNav } from "@/lib/data/nav";
import { site, startHref } from "@/lib/data/site";
import { Button, FobDot } from "@/components/ui/primitives";
import { gymHref } from "@/lib/data/location-routes";
import { samePath, to } from "@/lib/paths";

export default function Header() {
  const pathname = usePathname();
  const current = (href: string) => (samePath(href, pathname) ? ("page" as const) : undefined);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const megaRef = useRef<HTMLLIElement>(null);
  const megaBtnRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const drawerBtnRef = useRef<HTMLButtonElement>(null);
  const lastY = useRef(0);
  // When the pointer has just opened the menu by hovering, the click that follows (mouse, or a tap on a
  // touch laptop/iPad, which fires mouseenter first) must keep it open rather than toggle it shut.
  const hoverOpenedAt = useRef(0);

  // Transparent over the hero → solid after 80px; hide on scroll-down past the hero, show on scroll-up.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setSolid(y > 80);
        setHidden(y > window.innerHeight * 0.9 && y > lastY.current + 4);
        if (y < lastY.current - 4 || y < window.innerHeight * 0.9) setHidden(false);
        lastY.current = y;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close menus on Escape / outside click; lock body scroll while the drawer is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const active = document.activeElement;
      if (megaRef.current?.contains(active)) megaBtnRef.current?.focus();
      if (drawerRef.current?.contains(active) || drawerBtnRef.current?.getAttribute("aria-expanded") === "true") drawerBtnRef.current?.focus();
      setMegaOpen(false);
      setDrawerOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, []);
  // Mobile menu: lock page scroll, make the page behind it inert (not focusable or readable),
  // move focus to the first menu item on open and back to the menu button on close.
  const drawerWasOpen = useRef(false);
  useEffect(() => {
    document.documentElement.style.overflow = drawerOpen ? "hidden" : "";
    document.querySelectorAll("#main, footer").forEach((el) => el.toggleAttribute("inert", drawerOpen));
    document.documentElement.toggleAttribute("data-menu-open", drawerOpen);
    // Wait a frame so the drawer is visible (focusable) before moving focus into it.
    if (drawerOpen) requestAnimationFrame(() => drawerRef.current?.querySelector<HTMLElement>("a, button")?.focus());
    else if (drawerWasOpen.current && drawerRef.current?.contains(document.activeElement)) drawerBtnRef.current?.focus();
    drawerWasOpen.current = drawerOpen;
  }, [drawerOpen]);

  const phone = site.phone.value;
  const showBar = solid || megaOpen;

  return (
    <>
      <a href={to("#main")} className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-lamp focus:px-4 focus:py-3 focus:text-iron focus:font-bold">
        Skip to content
      </a>
      <header
        data-intro-header
        onFocus={() => setHidden(false)}
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-300 ease-[var(--ease-out-grizzly)] ${
          hidden && !megaOpen && !drawerOpen ? "-translate-y-full" : "translate-y-0"
        } ${showBar ? "bg-iron/95 backdrop-blur-md border-b border-[var(--line)]" : "bg-gradient-to-b from-iron/70 to-transparent border-b border-transparent"}`}
      >
        <div className="flex h-[var(--header-h)] items-center justify-between px-[var(--margin)]">
          <a href={to("/#top")} className="flex items-center gap-3" aria-label="Grizzly Fitness — home">
            <Image src="/media/brand/logo-white.png" alt="" width={56} height={58} className="h-11 w-auto lg:h-14" preload />
            <span className="sr-only">Grizzly Fitness</span>
          </a>

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-7 xl:gap-8 text-[13px] font-semibold uppercase tracking-[0.12em]">
              <li
                ref={megaRef}
                className="relative"
                onMouseEnter={() => {
                  hoverOpenedAt.current = Date.now();
                  setMegaOpen(true);
                }}
                onMouseLeave={() => setMegaOpen(false)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setMegaOpen(false);
                }}
              >
                <button
                  ref={megaBtnRef}
                  type="button"
                  className="flex items-center gap-1.5 py-3 uppercase tracking-[0.12em] hover:text-lamp focus-visible:outline-2 focus-visible:outline-bone"
                  aria-expanded={megaOpen}
                  aria-controls="mega-locations"
                  onClick={() => setMegaOpen((o) => (Date.now() - hoverOpenedAt.current < 700 ? true : !o))}
                >
                  Locations
                  <svg width="9" height="6" viewBox="0 0 9 6" aria-hidden className={`transition-transform ${megaOpen ? "rotate-180" : ""}`}>
                    <path d="M0 0h9L4.5 6z" fill="currentColor" />
                  </svg>
                </button>
                <div
                  id="mega-locations"
                  className={`fixed left-1/2 top-[calc(var(--header-h)-20px)] w-[min(960px,92vw)] -translate-x-1/2 pt-6 transition-[opacity,transform] duration-200 ${
                    megaOpen ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-1"
                  }`}
                >
                  <ul className="grid grid-cols-5 gap-[2px] border border-[var(--line-strong)] bg-charcoal p-[2px] normal-case tracking-normal">
                    {locations.map((l) => (
                      <li key={l.slug}>
                        <a href={to(gymHref(l.slug))} aria-current={current(gymHref(l.slug))} onClick={() => setMegaOpen(false)} className="group block bg-iron focus-visible:outline-2 focus-visible:outline-lamp">
                          <span className="relative block h-[110px] overflow-hidden">
                            <Image src={l.showcase.src} alt="" fill sizes="190px" className="object-cover brightness-[.72] transition-[filter] duration-300 group-hover:brightness-95" style={{ objectPosition: l.showcase.position }} />
                            <i className="absolute inset-x-0 top-0 h-[5px]" style={{ background: l.color, boxShadow: `inset 0 -1px 0 ${l.tint}` }} />
                          </span>
                          <span className="block px-3.5 pb-4 pt-3">
                            <span className="block font-display text-[22px] font-bold uppercase leading-none">{l.town}</span>
                            <span className="mt-1.5 block text-[12px] text-steel">{l.tag}</span>
                            <span className="mt-1 block text-[12px] text-bone-2">{l.staffed.label}</span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-[2px] grid grid-cols-[1fr_auto] gap-[2px]">
                    <a href={to("/locations")} onClick={() => setMegaOpen(false)} className="flex items-center justify-between border border-[var(--line-strong)] bg-charcoal px-4 py-3 normal-case tracking-normal text-[14px] font-semibold hover:text-lamp focus-visible:outline-2 focus-visible:outline-lamp">
                      All five locations — compare hours &amp; services
                      <span aria-hidden>→</span>
                    </a>
                    <a href={to("/new-london")} aria-current={current("/new-london")} onClick={() => setMegaOpen(false)} className="flex items-center gap-3 border border-[var(--line-strong)] bg-charcoal px-4 py-3 normal-case tracking-normal text-[14px] font-semibold hover:text-lamp focus-visible:outline-2 focus-visible:outline-lamp">
                      <span className="bg-[#c8312b] px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white">Soon</span>
                      New London
                      <span aria-hidden>→</span>
                    </a>
                  </div>
                </div>
              </li>
              {primaryNav.map((n) => (
                <li key={n.href}>
                  <a
                    href={to(n.href)}
                    aria-current={current(n.href)}
                    {...(n.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="relative py-3 hover:text-lamp after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:origin-left after:scale-x-0 after:bg-lamp after:transition-transform hover:after:scale-x-100 aria-[current=page]:text-lamp aria-[current=page]:after:scale-x-100"
                  >
                    {n.label}
                    {n.external && (
                      <>
                        <span aria-hidden> ↗</span>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3 lg:gap-4">
            <a href={to(`tel:${phone.tel}`)} className="hidden xl:inline text-[14px] font-semibold tracking-[0.04em] text-bone-2 hover:text-bone">
              Call/Text {phone.display}

            </a>
            <Button href={to(startHref)} size="sm" className="lg:min-h-[48px] lg:px-6 lg:text-[13px]">
              Join now
            </Button>
            <button
              ref={drawerBtnRef}
              type="button"
              className="grid h-11 w-11 place-items-center border-[1.5px] border-[var(--line-strong)] lg:hidden"
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              onClick={() => setDrawerOpen((o) => !o)}
            >
              <span className="relative block h-[14px] w-[18px]">
                <i className={`absolute left-0 h-[2px] w-full bg-bone transition-transform ${drawerOpen ? "top-[6px] rotate-45" : "top-0"}`} />
                <i className={`absolute left-0 top-[6px] h-[2px] w-full bg-bone transition-opacity ${drawerOpen ? "opacity-0" : ""}`} />
                <i className={`absolute left-0 h-[2px] w-full bg-bone transition-transform ${drawerOpen ? "top-[6px] -rotate-45" : "top-[12px]"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-drawer"
        ref={drawerRef}
        role="dialog"
        aria-label="Menu"
        className={`fixed inset-0 z-[45] overflow-y-auto bg-iron px-[var(--margin)] pb-10 pt-[calc(var(--header-h)+12px)] duration-300 lg:hidden ${
          // Opening: visible at once (so focus can move in), then fade. Closing: fade, then hide.
          drawerOpen ? "visible opacity-100 transition-opacity" : "invisible opacity-0 transition-[opacity,visibility]"
        }`}
      >
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-steel">Our gyms</p>
        <ul className="mt-3 grid grid-cols-2 gap-1.5">
          {locations.map((l) => (
            <li key={l.slug}>
              <a href={to(gymHref(l.slug))} aria-current={current(gymHref(l.slug))} onClick={() => setDrawerOpen(false)} className="flex items-center gap-2.5 bg-charcoal px-3.5 py-3.5 text-[16px] font-semibold">
                <FobDot color={l.color} size={11} />
                {l.town}
              </a>
            </li>
          ))}
          <li>
            <a href={to("/new-london")} aria-current={current("/new-london")} onClick={() => setDrawerOpen(false)} className="flex items-center gap-2.5 bg-charcoal px-3.5 py-3.5 text-[16px] font-semibold">
              <span className="bg-[#c8312b] px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white">Soon</span>
              New London
            </a>
          </li>
        </ul>
        <ul className="mt-6 border-t border-[var(--line)]">
          {primaryNav.map((n) => (
            <li key={n.href} className="border-b border-[var(--line)]">
              <a
                href={to(n.href)}
                aria-current={current(n.href)}
                {...(n.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={() => setDrawerOpen(false)}
                className="block py-4 font-display text-[34px] font-extrabold uppercase leading-none aria-[current=page]:text-lamp"
              >
                {n.label}
                {n.external && (
                  <>
                    <span aria-hidden className="text-[22px]"> ↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </>
                )}
              </a>
            </li>
          ))}
        </ul>
        <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-1 text-[16px] font-semibold text-bone-2">
          {secondaryNav.map((n) => (
            <li key={n.href}>
              <a
                href={to(n.href)}
                aria-current={current(n.href)}
                {...(n.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={() => setDrawerOpen(false)}
                className="flex min-h-11 items-center hover:text-bone aria-[current=page]:text-lamp"
              >
                {n.label}
                {n.external && (
                  <>
                    <span aria-hidden>&nbsp;↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </>
                )}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 grid grid-cols-2 gap-2">
          <Button href={to(`tel:${phone.tel}`)} variant="secondary" size="sm">
            Call / Text
          </Button>
          <Button href={to(startHref)} size="sm">
            Join now
          </Button>
        </div>
        <p className="mt-6 text-[14px] text-bone-2">
          {site.access}
        </p>
      </div>
    </>
  );
}

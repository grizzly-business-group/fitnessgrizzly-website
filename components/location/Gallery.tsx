"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "@/lib/data/location-pages";
import { to } from "@/lib/paths";

/**
 * Accessible gallery: a grid of buttons (each names its photo) that open a native <dialog> lightbox.
 * The dialog gives a focus trap, Escape to close and focus return for free; arrow keys step through.
 * Without JS the grid still shows every photo with its caption.
 */
/**
 * Grid fill: the first photo is 2×2, the rest 1×1. To leave no ragged last row at any breakpoint
 * (2 / 3 / 4 columns), just enough later photos go double-width at that breakpoint — chosen from the
 * end, and different photos per breakpoint so the rhythm changes. Works for any photo count.
 */
function wideAt(n: number, cols: number, offset: number) {
  const need = (cols - ((n + 3) % cols)) % cols;
  const out = new Set<number>();
  for (let i = n - 1 - offset; out.size < need && i > 0; i -= 3) out.add(i);
  for (let i = n - 1; out.size < need && i > 0; i--) out.add(i);
  return out;
}
function spans(n: number) {
  const b = wideAt(n, 2, 0), m = wideAt(n, 3, 1), l = wideAt(n, 4, 2);
  return Array.from({ length: n }, (_, i) => {
    if (i === 0) return { cls: "col-span-2 row-span-2", w: "b m l" };
    const cls = [b.has(i) ? "col-span-2" : "", m.has(i) ? "md:col-span-2" : b.has(i) ? "md:col-span-1" : "", l.has(i) ? "lg:col-span-2" : m.has(i) ? "lg:col-span-1" : ""];
    const w = [b.has(i) && "b", m.has(i) && "m", l.has(i) && "l"].filter(Boolean).join(" ");
    return { cls: cls.filter(Boolean).join(" "), w: w || undefined };
  });
}

export default function Gallery({
  photos,
  town,
  accent,
  shape = "landscape",
  id = "gallery",
  title,
  more,
}: {
  photos: Photo[];
  town: string;
  accent: string;
  shape?: "landscape" | "portrait";
  /** Section id — unique per gallery when several share a page (the /gallery hub). */
  id?: string;
  title?: string;
  /** Optional link under the heading (hub → the gym's page). */
  more?: { label: string; href: string };
}) {
  const layout = spans(photos.length);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => setIndex(null);
    dlg.addEventListener("keydown", onKey);
    dlg.addEventListener("close", onClose);
    return () => {
      dlg.removeEventListener("keydown", onKey);
      dlg.removeEventListener("close", onClose);
    };
  }, [step]);

  const cur = index === null ? null : photos[index];

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-[calc(var(--header-h)+8px)] border-t border-[var(--line)]">
      <div className="mx-auto max-w-[1440px] px-[var(--margin)] py-20 lg:py-28">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between" data-loc-reveal>
          <h2 id={`${id}-title`} className="font-display text-[clamp(44px,5vw,80px)] font-extrabold uppercase leading-[0.9]">
            {title ?? `Inside ${town}`}
          </h2>
          <p className="text-[14px] text-bone-2">
            {photos.length} photos · our own photos of the gym · select one to enlarge
            {more && (
              <>
                {" · "}
                <a href={to(more.href)} className="font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">{more.label}</a>
              </>
            )}
          </p>
        </div>
        <ul className="loc-gallery mt-10 grid grid-flow-dense grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4" data-shape={shape}>
          {photos.map((p, i) => (
            <li key={p.asset} className={layout[i].cls} data-w={layout[i].w} data-loc-reveal>
                <button
                  type="button"
                  onClick={() => open(i)}
                  className="group relative block aspect-[4/3] h-full w-full overflow-hidden bg-charcoal focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-bone"
                  aria-label={`Enlarge photo ${i + 1} of ${photos.length}: ${p.alt}`}
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes={i === 0 || layout[i].w ? "(min-width:1024px) 50vw, (min-width:768px) 66vw, 100vw" : "(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"}
                    placeholder="blur"
                    className="loc-gal-img object-cover transition-[transform,filter] duration-500 group-hover:scale-[1.03]"
                  />
                  <i aria-hidden className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" style={{ background: accent }} />
                </button>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        aria-label={cur ? `${cur.caption} — photo ${index! + 1} of ${photos.length}` : `${town} photos`}
        className="loc-lightbox m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-bone"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        {cur && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-4 px-[var(--margin)] py-4">
              <p className="text-[14px] text-bone-2" aria-live="polite">
                {index! + 1} / {photos.length} · <span className="text-bone">{cur.caption}</span>
              </p>
              <button type="button" onClick={close} className="grid h-11 w-11 place-items-center border-[1.5px] border-[var(--line-strong)] hover:border-bone focus-visible:outline-3 focus-visible:outline-bone" aria-label="Close photos">
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden><path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" /></svg>
              </button>
            </div>
            <div className="relative min-h-0 flex-1">
              <Image key={cur.asset} src={cur.src} alt={cur.alt} fill sizes="100vw" quality={75} loading="eager" className="object-contain" />
            </div>
            <div className="flex items-center justify-center gap-3 py-4">
              <button type="button" onClick={() => step(-1)} className="min-h-11 border-[1.5px] border-[var(--line-strong)] px-5 text-[12px] font-bold uppercase tracking-[0.1em] hover:border-bone focus-visible:outline-3 focus-visible:outline-bone">
                ← Previous<span className="sr-only"> photo</span>
              </button>
              <button type="button" onClick={() => step(1)} className="min-h-11 border-[1.5px] border-[var(--line-strong)] px-5 text-[12px] font-bold uppercase tracking-[0.1em] hover:border-bone focus-visible:outline-3 focus-visible:outline-bone">
                Next<span className="sr-only"> photo</span> →
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}

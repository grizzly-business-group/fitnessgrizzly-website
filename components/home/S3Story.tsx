import Image from "next/image";
import { chapters } from "@/lib/data/content";
import { Eyebrow, Grain, Unverified } from "@/components/ui/primitives";
import { to } from "@/lib/paths";

/**
 * S3 — Four chapters: Real equipment (Omro) · Open 24/7 (Berlin) · Coaching (Princeton) · Community (Wautoma).
 * Default layout (mobile, reduced motion, no JS): four stacked chapters.
 * With motion (desktop): `html[data-motion="full"]` overlays the chapters in one pinned stage
 * and HomeMotion scrubs between them.
 */
export default function S3Story() {
  return (
    <section id="story" data-scene="story" aria-label="What Grizzly Fitness is built on" className="story relative bg-iron">
      <div data-story-stage className="story-stage swipe" role="region" aria-label="Four chapters">
        {chapters.map((c, i) => (
          <article key={c.id} id={`chapter-${c.id}`} data-chapter={i} className="story-chapter" aria-labelledby={`ch-${c.id}`}>
            <div data-ch-text className="ch-text px-[var(--margin)] pb-10 pt-20 lg:pb-0 lg:pt-0">
              <Eyebrow>
                0{i + 1} / 04 — {c.title}
              </Eyebrow>
              <h2 id={`ch-${c.id}`} tabIndex={-1} className="mt-5 outline-none font-display font-extrabold uppercase leading-[0.9] text-[clamp(44px,5vw,80px)]">
                {c.headline[0]}
                <br />
                {c.headline[1]}
              </h2>
              <p className="mt-6 max-w-[440px] text-bone-2">{c.body}</p>
              <a href={to(c.cta.href)} className="group mt-8 inline-flex items-center gap-2.5 border-b-[1.5px] border-lamp pb-1.5 text-[13px] font-bold uppercase tracking-[0.1em] hover:text-lamp">
                {c.cta.label}
                <svg width="18" height="10" viewBox="0 0 18 10" aria-hidden className="transition-transform group-hover:translate-x-1"><path d="M0 4.2h12.5V0L18 5l-5.5 5V5.8H0z" fill="currentColor" /></svg>
              </a>
            </div>
            <div data-ch-media className="ch-media relative h-[min(560px,80vw)] overflow-hidden lg:h-auto">
              <div data-ch-img className="absolute inset-0">
                <Image
                  src={c.image}
                  alt={c.alt}
                  fill
                  sizes="(min-width:1024px) 60vw, 100vw"
                  placeholder="blur"
                  className="object-cover [filter:contrast(1.14)_saturate(.86)_brightness(.86)]"
                  style={{ objectPosition: c.position }}
                />
              </div>
              <div aria-hidden className="beam absolute inset-0" />
              <Grain />
              {/* Scrim under the stat and photo credit so they stay readable over bright photos (WCAG 1.4.3) */}
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-iron/90 via-iron/55 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 z-[1] flex flex-col gap-2 lg:inset-x-12 lg:bottom-11 lg:flex-row lg:items-end lg:justify-between">
                <p className="font-display text-[20px] font-extrabold uppercase leading-[1.25] tracking-[0.06em] text-bone-2">
                  <b className="text-bone">{c.stat[0]}</b>
                  <br />
                  {c.stat[1]}
                  {c.statNote && <Unverified note={c.statNote} />}
                </p>
                <p className="relative text-[13px] text-bone-2">Photo: {c.credit}</p>
              </div>
            </div>
          </article>
        ))}

        {/* Progress / jump list — only visible in the pinned (motion) layout */}
        <div className="px-[var(--margin)] lg:hidden"><p aria-hidden className="swipe-hint">Swipe for more <span>→</span></p></div>
        <nav data-story-progress aria-label="Chapters" className="story-progress px-[var(--margin)]">
          <ol className="max-w-[440px]">
            {chapters.map((c, i) => (
              <li key={c.id}>
                <a data-story-jump={i} href={to(`#chapter-${c.id}`)} className="grid grid-cols-[44px_1fr] items-center border-t border-[var(--line)] py-3.5 font-display text-[22px] font-bold uppercase tracking-[0.03em]">
                  <i className="not-italic font-body text-[13px] font-bold tracking-[0.1em]">0{i + 1}</i>
                  {c.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
      <p data-story-live className="sr-only" aria-live="polite" />
    </section>
  );
}

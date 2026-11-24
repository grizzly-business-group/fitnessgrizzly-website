import Image from "next/image";
import before from "@/public/media/wautoma/wautoma-2021-before-renovation.jpg";
import after from "@/public/media/wautoma/wautoma-plate-loaded-rows.jpg";
import podcast from "@/public/media/brand/grizzly-life-podcast.jpg";
import { testimonials } from "@/lib/data/content";
import { links } from "@/lib/data/site";
import { Eyebrow, SiteLink } from "@/components/ui/primitives";
import { to } from "@/lib/paths";

/**
 * S6 — Community & trust. Real named testimonials (verbatim excerpts), the business's own
 * renovation photos shown honestly as "Then / Now" (different angles, so no fake wipe), and the podcast.
 */
export default function S6Community() {
  return (
    <section id="community" data-scene="community" aria-labelledby="community-title" className="bg-charcoal py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-[var(--margin)]">
        <div data-reveal>
          <Eyebrow>Our neighbors</Eyebrow>
          <h2 id="community-title" className="mt-4 font-display font-extrabold uppercase leading-[0.9] text-[clamp(44px,5vw,80px)]">
            Feels like home.
            <br />
            Built for everyone.
          </h2>
        </div>

        <ul className="swipe mt-14 grid gap-10 md:grid-cols-3 md:gap-6" tabIndex={0} aria-label="What members say (swipe for more)">
          {testimonials.map((t) => (
            <li key={t.name} data-reveal className="border-t-2 border-lamp pt-7">
              <figure>
                <span aria-hidden className="block h-11 font-display text-[96px] font-extrabold leading-[0.6] text-lamp">“</span>
                <blockquote className="text-[19px] lg:text-[21px] font-medium leading-[1.5] tracking-[-0.01em] text-bone">{t.quote}</blockquote>
                <figcaption className="mt-5 text-[14px] font-bold uppercase tracking-[0.12em]">
                  {t.name} <span className="font-medium normal-case tracking-[0.04em] text-steel">· {t.context}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <p aria-hidden className="swipe-hint">Swipe for more <span>→</span></p>

        <div className="mt-24 grid gap-6 lg:mt-32 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5" data-reveal>
            <Eyebrow>Built, not bought</Eyebrow>
            <h3 className="mt-4 font-display font-extrabold uppercase leading-[0.9] text-[clamp(40px,4.4vw,64px)]">
              From empty room
              <br />
              to Main Street gym.
            </h3>
          </div>
          <p className="text-bone-2 lg:col-span-5 lg:col-start-7" data-reveal>
            Wautoma began as an empty Main Street space. These are Grizzly Fitness&apos;s own photos from the 2021 renovation and the finished floor today.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-[2px]" data-thennow>
          <figure className="relative aspect-[3/4] overflow-hidden md:aspect-[4/3.4]">
            <Image src={before} alt="Wautoma in 2021, before the gym was built: an empty commercial room with columns" fill sizes="50vw" placeholder="blur" className="object-cover [filter:grayscale(1)_contrast(1.1)_sepia(.18)_brightness(.95)]" />
            <figcaption className="absolute left-4 top-4 bg-iron/75 px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.1em]">Wautoma · 2021</figcaption>
          </figure>
          <figure className="relative aspect-[3/4] overflow-hidden md:aspect-[4/3.4]">
            <Image src={after} alt="Wautoma today: rows of plate-loaded machines on the training floor" fill sizes="50vw" placeholder="blur" className="object-cover [filter:contrast(1.08)_saturate(.9)]" />
            <figcaption className="absolute left-4 top-4 bg-iron/75 px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.1em]">Wautoma · Today</figcaption>
          </figure>
        </div>

        <div id="podcast" data-reveal className="mt-24 grid scroll-mt-28 items-center gap-8 border border-[var(--line)] p-6 md:grid-cols-[200px_1fr] lg:mt-32 lg:grid-cols-[220px_1fr_auto] lg:gap-10 lg:p-9">
          <Image src={podcast} alt="The Grizzly Life Podcast cover art" width={220} height={220} placeholder="blur" className="w-[160px] md:w-full" />
          <div>
            <Eyebrow>The Grizzly Life Podcast</Eyebrow>
            <p className="mt-3 text-[19px] lg:text-[21px] leading-[1.5]">
              Built for people living the “1% better than yesterday” mindset — chasing progress, not perfection. Not just in the gym, but in your habits, your thinking, and your life.
            </p>
            <a href={to("/podcast")} className="mt-4 inline-block text-[14px] font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">
              More about the podcast <span aria-hidden>→</span>
            </a>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-2 lg:col-span-1 lg:flex-col">
            <SiteLink k="spotify" size="sm" />
            <SiteLink k="applePodcasts" size="sm" />
            <SiteLink k="youtube" size="sm" />
            <a href={to(links.podcastGuest.href)} target="_blank" rel="noopener noreferrer" className="text-[13px] font-semibold text-lamp hover:text-lamp-hover lg:mt-1">
              Want to be a guest? Apply ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

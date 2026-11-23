import type { Metadata } from "next";
import { withShare } from "@/lib/seo";
import Image from "next/image";
import PageShell from "@/components/page/PageShell";
import { Section } from "@/components/page/Blocks";
import { Eyebrow, Grain, SiteLink } from "@/components/ui/primitives";
import { podcast } from "@/lib/data/site-pages/podcast";
import { links } from "@/lib/data/site";
import art from "@/public/media/brand/grizzly-life-podcast.jpg";
import { to } from "@/lib/paths";

/**
 * The Grizzly Life Podcast (Phase 5) — same path as Wix (/podcast), copy verbatim. Listen links go to the
 * show's verified Spotify, Apple Podcasts and YouTube pages; no episode list is shown because none can be
 * pulled without inventing data (a feed integration is a Phase 6+ option).
 */
export const metadata: Metadata = withShare({
  title: { absolute: "The Grizzly Life Podcast | Grizzly Fitness" },
  description:
    "The Grizzly Life Podcast shares real conversations on getting 1% better—mentally, physically, and in life. Discover the show and apply to join us.",
  alternates: { canonical: "/podcast" },
});

const crumbs = [{ name: "Podcast", path: "/podcast" }];
const seriesLd = {
  "@context": "https://schema.org",
  "@type": "PodcastSeries",
  name: podcast.title,
  description: podcast.intro[0],
  url: "https://www.fitnessgrizzly.com/podcast",
  sameAs: [links.spotify.href, links.applePodcasts.href, links.youtube.href],
};

export default function PodcastPage() {
  return (
    <PageShell crumbs={crumbs} extraLd={[seriesLd]}>
      <section aria-labelledby="page-title" className="loc-hero relative isolate overflow-hidden bg-iron pb-16 pt-[calc(var(--header-h)+40px)] lg:pb-24">
        <Grain className="-z-10" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_78%_40%,rgba(200,155,90,.16),rgba(14,13,11,0)_70%)]" />
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-[var(--margin)] lg:grid-cols-12">
          <div className="lg:col-span-7">
            <nav aria-label="Breadcrumb" className="hero-halo relative z-10 mb-7 text-[13px] text-bone-2">
              <ol className="flex flex-wrap items-center gap-2">
                <li><a href={to("/")} className="hover:text-bone">Home</a></li>
                <li className="flex items-center gap-2"><span aria-hidden>/</span><span aria-current="page" className="text-bone">Podcast</span></li>
              </ol>
            </nav>
            <p className="loc-in loc-in-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-lamp md:text-[13px]">Podcast</p>
            <h1 id="page-title" className="loc-in loc-in-2 mt-4 font-display text-[clamp(56px,8.4vw,136px)] font-extrabold uppercase leading-[0.86]">
              The Grizzly{" "}<br />Life <span className="text-lamp">Podcast</span>
            </h1>
            <p className="mt-6 max-w-[620px] text-[18px] leading-[1.6] text-bone md:text-[21px]">{podcast.intro[0]}</p>
            <div className="loc-in loc-in-4 mt-8">
              <p className="text-[14px] text-bone-2">{podcast.listen}</p>
              <ul className="mt-4 flex flex-wrap gap-3">
                <li><SiteLink k="spotify" variant="primary" /></li>
                <li><SiteLink k="applePodcasts" /></li>
                <li><SiteLink k="youtube" /></li>
              </ul>
            </div>
          </div>
          <div className="lg:col-span-5">
            <Image
              src={art}
              alt="The Grizzly Life Podcast cover art: an illustrated brown bear with the show's name"
              sizes="(min-width: 1024px) 38vw, 90vw"
              placeholder="blur"
              preload
              className="loc-in loc-in-3 mx-auto w-full max-w-[520px] shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)]"
            />
          </div>
        </div>
      </section>

      <Section labelledBy="mindset-title" tone="paper">
        <div className="grid gap-12 lg:grid-cols-12">
          <h2 id="mindset-title" className="font-display text-[clamp(44px,6vw,96px)] font-extrabold uppercase leading-[0.88] lg:col-span-6" data-loc-reveal>
            Where the mindset{" "}<br />meets the{" "}<br /><span className="text-lamp-deep">microphone.</span>
          </h2>
          <div className="space-y-6 text-[18px] leading-[1.7] text-ink-2 lg:col-span-5 lg:col-start-8" data-loc-reveal>
            <p>{podcast.intro[1]}</p>
            <div className="border-t-2 border-ink pt-6">
              <Eyebrow style={{ color: "var(--color-lamp-deep)" }}>{podcast.whyTitle}</Eyebrow>
              <p className="mt-3 text-ink">{podcast.why}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section labelledBy="guest-title">
        <div className="flex flex-col gap-8 border border-[var(--line-strong)] p-8 lg:flex-row lg:items-center lg:justify-between lg:p-12" data-loc-reveal>
          <div className="max-w-[720px]">
            <Eyebrow>Be a guest</Eyebrow>
            <h2 id="guest-title" className="mt-4 font-display text-[clamp(36px,4.4vw,64px)] font-extrabold uppercase leading-[0.92]">{podcast.guestTitle}</h2>
            <p className="mt-4 text-[17px] text-bone-2">{podcast.guest}</p>
          </div>
          <SiteLink k="podcastGuest" variant="primary" arrow>Podcast application form</SiteLink>
        </div>
      </Section>
    </PageShell>
  );
}

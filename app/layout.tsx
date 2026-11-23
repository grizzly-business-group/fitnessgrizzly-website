import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE_URL, indexingEnabled } from "@/lib/indexing";
import { BASE_PATH } from "@/lib/paths";
import { csp } from "@/lib/csp";
import Analytics from "@/components/layout/Analytics";

/* Self-hosted variable fonts (SIL OFL) — no Google request at build or runtime. */
const bigShoulders = localFont({
  src: "./fonts/BigShouldersDisplay-Variable.woff2",
  weight: "100 900",
  variable: "--font-big-shoulders",
  // "block": the headline font is small (35 KB) and preloaded; blocking briefly avoids a visible swap that
  // re-wrapped the hero headline (measured CLS 0.037 on mobile). During the intro the type is hidden anyway.
  display: "block",
});
const inter = localFont({
  src: "./fonts/Inter-Variable.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL), // canonical/OG URLs resolve to the production domain (not live yet)
  title: "Grizzly Fitness | 24/7 Gyms in Princeton, Berlin, Wautoma, Omro & Rosendale",
  description:
    "Five community-first gyms in small-town Wisconsin. Old-school equipment, coaching and 24/7 key fob access in Princeton, Berlin, Wautoma, Omro and Rosendale.",
  // Closed to search engines until launch (SITE_INDEXING=true, Phase 7). See lib/indexing.ts.
  robots: indexingEnabled ? { index: true, follow: true } : { index: false, follow: false },
  // Site-wide share defaults; app/opengraph-image.jpg (a real Princeton photo) is the fallback share image.
  openGraph: { type: "website", siteName: "Grizzly Fitness", locale: "en_US" },
  twitter: { card: "summary_large_image" },
  referrer: "strict-origin-when-cross-origin",
};

const prod = process.env.NODE_ENV === "production";

export const viewport: Viewport = { themeColor: "#0e0d0b" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning (applies to <html>'s own attributes only, never its children):
    // the inline intro script below sets data-intro on <html> before React hydrates — verified in a
    // clean browser (Milestone E) to be the only mismatch. Extensions that tag <html> are covered too.
    <html lang="en" className={`${bigShoulders.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Security policy as a meta tag: GitHub Pages can't send headers (lib/csp.ts). Must stay first in <head>. */}
        {prod && <meta httpEquiv="Content-Security-Policy" content={csp} />}
        {/* Decide before first paint whether the CSS Lights On intro plays (once per session; add ?intro to replay).
            Skipped for reduced motion, deep links and restored scroll. Any interaction jumps to the end. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var d=document.documentElement,q=location.search.indexOf('intro')>-1,n=performance.getEntriesByType&&performance.getEntriesByType('navigation')[0],r=n&&n.type==='reload',h=location.hash,okHash=!h||h==='#top'||h==='#main',home=location.pathname==='${BASE_PATH}/'||location.pathname==='${BASE_PATH}';if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&(q||r||!sessionStorage.getItem('gf-intro'))&&home&&okHash&&(window.scrollY||0)<10){d.dataset.intro='play';sessionStorage.setItem('gf-intro','1');var end=function(){d.dataset.intro='done'};setTimeout(end,3900);['wheel','touchmove','keydown'].forEach(function(e){addEventListener(e,end,{once:true,passive:true})});var sw=false;addEventListener('pointerdown',function(){if(d.dataset.intro==='play'){sw=true;end()}},true);addEventListener('click',function(e){if(sw){sw=false;e.preventDefault();e.stopPropagation()}},true);addEventListener('scroll',function(){if(window.scrollY>10)end()},{passive:true});addEventListener('animationend',function(e){var t=e.target;if(t&&t.style&&/^gf-(rise|fade|appear)$/.test(e.animationName))t.style.animation='none'},true)}}catch(e){}`,
          }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

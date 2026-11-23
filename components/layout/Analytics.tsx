"use client";

import Script from "next/script";
import { useEffect } from "react";
import { tracking } from "@/lib/data/site";

/**
 * Analytics + conversion tracking (production builds only, and only for IDs set in lib/data/site.ts → tracking).
 * Live IDs (19 Nov 2026): GA4 G-V6074L14E4 + Meta Pixel 789997473854772, loaded directly (no GTM, no Ads yet).
 * Loads GTM and/or the Google tag (GA4, Google Ads) and the Meta Pixel, then reports:
 *   join_click     — any link to the GymMaster sign-up (gym taken from ?companyid)
 *   click_to_call  — tel: links          click_to_text — sms: links
 *   generate_lead  — fired by /thank-you (set GHL forms to redirect there on submit)
 * Events go to the dataLayer (for GTM), gtag (GA4/Ads) and fbq (Meta: Lead / Contact / custom JoinClick).
 */
type W = Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void; fbq?: (...a: unknown[]) => void };
const { gtmId, ga4Id, googleAdsId, metaPixelId } = tracking;
const enabled = process.env.NODE_ENV === "production" && Boolean(gtmId || ga4Id || googleAdsId || metaPixelId);
/** Tags send data only on this host (or after ?tags=1 on a preview — see the inline script below). */
const LIVE_HOST = "www.fitnessgrizzly.com";
const clubs: Record<string, string> = { "4": "princeton", "6": "berlin", "7": "wautoma", "8": "rosendale", "9": "omro" };

export function track(event: string, params: Record<string, unknown> = {}) {
  const w = window as W;
  if (gtmId) w.dataLayer?.push({ event, ...params }); // GTM-style message only when GTM is in use (no double count)
  w.gtag?.("event", event, params);
  if (w.fbq) {
    if (event === "generate_lead") w.fbq("track", "Lead", params);
    else if (event === "click_to_call" || event === "click_to_text") w.fbq("track", "Contact", params);
    else if (event === "join_click") w.fbq("trackCustom", "JoinClick", params);
  }
}

export default function Analytics() {
  useEffect(() => {
    if (!enabled) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (href.startsWith("tel:")) track("click_to_call", { link_url: href });
      else if (href.startsWith("sms:")) track("click_to_text", { link_url: href });
      else if (/gymmasteronline\.com\/portal\/signup/.test(href)) {
        const id = new URL(href).searchParams.get("companyid") || "";
        track("join_click", { gym: clubs[id] || "all", link_url: href });
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  if (!enabled) return null;
  const gtagId = ga4Id || googleAdsId;
  return (
    <>
      {gtmId && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      )}
      {/* One small inline script: only on the live domain (or after ?tags=1 once per session, for testing on a
          preview) it starts the gtag() / fbq() queues right away — so no page view or click is lost — and loads
          gtag.js and fbevents.js once the page is idle, so they never compete with the first paint. On
          github.io previews and localhost nothing is sent, which keeps test traffic out of GA4 and Meta. */}
      <Script id="tags" strategy="afterInteractive">
        {`(function(){var live=location.hostname==='${LIVE_HOST}';try{if(/[?&]tags=1/.test(location.search))sessionStorage.setItem('gf-tags','1');live=live||sessionStorage.getItem('gf-tags')==='1'}catch(e){}if(!live)return;var w=window,d=document,libs=[];` +
          (gtagId ? `w.dataLayer=w.dataLayer||[];w.gtag=function(){w.dataLayer.push(arguments)};gtag('js',new Date());${ga4Id ? `gtag('config','${ga4Id}');` : ""}${googleAdsId ? `gtag('config','${googleAdsId}');` : ""}libs.push('https://www.googletagmanager.com/gtag/js?id=${gtagId}');` : "") +
          (metaPixelId ? `!function(f,n){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[]}(w);fbq('init','${metaPixelId}');fbq('track','PageView');libs.push('https://connect.facebook.net/en_US/fbevents.js');` : "") +
          `var go=function(){libs.forEach(function(u){var s=d.createElement('script');s.async=true;s.src=u;d.head.appendChild(s)})};var idle=function(){(w.requestIdleCallback||setTimeout)(go,{timeout:2000})};d.readyState==='complete'?idle():w.addEventListener('load',idle,{once:true})})();`}
      </Script>
    </>
  );
}

import Script from "next/script";
import type { ReactNode } from "react";

/**
 * GoHighLevel form / calendar embed (configured in lib/data/site.ts → ghl). With no URL configured it renders
 * `fallback` (the email / call / text buttons), so the page never shows a dead or fake widget.
 * form_embed.js (from link.msgsndr.com, allowed by the CSP) resizes the iframe to the form's height.
 */
export default function GhlEmbed({ embed, fallback, className = "" }: { embed: { url: string; title: string; height: number }; fallback?: ReactNode; className?: string }) {
  if (!embed.url) return <>{fallback ?? null}</>;
  return (
    <div className={className}>
      <iframe
        src={embed.url}
        title={embed.title}
        loading="lazy"
        style={{ width: "100%", height: embed.height, border: "none", borderRadius: 2, background: "#fff" }}
        id={`ghl-${embed.url.split("/").pop()}`}
      />
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
    </div>
  );
}

import Script from "next/script";
import type { ReactNode } from "react";

/**
 * GoHighLevel form embed (configured in lib/data/site.ts → ghl). Uses GHL's standard inline-embed markup
 * (id="inline-<formId>" + data-* attributes) so form_embed.js — from link.msgsndr.com, allowed by the CSP — can
 * resize the iframe to the form's real height. With no URL configured it renders `fallback`, so the page never
 * shows a dead or fake widget.
 */
export default function GhlEmbed({ embed, fallback, className = "" }: { embed: { url: string; title: string; height: number }; fallback?: ReactNode; className?: string }) {
  if (!embed.url) return <>{fallback ?? null}</>;
  const id = embed.url.split("/").pop() ?? "form";
  return (
    <div className={className}>
      <iframe
        src={embed.url}
        title={embed.title}
        id={`inline-${id}`}
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-activation-type="alwaysActivated"
        data-deactivation-type="neverDeactivate"
        data-form-name={embed.title}
        data-height={embed.height}
        data-layout-iframe-id={`inline-${id}`}
        data-form-id={id}
        loading="lazy"
        style={{ width: "100%", height: embed.height, border: "none", borderRadius: 3, background: "#fff" }}
      />
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
    </div>
  );
}

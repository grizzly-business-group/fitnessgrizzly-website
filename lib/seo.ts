import type { Metadata } from "next";

/**
 * Adds Open Graph / social-card fields derived from a page's own title, description and canonical
 * (Phase 5D). Without this, inner pages shared on Facebook or in messages showed no title or description.
 * The share image falls back to a real Princeton photo (1200×630, EXIF stripped) unless the page sets its own.
 */
const shareImage = { url: "/media/og/grizzly-fitness-princeton-share.jpg", width: 1200, height: 630, alt: "The front desk, painted mural walls and hanging lamps at Grizzly Fitness Princeton" };

export function withShare(meta: Metadata): Metadata {
  const t = meta.title;
  const title = typeof t === "string" ? t : t && typeof t === "object" && "absolute" in t ? t.absolute : undefined;
  const description = meta.description ?? undefined;
  const url = typeof meta.alternates?.canonical === "string" ? meta.alternates.canonical : undefined;
  return {
    ...meta,
    openGraph: { type: "website", siteName: "Grizzly Fitness", locale: "en_US", title, description, url, images: [shareImage], ...meta.openGraph },
    twitter: { card: "summary_large_image", title, description, images: [shareImage.url], ...meta.twitter },
  };
}

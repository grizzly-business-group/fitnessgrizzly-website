import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/indexing";
import { locations } from "@/lib/data/locations";

/**
 * XML sitemap of the public, indexable pages (Phase 5D). /equipment-repair (noindex by design), the 404 page
 * and retired URLs are deliberately left out. Only advertised in robots.txt once indexing is enabled.
 */
const pages = ["/", "/locations", "/new-london", "/join", "/memberships", "/training", "/personal-training", "/classes", "/members", "/about", "/gallery", "/faq", "/podcast", "/careers", "/contact", "/terms", "/privacy", "/accessibility"];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const gyms = locations.map((l) => `/locations/${l.slug}`);
  return [...pages.slice(0, 2), ...gyms, ...pages.slice(2)].map((p) => ({
    url: `${SITE_URL}${p === "/" ? "/" : `${p}/`}`, // trailing slash = the exported URL (no redirect hop)
    changeFrequency: p === "/" || p.startsWith("/locations") ? "weekly" : "monthly",
    priority: p === "/" ? 1 : p.startsWith("/locations") ? 0.9 : p === "/terms" || p === "/privacy" || p === "/accessibility" ? 0.3 : 0.7,
  }));
}

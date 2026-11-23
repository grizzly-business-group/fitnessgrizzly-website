import type { MetadataRoute } from "next";
import { SITE_URL, indexingEnabled } from "@/lib/indexing";

export const dynamic = "force-static";

/** robots.txt — closed to crawlers until launch (see lib/indexing.ts). Written to out/robots.txt at build. */
export default function robots(): MetadataRoute.Robots {
  if (!indexingEnabled) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL };
}

import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileActionBar from "@/components/layout/MobileActionBar";
import LocationMotion from "@/components/location/LocationMotion";

const SITE = "https://www.fitnessgrizzly.com";

/**
 * Shell for every informational page (Phase 5): the shared header, footer and phone action bar, plus the
 * same light motion as the location pages (short reveals, no pinning, nothing under reduced motion).
 * `crumbs` produces the visible breadcrumb's BreadcrumbList structured data.
 */
export default function PageShell({
  children,
  crumbs,
  extraLd = [],
  className = "",
  structuredData = true,
}: {
  children: ReactNode;
  crumbs: { name: string; path: string }[];
  extraLd?: object[];
  className?: string;
  /** false on pages that aren't real destinations (the 404), so no BreadcrumbList points at them. */
  structuredData?: boolean;
}) {
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: `${SITE}${c.path === "/" ? "/" : `${c.path}/`}` })),
    },
    ...extraLd,
  ];
  return (
    <>
      <Header />
      <main id="main" className={`info-page ${className}`}>
        {children}
      </main>
      <Footer />
      <MobileActionBar />
      <LocationMotion />
      {structuredData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />}
    </>
  );
}

import type { Metadata } from "next";
import { withShare } from "@/lib/seo";
import { SITE_URL } from "@/lib/indexing";
import { links, site } from "@/lib/data/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileActionBar from "@/components/layout/MobileActionBar";
import S1Hero from "@/components/home/S1Hero";
import S2Statement from "@/components/home/S2Statement";
import S3Story from "@/components/home/S3Story";
import S4FiveLights from "@/components/home/S4FiveLights";
import S5Services from "@/components/home/S5Services";
import S6Community from "@/components/home/S6Community";
import S7Convert from "@/components/home/S7Convert";
import HomeMotion from "@/components/motion/HomeMotion";

export const metadata: Metadata = withShare({
  title: { absolute: "Grizzly Fitness | 24/7 Gyms in Princeton, Berlin, Wautoma, Omro & Rosendale" },
  description:
    "Five community-first gyms in small-town Wisconsin. Old-school equipment, coaching and 24/7 key fob access in Princeton, Berlin, Wautoma, Omro and Rosendale.",
  alternates: { canonical: "/" },
});

/* Organization + WebSite structured data. Phone owner-confirmed Nov 2026; legal name added once supplied. */
const ld = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Grizzly Fitness",
    url: `${SITE_URL}/`,
    telephone: site.phone.value.tel,
    ...(site.legalEntity.value ? { legalName: site.legalEntity.value } : {}),
    logo: `${SITE_URL}/media/brand/logo-black.png`,
    slogan: "Small towns. Big dreamers.",
    email: "support@fitnessgrizzly.com",
    sameAs: [links.facebook.href, links.instagram.href, links.youtube.href],
  },
  { "@context": "https://schema.org", "@type": "WebSite", name: "Grizzly Fitness", url: SITE_URL, publisher: { "@id": `${SITE_URL}/#organization` } },
];

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <S1Hero />
        <S2Statement />
        <S3Story />
        <S4FiveLights />
        <S5Services />
        <S6Community />
        <S7Convert />
      </main>
      <Footer />
      <MobileActionBar />
      <HomeMotion />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
    </>
  );
}

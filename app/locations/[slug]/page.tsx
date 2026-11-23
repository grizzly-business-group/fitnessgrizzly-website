import type { Metadata } from "next";
import { withShare } from "@/lib/seo";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileActionBar from "@/components/layout/MobileActionBar";
import LocationHero from "@/components/location/LocationHero";
import { ClosingCta, Equipment, Membership, OtherGyms, QuickFacts, Services, Space, Testimonials } from "@/components/location/LocationSections";
import Gallery from "@/components/location/Gallery";
import { Archive, Classes, Levels } from "@/components/location/LocationFeatures";
import LocationMotion from "@/components/location/LocationMotion";
import { joinHref, locations, type LocationSlug } from "@/lib/data/locations";
import { locationPages, pageFor, type Block } from "@/lib/data/location-pages";
import { site } from "@/lib/data/site";

const SITE = "https://www.fitnessgrizzly.com";

/** Only gyms whose page content exists are built; any other /locations/* URL is the static 404 page. */
export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(locationPages).map((slug) => ({ slug }));
}

function resolve(slug: string) {
  const loc = locations.find((l) => l.slug === slug);
  const page = loc ? pageFor(loc.slug as LocationSlug) : undefined;
  return loc && page ? { loc, page } : null;
}

export async function generateMetadata({ params }: PageProps<"/locations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const r = resolve(slug);
  if (!r) return {};
  const { page } = r;
  return withShare({
    title: { absolute: page.seo.title },
    description: page.seo.description,
    alternates: { canonical: page.path },
    openGraph: { title: page.seo.title, description: page.seo.description, url: page.path, type: "website", images: [{ url: page.hero.photo.src.src, width: page.hero.photo.src.width, height: page.hero.photo.src.height, alt: page.hero.photo.alt }] },
    twitter: { images: [page.hero.photo.src.src] },
    // robots: inherits noindex/nofollow from the root layout until launch (development safeguard).
  });
}

export default async function LocationPageRoute({ params }: PageProps<"/locations/[slug]">) {
  const { slug } = await params;
  const r = resolve(slug);
  if (!r) notFound();
  const { loc, page } = r;

  // Structured data: breadcrumbs always; HealthClub (LocalBusiness) only once the gym's address is owner-verified
  // (Princeton waits for its address), with the confirmed phone and staffed hours (no inaccurate NAP schema).
  const jsonLd: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE}/locations/` },
        { "@type": "ListItem", position: 3, name: `Grizzly Fitness ${loc.town}`, item: `${SITE}${page.path}/` },
      ],
    },
  ];
  if (loc.address.verified) {
    const dayUrl = (d: string) => `https://schema.org/${d}`;
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": ["HealthClub", "ExerciseGym"],
      "@id": `${SITE}${page.path}/#gym`,
      name: `Grizzly Fitness ${loc.town}`,
      url: `${SITE}${page.path}/`,
      image: `${SITE}${page.hero.photo.src.src}`,
      telephone: site.phone.value.tel,
      email: site.email,
      address: { "@type": "PostalAddress", streetAddress: loc.address.street, addressLocality: loc.address.city.split(",")[0], addressRegion: "WI", postalCode: loc.address.zip, addressCountry: "US" },
      ...(page.geo ? { geo: { "@type": "GeoCoordinates", latitude: page.geo.lat, longitude: page.geo.lng } } : {}),
      // Members get 24/7 key-fob access; staff are on site during the staffed hours below.
      openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(dayUrl), opens: "00:00", closes: "23:59" }],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: site.phone.value.tel,
        email: site.email,
        ...(loc.staffedHours.length
          ? { hoursAvailable: loc.staffedHours.map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: h.days.map(dayUrl), opens: h.opens, closes: h.closes })) }
          : { description: "Staffed by appointment" }),
      },
      amenityFeature: [{ "@type": "LocationFeatureSpecification", name: "24/7 key fob access", value: true }],
      parentOrganization: { "@id": `${SITE}/#organization` },
    });
  }

  return (
    <>
      <Header />
      <main id="main" className={`loc-page loc-tone-${page.tone}`} style={{ ["--loc" as string]: loc.color, ["--loc-tint" as string]: loc.tint }}>
        <LocationHero loc={loc} page={page} />
        {page.order.map((b) => (
          <Section key={b} block={b} loc={loc} page={page} />
        ))}
      </main>
      <Footer />
      <MobileActionBar directions={{ href: loc.mapsUrl, label: "Directions" }} join={joinHref(loc)} />
      <LocationMotion />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}

/** One renderer per block id; each gym's `order` decides which appear and where. */
function Section({ block, loc, page }: { block: Block; loc: (typeof locations)[number]; page: NonNullable<ReturnType<typeof pageFor>> }) {
  switch (block) {
    case "facts":
      return <QuickFacts loc={loc} />;
    case "space":
      return <Space loc={loc} page={page} />;
    case "levels":
      return <Levels loc={loc} page={page} />;
    case "classes":
      return <Classes loc={loc} page={page} />;
    case "equipment":
      return <Equipment loc={loc} page={page} />;
    case "services":
      return <Services loc={loc} page={page} />;
    case "gallery":
      return <Gallery photos={page.gallery.photos} town={loc.town} accent={loc.color} shape={page.gallery.shape} />;
    case "archive":
      return <Archive loc={loc} page={page} />;
    case "testimonials":
      return <Testimonials loc={loc} page={page} />;
    case "membership":
      return <Membership loc={loc} />;
    case "others":
      return <OtherGyms loc={loc} />;
    case "cta":
      return <ClosingCta loc={loc} page={page} />;
  }
}

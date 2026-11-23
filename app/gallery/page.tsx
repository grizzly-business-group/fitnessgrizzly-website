import type { Metadata } from "next";
import { withShare } from "@/lib/seo";
import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/Blocks";
import Gallery from "@/components/location/Gallery";
import { FobDot } from "@/components/ui/primitives";
import { locations } from "@/lib/data/locations";
import { pageFor } from "@/lib/data/location-pages";
import pCardio from "@/public/media/princeton/princeton-cardio-mural.jpg";
import oRoom from "@/public/media/omro/omro-full-room.jpg";
import { to } from "@/lib/paths";

export const metadata: Metadata = withShare({
  title: { absolute: "Photo Gallery | Inside All Five Grizzly Fitness Gyms" },
  description:
    "What does each Grizzly Fitness gym look like? Our own photos of Princeton, Berlin, Wautoma, Omro and Rosendale — the rooms, the racks, the cardio and the details.",
  alternates: { canonical: "/gallery" },
});

const crumbs = [{ name: "Gallery", path: "/gallery" }];

export default function GalleryHub() {
  return (
    <PageShell crumbs={crumbs}>
      <PageHero
        crumbs={crumbs}
        eyebrow="Photo gallery"
        title={<>What does{" "}<br />each gym look like?</>}
        lead="Every photo here is one of ours, taken inside the gym it's filed under. Pick a gym to jump to its photos, or select any photo to see it full size."
        photo={{ src: pCardio, alt: "A row of bikes and ellipticals beside the antique painted mural at Grizzly Fitness Princeton", position: "50% 55%" }}
      >
        <nav aria-label="Jump to a gym's photos">
          <ul className="flex flex-wrap gap-2">
            {locations.map((l) => (
              <li key={l.slug}>
                <a href={to(`#photos-${l.slug}`)} className="inline-flex min-h-11 items-center gap-2.5 border border-[var(--line-strong)] bg-iron/60 px-4 text-[14px] font-semibold hover:border-bone focus-visible:outline-2 focus-visible:outline-bone">
                  <FobDot color={l.color} size={11} />
                  {l.town}
                  <span className="text-bone-2">· {pageFor(l.slug)?.gallery.photos.length}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {locations.map((l) => {
        const page = pageFor(l.slug);
        if (!page) return null;
        return (
          <div key={l.slug} className={`loc-tone-${page.tone}`} style={{ ["--loc" as string]: l.color }}>
            <Gallery
              id={`photos-${l.slug}`}
              title={l.town}
              photos={page.gallery.photos}
              town={l.town}
              accent={l.color}
              shape={page.gallery.shape}
              more={{ label: `Visit the ${l.town} page`, href: `/locations/${l.slug}` }}
            />
          </div>
        );
      })}

      <CtaBand title="Seen enough?" accent="Come see it lit." photo={oRoom} />
    </PageShell>
  );
}

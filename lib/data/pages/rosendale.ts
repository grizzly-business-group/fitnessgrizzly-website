import type { LocationPage } from "../location-pages";

import rStorefront from "@/public/media/rosendale/rosendale-storefront-racks.jpg";
import rRoom from "@/public/media/rosendale/rosendale-whole-room.jpg";
import rSelect from "@/public/media/rosendale/rosendale-selectorized-line.jpg";
import rPlateRacks from "@/public/media/rosendale/rosendale-plate-loaded-racks.jpg";
import rCardioX from "@/public/media/rosendale/rosendale-cardio-x-wall.jpg";
import rRacksBenches from "@/public/media/rosendale/rosendale-racks-benches.jpg";
import rStretch from "@/public/media/rosendale/rosendale-stretch-room.jpg";
import rDumbbells from "@/public/media/rosendale/rosendale-dumbbells-storefront.jpg";

/*
 * Rosendale — "The Neighborhood Gym". Sources: /rosendale (address only), /rosendalephotos (13 images),
 * homepage staffed hours ("by appointment").
 *
 * PHOTOS: every Rosendale image is a ~1890px screenshot, not a camera original (Phase 1). To swap in
 * originals later, run:  npm run photo -- <original.jpg> rosendale/rosendale-<name>
 * which auto-rotates, resizes and overwrites the file at the same path — this page (and every other
 * place the photo appears) picks it up with no code change. Then drop `source: "screenshot"` below.
 */

const shot = "screenshot" as const;

export const rosendale: LocationPage = {
  slug: "rosendale",
  path: "/locations/rosendale",
  legacyPaths: ["/rosendale", "/rosendalephotos"],
  seo: {
    title: "Grizzly Fitness Rosendale, WI | 24/7 Gym on S. Main St.",
    description:
      "Grizzly Fitness Rosendale: a bright 24/7 key-fob storefront gym on Main Street with selectorized machines, half racks, a hack squat, dumbbells, treadmills and a stretch room. Staffed by appointment.",
  },
  geo: { lat: 43.8072628, lng: -88.6753289 },
  tone: "bright",
  hero: {
    variant: "storefront",
    photo: {
      src: rStorefront,
      asset: "f51fb04f",
      alt: "Racks, benches and plate-loaded machines facing the glass storefront doors onto S. Main Street at Grizzly Fitness Rosendale, with blue and grey striped walls",
      caption: "Inside the storefront at 102 S. Main St.",
      position: "50% 55%",
      source: shot,
    },
    eyebrow: "05 — The Neighborhood Gym",
    lead: "A bright storefront gym right on Main Street: selectorized machines, half racks, plate-loaded machines, dumbbells and cardio, open 24/7 with your key fob.",
  },
  order: ["facts", "space", "equipment", "gallery", "membership", "others", "cta"],
  space: {
    eyebrow: "On Main Street",
    heading: ["Your gym,", "right on Main."],
    surface: "paper",
    paragraphs: [
      "Grizzly Fitness Rosendale is a storefront gym at 102 S. Main St. Glass doors open onto the street, and inside it's bright: white walls with bold blue and grey stripes, a black ceiling and long LED light strips.",
      "The room holds a line of selectorized machines with red seats, half racks, a plate-loaded hack squat, a dumbbell rack along the mirrors and treadmills and bikes — plus a small stretch room with kettlebells and stability balls.",
    ],
    photos: [
      { src: rRoom, asset: "7d3726e0", alt: "The whole room: dumbbells, a lifting platform, racks and machines under the black ceiling and long LED lights", caption: "The whole room", source: shot },
      { src: rSelect, asset: "db02f441", alt: "A line of selectorized machines with red seats and pads", caption: "The selectorized line", source: shot },
      { src: rStretch, asset: "abde4f79", alt: "A small stretch room with kettlebells, stability balls and a wall-mounted TV", caption: "The stretch room", position: "50% 60%", source: shot },
    ],
  },
  equipment: {
    heading: ["Everything", "you need."],
    intro: "Listed from our own photos of the gym — ask us about anything specific.",
    groups: [
      { group: "Strength", items: ["Selectorized machines with red seats", "Half racks", "Plate-loaded hack squat and machines", "Dumbbell rack and benches", "Lifting platform"] },
      { group: "Cardio", items: ["Woodway curved treadmill", "Matrix treadmill", "Bikes and more cardio"] },
      { group: "Also here", items: ["Stretch room with kettlebells and stability balls", "Glass storefront on S. Main St.", "24/7 key-fob entry", "Staffed by appointment"] },
    ],
  },
  services: { items: [] },
  // Gallery trimmed to the six clearest photos until camera originals are reshot (owner default, Nov 2026).
  gallery: {
    photos: [
      { src: rRoom, asset: "7d3726e0", alt: "The whole room from the back, looking toward the storefront", caption: "The whole room", source: shot },
      { src: rStorefront, asset: "f51fb04f", alt: "Racks and benches facing the glass storefront doors", caption: "Toward the storefront", source: shot },
      { src: rSelect, asset: "db02f441", alt: "Selectorized machines with red seats in a line", caption: "Selectorized line", source: shot },
      { src: rPlateRacks, asset: "77cf3e46", alt: "Plate-loaded machines and racks beside a lifting platform", caption: "Plate-loaded and racks", source: shot },
      { src: rCardioX, asset: "4473e58d", alt: "A cardio corner with bikes and an air bike in front of a blue wall with a white X graphic", caption: "Cardio by the X wall", source: shot },
      { src: rRacksBenches, asset: "84810edb", alt: "Racks and benches along the striped walls", caption: "Racks and benches", source: shot },
    ],
  },
  testimonials: [],
  closing: { photo: { src: rDumbbells, asset: "3105a8e9", alt: "", caption: "" } },
  missingPhotos: [
    "Camera originals for all 12 photos (highest priority — current files are screenshots)",
    "Exterior / storefront on S. Main St.",
    "An appointment / onboarding moment",
    "People training (with consent)",
  ],
  heldBack: [
    "\"~3,000 sq ft\", \"small-town commercial building\", \"community programming\" — research leads not on the site; not published.",
    "How to book a staffed visit — method not chosen yet (launch blocker #20). The page says \"staffed by appointment\" and offers the shared call/text and email contacts; no booking button.",
    "Training services — the Rosendale page lists none, so no services section is shown. Owner to confirm (launch blocker #12).",
    "Photo 7d2296bf (assisted dip/chin and restroom doors) — utility view, excluded (Phase 1).",
    "Wix page structured data — it carried Wautoma's address (launch blocker #7); replaced by schema generated from Rosendale's own data.",
  ],
};

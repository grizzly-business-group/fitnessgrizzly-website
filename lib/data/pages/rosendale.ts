import type { LocationPage } from "../location-pages";

import rStretch from "@/public/media/rosendale/rosendale-stretch-room.jpg";
// Camera originals from the owner's Rosendale album (March 2024), edited for exposure, colour and sharpness only.
import rPlatformStore from "@/public/media/rosendale/rosendale-2024-platform-storefront.jpg";
import rWholeRoom from "@/public/media/rosendale/rosendale-2024-whole-room.jpg";
import rSelectLine from "@/public/media/rosendale/rosendale-2024-selectorized-line.jpg";
import rSelect1 from "@/public/media/rosendale/rosendale-2024-selectorized.jpg";
import rTreadX from "@/public/media/rosendale/rosendale-2024-treadmills-x-wall.jpg";
import rCardioRow from "@/public/media/rosendale/rosendale-2024-cardio-row.jpg";
import rRower from "@/public/media/rosendale/rosendale-2024-rower-dumbbells.jpg";
import rPlates from "@/public/media/rosendale/rosendale-2024-bumper-plates.jpg";
import rBenches from "@/public/media/rosendale/rosendale-2024-benches-dumbbells.jpg";
import rRacks24 from "@/public/media/rosendale/rosendale-2024-racks.jpg";
import rDownRoom from "@/public/media/rosendale/rosendale-2024-down-the-room.jpg";
import rDbWall from "@/public/media/rosendale/rosendale-2024-dumbbell-wall.jpg";

/*
 * Rosendale — "The Neighborhood Gym". Sources: /rosendale (address only), /rosendalephotos (13 images),
 * homepage staffed hours ("by appointment").
 *
 * PHOTOS: Nov 2026 — the page now uses camera originals from the owner's album (March 2024). Only the
 * stretch-room photo is still a ~1890px screenshot (no original in the album), marked `source: shot`.
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
      src: rPlatformStore,
      asset: "IMG_8769",
      alt: "A half rack beside a wooden lifting platform at Grizzly Fitness Rosendale, blue and grey striped walls and the glass storefront doors onto S. Main Street at the far end",
      caption: "Inside the storefront at 102 S. Main St.",
      position: "50% 55%",
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
      { src: rWholeRoom, asset: "IMG_8767", alt: "The whole room from the back: racks, a lifting platform, a bike and the dumbbell rack under the black ceiling and long LED lights, the storefront at the far end", caption: "The whole room" },
      { src: rSelectLine, asset: "IMG_8762", alt: "A line of grey selectorized machines with red seats and pads", caption: "The selectorized line" },
      { src: rStretch, asset: "abde4f79", alt: "A small stretch room with kettlebells, stability balls and a wall-mounted TV", caption: "The stretch room", position: "50% 60%", source: shot },
    ],
  },
  equipment: {
    heading: ["Everything", "you need."],
    intro: "Listed from our own photos of the gym — ask us about anything specific.",
    groups: [
      { group: "Strength", items: ["Selectorized machines with red seats", "Half racks", "Plate-loaded hack squat and machines", "Dumbbell rack and benches", "Lifting platform"] },
      { group: "Cardio", items: ["Woodway curved treadmill", "Matrix treadmills", "Concept2 rower", "Bikes and more cardio"] },
      { group: "Also here", items: ["Stretch room with kettlebells and stability balls", "Glass storefront on S. Main St.", "24/7 key-fob entry", "Staffed by appointment"] },
    ],
  },
  services: { items: [] },
  gallery: {
    photos: [
      { src: rWholeRoom, asset: "IMG_8767", alt: "The whole room from the back, looking toward the storefront", caption: "The whole room" },
      { src: rPlatformStore, asset: "IMG_8769", alt: "A half rack beside a wooden lifting platform, the glass storefront doors at the far end", caption: "Rack and platform by the storefront" },
      { src: rDownRoom, asset: "IMG_8776", alt: "Looking down the long room: benches, dumbbell racks and machines under rows of LED lights", caption: "Down the room" },
      { src: rSelectLine, asset: "IMG_8762", alt: "A line of grey selectorized machines with red seats and pads", caption: "The selectorized line" },
      { src: rTreadX, asset: "IMG_8748", alt: "Matrix treadmills and a curved manual treadmill in front of the blue wall with the white X graphic", caption: "Treadmills by the X wall" },
      { src: rRacks24, asset: "IMG_8774", alt: "Half racks and a wooden platform along the striped wall, a white plate-loaded machine on the right", caption: "Racks and platform" },
      { src: rCardioRow, asset: "IMG_8750", alt: "The cardio row: an air bike, a recumbent bike and treadmills along the blue X wall", caption: "The cardio row" },
      { src: rBenches, asset: "IMG_8772", alt: "Adjustable benches and a red preacher curl bench on rubber mats, dumbbell racks along the wall", caption: "Benches and dumbbells" },
      { src: rDbWall, asset: "IMG_8778", alt: "Dumbbell racks and battle ropes along the mirrored wall, benches in front", caption: "The dumbbell wall" },
      { src: rRower, asset: "IMG_8751", alt: "A Concept2 rower in front of the dumbbell rack, beside a blue-framed doorway", caption: "Rower and dumbbells" },
      { src: rPlates, asset: "IMG_8770", alt: "Bumper plates on a tree in the foreground, benches and machines across the room", caption: "Plates and benches" },
      { src: rSelect1, asset: "IMG_8752", alt: "A grey selectorized machine with red pads against the striped grey-and-white wall", caption: "Selectorized machine" },
      { src: rStretch, asset: "abde4f79", alt: "A small stretch room with kettlebells, stability balls and a wall-mounted TV", caption: "The stretch room", source: shot },
    ],
  },
  testimonials: [],
  closing: { photo: { src: rDbWall, asset: "IMG_8778", alt: "", caption: "" } },
  missingPhotos: [
    "Camera original of the stretch room (the rest now use camera originals)",
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

import type { LocationPage } from "../location-pages";

import oRoom from "@/public/media/omro/omro-full-room.jpg";
import oLegs from "@/public/media/omro/omro-plate-loaded-legs.jpg";
import oWhiteRed from "@/public/media/omro/omro-white-red-plate-loaded.jpg";
import oRacks from "@/public/media/omro/omro-racks-prints.jpg";
import oCardio from "@/public/media/omro/omro-cardio-tvs.jpg";
import oMachines from "@/public/media/omro/omro-machines-dumbbells.jpg";
import oDumbbells from "@/public/media/omro/omro-dumbbell-racks.jpg";
import oPlateDb from "@/public/media/omro/omro-plate-loaded-dumbbells.jpg";

/*
 * Omro — "The Powerhouse". Sources: /omro (address, "Formally [sic] Known As Omro Iron"), /omrophotos
 * (7 photos), the /photos Omro tile (515c815c), homepage staffed hours. The current page has three lines, so the copy here describes only what
 * the photos show — the equipment list, services and the Omro Iron story still need the owner.
 */

export const omro: LocationPage = {
  slug: "omro",
  path: "/locations/omro",
  legacyPaths: ["/omro", "/omrophotos"],
  seo: {
    title: "Grizzly Fitness Omro, WI | 24/7 Gym on W. Huron St. — Formerly Omro Iron",
    description:
      "Grizzly Fitness Omro, formerly Omro Iron: a 24/7 key-fob strength gym with rows of plate-loaded machines, Cybex selectorized machines, racks, dumbbells and cardio. Staffed Mon & Fri 8 AM–12 PM, Tue & Thu 2–6 PM.",
  },
  geo: { lat: 44.0388574, lng: -88.7454157 },
  tone: "mono",
  hero: {
    variant: "monument",
    photo: {
      src: oLegs,
      asset: "0ebad2f7",
      alt: "Rows of white-frame plate-loaded leg machines stretching down the long room at Grizzly Fitness Omro",
      caption: "Plate-loaded leg machines",
      position: "50% 58%",
    },
    eyebrow: "04 — The Powerhouse",
    strap: "Formerly Omro Iron",
    lead: "Rows of plate-loaded machines, racks and dumbbells, with cardio along the wall. Old-school iron, open 24/7 — whether it's your first rep or your thousandth.",
  },
  order: ["facts", "space", "equipment", "gallery", "membership", "others", "cta"],
  space: {
    eyebrow: "The floor",
    heading: ["Built on", "iron."],
    layout: "mosaic",
    paragraphs: [
      "Grizzly Fitness Omro was formerly known as Omro Iron. It's one long room on W. Huron Street, lined with white-frame plate-loaded machines with red pads, Cybex selectorized machines, squat racks and benches, with framed black-and-white prints on the walls.",
      "Full dumbbell racks run along the mirrors, and treadmills and cardio with TVs fill the other side. Nothing fancy — just the equipment, open around the clock.",
    ],
    photos: [
      { src: oWhiteRed, asset: "02926e7c", alt: "White-frame plate-loaded machines with red pads and Cybex selectorized machines down the long room", caption: "White frames, red pads", position: "50% 62%" },
      { src: oRacks, asset: "1e25a35d", alt: "Squat racks and benches in front of framed black-and-white motivational prints", caption: "Racks and the framed prints", position: "35% 45%", zoom: 1.25 },
      { src: oMachines, asset: "6eb7e459", alt: "Close view of a white plate-loaded machine with red pads, dumbbell racks behind", caption: "Plate-loaded detail", position: "30% 75%", zoom: 1.6 },
      { src: oDumbbells, asset: "d647754d", alt: "Rows of dumbbells on racks along the mirrors, adjustable benches in front", caption: "Dumbbell racks", position: "70% 72%", zoom: 1.35 },
      { src: oPlateDb, asset: "515c815c", alt: "White plate-loaded machines with loaded plates beside the dumbbell racks", caption: "Loaded and ready", position: "45% 70%", zoom: 1.3 },
    ],
  },
  equipment: {
    eyebrow: "Equipment & amenities",
    heading: ["The", "roster."],
    style: "roster",
    intro: "What our own photos of the gym show. The full equipment list is still being confirmed — ask us about anything specific.",
    groups: [
      { group: "Plate-loaded", items: ["White-frame plate-loaded machines with red pads", "Plate-loaded leg machines"] },
      { group: "Selectorized", items: ["Cybex selectorized machines"] },
      { group: "Free weights", items: ["Squat racks", "Adjustable and flat benches", "Full dumbbell racks along the mirrors"] },
      { group: "Cardio", items: ["Treadmills and cardio machines with TVs"] },
      { group: "Access", items: ["24/7 key-fob entry", "Staffed Mon & Fri 8 AM–12 PM, Tue & Thu 2 PM–6 PM"] },
    ],
  },
  services: { items: [] },
  gallery: {
    photos: [
      { src: oRoom, asset: "b79d8ac3", alt: "The full room: treadmills along the wall, benches and plate-loaded machines across the floor", caption: "The whole room" },
      { src: oLegs, asset: "0ebad2f7", alt: "Plate-loaded leg machines in a deep view down the room", caption: "Plate-loaded legs" },
      { src: oWhiteRed, asset: "02926e7c", alt: "White and red plate-loaded machines, Cybex selectorized machines and TVs down the long room", caption: "White frames, red pads" },
      { src: oRacks, asset: "1e25a35d", alt: "Squat racks and benches in front of framed black-and-white prints", caption: "Racks and prints" },
      { src: oCardio, asset: "c9aa86a0", alt: "A row of treadmills and cardio machines beneath wall-mounted TVs", caption: "Cardio with TVs" },
      { src: oMachines, asset: "6eb7e459", alt: "Plate-loaded machines and dumbbell racks along the mirrors", caption: "Machines and dumbbells" },
      { src: oDumbbells, asset: "d647754d", alt: "Dumbbell racks with adjustable benches in front of the mirrors", caption: "Dumbbell racks" },
      {
        src: oPlateDb,
        asset: "515c815c",
        alt: "White plate-loaded machines with plates loaded beside the dumbbell racks",
        caption: "Plate-loaded machines",
        // Confirmed as Omro by the owner, 19 Nov 2026 (was the Omro tile on the Wix /photos page).
      },
    ],
  },
  testimonials: [],
  closing: { photo: { src: oRacks, asset: "1e25a35d", alt: "", caption: "" } },
  missingPhotos: [
    "Exterior on W. Huron St.",
    "Equipment detail macros (plates, knurling, stacks) — the page crops in on existing photos for now",
    "\"Omro Iron\" legacy photos, if the owner has them",
    "People training (with consent)",
    "Omro Day 1 video original (Wix-hosted; needs export)",
  ],
  heldBack: [
    "The \"From Omro Iron to Grizzly\" story — needs an owner paragraph (Phase 2 content gap); the page states only the verified \"formerly known as Omro Iron\".",
    "Training services — the Omro page lists none, so no services section is shown. Owner to confirm what (if anything) runs at Omro (launch blocker #12).",
    "Omro Day 1 video — Wix-hosted; couldn't be exported in this phase (launch blocker #17).",
    "Wix page structured data — it carried Wautoma's address (launch blocker #7); replaced by schema generated from Omro's own data.",
    "Third-party \"Axe & Sledge\" supplement banner (d647754d, 6eb7e459) — cropped out of the detail compositions, still visible in the full gallery photos.",
  ],
};

import type { LocationPage } from "../location-pages";

import oRoom from "@/public/media/omro/omro-full-room.jpg";
import oRacks from "@/public/media/omro/omro-racks-prints.jpg";
import oPlateDb from "@/public/media/omro/omro-plate-loaded-dumbbells.jpg";
// Newest photos from the owner's Omro album (2025–2026), edited for exposure, colour and sharpness only.
import oStorefront from "@/public/media/omro/omro-2025-storefront.jpg";
import oLongRoom from "@/public/media/omro/omro-2025-long-room.jpg";
import oBenches from "@/public/media/omro/omro-2025-benches-machines.jpg";
import oPowerLift from "@/public/media/omro/omro-2025-power-lift.jpg";
import oFlagWall from "@/public/media/omro/omro-2025-flag-wall.jpg";
import oFunctional from "@/public/media/omro/omro-2025-functional-area.jpg";
import oArmyAF from "@/public/media/omro/omro-2025-army-air-force.jpg";
import oLobby from "@/public/media/omro/omro-2026-lobby.jpg";
import oTreadmills from "@/public/media/omro/omro-2026-treadmills.jpg";
import oPlateRows from "@/public/media/omro/omro-2026-plate-loaded-rows.jpg";
import oCybex from "@/public/media/omro/omro-2026-cybex-line.jpg";
import oTrainer from "@/public/media/omro/omro-2026-functional-trainer.jpg";
import oRowers from "@/public/media/omro/omro-2026-rowers.jpg";

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
      src: oPlateRows,
      asset: "IMG_7926",
      alt: "White-frame plate-loaded machines in a row down the long room at Grizzly Fitness Omro, dumbbell racks along the mirrors",
      caption: "Plate-loaded machines down the room",
      position: "50% 60%",
    },
    eyebrow: "04 — The Powerhouse",
    strap: "Formerly Omro Iron",
    lead: "Rows of plate-loaded machines, racks and dumbbells, with cardio along the wall. Old-school feel, open 24/7 — whether it's your first rep or your thousandth.",
  },
  order: ["facts", "space", "equipment", "gallery", "membership", "others", "cta"],
  space: {
    eyebrow: "The floor",
    heading: ["One long", "room."],
    layout: "mosaic",
    paragraphs: [
      "Grizzly Fitness Omro was formerly known as Omro Iron. It's one long room on W. Huron Street, lined with white-frame plate-loaded machines with red pads, Cybex selectorized machines, squat racks and benches, with framed black-and-white prints on the walls.",
      "Full dumbbell racks run along the mirrors, and treadmills and cardio with TVs fill the other side. Up front there's a lobby with navy walls and seating; at the back, rowers and shelves of kettlebells and medicine balls. Nothing fancy — just the equipment, open around the clock.",
    ],
    photos: [
      { src: oLongRoom, asset: "IMG_5086", alt: "Down the long room: white plate-loaded machines with red pads on the left, dumbbell racks along the mirrors on the right", caption: "Down the long room", position: "50% 60%" },
      { src: oBenches, asset: "IMG_5087", alt: "Adjustable benches and white plate-loaded machines with red pads, TVs and military flags on the far wall", caption: "Benches and plate-loaded", position: "50% 60%" },
      { src: oCybex, asset: "IMG_7927", alt: "Cybex selectorized machines with red pads under military flags", caption: "Cybex machines", position: "50% 65%" },
      { src: oFunctional, asset: "IMG_5096", alt: "A Concept2 rower, a flat bench and shelves of medicine balls and kettlebells against the steel wall", caption: "Rowers and med balls", position: "50% 65%" },
      { src: oPowerLift, asset: "IMG_5090", alt: "A white Power Lift plate-loaded machine in front, rows of machines with red pads and TVs behind", caption: "Plate-loaded detail", position: "50% 60%" },
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
      { group: "Free weights", items: ["Squat racks", "Adjustable and flat benches", "Full dumbbell racks along the mirrors", "Kettlebells and medicine balls"] },
      { group: "Cardio", items: ["Treadmills and cardio machines with TVs", "Concept2 rowers"] },
      { group: "Access", items: ["24/7 key-fob entry", "Staffed Mon & Fri 8 AM–12 PM, Tue & Thu 2 PM–6 PM"] },
    ],
  },
  services: { items: [] },
  gallery: {
    photos: [
      { src: oPlateRows, asset: "IMG_7926", alt: "White plate-loaded machines in a row down the room, dumbbell racks along the mirrors", caption: "Plate-loaded rows" },
      { src: oLongRoom, asset: "IMG_5086", alt: "Down the long room: plate-loaded machines with red pads on one side, dumbbells along the mirrors on the other", caption: "Down the long room" },
      { src: oStorefront, asset: "IMG_0871", alt: "The Grizzly Fitness storefront at 125 West Huron St., a palm in a pot beside the glass doors", caption: "The front door on W. Huron St." },
      { src: oLobby, asset: "IMG_7921", alt: "The lobby: navy walls, chairs, a bear print, shelves of supplements and an apparel rack on patterned carpet", caption: "The lobby" },
      { src: oCybex, asset: "IMG_7927", alt: "Cybex selectorized machines with red pads under military flags", caption: "Cybex machines" },
      { src: oBenches, asset: "IMG_5087", alt: "Adjustable benches and white plate-loaded machines with red pads, TVs on the far wall", caption: "Benches and plate-loaded" },
      { src: oTreadmills, asset: "IMG_7924", alt: "A row of treadmills and an elliptical under wall-mounted TVs", caption: "Cardio with TVs" },
      { src: oPowerLift, asset: "IMG_5090", alt: "A white Power Lift plate-loaded machine in front of rows of machines with red pads", caption: "Plate-loaded machines" },
      { src: oFlagWall, asset: "IMG_5092", alt: "A red adjustable bench in front of a navy wall with an American flag, a fan and a water fountain", caption: "The flag wall" },
      { src: oArmyAF, asset: "IMG_5102", alt: "A black multi-station strength machine with a bench in front, under U.S. Army and U.S. Air Force flags", caption: "Under the Army and Air Force flags" },
      { src: oTrainer, asset: "IMG_7930", alt: "A yellow-frame plate-loaded machine and a cable tower, shelves of medicine balls behind and a U.S. Air Force flag above", caption: "Cable tower corner" },
      { src: oRowers, asset: "IMG_7931", alt: "Two Concept2 rowers in front of shelves of medicine balls and kettlebells against the steel wall", caption: "Rowers and med balls" },
      { src: oFunctional, asset: "IMG_5096", alt: "A Concept2 rower and a flat bench beside shelves of medicine balls and kettlebells", caption: "Functional area" },
      { src: oRoom, asset: "b79d8ac3", alt: "The full room: treadmills along the wall, benches and plate-loaded machines across the floor", caption: "The whole room" },
      { src: oRacks, asset: "1e25a35d", alt: "Squat racks and benches in front of framed black-and-white prints", caption: "Racks and prints" },
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
  closing: { photo: { src: oBenches, asset: "IMG_5087", alt: "", caption: "" } },
  missingPhotos: [
    "Equipment detail macros (plates, knurling, stacks)",
    "\"Omro Iron\" legacy photos, if the owner has them",
    "People training (with consent)",
    "Omro Day 1 video original (Wix-hosted; needs export)",
  ],
  heldBack: [
    "The \"From Omro Iron to Grizzly\" story — needs an owner paragraph (Phase 2 content gap); the page states only the verified \"formerly known as Omro Iron\".",
    "Training services — the Omro page lists none, so no services section is shown. Owner to confirm what (if anything) runs at Omro (launch blocker #12).",
    "Omro Day 1 video — Wix-hosted; couldn't be exported in this phase (launch blocker #17).",
    "Wix page structured data — it carried Wautoma's address (launch blocker #7); replaced by schema generated from Omro's own data.",
    "Older photos with a third-party \"Axe & Sledge\" supplement banner (d647754d, 6eb7e459) — replaced by the owner's newer photos, Nov 2026.",
  ],
};

import type { StaticImageData } from "next/image";
import omroLegs from "@/public/media/omro/omro-plate-loaded-legs.jpg";
import berlinFloor from "@/public/media/berlin/berlin-main-floor-turf.jpg";
import princetonRacks from "@/public/media/princeton/princeton-racks-platform.jpg";
import wautomaFloor from "@/public/media/wautoma/wautoma-main-floor.jpg";
import type { LocationSlug } from "./locations";

/* ---------- S3 chapters (verified facts only — Phase 2 storyboard) ---------- */
export type Chapter = {
  id: string;
  title: string;
  headline: [string, string];
  body: string;
  stat: [string, string];
  /** Stat awaiting owner confirmation (shows the dev-only † marker). */
  statNote?: string;
  image: StaticImageData;
  alt: string;
  credit: string;
  position?: string;
  cta: { label: string; href: string };
};

export const chapters: Chapter[] = [
  {
    id: "equipment",
    title: "Real equipment",
    headline: ["Equipment for", "every level."],
    body: "Our gyms have an old-school feel and feature Hammer Strength, Precor, Matrix, Cybex, Nautilus and Magnum pieces of all kinds — plate-loaded and selectorized machines, racks, dumbbells and cardio, whether it's your first workout or your thousandth.",
    stat: ["Hammer Strength · Precor · Matrix", "Cybex · Nautilus · Magnum"],
    image: omroLegs,
    alt: "Plate-loaded leg machines at Grizzly Fitness Omro",
    credit: "Grizzly Fitness Omro",
    position: "55% 50%",
    cta: { label: "Find your gym", href: "#gyms" },
  },
  {
    id: "open-24-7",
    title: "Open 24/7",
    headline: ["Your fob.", "Your hours."],
    body: "Every Grizzly gym is open 24 hours a day, 365 days a year with key fob access. Pick up your fob during staffed hours — or call, and we can unlock the door remotely.",
    stat: ["24 / 7 / 365", "at all five gyms"],
    image: berlinFloor,
    alt: "The main training floor at Grizzly Fitness Berlin: machines, the green turf lane and flags along the far wall",
    credit: "Grizzly Fitness Berlin",
    position: "50% 60%",
    cta: { label: "See staffed hours", href: "#gyms" },
  },
  {
    id: "coaching",
    title: "Coaching",
    headline: ["A coach", "in your corner."],
    body: "Train in a small group of 2–6 with the personal attention of a coach — customized workouts, accountability and community support. Add InBody scans and app-based programming when you want more.",
    stat: ["2–6 people", "per small-group session"],
    image: princetonRacks,
    alt: "Squat racks and a lifting platform at Grizzly Fitness Princeton",
    credit: "Grizzly Fitness Princeton",
    position: "50% 55%",
    cta: { label: "Explore training", href: "#services" },
  },
  {
    id: "community",
    title: "Community",
    headline: ["Your neighbors", "train here."],
    body: "First-timers, serious lifters and Silver Sneakers members share the same floors. “This is a great place to be able to go to stay in shape. Just what Wautoma needed!” — Clarence Lont",
    stat: ["Group Fit · Senior Fit", "classes at Wautoma"],
    image: wautomaFloor,
    alt: "Plate-loaded machines and service flags on the main floor at Grizzly Fitness Wautoma",
    credit: "Grizzly Fitness Wautoma",
    position: "50% 50%",
    cta: { label: "See services", href: "#services" },
  },
];

/* ---------- S5 services — only what the current site states, with where ---------- */
export type Service = {
  id: string;
  title: string;
  body: string;
  where: LocationSlug[] | "all";
  whereVerified: boolean;
  feature?: boolean;
  cta?: { label: string; linkKey?: "join"; href?: string };
  /** On-site page with the full details (Phase 5). */
  more?: { label: string; href: string };
};

export const services: Service[] = [
  {
    id: "memberships",
    more: { label: "Membership options", href: "/memberships" },
    title: "Memberships",
    body: "Bi-weekly memberships with full 24/7 access, plus 1-day and 7-day passes. Discounts for students, military and seniors.",
    where: "all",
    whereVerified: true,
    feature: true,
    cta: { label: "Join online", linkKey: "join" },
  },
  {
    id: "semi-private",
    more: { label: "About semi-private training", href: "/personal-training" },
    title: "Semi-private personal training",
    body: "Train in a small group of 2–6 with the personal attention of a coach — built for people 40+ who want strength and mobility without the joint strain of high-intensity programs.",
    where: ["princeton", "berlin", "wautoma"],
    whereVerified: true,
    cta: { label: "Book a consult", href: "/personal-training#consult" },
  },
  {
    id: "classes",
    more: { label: "Classes at Wautoma", href: "/classes" },
    title: "Group classes",
    body: "Group Fit and Senior Fit (Silver Sneakers) classes at Wautoma. Call or text 920-990-2795 for current class times.",
    where: ["wautoma"],
    whereVerified: true,
  },
  {
    id: "inbody",
    more: { label: "InBody details", href: "/training#inbody" },
    title: "InBody scans",
    body: "A specialized scale that gives an accurate measurement of your water weight, muscle mass, skeletal weight and fat.",
    where: ["princeton", "berlin", "wautoma"],
    whereVerified: true,
  },
  {
    id: "pocket-trainer",
    more: { label: "Pocket trainer details", href: "/training#pocket-trainer" },
    title: "Pocket trainer",
    body: "A personal trainer in your pocket: personalized workouts, instructional videos and progress tracking from your phone.",
    where: ["princeton", "berlin", "wautoma"],
    whereVerified: true,
  },
  {
    id: "tanning",
    more: { label: "Tanning details", href: "/training#tanning" },
    title: "Tanning",
    body: "Tanning for a vacation, a competition, swimsuit season or a little extra Vitamin D — with lotion, tan extender and goggles in stock.",
    where: ["berlin"],
    whereVerified: true,
  },
];

/* ---------- Testimonials — verbatim excerpts from the current site ---------- */
export const testimonials = [
  {
    quote: "I’ve tried quite a few local gyms, but Grizzly Fitness keeps me motivated and makes me feel at home. The staff is always very friendly and super helpful.",
    name: "Jason Fischer",
    context: "Member",
  },
  {
    quote: "My wife also enjoys the silver sneakers class in the mornings. This is a great place to be able to go to stay in shape. Just what Wautoma needed!",
    name: "Clarence Lont",
    context: "Wautoma",
  },
  {
    quote: "Awesome gym! Super cool people, training, equipment, and atmosphere all around. I would recommend 10/10.",
    name: "Caleb Kozlowski",
    context: "Princeton",
  },
];

import type { LocationSlug } from "../locations";

/**
 * Training content. Sources: Wix /sppt (Semi-Private Personal Training — text verbatim, feature cards and
 * testimonials transcribed from images 988f0673 / 3b16854a), and each gym's own Wix page "Services" cards.
 * Where a service is offered comes ONLY from those gym pages — never assumed for other gyms.
 */

/** Which gym pages list each service (Phase 1 Website Inventory §1.4–1.8). Omro and Rosendale list none. */
/** `extra` = owner-confirmed additions to the Wix wording (26 Oct 2026). `glance` = one-line "what it is" for the comparison table, paraphrased from `body`. */
export const serviceWhere: { id: string; title: string; listedAt: LocationSlug[]; href?: string; body: string; extra?: string; glance: string }[] = [
  {
    id: "semi-private",
    title: "Semi-private personal training",
    listedAt: ["princeton", "berlin", "wautoma"],
    href: "/personal-training",
    body: "Train in a small group setting (2–6 people) with the personal attention of a coach. Get customized workouts, accountability and community support — all at a fraction of the cost of one-on-one training.",
    extra: "Nutrition guidance is part of semi-private personal training.",
    glance: "Coached sessions in a small group, on a plan built for you — with nutrition guidance and accountability",
  },
  {
    id: "inbody",
    title: "InBody scans",
    listedAt: ["princeton", "berlin", "wautoma"],
    body: "InBody scanning is a specialized scale that gives you an accurate measurement of your water weight, muscle mass, skeletal weight and fat.",
    glance: "A body-composition measurement: water, muscle, skeletal weight and fat",
  },
  {
    id: "pocket-trainer",
    title: "Pocket trainer & exercise programming",
    listedAt: ["princeton", "berlin", "wautoma"],
    body: "A personal trainer in your pocket: one of our trainers plans personalized workouts for you. Access workouts, watch instructional videos and track your progress from your phone. (Called Pocket Trainer at Princeton and Berlin, Exercise Programming at Wautoma.)",
    glance: "Personalized workouts from a trainer, done on your own with the app",
  },
  {
    id: "classes",
    title: "Group classes",
    listedAt: ["wautoma"],
    href: "/classes",
    body: "Group Fit and Senior Fit (Silver Sneakers) classes at Wautoma's Main Classroom and Dance Studio. Call or text 920-990-2795 for current class times.",
    glance: "Group workouts with an instructor at Wautoma",
  },
  {
    id: "tanning",
    title: "Tanning",
    listedAt: ["berlin"],
    href: "/locations/berlin#svc-tanning",
    body: "Need a tan for a vacation or bodybuilding competition, swimsuit season, or a little extra Vitamin D? We offer tanning at our Berlin location, and carry lotion, tan extender and tanning goggles as well.",
    glance: "Tanning, with lotion, tan extender and goggles for sale",
  },
];

export const consult = {
  email: "mailto:support@fitnessgrizzly.com?subject=Semi-private%20personal%20training%20consult",
  // The old Wix consult link (go.fitnessgrizzly.com/schedule) is 404 and not reused. The GoHighLevel consult
  // calendar is configured in lib/data/site.ts → ghl.consultCalendar and embedded on /personal-training#consult.
};

/** /sppt — verbatim (headline capitalisation calmed). */
export const sppt = {
  kicker: "Semi-private personal training",
  headline: "Transform your fitness journey with semi-private personal training.",
  intro:
    "Experience Semi Private Personal Training at Grizzly Fitness. Get personalized coaching in a supportive small-group setting designed to help you build strength, improve mobility, and stay consistent. Our semi-private training model gives you focused guidance from expert coaches while still benefiting from the motivation of a small community. See how our locations can help you reach your goals with a program built around you.",
  whatTitle: "What is semi-private personal training?",
  what:
    "Semi-private training gives you the structure of personal training with the energy of a small group. Each person follows a plan built around their goals while a coach guides the entire session, adjusts movements, and ensures proper form. You train alongside a few others, which keeps sessions motivating and consistent, but you still get individualized attention and coaching. It delivers better results than large classes and costs less than traditional one-on-one training.",
  features: [
    { title: "Small group focus", body: "Train with up to 5 other clients so your coach can watch your form, guide your progress, and make real-time adjustments." },
    { title: "Individual plans", body: "Every member follows a program built for their goals so no one is doing a generic workout." },
    { title: "PT without the price tag", body: "You receive coaching, accountability, and structured programming at a fraction of traditional one-on-one training costs." },
    // Owner-confirmed 26 Oct 2026 (not on the Wix page): nutrition guidance is part of semi-private training.
    { title: "Nutrition guidance", body: "Nutrition guidance is part of semi-private personal training, along with ongoing accountability — so your plan covers more than the hour you spend in the gym." },
  ],
  forYouTitle: "Discover the perfect fitness solution for you.",
  forYou:
    "Semi-private personal training offers the best of both worlds — expert coaching tailored to your needs plus the motivation and affordability of small group sessions. Our approach focuses on safe, effective workouts designed for people 40+ that build strength, improve mobility, and boost energy without the joint strain of traditional high-intensity programs.",
  // Client testimonials removed (owner default, Nov 2026): no names or consent on file.
};

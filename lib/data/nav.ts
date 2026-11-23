import { locations } from "./locations";
import { links } from "./site";

/**
 * Site navigation (Phase 5). One source for the header, the mobile drawer and the footer.
 * Primary = the header bar; secondary = less frequent destinations (drawer + footer only).
 * External items are only listed when the destination was verified (links.*.verified).
 */
export type NavItem = { label: string; href: string; external?: boolean };

export const primaryNav: NavItem[] = [
  { label: "Memberships", href: "/memberships" },
  { label: "Training", href: "/training" },
  { label: "Classes", href: "/classes" },
  { label: "Members", href: "/members" },
  { label: "About", href: "/about" },
  { label: "Podcast", href: "/podcast" },
];

export const secondaryNav: NavItem[] = [
  { label: "All locations", href: "/locations" },
  { label: "Personal training", href: "/personal-training" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Careers", href: "/careers" },
  { label: "Equipment repair", href: "/equipment-repair" },
  ...(links.shop.verified ? [{ label: "Shop", href: links.shop.href, external: true }] : []),
  { label: "Contact", href: "/contact" },
];

/** Footer link columns (legal row is separate, in the footer itself). */
export const footerColumns: { title: string; links: NavItem[] }[] = [
  { title: "Gyms", links: [...locations.map((l) => ({ label: l.town, href: `/locations/${l.slug}` })), { label: "All locations", href: "/locations" }] },
  {
    title: "Train",
    links: [
      { label: "Memberships", href: "/memberships" },
      { label: "Training", href: "/training" },
      { label: "Personal training", href: "/personal-training" },
      { label: "Classes", href: "/classes" },
      { label: "Insurance programs", href: "/memberships#insurance" },
    ],
  },
  {
    title: "Members",
    links: [
      { label: "Join online", href: links.join.href, external: true },
      { label: "Renew & member support", href: "/members" },
      { label: "Member portal", href: links.memberPortal.href, external: true },
      { label: "FAQ", href: "/faq" },
      { label: "Equipment repair", href: "/equipment-repair" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Grizzly",
    links: [
      { label: "About", href: "/about" },
      { label: "Gallery", href: "/gallery" },
      { label: "Podcast", href: "/podcast" },
      ...(links.shop.verified ? [{ label: "Shop", href: links.shop.href, external: true }] : []),
      { label: "Careers", href: "/careers" },
      { label: "Instagram", href: links.instagram.href, external: true },
      { label: "Facebook", href: links.facebook.href, external: true },
      { label: "YouTube", href: links.youtube.href, external: true },
    ],
  },
];

export const legalNav: NavItem[] = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Accessibility", href: "/accessibility" },
];

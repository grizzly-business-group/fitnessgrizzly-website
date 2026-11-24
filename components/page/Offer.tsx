import { offer, pricing } from "@/lib/data/site";
import { networkRating, ratingShowMin, type Location } from "@/lib/data/locations";
import { to } from "@/lib/paths";

/**
 * "$20 bi-weekly · $14 for students & seniors". Prices are the same at every gym today; the slug argument keeps
 * the call sites ready for per-gym prices. Returns null if prices are ever removed (nothing is invented).
 */
export function priceLine(slug?: string): string | null {
  void slug;
  const adult = pricing.biweekly[0]?.price;
  const low = pricing.biweekly[pricing.biweekly.length - 1]?.price;
  if (!adult) return null;
  return low && low !== adult ? `${adult} bi-weekly · ${low} for students & seniors` : `${adult} bi-weekly`;
}

/**
 * Standing first-visit offer (lib/data/site.ts → offer). Renders nothing until the owner supplies a headline.
 * Used on /join, /memberships, the gym pages and under the homepage hero buttons.
 */
export function OfferStrip({ className = "" }: { className?: string }) {
  if (!offer.live || !offer.headline) return null;
  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 border-l-4 border-lamp bg-iron/70 px-4 py-3 text-[15px] text-bone ${className}`}>
      <b className="font-semibold">{offer.headline}</b>
      {offer.detail && <span className="text-bone-2">{offer.detail}</span>}
      {offer.href && (
        <a href={to(offer.href)} className="py-1 font-semibold text-lamp underline underline-offset-4 hover:text-lamp-hover">
          {offer.cta} <span aria-hidden>→</span>
        </a>
      )}
    </p>
  );
}

/**
 * Google rating badge (owner OK'd, 23 Nov 2026). With a gym: that gym's rating, linked to its Google Maps listing,
 * hidden below ratingShowMin. Without: all five gyms combined. Plain text — no review schema (Google doesn't allow
 * marking up third-party reviews as your own).
 */
export function RatingBadge({ loc, className = "" }: { loc?: Location; className?: string }) {
  const r = loc ? loc.google : networkRating;
  if (loc && r.rating < ratingShowMin) return null;
  const label = loc ? `${r.rating.toFixed(1)} on Google · ${r.count} reviews` : `${r.rating.toFixed(1)} on Google · ${r.count} reviews across our five gyms`;
  const inner = (
    <>
      <span aria-hidden className="text-lamp">★</span>
      <span>{label}</span>
    </>
  );
  const cls = `inline-flex items-center gap-2 py-1 text-[14px] font-semibold text-bone ${className}`;
  return loc ? (
    <a href={to(loc.mapsUrl)} target="_blank" rel="noopener noreferrer" className={`${cls} underline-offset-4 hover:underline`}>
      {inner}
      <span className="sr-only"> (opens Google Maps)</span>
    </a>
  ) : (
    <p className={cls}>{inner}</p>
  );
}

import { locations, networkRating } from "@/lib/data/locations";
import { Grain, FobDot } from "@/components/ui/primitives";
import { to } from "@/lib/paths";

/**
 * S2 — Proof band (Nov 2026 audit). Replaced the full-screen "BIG DREAMERS" scroll reveal, which repeated the
 * hero tagline and cost a screen of scrolling. Four facts, static (no scroll animation), then the short origin
 * line and a link to the story. The section keeps id="statement" so the hero's scroll cue still lands here.
 */
const facts = [
  { value: String(locations.length), label: "Gyms in five small towns" },
  { value: "2017", label: "Started in Princeton" },
  { value: "24/7", label: "Key-fob access, 365 days" },
  { value: `${networkRating.rating.toFixed(1)}★`, label: `On Google, from ${networkRating.count} reviews` },
];

export default function S2Statement() {
  return (
    <section id="statement" data-scene="proof" aria-labelledby="statement-title" className="relative bg-charcoal">
      <Grain />
      <div className="relative mx-auto max-w-[1440px] px-[var(--margin)] py-20 lg:py-28">
        <h2 id="statement-title" className="sr-only">
          Grizzly Fitness at a glance
        </h2>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] font-bold uppercase tracking-[0.18em] text-steel md:text-[13px]">
          {locations.map((l) => (
            <li key={l.slug} className="flex items-center gap-2">
              <FobDot color={l.color} size={9} />
              {l.town}
            </li>
          ))}
        </ul>
        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-[var(--line)] pt-10 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="flex flex-col-reverse">
              <dt className="mt-3 max-w-[220px] text-[13px] font-semibold uppercase tracking-[0.12em] text-bone-2">{f.label}</dt>
              <dd className="font-display text-[clamp(56px,8vw,112px)] font-extrabold uppercase leading-[0.85] text-bone">{f.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-12 grid gap-4 md:grid-cols-[5fr_7fr] md:items-end">
          <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-steel md:text-[13px]">Started in Princeton, Wisconsin</p>
          <div className="max-w-[640px]">
            <p className="text-bone-2">
              Grizzly Fitness started as a small personal gym in Princeton, Wisconsin. Today it is five gyms with an old-school feel — and a membership that welcomes first-timers, serious lifters and Silver Sneakers members alike.
            </p>
            <a href={to("/about")} className="mt-4 inline-block py-2 text-[14px] font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">
              Our story <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

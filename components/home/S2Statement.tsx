import { locations } from "@/lib/data/locations";
import { Grain, FobDot } from "@/components/ui/primitives";
import { to } from "@/lib/paths";

const BIG = "Big dreamers.";

/**
 * S2 — Brand statement. The brand's own sentence (/about, verbatim), choreographed:
 * "small towns" stays small; each letter of BIG DREAMERS switches on as you scroll.
 * Static fallback = everything lit.
 */
export default function S2Statement() {
  return (
    <section id="statement" data-scene="statement" aria-labelledby="statement-title" className="relative bg-charcoal">
      <Grain />
      <div data-statement-pin className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-[var(--margin)] py-24 lg:py-0">
        <h2 id="statement-title" className="sr-only">
          We operate in small towns, but Grizzly Fitness is for Big Dreamers.
        </h2>
        <div aria-hidden className="mx-auto w-full max-w-[1440px]">
          <p data-st-small className="text-[clamp(20px,2.3vw,32px)] font-semibold leading-[1.25] tracking-[-0.01em] text-bone-2">
            We operate in <span className="text-bone">small towns,</span>
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px] md:text-[13px] font-bold uppercase tracking-[0.18em] text-steel">
            {locations.map((l) => (
              <li key={l.slug} data-st-town className="flex items-center gap-2">
                <FobDot color={l.color} size={9} />
                {l.town}
              </li>
            ))}
          </ul>
          <p data-st-but className="mt-8 text-[clamp(20px,2.3vw,32px)] font-semibold leading-[1.25] tracking-[-0.01em] text-bone-2">
            but Grizzly Fitness is for
          </p>
          <p data-st-big className="-ml-[0.03em] mt-2 origin-left whitespace-nowrap font-display font-black uppercase leading-[0.8] tracking-[-0.01em] text-[clamp(64px,16.6vw,300px)] max-md:whitespace-normal">
            {BIG.split("").map((ch, i) => (
              <span key={i} data-st-letter className={i < 3 ? "text-bone" : "text-lamp"}>
                {ch}
              </span>
            ))}
          </p>
        </div>
        <div data-st-foot className="mx-auto mt-14 grid w-full max-w-[1440px] gap-6 md:grid-cols-[5fr_7fr] md:items-end">
          <p className="text-[12px] md:text-[13px] font-bold uppercase tracking-[0.18em] text-steel">Started in Princeton, Wisconsin</p>
          <div className="max-w-[640px]">
            <p className="text-bone-2">
              Grizzly Fitness started as a small personal gym in beautiful Princeton, Wisconsin. Today it is five gyms with an old-school feel — and a membership that welcomes first-timers, serious lifters and Silver Sneakers members alike.
            </p>
            <a href={to("/about")} className="mt-4 inline-block text-[14px] font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">
              Our story <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

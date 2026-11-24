import Image from "next/image";
import { joinHref, locations } from "@/lib/data/locations";
import { locationPaths } from "@/lib/data/location-routes";
import { Button, Eyebrow, Unverified } from "@/components/ui/primitives";
import { to } from "@/lib/paths";

/**
 * S4 — "Five Lights". Desktop: five columns; one is lit and expanded (CSS hover/focus works
 * without JS; HomeMotion drives the active column from scroll). Mobile: five full cards.
 * Only the five active gyms exist in `locations`.
 */
export default function S4FiveLights() {
  return (
    <section id="gyms" data-scene="gyms" aria-labelledby="gyms-title" className="relative bg-iron pt-24 lg:pt-28">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-[var(--margin)] pb-10 lg:flex-row lg:items-end lg:justify-between lg:pb-12">
        <div>
          <Eyebrow>Five gyms · five personalities</Eyebrow>
          <h2 id="gyms-title" className="mt-4 font-display font-extrabold uppercase leading-[0.9] text-[clamp(44px,5vw,80px)]">
            Pick your
            <br />
            home gym.
          </h2>
        </div>
        <p className="max-w-[440px] text-bone-2">
          Every membership starts at one home gym. Insurance members can train at all five. Every gym is open 24/7 with your key fob.
        </p>
      </div>

      <div data-lights className="lights swipe" role="region" aria-label="Our five gyms">
        {locations.map((l, i) => (
          <article key={l.slug} id={`gym-${l.slug}`} data-gym={i} data-active={i === 0 ? "true" : "false"} className="gym" style={{ ["--brand" as string]: l.color, ["--tint" as string]: l.tint }} tabIndex={-1}>
            <div className="gym-photo absolute inset-0">
              <Image src={l.showcase.src} alt={l.showcase.alt} fill sizes="(min-width:1024px) 55vw, 100vw" placeholder="blur" className="object-cover" style={{ objectPosition: l.showcase.position }} />
            </div>
            <div aria-hidden className="gym-shade absolute inset-0" />
            <div aria-hidden className="gym-wash absolute inset-0" />
            <i aria-hidden className="gym-bar absolute inset-x-0 top-0 z-[1] h-1.5" />
            {/* Mouse shortcut only: keyboard and screen-reader users reach every gym's details directly
                (they stay in the Tab order), so this duplicate control is kept out of both. */}
            <button type="button" data-gym-select={i} className="gym-select" tabIndex={-1} aria-hidden="true">
              <span aria-hidden className="gym-vname font-display font-extrabold uppercase">{l.town}</span>
            </button>
            <div className="gym-info">
              <Eyebrow className="gym-eyebrow">
                0{i + 1} — {l.tag}
              </Eyebrow>
              <h3 className="mt-3 font-display font-extrabold uppercase leading-[0.86] text-[clamp(56px,7vw,124px)]">{l.town}</h3>
              <p className="mt-4 max-w-[520px] text-[17px] md:text-[19px] leading-[1.5] text-bone">{l.summary}</p>
              <dl className="mt-5 grid grid-cols-1 gap-3 text-[15px] text-bone-2 sm:grid-cols-3 sm:gap-6">
                <div>
                  <dt className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">Staffed</dt>
                  <dd>{l.staffed.label}</dd>
                </div>
                <div>
                  <dt className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">Key fob</dt>
                  <dd>24/7 · 365</dd>
                </div>
                <div>
                  <dt className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">Address</dt>
                  <dd>
                    {l.address.street}
                    {!l.address.verified && <Unverified note="Launch blocker #6 — Princeton address conflict" />}, {l.address.city}
                  </dd>
                </div>
              </dl>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={to(l.mapsUrl)} size="sm">
                  Directions to {l.town}
                </Button>
                <Button href={to(joinHref(l))} size="sm" variant="secondary" className="bg-iron/75 backdrop-blur-[2px]">
                  Join at {l.town}
                </Button>
              </div>
              {locationPaths[l.slug] && (
                <a href={to(locationPaths[l.slug])} className="mt-4 inline-block text-[14px] font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">
                  Inside the {l.town} gym — photos, equipment and more →
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
      <div className="px-[var(--margin)]"><p aria-hidden className="swipe-hint">Swipe for more <span>→</span></p></div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import bg from "@/public/media/berlin/berlin-power-rack.jpg";
import { joinHref, locations, staffedPhrase } from "@/lib/data/locations";
import { site } from "@/lib/data/site";
import { locationPaths } from "@/lib/data/location-routes";
import { Button, Unverified, FobDot } from "@/components/ui/primitives";
import { to } from "@/lib/paths";

/**
 * S7 — Conversion. Town picker shows that gym's essentials; Join goes to the verified GymMaster
 * sign-up (per-club deep links are not yet verified — visitors choose the club at sign-up).
 */
export default function S7Convert() {
  const [sel, setSel] = useState(0);
  const g = locations[sel];
  const phone = site.phone.value;
  return (
    <section id="join" data-scene="convert" aria-labelledby="join-title" className="relative isolate overflow-hidden py-28 lg:py-40">
      <div data-parallax className="absolute -inset-y-[8%] inset-x-0 -z-10">
        <Image src={bg} alt="" fill sizes="100vw" placeholder="blur" className="object-cover [filter:contrast(1.1)_saturate(.75)_brightness(.3)]" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10" style={{ background: "radial-gradient(70% 70% at 50% 50%, rgba(14,13,11,.2), rgba(14,13,11,.88))" }} />
      <div className="mx-auto max-w-[1200px] px-[var(--margin)] text-center">
        <p className="text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.16em] text-lamp" data-reveal>Start tonight</p>
        <h2 id="join-title" data-reveal className="mt-5 font-display font-extrabold uppercase leading-[0.86] text-[clamp(60px,10vw,160px)]">
          Find your gym.
          <br />
          <span className="text-lamp">Get your fob.</span>
        </h2>

        <div role="radiogroup" aria-label="Choose a gym" className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5" data-reveal>
          {locations.map((l, i) => (
            <button
              key={l.slug}
              type="button"
              role="radio"
              aria-checked={sel === i}
              onClick={() => setSel(i)}
              style={sel === i ? { background: l.color, borderColor: l.tint } : undefined}
              className={`flex h-[64px] items-center justify-center gap-2.5 border-[1.5px] font-display text-[24px] font-extrabold uppercase transition-colors duration-150 lg:h-[72px] lg:text-[26px] ${
                sel === i ? "text-bone" : "border-[var(--line-strong)] bg-iron/55 hover:border-bone"
              } ${i === 4 ? "col-span-2 sm:col-span-1" : ""}`}
            >
              <FobDot color={l.color} size={12} />
              {l.town}
            </button>
          ))}
        </div>

        <div aria-live="polite" className="mx-auto mt-6 max-w-[760px] text-[15px] text-bone-2">
          <b className="text-bone">Grizzly Fitness {g.town}</b> · {g.address.street}
          {!g.address.verified && <Unverified />}, {g.address.city} · {staffedPhrase(g)} · Key fob 24/7
        </div>

        {locationPaths[g.slug] && (
          <p className="mt-3 text-[15px]">
            <a href={to(locationPaths[g.slug])} className="font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">
              See the {g.town} gym →
            </a>
          </p>
        )}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
          <Button href={to(joinHref(g))} arrow>
            Join online at {g.town}
          </Button>
          <Button href={to(g.mapsUrl)} variant="secondary">
            Directions to {g.town}
          </Button>
          <Button href={to(`tel:${phone.tel}`)} variant="secondary">
            Call / text {phone.display}
          </Button>
        </div>
        <p className="mt-6 text-[14px] text-bone-2">
          Sign-up, waiver and payment are handled securely by our GymMaster member portal. Want coaching? See{" "}
          <a href={to("#svc-semi-private")} className="text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">
            semi-private personal training
          </a>
          .
        </p>
      </div>
    </section>
  );
}

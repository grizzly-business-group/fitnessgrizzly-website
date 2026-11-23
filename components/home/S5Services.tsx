import { services } from "@/lib/data/content";
import { locations } from "@/lib/data/locations";
import { site } from "@/lib/data/site";
import { Button, SiteLink, Unverified } from "@/components/ui/primitives";
import { to } from "@/lib/paths";

const townOf = (slug: string) => locations.find((l) => l.slug === slug)?.town ?? slug;

/** S5 — Services & membership on the bone "paper" surface. Each service lists where it is offered. */
export default function S5Services() {
  return (
    <section id="services" data-scene="services" aria-labelledby="services-title" className="bg-paper py-24 text-ink lg:py-32">
      <div className="mx-auto max-w-[1440px] px-[var(--margin)]">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-6" data-reveal>
            <p className="text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.16em] text-lamp-deep">Membership &amp; training</p>
            <h2 id="services-title" className="mt-4 font-display font-extrabold uppercase leading-[0.9] text-[clamp(44px,5vw,80px)]">
              Train your way.
            </h2>
          </div>
          <p className="text-ink-2 lg:col-span-5 lg:col-start-8 lg:self-end" data-reveal>
            Join online in minutes through our member portal. Get your key fob, then train on your schedule — and add coaching, classes and scans when you want more.
          </p>
        </div>

        <ul className="mt-14 grid gap-[2px] border-2 border-paper-2 bg-paper-2 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <li
              key={s.id}
              id={`svc-${s.id}`}
              data-reveal
              className={`flex min-h-[300px] scroll-mt-28 flex-col gap-3.5 p-8 lg:p-9 ${s.feature ? "bg-ink text-bone" : "bg-paper"}`}
            >
              <span className={`font-display text-[15px] font-extrabold tracking-[0.12em] ${s.feature ? "text-lamp" : "text-lamp-deep"}`}>0{i + 1}</span>
              <h3 className="font-display text-[28px] lg:text-[30px] font-bold uppercase leading-none">{s.title}</h3>
              <p className={`text-[17px] leading-[1.55] ${s.feature ? "text-bone-2" : "text-ink-2"}`}>
                {s.body}
              </p>
              {s.more && (
                <a href={to(s.more.href)} className={`self-start text-[14px] font-semibold underline underline-offset-4 ${s.feature ? "decoration-lamp hover:text-lamp" : "decoration-lamp-deep hover:text-lamp-deep"}`}>
                  {s.more.label} <span aria-hidden>→</span>
                </a>
              )}
              <p className="mt-auto text-[12px] font-semibold uppercase tracking-[0.1em]">
                {s.where === "all" ? "All five gyms" : s.where.map(townOf).join(" · ")}
                {!s.whereVerified && <Unverified note="Launch blocker #12 — confirm which gyms offer this service" />}
              </p>
              {s.cta?.linkKey && (
                <SiteLink k={s.cta.linkKey} variant={s.feature ? "primary" : "ink"} size="sm" className="self-start">
                  {s.cta.label}
                </SiteLink>
              )}
              {s.cta?.href && (
                <Button href={to(s.cta.href)} variant={s.feature ? "primary" : "ink"} size="sm" className="self-start">
                  {s.cta.label}
                </Button>
              )}
            </li>
          ))}
        </ul>

        <div id="insurance" data-reveal className="mt-10 flex scroll-mt-28 flex-col gap-3 border-2 border-ink px-7 py-6 lg:flex-row lg:items-center lg:gap-9">
          <p className="font-display text-[22px] font-extrabold uppercase leading-none tracking-[0.03em]">Insurance fitness programs accepted</p>
          <p className="text-[15px] font-semibold text-ink-2">{site.insurancePrograms.join(" · ")}</p>
        </div>
        <p className="mt-4 text-[14px] text-ink-2">
          Insurance members can train at all five gyms. Prices, passes and membership terms are shown in our GymMaster sign-up portal.
        </p>
      </div>
    </section>
  );
}

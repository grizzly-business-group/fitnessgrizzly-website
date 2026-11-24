import Image from "next/image";
import { locations, staffedPhrase } from "@/lib/data/locations";
import { footerColumns, legalNav } from "@/lib/data/nav";
import { site } from "@/lib/data/site";
import { Unverified, FobDot } from "@/components/ui/primitives";
import { gymHref } from "@/lib/data/location-routes";
import { to } from "@/lib/paths";
import { indexingEnabled } from "@/lib/indexing";

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={to(href)} target="_blank" rel="noopener noreferrer" className="-my-2 inline-block py-2 hover:text-bone">
      {children} <span aria-hidden>↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export default function Footer() {
  const phone = site.phone.value;
  return (
    <footer className="border-t border-[var(--line)] bg-iron pb-24 pt-20 lg:pb-10 lg:pt-24">
      <div className="mx-auto max-w-[1440px] px-[var(--margin)]">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-[2.2fr_repeat(4,1fr)]">
          <div className="col-span-2 lg:col-span-1">
            <Image src="/media/brand/logo-white.png" alt="Grizzly Fitness" width={106} height={110} />
            <p className="mt-5 max-w-[340px] text-[15px] text-bone-2">{site.tagline}</p>
            <p className="mt-4 text-[15px] text-bone-2">
              Call/Text{" "}
              <a href={to(`tel:${phone.tel}`)} className="text-bone hover:text-lamp">
                {phone.display}
              </a>

              <br />
              <a href={to(`mailto:${site.email}`)} className="text-bone hover:text-lamp">
                {site.email}
              </a>
            </p>
          </div>
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h2 className="mb-4 text-[12px] font-bold uppercase tracking-[0.16em] text-steel">{col.title}</h2>
              <ul className="space-y-2 text-[15px] text-bone-2">
                {col.links.map((n) => (
                  <li key={n.label}>{n.external ? <ExtLink href={to(n.href)}>{n.label}</ExtLink> : <a href={to(n.href)} className="-my-2 inline-block py-2 hover:text-bone">{n.label}</a>}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <ul className="mt-16 grid gap-8 border-t border-[var(--line)] pt-10 sm:grid-cols-2 lg:grid-cols-5">
          {locations.map((l) => (
            <li key={l.slug}>
              <p className="flex items-center gap-2 font-display text-[22px] font-extrabold uppercase leading-none">
                <FobDot color={l.color} size={11} />
                <a href={to(gymHref(l.slug))} className="-my-2 inline-block py-2 hover:text-lamp">{l.town}</a>
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-bone-2">
                {l.address.street}
                {!l.address.verified && <Unverified note="Launch blocker #6 — Princeton address conflict (429 W. Water St. vs 101 Mechanic St.)" />}
                <br />
                {l.address.city} {l.address.zip}
                <br />
                {staffedPhrase(l)}
              </p>
              <a href={to(l.mapsUrl)} target="_blank" rel="noopener noreferrer" className="mt-0 inline-block py-2 text-[14px] font-semibold text-lamp hover:text-lamp-hover">
                Directions ↗<span className="sr-only"> to Grizzly Fitness {l.town} (opens Google Maps)</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-[14px] text-bone-2">
          <span className="mr-2 bg-[#c8312b] px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white">Coming soon</span>
          <a href={to("/new-london")} className="-my-2 inline-block py-2 font-semibold text-bone hover:text-lamp">Grizzly Fitness New London →</a>
        </p>

        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--line)] pt-7 text-[13px] text-steel md:flex-row md:justify-between">
          <p>© {site.legalEntity.value || "Grizzly Fitness"} · Open 24 hours with key fob access at all five gyms</p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legalNav.map((n) => (
                <li key={n.href}>
                  <a href={to(n.href)} className="-my-2 inline-block py-2 hover:text-bone">{n.label}</a>
                </li>
              ))}
              {/* Shown on previews only: disappears with SITE_INDEXING=true (the launch build). */}
              {!indexingEnabled && (
                <>
                  <li aria-hidden className="hidden md:block">·</li>
                  <li>Development preview — not the live website</li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

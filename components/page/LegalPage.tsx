import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import { type LegalBlock, type LegalDoc } from "@/lib/data/site-pages/legal";
import { to } from "@/lib/paths";

/**
 * Renders a legal document (Terms, Privacy). Plain, readable measure; numbered sections become h2s with
 * anchors and a contents list. Email and phone become links; opt-out URLs in list items become links.
 */
const slug = (h: string) => h.toLowerCase().replace(/^\d+\.\s*/, "").replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function Block({ b }: { b: LegalBlock }) {
  if ("p" in b) return <p>{b.p}</p>;
  if ("h3" in b) return <h3 className="!mt-8 font-display text-[22px] font-bold uppercase leading-none text-bone">{b.h3}</h3>;
  if ("ul" in b)
    return (
      <ul className="space-y-2">
        {b.ul.map((li) => (
          <li key={li} className="flex gap-3">
            <i aria-hidden className="mt-[12px] h-[2px] w-3 shrink-0 bg-lamp" />
            <span>
              {li.split(/(https:\/\/\S+)/).map((part, i) =>
                /^https:\/\//.test(part) ? (
                  <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="break-all font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">
                    {part.replace(/^https:\/\//, "")}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  part
                ),
              )}
            </span>
          </li>
        ))}
      </ul>
    );
  const [label, value] = b.contact;
  return (
    <p className="!mt-1">
      <span className="text-steel">{label}: </span>
      {label === "Email" ? (
        <a href={to(`mailto:${value}`)} className="font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">{value}</a>
      ) : label === "Phone" ? (
        <a href={to(`tel:+1${value.replace(/\D/g, "")}`)} className="font-semibold text-bone underline decoration-lamp underline-offset-4 hover:text-lamp">{value}</a>
      ) : (
        <span className="text-bone">{value}</span>
      )}
    </p>
  );
}

export default function LegalPage({ doc, path, eyebrow }: { doc: LegalDoc; path: string; eyebrow: string }) {
  const crumbs = [{ name: doc.title, path }];
  return (
    <PageShell crumbs={crumbs}>
      <PageHero crumbs={crumbs} compact eyebrow={eyebrow} title={doc.title} lead={<>Last updated: {doc.updated}</>} />
      <div className="mx-auto grid max-w-[1440px] gap-12 px-[var(--margin)] pb-24 pt-4 lg:grid-cols-12 lg:pb-32">
        <nav aria-label="Contents" className="lg:col-span-3">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+24px)]">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.14em] text-steel">Contents</h2>
            <ol className="mt-4 space-y-1 text-[14px] text-bone-2">
              {doc.sections.map((s) => (
                <li key={s.h}>
                  <a href={to(`#${slug(s.h)}`)} className="inline-flex min-h-9 items-center hover:text-lamp">{s.h}</a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
        <article className="legal max-w-[760px] text-[16px] leading-[1.75] text-bone-2 md:text-[17px] lg:col-span-8 lg:col-start-5">
          <div className="space-y-4">
            {doc.intro.map((b, i) => (
              <Block key={i} b={b} />
            ))}
          </div>
          {doc.sections.map((s) => (
            <section key={s.h} aria-labelledby={slug(s.h)} className="mt-12 space-y-4 border-t border-[var(--line)] pt-8">
              <h2 id={slug(s.h)} className="scroll-mt-[calc(var(--header-h)+24px)] font-display text-[30px] font-extrabold uppercase leading-none text-bone">
                {s.h}
              </h2>
              {s.blocks.map((b, i) => (
                <Block key={i} b={b} />
              ))}
            </section>
          ))}
        </article>
      </div>
    </PageShell>
  );
}

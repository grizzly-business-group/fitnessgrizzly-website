import type { ComponentProps, ReactNode } from "react";
import { links, type LinkKey } from "@/lib/data/site";
import { to } from "@/lib/paths";

const isDev = process.env.NODE_ENV !== "production";

/** † marker for values awaiting owner verification (development builds only). */
export function Unverified({ note }: { note?: string }) {
  if (!isDev) return null;
  return (
    <sup className="ml-0.5 cursor-help text-lamp" title={note ?? "Pending owner verification — see Launch Blocker Register"} aria-hidden>
      †
    </sup>
  );
}

export function Eyebrow({ children, className = "", style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <p className={`text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.16em] text-lamp ${className}`} style={style}>
      {children}
    </p>
  );
}

type BtnVariant = "primary" | "secondary" | "ink" | "ink-outline";
const btnBase =
  "inline-flex items-center justify-center gap-2.5 rounded-[2px] border-[1.5px] font-bold uppercase tracking-[0.1em] whitespace-nowrap max-[359px]:whitespace-normal max-[359px]:py-2 max-[359px]:text-center transition-[background-color,border-color,transform,box-shadow,color] duration-[160ms] ease-[var(--ease-out-grizzly)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-bone";
const btnSize = { md: "min-h-[52px] px-7 text-[14px]", sm: "min-h-[44px] px-5 text-[12px]" };
const btnVariant: Record<BtnVariant, string> = {
  primary: "bg-lamp text-iron border-transparent hover:bg-lamp-hover hover:-translate-y-px hover:shadow-[0_8px_24px_-8px_var(--lamp-glow)]",
  secondary: "bg-transparent text-bone border-[var(--line-strong)] hover:border-bone hover:bg-bone/5",
  ink: "bg-ink text-paper border-transparent hover:bg-charcoal-2 focus-visible:outline-ink",
  "ink-outline": "bg-transparent text-ink border-ink hover:bg-ink hover:text-paper focus-visible:outline-ink",
};

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="10" viewBox="0 0 18 10" aria-hidden className={`shrink-0 transition-transform duration-[160ms] group-hover:translate-x-1 ${className}`}>
      <path d="M0 4.2h12.5V0L18 5l-5.5 5V5.8H0z" fill="currentColor" />
    </svg>
  );
}

type ButtonProps = { variant?: BtnVariant; size?: "md" | "sm"; arrow?: boolean; className?: string; children: ReactNode } & Omit<ComponentProps<"a">, "className" | "children">;

export function Button({ variant = "primary", size = "md", arrow, className = "", children, ...rest }: ButtonProps) {
  const external = typeof rest.href === "string" && /^https?:/.test(rest.href);
  return (
    <a
      className={`group ${btnBase} ${btnSize[size]} ${btnVariant[variant]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
      {arrow && <Arrow />}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

/**
 * Renders a link only if the destination is verified. Unverified destinations render as
 * a non-interactive label (so nothing broken is presented as working).
 */
export function SiteLink({ k, variant = "secondary", size = "md", arrow, className = "", children }: { k: LinkKey; variant?: BtnVariant; size?: "md" | "sm"; arrow?: boolean; className?: string; children?: ReactNode }) {
  const l = links[k];
  const label = children ?? l.label;
  if (!l.verified || !l.href) {
    return (
      <span
        className={`${btnBase} ${btnSize[size]} cursor-not-allowed border-dashed border-[var(--line-strong)] text-steel ${className}`}
        aria-disabled="true"
        title={(l as { note?: string }).note || "Destination pending verification"}
      >
        {label}
        <span className="normal-case tracking-normal font-medium text-[11px]">· coming soon</span>
      </span>
    );
  }
  return (
    <Button href={to(l.href)} variant={variant} size={size} arrow={arrow} className={className}>
      {label}
      {l.external && <ExternalIcon />}
    </Button>
  );
}

export function ExternalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden className="shrink-0 opacity-80">
      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

export function Grain({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`grain pointer-events-none absolute inset-0 ${className}`} />;
}

export function Chip({ children, tone = "neutral", dot }: { children: ReactNode; tone?: "neutral" | "lamp"; dot?: string }) {
  return (
    <span
      className={`inline-flex h-[30px] items-center gap-2 rounded-[2px] border px-3 text-[12px] font-semibold uppercase tracking-[0.1em] ${
        tone === "lamp" ? "border-lamp text-lamp" : "border-[var(--line-strong)] text-bone"
      }`}
    >
      {dot !== undefined && <i className="h-2 w-2 rounded-full" style={{ background: dot || "var(--color-lamp)" }} />}
      {children}
    </span>
  );
}

/** A gym's colour as a small solid "fob" swatch. The thin light ring keeps dark brand colours
 *  (Omro maroon, Berlin green, Princeton blue) visible on near-black backgrounds. */
export function FobDot({ color, size = 10, className = "" }: { color: string; size?: number; className?: string }) {
  return (
    <i
      aria-hidden
      className={`inline-block shrink-0 rounded-full ring-1 ring-bone/45 ${className}`}
      style={{ background: color, width: size, height: size }}
    />
  );
}

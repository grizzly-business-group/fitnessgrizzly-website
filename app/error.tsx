"use client";
import { to } from "@/lib/paths";

/**
 * Branded error state (Phase 5D). Shown only if a page throws while rendering — the site is static, so this
 * is a safety net, not an expected screen. Offers a retry and the two most-used exits; no error details are
 * shown to visitors.
 */
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="main" className="grid min-h-screen place-items-center bg-ink px-6 py-24 text-bone">
      <div className="max-w-[560px]">
        <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-lamp">Something went wrong</p>
        <h1 className="mt-4 font-display text-[56px] font-extrabold uppercase leading-[0.9]">This page didn&apos;t load.</h1>
        <p className="mt-6 text-[17px] leading-[1.6] text-bone-2">Please try again. If it keeps happening, call or text us, or email support@fitnessgrizzly.com.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={reset} className="min-h-12 bg-lamp px-6 font-semibold text-ink">
            Try again
          </button>
          <a href={to("/")} className="flex min-h-12 items-center border border-bone px-6 font-semibold">
            Home
          </a>
          <a href={to("/locations")} className="flex min-h-12 items-center border border-bone px-6 font-semibold">
            Our five gyms
          </a>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useEffect } from "react";

/** Opens the <details> an in-page link points at (e.g. /faq#key-fob), on load and on hash change. */
export default function HashDetails() {
  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      const d = el instanceof HTMLDetailsElement ? el : el?.querySelector("details");
      if (d) {
        d.open = true;
        d.querySelector("summary")?.focus({ preventScroll: true });
      }
    };
    open();
    addEventListener("hashchange", open);
    return () => removeEventListener("hashchange", open);
  }, []);
  return null;
}

"use client";

import { useEffect } from "react";
import { track } from "@/components/layout/Analytics";

/** Fires the lead conversion once when /thank-you loads (after a GHL form or calendar submit). */
export default function LeadEvent() {
  useEffect(() => {
    const t = window.setTimeout(() => track("generate_lead", { page: "thank-you" }), 600);
    return () => window.clearTimeout(t);
  }, []);
  return null;
}

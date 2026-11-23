import type { Metadata } from "next";
import { withShare } from "@/lib/seo";
import LegalPage from "@/components/page/LegalPage";
import { terms } from "@/lib/data/site-pages/legal";

/** Terms & Conditions — rewritten draft (Nov 2026), pending owner/legal sign-off. See lib/data/site-pages/legal.ts. */
export const metadata: Metadata = withShare({
  title: { absolute: "Terms & Conditions | Grizzly Fitness" },
  description: "The terms and conditions for using the Grizzly Fitness website and digital services.",
  alternates: { canonical: "/terms" },
});

export default function TermsPage() {
  return <LegalPage doc={terms} path="/terms" eyebrow="Legal" />;
}

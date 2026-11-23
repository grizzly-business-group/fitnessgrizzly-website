import type { Metadata } from "next";
import { withShare } from "@/lib/seo";
import LegalPage from "@/components/page/LegalPage";
import { privacy } from "@/lib/data/site-pages/legal";

/** Privacy Policy — rewritten draft (Nov 2026), pending owner/legal sign-off. See lib/data/site-pages/legal.ts. */
export const metadata: Metadata = withShare({
  title: { absolute: "Privacy Policy | Grizzly Fitness" },
  description: "How Grizzly Fitness collects, uses and protects your personal information.",
  alternates: { canonical: "/privacy" },
});

export default function PrivacyPage() {
  return <LegalPage doc={privacy} path="/privacy" eyebrow="Legal" />;
}

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Deliberate: links between the homepage and location pages are full document loads, not
    // client-side <Link> navigations. The homepage's pinned GSAP scenes, Lights On intro and
    // deep-link (#gym-*) landing initialise once per document, and the cross-document
    // @view-transition fade (globals.css) only applies to full navigations. (Phase 4 decision.)
    rules: { "@next/next/no-html-link-for-pages": "off" },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;

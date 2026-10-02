import { APP_CONFIG } from "./config";

export const SEO_DEFAULTS = {
  titleSuffix: ` | ${APP_CONFIG.name}`,
  description:
    "Free, fast and private online tools. Convert images, merge PDFs, generate QR codes, and more — all in your browser.",
  ogImage: "/images/og/default-og.svg",
  ogType: "website" as const,
  twitterCard: "summary_large_image" as const,
} as const;

export const TITLE_TEMPLATES = {
  home: `${APP_CONFIG.name} — Free, Fast, Private Online Tools`,
  tools: `All Tools — Free Online Utilities${SEO_DEFAULTS.titleSuffix}`,
  category: (name: string) => `${name} — Free Online${SEO_DEFAULTS.titleSuffix}`,
  tool: (name: string) => `${name} — Free Online${SEO_DEFAULTS.titleSuffix}`,
  about: `About${SEO_DEFAULTS.titleSuffix}`,
  contact: `Contact Us${SEO_DEFAULTS.titleSuffix}`,
  privacy: `Privacy Policy${SEO_DEFAULTS.titleSuffix}`,
  terms: `Terms of Service${SEO_DEFAULTS.titleSuffix}`,
  disclaimer: `Disclaimer${SEO_DEFAULTS.titleSuffix}`,
  accessibility: `Accessibility Statement${SEO_DEFAULTS.titleSuffix}`,
  cookiePolicy: `Cookie Policy${SEO_DEFAULTS.titleSuffix}`,
  notFound: `Page Not Found${SEO_DEFAULTS.titleSuffix}`,
} as const;

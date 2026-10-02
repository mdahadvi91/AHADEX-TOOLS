import { useEffect } from "react";
import { useLanguage } from "@contexts/LanguageContext";
import { photoQrData } from "./data";
import { photoQrContent } from "./content";
import { getMetaKeywordsString } from "./tags";

const SITE_URL = "https://ahadex.fun";
const SITE_NAME = "AHADEX Tools";

interface SEOProps {
  className?: string;
}

export function SEO(_props: SEOProps) {
  const { language } = useLanguage();
  const content = photoQrContent[language];

  useEffect(() => {
    if (typeof document === "undefined") return;

    const title = photoQrData.seo.title;
    const description = photoQrData.seo.description;
    const canonical = `${SITE_URL}${photoQrData.path}`;
    const ogImage = `${SITE_URL}${photoQrData.seo.ogImage}`;

    // ---------- Title ----------
    document.title = title;

    // ---------- Meta tags ----------
    setMeta("name", "description", description);
    setMeta("name", "keywords", getMetaKeywordsString());
    setMeta("name", "robots", "index, follow, max-image-preview:large");
    setMeta("name", "author", "AHADEX");

    // ---------- Canonical ----------
    setLink("canonical", canonical);

    // ---------- Open Graph ----------
    setMeta("property", "og:type", "article");
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:image:alt", photoQrData.name);
    setMeta("property", "og:locale", language === "bn" ? "bn_BD" : "en_US");

    // ---------- Twitter ----------
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    // ---------- Structured Data ----------
    const schemas = buildSchemas();
    injectStructuredData(schemas);

    // Cleanup on unmount
    return () => {
      const script = document.getElementById("ahadex-tool-schema");
      if (script) script.remove();
    };
  }, [language, content]);

  return null;
}

/* ============================================================
 * HELPERS
 * ============================================================ */

function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function buildSchemas() {
  const canonical = `${SITE_URL}${photoQrData.path}`;
  const ogImage = `${SITE_URL}${photoQrData.seo.ogImage}`;

  /* ---------- WebApplication ---------- */
  const webApp = {
    "@type": "WebApplication",
    "@id": `${canonical}#app`,
    name: photoQrData.name,
    description: photoQrData.description,
    url: canonical,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    inLanguage: ["en", "bn"],
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    image: ogImage,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    featureList: photoQrContent.en.features.map((f) => f.title),
  };

  /* ---------- Breadcrumb ---------- */
  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "QR & Barcode",
        item: `${SITE_URL}/categories/qr`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: photoQrData.name,
        item: canonical,
      },
    ],
  };

  /* ---------- FAQPage ---------- */
  const faq = {
    "@type": "FAQPage",
    "@id": `${canonical}#faq`,
    mainEntity: photoQrContent.en.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return [webApp, breadcrumb, faq];
}

function injectStructuredData(schemas: object[]) {
  const existing = document.getElementById("ahadex-tool-schema");
  if (existing) existing.remove();

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = "ahadex-tool-schema";
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": schemas,
  });
  document.head.appendChild(script);
}

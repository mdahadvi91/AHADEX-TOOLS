import { useEffect } from "react";
import { useLanguage } from "@contexts/LanguageContext";

const SITE_URL = "https://ahadex.fun";
const SITE_NAME = "AHADEX Tools";
const TOOL_PATH = "/tools/cv-builder";

export function CVBuilderSEO() {
  const { language } = useLanguage();

  useEffect(() => {
    if (typeof document === "undefined") return;

    const title =
      "Free CV Builder — Create & Download Professional Resumes | AHADEX Tools";
    const description =
      "Build a professional CV in minutes. Real A4 templates, live preview, selectable-text PDF export, auto-save and full browser-side privacy. No account required.";
    const canonical = `${SITE_URL}${TOOL_PATH}`;
    const ogImage = `${SITE_URL}/images/og/tools/cv-builder-og.svg`;

    document.title = title;

    setMeta("name", "description", description);
    setMeta(
      "name",
      "keywords",
      "cv builder, resume builder, free cv maker, ats resume, professional cv, cv template, resume template, bangla cv"
    );
    setMeta("name", "robots", "index, follow, max-image-preview:large");
    setMeta("name", "author", "AHADEX");
    setLink("canonical", canonical);

    // OG
    setMeta("property", "og:type", "article");
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:locale", language === "bn" ? "bn_BD" : "en_US");

    // Twitter
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    // Structured data
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebApplication",
          "@id": `${canonical}#app`,
          name: "CV Builder",
          description,
          url: canonical,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any",
          browserRequirements: "Requires JavaScript",
          inLanguage: ["en", "bn"],
          isAccessibleForFree: true,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          image: ogImage,
          publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
          },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${canonical}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Documents", item: `${SITE_URL}/categories/documents` },
            { "@type": "ListItem", position: 3, name: "CV Builder", item: canonical },
          ],
        },
      ],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "ahadex-cv-builder-schema";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [language]);

  return null;
}

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

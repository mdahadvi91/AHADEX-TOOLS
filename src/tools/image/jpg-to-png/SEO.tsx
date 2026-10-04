import { useEffect } from "react";
import { useLanguage } from "@contexts/LanguageContext";

const SITE_URL = "https://ahadex.fun";
const SITE_NAME = "AHADEX Tools";
const TOOL_PATH = "/tools/jpg-to-png";

export function JpgToPngSEO() {
  const { language } = useLanguage();

  useEffect(() => {
    if (typeof document === "undefined") return;

    const title =
      "JPG to PNG Converter — Free, Fast & Private | AHADEX Tools";
    const description =
      "Convert JPG images to PNG format instantly in your browser. Lossless, batch-capable, no uploads, no servers. Free forever.";
    const canonical = `${SITE_URL}${TOOL_PATH}`;
    const ogImage = `${SITE_URL}/images/og/tools/jpg-to-png-og.png`;

    document.title = title;

    setMeta("name", "description", description);
    setMeta("name", "keywords", "jpg to png, jpeg to png, image converter, convert jpg to png, free image converter, offline image converter");
    setMeta("name", "robots", "index, follow, max-image-preview:large");
    setMeta("name", "author", "AHADEX");
    setLink("canonical", canonical);

    setMeta("property", "og:type", "article");
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:locale", language === "bn" ? "bn_BD" : "en_US");

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebApplication",
          "@id": `${canonical}#app`,
          name: "JPG to PNG Converter",
          description,
          url: canonical,
          applicationCategory: "MultimediaApplication",
          operatingSystem: "Any",
          browserRequirements: "Requires JavaScript",
          inLanguage: ["en", "bn"],
          isAccessibleForFree: true,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          image: ogImage,
          publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${canonical}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools` },
            { "@type": "ListItem", position: 3, name: "JPG to PNG", item: canonical },
          ],
        },
      ],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "ahadex-jpg-to-png-schema";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [language]);

  return null;
}

function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
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

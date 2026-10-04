import { useEffect } from "react";
import { useLanguage } from "@contexts/LanguageContext";

const SITE_URL = "https://ahadex.fun";
const SITE_NAME = "AHADEX Tools";
const TOOL_PATH = "/tools/uuid-generator";

export function UuidGeneratorSEO() {
  const { language } = useLanguage();
  useEffect(() => {
    if (typeof document === "undefined") return;
    const title =
      language === "bn"
        ? "UUID জেনারেটর — v4 ও v7, ক্রিপ্টো-র‍্যান্ডম | AHADEX Tools"
        : "UUID Generator — v4 & v7 Crypto-Random Free | AHADEX Tools";
    const description =
      language === "bn"
        ? "UUID v4 ও v7 তৈরি করুন — সম্পূর্ণ ব্রাউজারেই। ১০০০ পর্যন্ত ব্যাচ, uppercase, hyphen on/off, কপি বা .txt ডাউনলোড।"
        : "Generate UUID v4 and v7 identifiers in your browser. Batch up to 1000, uppercase, hyphens on/off, copy or download.";
    const canonical = `${SITE_URL}${TOOL_PATH}`;
    const ogImage = `${SITE_URL}/images/og/tools/uuid-generator-og.png`;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "keywords", "uuid generator, uuid v4, uuid v7, guid generator, random uuid, free uuid generator, generate uuid online");
    setMeta("name", "robots", "index, follow, max-image-preview:large");
    setLink("canonical", canonical);
    setMeta("property", "og:type", "article");
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
        { "@type": "WebApplication", "@id": `${canonical}#app`, name: "UUID Generator", description, url: canonical, applicationCategory: "DeveloperApplication", operatingSystem: "Any", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, image: ogImage, publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL } },
        { "@type": "BreadcrumbList", "@id": `${canonical}#breadcrumb`, itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools` },
          { "@type": "ListItem", position: 3, name: "UUID Generator", item: canonical },
        ]},
      ],
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "ahadex-uuid-generator-schema";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, [language]);
  return null;
}

function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute("content", value);
}
function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) { el = document.createElement("link"); el.setAttribute("rel", rel); document.head.appendChild(el); }
  el.setAttribute("href", href);
}

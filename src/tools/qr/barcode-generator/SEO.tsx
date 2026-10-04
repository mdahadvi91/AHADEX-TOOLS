import { useEffect } from "react";
import { useLanguage } from "@contexts/LanguageContext";

const SITE_URL = "https://ahadex.fun";
const SITE_NAME = "AHADEX Tools";
const TOOL_PATH = "/tools/barcode-generator";

export function BarcodeGeneratorSEO() {
  const { language } = useLanguage();
  useEffect(() => {
    if (typeof document === "undefined") return;
    const title =
      language === "bn"
        ? "বারকোড জেনারেটর — ৯ ফরম্যাট, PNG ও SVG ফ্রি | AHADEX Tools"
        : "Barcode Generator — 9 Formats, PNG & SVG Free | AHADEX Tools";
    const description =
      language === "bn"
        ? "CODE128, CODE39, EAN-13, EAN-8, UPC-A, ITF-14 সহ ৯ ফরম্যাটে বারকোড তৈরি করুন — কাস্টম রঙ, PNG/SVG।"
        : "Generate 1D barcodes in 9 formats — CODE128, CODE39, EAN-13, EAN-8, UPC-A, ITF-14, MSI, Pharmacode, Codabar.";
    const canonical = `${SITE_URL}${TOOL_PATH}`;
    const ogImage = `${SITE_URL}/images/og/default-og.svg`;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "keywords", "barcode generator, free barcode, code128, ean13, upc, code39, itf14, barcode maker, barcode png, barcode svg");
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
        { "@type": "WebApplication", "@id": `${canonical}#app`, name: "Barcode Generator", description, url: canonical, applicationCategory: "UtilitiesApplication", operatingSystem: "Any", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, image: ogImage, publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL } },
        { "@type": "BreadcrumbList", "@id": `${canonical}#breadcrumb`, itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools` },
          { "@type": "ListItem", position: 3, name: "Barcode Generator", item: canonical },
        ]},
      ],
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "ahadex-barcode-generator-schema";
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

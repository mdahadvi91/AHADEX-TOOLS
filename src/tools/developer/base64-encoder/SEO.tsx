import { useEffect } from "react";
import { useLanguage } from "@contexts/LanguageContext";

const SITE_URL = "https://ahadex.fun";
const SITE_NAME = "AHADEX Tools";
const TOOL_PATH = "/tools/base64-encoder";

export function Base64SEO() {
  const { language } = useLanguage();
  useEffect(() => {
    if (typeof document === "undefined") return;
    const title =
      language === "bn"
        ? "Base64 এনকোডার / ডিকোডার — টেক্সট ও ফাইল ফ্রি | AHADEX Tools"
        : "Base64 Encoder / Decoder — Text & Files Free | AHADEX Tools";
    const description =
      language === "bn"
        ? "টেক্সট ও ফাইলের Base64 encode/decode করুন — Unicode-safe, URL-safe, image preview সহ। সম্পূর্ণ ব্রাউজারেই।"
        : "Encode or decode Base64 for text and files. Unicode-safe, URL-safe option, image preview. Runs in your browser.";
    const canonical = `${SITE_URL}${TOOL_PATH}`;
    const ogImage = `${SITE_URL}/images/og/tools/base64-encoder-og.png`;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "keywords", "base64 encoder, base64 decoder, encode base64, decode base64, base64 converter, image to base64, base64 to image, url-safe base64");
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
        { "@type": "WebApplication", "@id": `${canonical}#app`, name: "Base64 Encoder / Decoder", description, url: canonical, applicationCategory: "DeveloperApplication", operatingSystem: "Any", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, image: ogImage, publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL } },
        { "@type": "BreadcrumbList", "@id": `${canonical}#breadcrumb`, itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools` },
          { "@type": "ListItem", position: 3, name: "Base64 Encoder / Decoder", item: canonical },
        ]},
      ],
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "ahadex-base64-schema";
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

import { useEffect } from "react";
import { useLanguage } from "@contexts/LanguageContext";

const SITE_URL = "https://ahadex.fun";
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
    // (schema const removed — see ToolSchema component)
    // Schema removed — now handled by ToolSchema component

    return;
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

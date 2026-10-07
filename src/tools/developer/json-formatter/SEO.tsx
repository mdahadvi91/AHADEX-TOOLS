import { useEffect } from "react";
import { useLanguage } from "@contexts/LanguageContext";

const SITE_URL = "https://ahadex.fun";
const TOOL_PATH = "/tools/json-formatter";

export function JsonFormatterSEO() {
  const { language } = useLanguage();
  useEffect(() => {
    if (typeof document === "undefined") return;
    const title =
      language === "bn"
        ? "JSON ফরম্যাটার — ভ্যালিডেট, প্রিটি প্রিন্ট, মিনিফাই | AHADEX Tools"
        : "JSON Formatter — Validate, Format & Minify Free | AHADEX Tools";
    const description =
      language === "bn"
        ? "JSON ফরম্যাট, ভ্যালিডেট ও মিনিফাই করুন — সম্পূর্ণ ব্রাউজারেই। লাইভ error line/column, sort keys, 2/4 space বা tab।"
        : "Format, validate, and minify JSON in your browser. Live errors with line/column, sort keys, 2/4-space or tab indent.";
    const canonical = `${SITE_URL}${TOOL_PATH}`;
    const ogImage = `${SITE_URL}/images/og/tools/json-formatter-og.png`;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "keywords", "json formatter, json validator, json beautifier, json minifier, format json online, json pretty print, free json formatter");
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

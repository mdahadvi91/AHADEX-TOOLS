import { useEffect } from "react";
import { useLanguage } from "@contexts/LanguageContext";

const SITE_URL = "https://ahadex.fun";
const SITE_NAME = "AHADEX Tools";
const TOOL_PATH = "/tools/webp-to-jpg";

export function WebpToJpgSEO() {
  const { language } = useLanguage();

  useEffect(() => {
    if (typeof document === "undefined") return;
    const title = "WebP to JPG Converter — Free, Fast & Private | AHADEX Tools";
    const description = "Convert WebP images to JPG format instantly. Universal compatibility, batch-capable, no uploads, no servers. Free forever.";
    const canonical = `${SITE_URL}${TOOL_PATH}`;
    const ogImage = `${SITE_URL}/images/og/tools/webp-to-jpg-og.png`;

    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "keywords", "webp to jpg, webp to jpeg, image converter, convert webp, free image converter");
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

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
    // (schema const removed — see ToolSchema component)
    // Schema removed — now handled by ToolSchema component


    return;
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

import { useEffect } from "react";
import { useLanguage } from "@contexts/LanguageContext";

const SITE_URL = "https://ahadex.fun";
const TOOL_PATH = "/tools/image-to-cartoon";

export function ImageToCartoonSEO() {
  const { language } = useLanguage();
  useEffect(() => {
    if (typeof document === "undefined") return;
    const title =
      language === "bn"
        ? "ইমেজ থেকে কার্টুন — সেল-শেডেড ইফেক্ট | AHADEX Tools"
        : "Image to Cartoon — Cel-Shaded Effect Free | AHADEX Tools";
    const description =
      language === "bn"
        ? "যেকোনো ছবিকে সেল-শেডেড কার্টুনে রূপান্তর করুন — সম্পূর্ণ ব্রাউজারেই। লাইভ স্লাইডার, PNG ডাউনলোড, কোনো আপলোড নেই।"
        : "Turn any photo into a cel-shaded cartoon in your browser. Live sliders, PNG export, no uploads.";
    const canonical = `${SITE_URL}${TOOL_PATH}`;
    const ogImage = `${SITE_URL}/images/og/tools/image-to-cartoon-og.png`;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "keywords", "image to cartoon, photo to cartoon, cartoon effect, cel shading, anime filter, cartoon maker, free cartoon converter");
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

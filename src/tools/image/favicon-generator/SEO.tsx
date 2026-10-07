import { useEffect } from "react";
import { useLanguage } from "@contexts/LanguageContext";

const SITE_URL = "https://ahadex.fun";
const TOOL_PATH = "/tools/favicon-generator";

export function FaviconGeneratorSEO() {
  const { language } = useLanguage();
  useEffect(() => {
    if (typeof document === "undefined") return;
    const title =
      language === "bn"
        ? "ফ্যাভিকন জেনারেটর — সম্পূর্ণ সেট, ফ্রি | AHADEX Tools"
        : "Favicon Generator — Complete Set Free | AHADEX Tools";
    const description =
      language === "bn"
        ? "যেকোনো ছবি থেকে সম্পূর্ণ favicon সেট তৈরি করুন — 16 থেকে 512px PNG, favicon.ico, webmanifest। প্যাডিং, ব্যাকগ্রাউন্ড, রাউন্ডেড কর্নার।"
        : "Turn any image into a complete favicon set — 16 to 512px PNGs, favicon.ico, and web manifest. Padding, background, rounded corners.";
    const canonical = `${SITE_URL}${TOOL_PATH}`;
    const ogImage = `${SITE_URL}/images/og/tools/favicon-generator-og.png`;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "keywords", "favicon generator, favicon maker, apple touch icon, pwa icons, website icon, favicon.ico generator, free favicon");
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

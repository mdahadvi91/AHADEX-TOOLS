import { useEffect } from "react";
import { useLanguage } from "@contexts/LanguageContext";

const SITE_URL = "https://ahadex.fun";
const TOOL_PATH = "/tools/image-metadata-viewer";

export function ImageMetadataSEO() {
  const { language } = useLanguage();
  useEffect(() => {
    if (typeof document === "undefined") return;
    const title =
      language === "bn"
        ? "ইমেজ মেটাডেটা ভিউয়ার — EXIF, GPS, ক্যামেরার তথ্য | AHADEX Tools"
        : "Image Metadata Viewer — EXIF, GPS & Camera Data Free | AHADEX Tools";
    const description =
      language === "bn"
        ? "আপনার ছবির EXIF, GPS, ক্যামেরার তথ্য দেখুন — সম্পূর্ণ ব্রাউজারেই। কোনো আপলোড নেই, ১০০% প্রাইভেট।"
        : "View EXIF, GPS, camera, and file metadata hidden inside your photos — in your browser. No uploads, 100% private.";
    const canonical = `${SITE_URL}${TOOL_PATH}`;
    const ogImage = `${SITE_URL}/images/og/tools/image-metadata-viewer-og.png`;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "keywords", "image metadata, exif viewer, gps viewer, camera metadata, photo exif, view exif online, free exif viewer");
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

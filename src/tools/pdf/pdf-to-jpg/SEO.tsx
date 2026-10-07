import { useEffect } from "react";
import { useLanguage } from "@contexts/LanguageContext";

const SITE_URL = "https://ahadex.fun";
const TOOL_PATH = "/tools/pdf-to-jpg";

export function PdfToJpgSEO() {
  const { language } = useLanguage();
  useEffect(() => {
    if (typeof document === "undefined") return;
    const title =
      language === "bn"
        ? "PDF থেকে JPG — ৩০০ DPI পর্যন্ত, ফ্রি ও প্রাইভেট | AHADEX Tools"
        : "PDF to JPG — Convert PDF Pages to Images Free | AHADEX Tools";
    const description =
      language === "bn"
        ? "PDF-এর প্রতিটি পেজ JPG ছবিতে রূপান্তর করুন — সম্পূর্ণ ব্রাউজারেই, ৩০০ DPI পর্যন্ত, কোনো আপলোড নেই।"
        : "Convert every page of your PDF into a high-quality JPG image in your browser. Up to 300 DPI, page ranges, batch download. No uploads.";
    const canonical = `${SITE_URL}${TOOL_PATH}`;
    const ogImage = `${SITE_URL}/images/og/tools/pdf-to-jpg-og.png`;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "keywords", "pdf to jpg, pdf to image, convert pdf to jpg, pdf page to image, pdf to png, free pdf to jpg, offline pdf converter");
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

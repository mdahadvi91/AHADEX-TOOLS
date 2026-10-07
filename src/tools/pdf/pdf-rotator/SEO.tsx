import { useEffect } from "react";
import { useLanguage } from "@contexts/LanguageContext";

const SITE_URL = "https://ahadex.fun";
const TOOL_PATH = "/tools/pdf-rotator";

export function PdfRotatorSEO() {
  const { language } = useLanguage();
  useEffect(() => {
    if (typeof document === "undefined") return;
    const title =
      language === "bn"
        ? "PDF রোটেটর — পেজ ঘোরান ফ্রি ও প্রাইভেট | AHADEX Tools"
        : "PDF Rotator — Rotate PDF Pages Free & Private | AHADEX Tools";
    const description =
      language === "bn"
        ? "PDF পেজ 90°/180° ঘোরান — সম্পূর্ণ ব্রাউজারেই। সব পেজ বা নির্দিষ্ট রেঞ্জ, lossless, কোনো আপলোড নেই।"
        : "Rotate pages in any PDF 90°/180° in your browser. All pages or specific ranges, lossless, no uploads.";
    const canonical = `${SITE_URL}${TOOL_PATH}`;
    const ogImage = `${SITE_URL}/images/og/tools/pdf-rotator-og.png`;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "keywords", "pdf rotator, rotate pdf, rotate pdf pages, pdf rotation, turn pdf pages, free pdf rotator");
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

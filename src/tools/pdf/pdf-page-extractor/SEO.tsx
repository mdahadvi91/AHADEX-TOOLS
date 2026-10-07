import { useEffect } from "react";
import { useLanguage } from "@contexts/LanguageContext";

const SITE_URL = "https://ahadex.fun";
const TOOL_PATH = "/tools/pdf-page-extractor";

export function PdfPageExtractorSEO() {
  const { language } = useLanguage();
  useEffect(() => {
    if (typeof document === "undefined") return;
    const title =
      language === "bn"
        ? "PDF পেজ এক্সট্রাক্টর — কাস্টম ক্রমে পেজ বের করুন | AHADEX Tools"
        : "PDF Page Extractor — Custom Order Page Extract Free | AHADEX Tools";
    const description =
      language === "bn"
        ? "PDF থেকে পেজ বের করুন — নিজের ক্রমে, duplicate সহ। Combined PDF বা আলাদা ফাইল। সম্পূর্ণ ব্রাউজারেই।"
        : "Extract pages from any PDF in custom order, with duplicates. One combined PDF or separate files. Runs in your browser.";
    const canonical = `${SITE_URL}${TOOL_PATH}`;
    const ogImage = `${SITE_URL}/images/og/tools/pdf-page-extractor-og.png`;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "keywords", "pdf page extractor, extract pdf pages, extract pages from pdf, pdf page splitter, pdf reorder pages, free pdf extractor");
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

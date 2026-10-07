import { useEffect } from "react";
import { useLanguage } from "@contexts/LanguageContext";

const SITE_URL = "https://ahadex.fun";
const TOOL_PATH = "/tools/text-case-converter";

export function TextCaseSEO() {
  const { language } = useLanguage();
  useEffect(() => {
    if (typeof document === "undefined") return;
    const title =
      language === "bn"
        ? "টেক্সট কেস কনভার্টার — ১২টি স্টাইল ফ্রি | AHADEX Tools"
        : "Text Case Converter — 12 Case Styles Free | AHADEX Tools";
    const description =
      language === "bn"
        ? "টেক্সট ১২টি case-এ convert করুন — UPPER, lower, Title, camel, snake, kebab ইত্যাদি। সম্পূর্ণ ব্রাউজারেই।"
        : "Convert text between 12 case styles — UPPER, lower, Title, camelCase, snake_case, kebab-case, and more. Runs in your browser.";
    const canonical = `${SITE_URL}${TOOL_PATH}`;
    const ogImage = `${SITE_URL}/images/og/tools/text-case-converter-og.png`;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "keywords", "text case converter, title case, sentence case, camel case, snake case, kebab case, upper case, lower case, convert text case");
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

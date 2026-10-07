import { useEffect } from "react";
import { useLanguage } from "@contexts/LanguageContext";

const SITE_URL = "https://ahadex.fun";
const TOOL_PATH = "/tools/character-counter";

export function CharacterCounterSEO() {
  const { language } = useLanguage();
  useEffect(() => {
    if (typeof document === "undefined") return;
    const title =
      language === "bn"
        ? "ক্যারেক্টার কাউন্টার — Twitter, Instagram, SMS লিমিট | AHADEX Tools"
        : "Character Counter — Twitter, Instagram, SMS Limits | AHADEX Tools";
    const description =
      language === "bn"
        ? "X (Twitter), ইনস্টাগ্রাম, লিংকডইন, SMS ও SEO মেটার ক্যারেক্টার সীমার বিপরীতে টেক্সট গণনা করুন — লাইভ।"
        : "Count characters against X (Twitter), Instagram, LinkedIn, SMS, SEO meta limits in real time. Everything runs in your browser.";
    const canonical = `${SITE_URL}${TOOL_PATH}`;
    const ogImage = `${SITE_URL}/images/og/tools/character-counter-og.png`;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "keywords", "character counter, twitter character count, instagram caption counter, sms counter, meta description length, character count online, free character counter");
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

import { useEffect } from "react";
import { useLanguage } from "@contexts/LanguageContext";

const SITE_URL = "https://ahadex.fun";
const TOOL_PATH = "/tools/password-generator";

export function PasswordGeneratorSEO() {
  const { language } = useLanguage();
  useEffect(() => {
    if (typeof document === "undefined") return;
    const title =
      language === "bn"
        ? "পাসওয়ার্ড জেনারেটর — ক্রিপ্টো-র‍্যান্ডম, ফ্রি | AHADEX Tools"
        : "Password Generator — Strong & Crypto-Random Free | AHADEX Tools";
    const description =
      language === "bn"
        ? "শক্তিশালী, ক্রিপ্টোগ্রাফিক্যালি র‍্যান্ডম পাসওয়ার্ড তৈরি করুন — length, character set, ambiguity নিয়ন্ত্রণ, লাইভ strength।"
        : "Generate strong, cryptographically random passwords in your browser. Length, sets, ambiguity, live strength, batch up to 50.";
    const canonical = `${SITE_URL}${TOOL_PATH}`;
    const ogImage = `${SITE_URL}/images/og/tools/password-generator-og.png`;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "keywords", "password generator, strong password, random password, secure password, free password generator, crypto password, password maker");
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

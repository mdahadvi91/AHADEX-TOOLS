import { useEffect } from "react";
import { useLanguage } from "@contexts/LanguageContext";

const SITE_URL = "https://ahadex.fun";
const TOOL_PATH = "/tools/pdf-to-text";

export function PdfToTextSEO() {
  const { language } = useLanguage();
  useEffect(() => {
    if (typeof document === "undefined") return;
    const title =
      language === "bn"
        ? "PDF থেকে টেক্সট — টেক্সট এক্সট্রাক্ট ফ্রি ও প্রাইভেট | AHADEX Tools"
        : "PDF to Text — Extract Plain Text from PDF Free | AHADEX Tools";
    const description =
      language === "bn"
        ? "PDF থেকে প্লেন টেক্সট বের করুন — সম্পূর্ণ ব্রাউজারেই। পেজ রেঞ্জ, লাইন ব্রেক অপশন, কপি বা .txt ডাউনলোড।"
        : "Extract plain text from any PDF in your browser. Page ranges, line-break options, copy or download as .txt. No uploads.";
    const canonical = `${SITE_URL}${TOOL_PATH}`;
    const ogImage = `${SITE_URL}/images/og/tools/pdf-to-text-og.png`;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "keywords", "pdf to text, extract text from pdf, pdf text extractor, convert pdf to text, pdf to txt, free pdf text extractor");
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

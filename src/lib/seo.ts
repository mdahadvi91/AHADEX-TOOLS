import { APP_CONFIG } from "@constants/config";
import { TITLE_TEMPLATES } from "@constants/seo";

export interface PageSEO {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  ogType: "website" | "article";
  noIndex: boolean;
  keywords?: string[];
}

export function buildHomeSEO(): PageSEO {
  return {
    title: TITLE_TEMPLATES.home,
    description: APP_CONFIG.description,
    canonical: `${APP_CONFIG.url}/`,
    ogImage: "/images/og/home-og.svg",
    ogType: "website",
    noIndex: false,
  };
}

export function buildToolsSEO(): PageSEO {
  return {
    title: TITLE_TEMPLATES.tools,
    description: APP_CONFIG.description,
    canonical: `${APP_CONFIG.url}/tools`,
    ogImage: "/images/og/default-og.svg",
    ogType: "website",
    noIndex: false,
  };
}

export function buildToolSEO(tool: {
  name: string;
  description: string;
  path: string;
  seo: { title: string; description: string; ogImage: string };
  keywords?: string[];
}): PageSEO {
  return {
    title: tool.seo.title,
    description: tool.seo.description,
    canonical: `${APP_CONFIG.url}${tool.path}`,
    ogImage: tool.seo.ogImage,
    ogType: "article",
    noIndex: false,
    keywords: tool.keywords,
  };
}

export function buildNotFoundSEO(): PageSEO {
  return {
    title: TITLE_TEMPLATES.notFound,
    description: "The page you were looking for could not be found.",
    canonical: `${APP_CONFIG.url}/404`,
    ogImage: "/images/og/default-og.svg",
    ogType: "website",
    noIndex: true,
  };
}

export function applySEOToDocument(seo: PageSEO): void {
  if (typeof document === "undefined") return;

  document.title = seo.title;
  setMeta("name", "description", seo.description);
  setMeta(
    "name",
    "robots",
    seo.noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large"
  );

  setLink("canonical", seo.canonical);

  setMeta("property", "og:title", seo.title);
  setMeta("property", "og:description", seo.description);
  setMeta("property", "og:url", seo.canonical);
  setMeta("property", "og:type", seo.ogType);
  setMeta("property", "og:image", toAbsolute(seo.ogImage));

  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", seo.title);
  setMeta("name", "twitter:description", seo.description);
  setMeta("name", "twitter:image", toAbsolute(seo.ogImage));
}

function toAbsolute(path: string): string {
  if (path.startsWith("http")) return path;
  return `${APP_CONFIG.url}${path.startsWith("/") ? path : `/${path}`}`;
}

function setMeta(attr: "name" | "property", key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

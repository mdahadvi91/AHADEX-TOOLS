/* ============================================================
 * Affiliate Products Data
 * ------------------------------------------------------------
 * Central catalog of affiliate products, grouped by tool.
 * Replace `url` with your real affiliate links after signing up
 * with Amazon Associates / Impact / ShareASale / etc.
 * ============================================================ */

export interface AffiliateProduct {
  id: string;
  name: string;
  tagline: { en: string; bn: string };
  description: { en: string; bn: string };
  ctaLabel: { en: string; bn: string };
  url: string;
  emoji: string;
  badge?: { en: string; bn: string };
  network: "amazon" | "impact" | "sharesale" | "direct" | "cj";
}

/** Map: toolId → product IDs */
export const AFFILIATE_BY_TOOL: Record<string, string[]> = {
  "image-compressor":     ["adobe-cc", "canva-pro", "cloudinary"],
  "image-resizer":        ["adobe-cc", "figma-pro", "canva-pro"],
  "image-cropper":        ["adobe-cc", "figma-pro"],
  "image-to-pdf":         ["adobe-acrobat", "smallpdf-pro"],
  "jpg-to-pdf":           ["adobe-acrobat", "smallpdf-pro"],
  "png-to-pdf":           ["adobe-acrobat", "smallpdf-pro"],
  "merge-pdf":            ["adobe-acrobat", "smallpdf-pro"],
  "split-pdf":            ["adobe-acrobat", "smallpdf-pro"],
  "pdf-to-jpg":           ["adobe-acrobat", "smallpdf-pro"],
  "pdf-to-png":           ["adobe-acrobat", "smallpdf-pro"],
  "pdf-rotator":          ["adobe-acrobat"],
  "pdf-page-extractor":   ["adobe-acrobat", "smallpdf-pro"],
  "password-generator":   ["1password", "nordvpn", "bitwarden-premium"],
  "uuid-generator":       ["1password", "digitalocean"],
  "json-formatter":       ["digitalocean", "jetbrains", "postman-pro"],
  "base64-encoder":       ["digitalocean", "jetbrains"],
  "url-encoder":          ["digitalocean", "postman-pro"],
  "image-metadata-viewer":["adobe-cc", "exiftool-pro"],
  "favicon-generator":    ["canva-pro", "figma-pro"],
  "image-to-cartoon":     ["canva-pro", "adobe-cc"],
  "image-to-sketch":      ["canva-pro", "adobe-cc"],
  "svg-to-png":           ["figma-pro", "adobe-cc"],
  "barcode-generator":    ["canva-pro"],
  "cv-builder":           ["canva-pro", "resume-io", "zety"],
  "visiting-card":        ["canva-pro", "vistaprint", "moo"],
};

export const AFFILIATE_PRODUCTS: Record<string, AffiliateProduct> = {
  "adobe-cc": {
    id: "adobe-cc",
    name: "Adobe Creative Cloud",
    tagline: { en: "Pro editing tools", bn: "প্রফেশনাল এডিটিং টুল" },
    description: {
      en: "Full Photoshop, Lightroom, Illustrator. Best for heavy image work.",
      bn: "Photoshop, Lightroom, Illustrator—সব একসাথে। বড় কাজের জন্য সেরা।",
    },
    ctaLabel: { en: "Try free", bn: "ফ্রি ট্রাই" },
    url: "https://www.adobe.com/creativecloud.html",
    emoji: "🎨",
    badge: { en: "Pro choice", bn: "প্রফেশনাল" },
    network: "direct",
  },
  "canva-pro": {
    id: "canva-pro",
    name: "Canva Pro",
    tagline: { en: "Design without limits", bn: "সহজ ডিজাইন" },
    description: {
      en: "Templates, brand kits, background remover. Great for creators.",
      bn: "টেমপ্লেট, ব্র্যান্ড কিট, ব্যাকগ্রাউন্ড রিমুভার। ক্রিয়েটরদের জন্য দুর্দান্ত।",
    },
    ctaLabel: { en: "Start free", bn: "ফ্রি শুরু" },
    url: "https://www.canva.com/pro/",
    emoji: "✨",
    badge: { en: "Popular", bn: "জনপ্রিয়" },
    network: "direct",
  },
  "figma-pro": {
    id: "figma-pro",
    name: "Figma Pro",
    tagline: { en: "Design & prototype", bn: "ডিজাইন ও প্রোটোটাইপ" },
    description: {
      en: "Collaborative UI design. Loved by designers and product teams.",
      bn: "টিমে কাজ করার UI ডিজাইন টুল। ডিজাইনারদের পছন্দ।",
    },
    ctaLabel: { en: "Learn more", bn: "বিস্তারিত" },
    url: "https://www.figma.com/pricing/",
    emoji: "🖌️",
    network: "direct",
  },
  "cloudinary": {
    id: "cloudinary",
    name: "Cloudinary",
    tagline: { en: "Image CDN + API", bn: "ইমেজ CDN + API" },
    description: {
      en: "Auto-optimize images via CDN. For developers shipping apps.",
      bn: "CDN দিয়ে অটো ইমেজ অপটিমাইজ। ডেভেলপারদের জন্য।",
    },
    ctaLabel: { en: "Free tier", bn: "ফ্রি প্ল্যান" },
    url: "https://cloudinary.com/",
    emoji: "☁️",
    network: "impact",
  },
  "adobe-acrobat": {
    id: "adobe-acrobat",
    name: "Adobe Acrobat Pro",
    tagline: { en: "Advanced PDF", bn: "অ্যাডভান্সড PDF" },
    description: {
      en: "Edit, sign, protect, and compress PDFs. Industry standard.",
      bn: "PDF এডিট, সাইন, সুরক্ষা, কমপ্রেস। ইন্ডাস্ট্রি স্ট্যান্ডার্ড।",
    },
    ctaLabel: { en: "Try free", bn: "ফ্রি ট্রাই" },
    url: "https://www.adobe.com/acrobat.html",
    emoji: "📄",
    network: "direct",
  },
  "smallpdf-pro": {
    id: "smallpdf-pro",
    name: "Smallpdf Pro",
    tagline: { en: "All-in-one PDF", bn: "সব PDF টুল" },
    description: {
      en: "20+ PDF tools in one place. No file size limits on Pro.",
      bn: "এক জায়গায় ২০+ PDF টুল। Pro-তে ফাইল সাইজ লিমিট নেই।",
    },
    ctaLabel: { en: "See plans", bn: "প্ল্যান দেখুন" },
    url: "https://smallpdf.com/",
    emoji: "📑",
    network: "direct",
  },
  "1password": {
    id: "1password",
    name: "1Password",
    tagline: { en: "Password manager", bn: "পাসওয়ার্ড ম্যানেজার" },
    description: {
      en: "Store, generate, and autofill strong passwords. Trusted by millions.",
      bn: "শক্তিশালী পাসওয়ার্ড সেভ, জেনারেট, অটোফিল। কোটি মানুষের বিশ্বাস।",
    },
    ctaLabel: { en: "Try free", bn: "ফ্রি ট্রাই" },
    url: "https://1password.com/",
    emoji: "🔐",
    badge: { en: "Editor's pick", bn: "সম্পাদকের পছন্দ" },
    network: "impact",
  },
  "nordvpn": {
    id: "nordvpn",
    name: "NordVPN",
    tagline: { en: "Fast & secure VPN", bn: "দ্রুত ও নিরাপদ VPN" },
    description: {
      en: "Protect your browsing with encrypted VPN. 5000+ servers.",
      bn: "এনক্রিপ্টেড VPN দিয়ে ব্রাউজিং সুরক্ষিত। ৫০০০+ সার্ভার।",
    },
    ctaLabel: { en: "Get deal", bn: "ডিল নিন" },
    url: "https://nordvpn.com/",
    emoji: "🛡️",
    network: "impact",
  },
  "bitwarden-premium": {
    id: "bitwarden-premium",
    name: "Bitwarden Premium",
    tagline: { en: "Open-source vault", bn: "ওপেন-সোর্স ভল্ট" },
    description: {
      en: "Just $10/year. Premium features for password power users.",
      bn: "বছরে মাত্র $১০। পাসওয়ার্ড পাওয়ার ইউজারদের জন্য।",
    },
    ctaLabel: { en: "Learn more", bn: "বিস্তারিত" },
    url: "https://bitwarden.com/pricing/",
    emoji: "🔑",
    network: "direct",
  },
  "digitalocean": {
    id: "digitalocean",
    name: "DigitalOcean",
    tagline: { en: "Cloud for developers", bn: "ডেভেলপারদের ক্লাউড" },
    description: {
      en: "Simple VPS, $200 free credits. Deploy apps in minutes.",
      bn: "সহজ VPS, $২০০ ফ্রি ক্রেডিট। মিনিটে অ্যাপ ডিপ্লয়।",
    },
    ctaLabel: { en: "Get $200", bn: "$২০০ নিন" },
    url: "https://www.digitalocean.com/",
    emoji: "🌊",
    badge: { en: "Free credits", bn: "ফ্রি ক্রেডিট" },
    network: "impact",
  },
  "jetbrains": {
    id: "jetbrains",
    name: "JetBrains IDEs",
    tagline: { en: "Smart code editors", bn: "স্মার্ট কোড এডিটর" },
    description: {
      en: "WebStorm, IntelliJ, PyCharm. Pro tools for pro developers.",
      bn: "WebStorm, IntelliJ, PyCharm। প্রো ডেভেলপারদের টুল।",
    },
    ctaLabel: { en: "Explore", bn: "বিস্তারিত" },
    url: "https://www.jetbrains.com/",
    emoji: "🧠",
    network: "direct",
  },
  "postman-pro": {
    id: "postman-pro",
    name: "Postman Pro",
    tagline: { en: "API development", bn: "API ডেভেলপমেন্ট" },
    description: {
      en: "Build, test, and document APIs. Team collaboration included.",
      bn: "API বানান, টেস্ট করুন, ডকুমেন্ট করুন। টিম কলাবরেশন সহ।",
    },
    ctaLabel: { en: "Try free", bn: "ফ্রি ট্রাই" },
    url: "https://www.postman.com/pricing/",
    emoji: "📮",
    network: "direct",
  },
  "resume-io": {
    id: "resume-io",
    name: "Resume.io",
    tagline: { en: "Resume builder", bn: "রেজুমে বিল্ডার" },
    description: {
      en: "Professional resume templates. Land interviews faster.",
      bn: "প্রফেশনাল রেজুমে টেমপ্লেট। দ্রুত ইন্টারভিউ পান।",
    },
    ctaLabel: { en: "Build now", bn: "এখনই বানান" },
    url: "https://resume.io/",
    emoji: "📝",
    network: "impact",
  },
  "zety": {
    id: "zety",
    name: "Zety",
    tagline: { en: "CV + cover letter", bn: "CV + কভার লেটার" },
    description: {
      en: "AI-assisted resume writing with ATS-friendly templates.",
      bn: "AI সহায়তায় রেজুমে লেখা, ATS-ফ্রেন্ডলি টেমপ্লেট।",
    },
    ctaLabel: { en: "Try free", bn: "ফ্রি ট্রাই" },
    url: "https://zety.com/",
    emoji: "💼",
    network: "impact",
  },
  "vistaprint": {
    id: "vistaprint",
    name: "Vistaprint",
    tagline: { en: "Print business cards", bn: "বিজনেস কার্ড প্রিন্ট" },
    description: {
      en: "Custom visiting cards delivered to your door. Bulk discounts.",
      bn: "কাস্টম ভিজিটিং কার্ড ঘরে পৌঁছে। বাল্ক ডিসকাউন্ট।",
    },
    ctaLabel: { en: "Design now", bn: "ডিজাইন করুন" },
    url: "https://www.vistaprint.com/",
    emoji: "🎴",
    network: "impact",
  },
  "moo": {
    id: "moo",
    name: "MOO",
    tagline: { en: "Premium business cards", bn: "প্রিমিয়াম বিজনেস কার্ড" },
    description: {
      en: "Premium print quality, unique finishes. For memorable cards.",
      bn: "প্রিমিয়াম প্রিন্ট, ইউনিক ফিনিশ। মনে রাখার মতো কার্ড।",
    },
    ctaLabel: { en: "See designs", bn: "ডিজাইন দেখুন" },
    url: "https://www.moo.com/",
    emoji: "💎",
    network: "impact",
  },
  "exiftool-pro": {
    id: "exiftool-pro",
    name: "ExifTool Pro",
    tagline: { en: "Metadata editing", bn: "মেটাডেটা এডিটিং" },
    description: {
      en: "Read, write, and strip image metadata. Trusted by photographers.",
      bn: "ইমেজ মেটাডেটা পড়ুন, লিখুন, মুছুন। ফটোগ্রাফারদের বিশ্বাস।",
    },
    ctaLabel: { en: "Learn more", bn: "বিস্তারিত" },
    url: "https://exiftool.org/",
    emoji: "🔍",
    network: "direct",
  },
};

export function getAffiliatesForTool(toolId: string, max = 3): AffiliateProduct[] {
  const ids = AFFILIATE_BY_TOOL[toolId] ?? [];
  return ids
    .map((id) => AFFILIATE_PRODUCTS[id])
    .filter((p): p is AffiliateProduct => Boolean(p))
    .slice(0, max);
}

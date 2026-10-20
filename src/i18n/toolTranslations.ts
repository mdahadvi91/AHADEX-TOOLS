export interface ToolTranslation {
  name: string;
  description: string;
}

export const toolTranslationsBn: Record<string, ToolTranslation> = {
  "photo-qr": {
    name: "ফটো QR কোড",
    description:
      "যেকোনো ছবিতে সত্যিকারের স্ক্যানযোগ্য QR ব্যাজ যোগ করুন — WhatsApp, Facebook, WiFi এবং আরও।",
  },
  "visiting-card": {
    name: "ভিজিটিং কার্ড মেকার",
    description:
      "সেকেন্ডের মধ্যে প্রিন্ট-রেডি ভিজিটিং কার্ড ডিজাইন করুন। ২০টি প্রিমিয়াম টেমপ্লেট — সামনে ও পিছনে।",
  },
  "cv-builder": {
    name: "সিভি বিল্ডার",
    description:
      "মিনিটেই পেশাদার CV তৈরি করুন। আসল A4 টেমপ্লেট, লাইভ প্রিভিউ, selectable-text PDF এক্সপোর্ট, অটো-সেভ ও সম্পূর্ণ ব্রাউজার-প্রাইভেসি।",
  },
  "image-compressor": {
    name: "ইমেজ কমপ্রেসর",
    description: "JPG, PNG, WebP ছবি কমপ্রেস করুন — সমন্বয়যোগ্য কোয়ালিটি, সম্পূর্ণ ব্রাউজারেই।",
  },
  "image-resizer": {
    name: "ইমেজ রিসাইজার",
    description: "JPG, PNG, WebP ছবি যেকোনো মাপে রিসাইজ করুন — aspect lock, সম্পূর্ণ ব্রাউজারেই।",
  },
  "image-cropper": {
    name: "ইমেজ ক্রপার",
    description: "JPG, PNG, WebP ছবি ক্রপ করুন — ৮টি aspect প্রিসেট, লাইভ প্রিভিউ, সম্পূর্ণ ব্রাউজারেই।",
  },
  "merge-pdf": {
    name: "PDF মার্জ",
    description: "একাধিক PDF এক ডকুমেন্টে যুক্ত করুন — reorder, সম্পূর্ণ ব্রাউজারেই।",
  },
  "split-pdf": {
    name: "PDF স্প্লিট",
    description: "PDF থেকে পেজ এক্সট্রাক্ট করুন বা পেজ-by-পেজ ভাগ করুন — কাস্টম রেঞ্জ, সম্পূর্ণ ব্রাউজারেই।",
  },
  "word-counter": {
    name: "শব্দ গণনা",
    description: "শব্দ, অক্ষর, বাক্য ও অনুচ্ছেদ রিয়েল-টাইমে গণনা করুন — পড়ার সময়, কীওয়ার্ড ঘনত্ব, সম্পূর্ণ ব্রাউজারেই।",
  },
  "image-to-pdf": {
    name: "ইমেজ থেকে PDF",
    description: "JPG, PNG ও WebP ছবি এক PDF-এ যুক্ত করুন — সম্পূর্ণ ব্রাউজারেই, multi-page, A4/Letter।",
  },
  "image-metadata-viewer": {
    name: "ইমেজ মেটাডেটা",
    description: "ছবির EXIF, GPS ও ক্যামেরার তথ্য দেখুন — সম্পূর্ণ ব্রাউজারেই, ফাইল আপনার ডিভাইসেই থাকে।",
  },
  "pdf-to-text": {
    name: "PDF থেকে টেক্সট",
    description: "PDF থেকে প্লেন টেক্সট বের করুন — পেজ রেঞ্জ, লাইন ব্রেক অপশন, কপি বা .txt ডাউনলোড।",
  },
  "pdf-rotator": {
    name: "PDF রোটেটর",
    description: "PDF পেজ 90°/180° ঘোরান — সব পেজ বা নির্দিষ্ট রেঞ্জ, lossless, সম্পূর্ণ ব্রাউজারেই।",
  },
  "image-converter": {
    name: "ইমেজ কনভার্টার",
    description:
      "JPG, PNG ও WebP-এর মধ্যে যেকোনো দিকে ছবি রূপান্তর করুন — lossless, ব্যাচ সাপোর্ট, সম্পূর্ণ আপনার ব্রাউজারেই। কোনো আপলোড নেই।",
  },
  "pdf-to-image": {
    name: "PDF থেকে ইমেজ",
    description:
      "PDF-এর প্রতিটি পেজ PNG বা JPG ছবিতে রূপান্তর করুন — ৩০০ DPI পর্যন্ত, পেজ রেঞ্জ, সম্পূর্ণ আপনার ব্রাউজারেই।",
  },
  "svg-to-png": {
    name: "SVG থেকে PNG",
    description: "SVG ভেক্টর ফাইল PNG ছবিতে রূপান্তর করুন — ৮× স্কেল, transparent background, সম্পূর্ণ ব্রাউজারেই।",
  },
  "json-formatter": {
    name: "JSON ফরম্যাটার",
    description: "JSON ফরম্যাট, ভ্যালিডেট ও মিনিফাই করুন — লাইভ error line/column, sort keys, 2/4 space বা tab।",
  },
  "url-encoder": {
    name: "URL এনকোডার / ডিকোডার",
    description: "URL এনকোড বা ডিকোড করুন — Unicode, emoji, special char সাপোর্টেড, দুই scope।",
  },
  "uuid-generator": {
    name: "UUID জেনারেটর",
    description: "UUID v4 ও v7 তৈরি করুন — Web Crypto randomness, ১০০০ পর্যন্ত ব্যাচ, কপি বা .txt ডাউনলোড।",
  },
  "text-case-converter": {
    name: "টেক্সট কেস কনভার্টার",
    description: "টেক্সট ১২টি case-এ convert করুন — UPPER, lower, Title, camel, snake, kebab ইত্যাদি।",
  },
  "image-to-sketch": {
    name: "ইমেজ থেকে স্কেচ",
    description: "যেকোনো ছবিকে হাতে-আঁকা পেন্সিল স্কেচে রূপান্তর করুন — লাইভ স্লাইডার, PNG ডাউনলোড।",
  },
  "image-to-cartoon": {
    name: "ইমেজ থেকে কার্টুন",
    description: "যেকোনো ছবিকে সেল-শেডেড কার্টুনে রূপান্তর করুন — লাইভ স্লাইডার, PNG ডাউনলোড।",
  },
  "base64-encoder": {
    name: "Base64 এনকোডার / ডিকোডার",
    description: "টেক্সট ও ফাইলের Base64 encode/decode — Unicode-safe, URL-safe, image preview সহ।",
  },
  "password-generator": {
    name: "পাসওয়ার্ড জেনারেটর",
    description: "শক্তিশালী, ক্রিপ্টোগ্রাফিক্যালি র‍্যান্ডম পাসওয়ার্ড তৈরি করুন — লাইভ strength, batch ৫০ পর্যন্ত।",
  },
  "barcode-generator": {
    name: "বারকোড জেনারেটর",
    description: "৯ ফরম্যাটে বারকোড তৈরি করুন — CODE128, EAN-13, UPC-A সহ। PNG/SVG export।",
  },
  "character-counter": {
    name: "ক্যারেক্টার কাউন্টার",
    description: "X (টুইটার), ইনস্টাগ্রাম, SMS ও SEO লিমিটের বিপরীতে লাইভ ক্যারেক্টার গণনা।",
  },
  "favicon-generator": {
    name: "ফ্যাভিকন জেনারেটর",
    description: "যেকোনো ছবি থেকে সম্পূর্ণ favicon সেট — 16 থেকে 512px PNG, favicon.ico, webmanifest।",
  },
};

export function getToolTranslation(
  toolId: string,
  lang: "en" | "bn",
  fallback: { name: string; description: string }
): { name: string; description: string } {
  if (lang === "bn") {
    const tr = toolTranslationsBn[toolId];
    if (tr) return tr;
  }
  return fallback;
}

export interface ToolTranslation {
  name: string;
  description: string;
}

export const toolTranslationsBn: Record<string, ToolTranslation> = {
  // Image tools
  "jpg-to-png": {
    name: "JPG থেকে PNG",
    description: "JPG ছবি PNG ফরম্যাটে ব্রাউজারেই রূপান্তর করুন।",
  },
  "png-to-jpg": {
    name: "PNG থেকে JPG",
    description: "PNG ছবি ছোট সাইজের JPG-তে রূপান্তর করুন।",
  },
  "jpg-to-webp": {
    name: "JPG থেকে WebP",
    description: "আধুনিক WebP ফরম্যাটে ছোট ফাইলের জন্য রূপান্তর।",
  },
  "png-to-webp": {
    name: "PNG থেকে WebP",
    description: "স্বচ্ছতা সহ ছোট WebP ফাইলে রূপান্তর।",
  },
  "webp-to-jpg": {
    name: "WebP থেকে JPG",
    description: "সার্বজনীন ব্যবহারের জন্য WebP থেকে JPG।",
  },
  "webp-to-png": {
    name: "WebP থেকে PNG",
    description: "স্বচ্ছতা সংরক্ষণ করে WebP থেকে PNG।",
  },
  "image-compressor": {
    name: "ইমেজ কমপ্রেসর",
    description: "গুণমান না হারিয়ে JPG, PNG, WebP কমপ্রেস করুন।",
  },
  "image-resizer": {
    name: "ইমেজ রিসাইজার",
    description: "যেকোনো মাপে ছবি রিসাইজ করুন, অনুপাত নিয়ন্ত্রণ সহ।",
  },
  "image-cropper": {
    name: "ইমেজ ক্রপার",
    description: "সঠিক অনুপাতে ছবি ক্রপ করুন।",
  },
  "image-to-pdf": {
    name: "ইমেজ থেকে PDF",
    description: "অনেক ছবি মিলিয়ে একটা PDF তৈরি করুন।",
  },
  "image-metadata-viewer": {
    name: "ইমেজ মেটাডেটা",
    description: "ছবির EXIF, GPS ও ক্যামেরার তথ্য দেখুন।",
  },
  "background-remover": {
    name: "ব্যাকগ্রাউন্ড রিমুভার",
    description: "AI দিয়ে স্বয়ংক্রিয়ভাবে ছবির ব্যাকগ্রাউন্ড সরান।",
  },

  // PDF tools
  "jpg-to-pdf": {
    name: "JPG থেকে PDF",
    description: "JPG ছবি পরিষ্কার PDF ডকুমেন্টে রূপান্তর করুন।",
  },
  "png-to-pdf": {
    name: "PNG থেকে PDF",
    description: "PNG ছবি PDF ফাইলে রূপান্তর করুন।",
  },
  "merge-pdf": {
    name: "PDF মার্জ",
    description: "একাধিক PDF এক ফাইলে যুক্ত করুন।",
  },
  "split-pdf": {
    name: "PDF স্প্লিট",
    description: "পেজ রেঞ্জ অনুযায়ী PDF আলাদা করুন।",
  },
  "compress-pdf": {
    name: "PDF কমপ্রেস",
    description: "গুণমান ঠিক রেখে PDF সাইজ কমান।",
  },
  "pdf-to-jpg": {
    name: "PDF থেকে JPG",
    description: "প্রতিটা PDF পেজকে JPG ছবিতে রূপান্তর।",
  },
  "pdf-to-png": {
    name: "PDF থেকে PNG",
    description: "PDF পেজগুলোকে লসলেস PNG ছবিতে রূপান্তর।",
  },
  "pdf-page-extractor": {
    name: "PDF পেজ এক্সট্রাক্টর",
    description: "PDF থেকে নির্দিষ্ট পেজ বের করুন।",
  },

  // QR tools
  "qr-code-generator": {
    name: "QR কোড জেনারেটর",
    description: "যেকোনো টেক্সট বা লিংকের QR কোড তৈরি করুন।",
  },
  "wifi-qr-generator": {
    name: "WiFi QR জেনারেটর",
    description: "এক স্ক্যানে গেস্টদের WiFi-তে যোগ করুন।",
  },
  "email-qr-generator": {
    name: "ইমেইল QR জেনারেটর",
    description: "পূর্বনির্ধারিত ইমেইল খোলার QR কোড।",
  },
  "phone-qr-generator": {
    name: "ফোন QR জেনারেটর",
    description: "স্ক্যান করলেই ফোন নম্বরে ডায়াল।",
  },
  "vcard-qr-generator": {
    name: "vCard QR জেনারেটর",
    description: "যোগাযোগের তথ্য এক স্ক্যানে সেভ করুন।",
  },
  "qr-code-scanner": {
    name: "QR কোড স্ক্যানার",
    description: "ক্যামেরা বা ছবি দিয়ে QR কোড স্ক্যান করুন।",
  },
  "barcode-generator": {
    name: "বারকোড জেনারেটর",
    description: "Code128, EAN, UPC — সব ধরনের বারকোড।",
  },
  "qr-code-with-logo": {
    name: "লোগো সহ QR",
    description: "নিজের লোগো সহ ব্র্যান্ডেড QR কোড।",
  },

  // Text tools
  "word-counter": {
    name: "শব্দ গণনা",
    description: "শব্দ, অক্ষর, বাক্য ও পড়ার সময় তৎক্ষণাৎ জানুন।",
  },
  "case-converter": {
    name: "কেস কনভার্টার",
    description: "UPPERCASE, lowercase, Title Case — সব রূপে বদলান।",
  },
  "text-cleaner": {
    name: "টেক্সট ক্লিনার",
    description: "বাড়তি space, line break ও HTML ট্যাগ সরান।",
  },
  "json-formatter": {
    name: "JSON ফরম্যাটার",
    description: "JSON ফরম্যাট, ভ্যালিডেট ও বিউটিফাই করুন।",
  },
  "json-to-csv": {
    name: "JSON থেকে CSV",
    description: "JSON অ্যারে পরিষ্কার CSV ফাইলে রূপান্তর।",
  },
  "base64-tool": {
    name: "Base64 এনকোডার",
    description: "টেক্সট বা ফাইল Base64-এ এনকোড/ডিকোড করুন।",
  },

  // Developer tools
  "url-encoder": {
    name: "URL এনকোডার",
    description: "URL বা কুয়েরি প্যারামিটার এনকোড/ডিকোড করুন।",
  },
  "uuid-generator": {
    name: "UUID জেনারেটর",
    description: "v1 ও v4 UUID একসাথে bulk-এ তৈরি করুন।",
  },
  "regex-tester": {
    name: "রেজেক্স টেস্টার",
    description: "লাইভে regular expression টেস্ট ও ম্যাচ দেখুন।",
  },

  // Calculators
  "percentage-calculator": {
    name: "শতকরা ক্যালকুলেটর",
    description: "শতকরা, বৃদ্ধি, হ্রাস ও পার্থক্য হিসাব করুন।",
  },
  "age-calculator": {
    name: "বয়স ক্যালকুলেটর",
    description: "বছর, মাস, দিন, ঘণ্টা — সঠিক বয়স জানুন।",
  },
  "date-difference": {
    name: "তারিখ পার্থক্য",
    description: "দুই তারিখের মধ্যে দিন, সপ্তাহ ও কর্মদিবস।",
  },
  "unit-converter": {
    name: "ইউনিট কনভার্টার",
    description: "দৈর্ঘ্য, ওজন, তাপমাত্রা — সব ইউনিট রূপান্তর।",
  },
  "bmi-calculator": {
    name: "BMI ক্যালকুলেটর",
    description: "মেট্রিক বা ইম্পেরিয়ালে BMI হিসাব করুন।",
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

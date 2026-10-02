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
  "jpg-to-png": {
    name: "JPG থেকে PNG",
    description:
      "JPG ছবি PNG ফরম্যাটে সাথে সাথে রূপান্তর করুন — সম্পূর্ণ আপনার ব্রাউজারেই, কোনো আপলোড নেই।",
  },
  "png-to-jpg": {
    name: "PNG থেকে JPG",
    description:
      "PNG ছবি JPG ফরম্যাটে সাথে সাথে রূপান্তর করুন — সম্পূর্ণ আপনার ব্রাউজারেই, ছোট ফাইল, শূন্য আপলোড।",
  },
  "jpg-to-webp": {
    name: "JPG থেকে WebP",
    description:
      "JPG ছবি আধুনিক WebP ফরম্যাটে রূপান্তর করুন — ২৫-৩৫% ছোট ফাইল, সম্পূর্ণ ব্রাউজারেই।",
  },
  "png-to-webp": {
    name: "PNG থেকে WebP",
    description:
      "PNG ছবি আধুনিক WebP ফরম্যাটে রূপান্তর করুন — ৩০-৫০% ছোট ফাইল, স্বচ্ছতা সংরক্ষিত, সম্পূর্ণ ব্রাউজারেই।",
  },
  "webp-to-jpg": {
    name: "WebP থেকে JPG",
    description:
      "WebP ছবি JPG ফরম্যাটে রূপান্তর করুন — সার্বজনীন সাপোর্ট, সম্পূর্ণ ব্রাউজারেই।",
  },
  "webp-to-png": {
    name: "WebP থেকে PNG",
    description: "WebP ছবি PNG ফরম্যাটে রূপান্তর করুন — lossless, স্বচ্ছতা সংরক্ষিত, সম্পূর্ণ ব্রাউজারেই।",
  },
  "image-compressor": {
    name: "ইমেজ কমপ্রেসর",
    description: "JPG, PNG, WebP ছবি কমপ্রেস করুন — সমন্বয়যোগ্য কোয়ালিটি, সম্পূর্ণ ব্রাউজারেই।",
  },
  "image-resizer": {
    name: "ইমেজ রিসাইজার",
    description: "JPG, PNG, WebP ছবি যেকোনো মাপে রিসাইজ করুন — aspect lock, সম্পূর্ণ ব্রাউজারেই।",
  },
  "jpg-to-pdf": {
    name: "JPG থেকে PDF",
    description: "JPG ছবি এক multi-page PDF-এ যুক্ত করুন — reorder, A4/Letter, সম্পূর্ণ ব্রাউজারেই।",
  },
  "png-to-pdf": {
    name: "PNG থেকে PDF",
    description: "PNG ছবি এক multi-page PDF-এ যুক্ত করুন — reorder, A4/Letter, সাদা ব্যাকগ্রাউন্ড, সম্পূর্ণ ব্রাউজারেই।",
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

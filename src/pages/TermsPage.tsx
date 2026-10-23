import { TrustPageLayout } from "@components/trust/TrustPageLayout";
import { useLanguage } from "@contexts/LanguageContext";

const CONTACT = "mdahadvi91@gmail.com";
const UPDATED_EN = "Last updated: October 2026";
const UPDATED_BN = "সর্বশেষ আপডেট: অক্টোবর ২০২৬";

export const TERMS_CONTENT = {
  en: {
    eyebrow: "Terms of Service",
    title: "The rules for using AHADEX Tools.",
    subtitle: "Plain-language terms that explain what you can expect from us, and what we expect from you.",
    lastUpdated: UPDATED_EN,
    contactEmail: CONTACT,
    sections: [
      { heading: "1. Acceptance", paragraphs: ["By using AHADEX Tools ('the Service'), you agree to these Terms of Service. If you do not agree, please do not use the Service."] },
      { heading: "2. What the Service is", paragraphs: ["AHADEX Tools provides free, browser-based utilities for working with images, PDFs, text, QR codes, and other everyday tasks. All processing runs on your device.", "The Service is provided 'as-is' and 'as-available'. We do not guarantee that any specific tool will always be available, error-free, or produce a specific result."] },
      { heading: "3. Acceptable use", bullets: ["Do not use the Service for anything illegal or harmful.", "Do not process content you don't have the rights to.", "Do not attempt to overload, scrape, or attack the Service.", "Do not remove or hide advertisements or copyright notices.", "Do not use automated scripts to abuse the Service."] },
      { heading: "4. Your content", paragraphs: ["Because every tool runs in your browser, we never receive your files or text. You retain full ownership of everything you process with the Service. We claim no rights over your content."] },
      { heading: "5. Intellectual property", paragraphs: ["The AHADEX Tools name, logo, website design, and underlying code are owned by AHADEX. You may not copy, redistribute, or create derivative works without permission.", "Outputs you create with the tools (converted images, generated QR codes, formatted text) belong entirely to you."] },
      { heading: "6. No warranty", paragraphs: ["The Service is provided without any warranty, express or implied. We do not guarantee accuracy of calculations, suitability for any particular purpose, or uninterrupted availability.", "Always keep backups of important files. Use the Service at your own risk."] },
      { heading: "7. Limitation of liability", paragraphs: ["To the maximum extent permitted by law, AHADEX is not liable for any direct, indirect, incidental, or consequential damages arising from your use of the Service."] },
      { heading: "8. Advertising", paragraphs: ["The Service may display advertising to help cover hosting and development costs. Ads are labelled and never disguised as tool features or navigation."] },
      { heading: "9. Changes", paragraphs: ["We may update these terms at any time. Continued use of the Service after changes means you accept the updated terms."] },
      { heading: "10. Contact", paragraphs: [`Questions about these terms? Email us at ${CONTACT}.`] }
    ]
  },
  bn: {
    eyebrow: "শর্তাবলী",
    title: "AHADEX Tools ব্যবহারের নিয়ম।",
    subtitle: "সহজ ভাষায় শর্তাবলী যা ব্যাখ্যা করে আমাদের কাছ থেকে আপনি কী আশা করতে পারেন, আর আপনার কাছ থেকে আমরা কী আশা করি।",
    lastUpdated: UPDATED_BN,
    contactEmail: CONTACT,
    sections: [
      { heading: "১. সম্মতি", paragraphs: ["AHADEX Tools ('সেবা') ব্যবহার করে আপনি এই শর্তাবলীতে সম্মত হচ্ছেন। যদি সম্মত না হন, সেবা ব্যবহার করবেন না।"] },
      { heading: "২. সেবা কী", paragraphs: ["AHADEX Tools ফ্রি, ব্রাউজার-ভিত্তিক utility দেয় — ছবি, PDF, টেক্সট, QR কোড ও অন্যান্য প্রতিদিনের কাজের জন্য। সব প্রসেসিং আপনার ডিভাইসেই চলে।", "সেবা 'as-is' ও 'as-available' হিসেবে দেওয়া হয়। আমরা গ্যারান্টি দিই না যে কোনো নির্দিষ্ট টুল সবসময় উপলব্ধ, error-free, বা নির্দিষ্ট ফলাফল দেবে।"] },
      { heading: "৩. গ্রহণযোগ্য ব্যবহার", bullets: ["বেআইনি বা ক্ষতিকর কাজে সেবা ব্যবহার করবেন না।", "যে কনটেন্টের অধিকার নেই তা প্রসেস করবেন না।", "সেবা overload, scrape বা attack করার চেষ্টা করবেন না।", "বিজ্ঞাপন বা copyright notice সরাবেন না।", "স্বয়ংক্রিয় স্ক্রিপ্ট দিয়ে সেবার অপব্যবহার করবেন না।"] },
      { heading: "৪. আপনার কনটেন্ট", paragraphs: ["প্রতিটা টুল আপনার ব্রাউজারে চলার কারণে আমরা আপনার ফাইল বা টেক্সট পাই না। আপনি আপনার সব কনটেন্টের পূর্ণ মালিকানা রাখেন।"] },
      { heading: "৫. বৌদ্ধিক সম্পত্তি", paragraphs: ["AHADEX Tools-এর নাম, লোগো, ওয়েবসাইট ডিজাইন ও কোড AHADEX-এর মালিকানাধীন। অনুমতি ছাড়া copy, redistribute বা derivative কাজ করা যাবে না।", "টুল দিয়ে আপনি যা তৈরি করেন (রূপান্তরিত ছবি, QR কোড, formatted text) সম্পূর্ণ আপনার।"] },
      { heading: "৬. কোনো ওয়ারেন্টি নেই", paragraphs: ["সেবা কোনো ওয়ারেন্টি ছাড়াই দেওয়া হয়। আমরা হিসাবের সঠিকতা, নির্দিষ্ট উদ্দেশ্যে উপযুক্ততা, বা নিরবচ্ছিন্ন উপলব্ধতার গ্যারান্টি দিই না।", "গুরুত্বপূর্ণ ফাইলের ব্যাকআপ রাখুন। নিজের ঝুঁকিতে সেবা ব্যবহার করুন।"] },
      { heading: "৭. দায় সীমাবদ্ধতা", paragraphs: ["আইন যতটা অনুমতি দেয়, AHADEX সেবা ব্যবহারে সৃষ্ট কোনো প্রত্যক্ষ, পরোক্ষ, আকস্মিক বা ফলস্বরূপ ক্ষতির জন্য দায়ী নয়।"] },
      { heading: "৮. বিজ্ঞাপন", paragraphs: ["হোস্টিং ও ডেভেলপমেন্ট খরচ কভার করতে সেবা বিজ্ঞাপন দেখাতে পারে। বিজ্ঞাপন লেবেলযুক্ত এবং কখনো টুল ফিচার বা navigation হিসেবে দেখানো হয় না।"] },
      { heading: "৯. পরিবর্তন", paragraphs: ["আমরা সময়ে সময়ে এই শর্তাবলী আপডেট করতে পারি। পরিবর্তনের পর সেবা ব্যবহার মানে আপনি আপডেট করা শর্তাবলী গ্রহণ করেন।"] },
      { heading: "১০. যোগাযোগ", paragraphs: [`এই শর্তাবলী নিয়ে প্রশ্ন? ${CONTACT}-এ ইমেইল করুন।`] }
    ]
  }
};

export default function TermsPage() {
  const { language } = useLanguage();
  return <TrustPageLayout content={TERMS_CONTENT[language]} icon="document" />;
}

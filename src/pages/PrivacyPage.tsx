import { TrustPageLayout } from "@components/trust/TrustPageLayout";
import { useLanguage } from "@contexts/LanguageContext";

const CONTACT = "mdahadvi91@gmail.com";
const UPDATED_EN = "Last updated: October 2026";
const UPDATED_BN = "সর্বশেষ আপডেট: অক্টোবর ২০২৬";

export const PRIVACY_CONTENT = {
  en: {
    eyebrow: "Privacy Policy",
    title: "Your privacy, protected.",
    subtitle: "This page explains exactly what data we handle — and the answer is very little. We never upload or store the files you process with our tools, and we never run analytics on your file content. Anonymous usage analytics (Google Analytics) and advertising (Google AdSense) may process limited technical information such as page views, cookie identifiers, and approximate location, subject to your consent choices.",
    lastUpdated: UPDATED_EN,
    contactEmail: CONTACT,
    sections: [
      {
        heading: "File Processing vs. Website Analytics",
        paragraphs: [
          "Important distinction: While all our file processing is 100% local and no files are ever uploaded, our website may use anonymous website analytics and (in the future) advertising scripts (like Google AdSense) to keep the site free. These scripts do not have access to your files, but they may use cookies for website analytics and personalized ads. You can control cookie preferences in your browser settings."
        ]
      },
      {
        heading: "1. The short version",
        paragraphs: [
          "AHADEX Tools is designed to be privacy-first. The tools run entirely in your browser. Your files — images, PDFs, text, and any other content — are never uploaded to our servers, never stored, and never analysed.",
          "The only data we collect is anonymous analytics (page views, tool opens) and whatever is needed to serve advertising. You don't need to create an account, and we don't ask for personal information."
        ]
      },
      {
        heading: "2. What we do NOT collect",
        bullets: [
          "The contents of any file you use with our tools.",
          "Your name, email, or phone number (unless you contact us directly).",
          "Your exact location.",
          "Payment information — we don't process payments.",
          "Passwords you generate or enter in any tool."
        ]
      },
      {
        heading: "3. Local storage",
        paragraphs: ["We store a few small preferences in your browser's local storage:"],
        bullets: [
          "Your preferred theme (light, dark, or system).",
          "Your preferred language (English or Bengali).",
          "Which tools you've marked as favourites.",
          "Whether sound effects are enabled."
        ]
      },
      {
        heading: "4. Analytics",
        paragraphs: [
          "We use Google Analytics 4 to understand which pages are popular and how the site is being used. Analytics data is aggregated and anonymous. We do not send the contents of any file or text you enter into a tool.",
          "If you prefer, you can block analytics with any modern ad blocker or browser privacy extension. The tools will continue to work normally."
        ]
      },
      {
        heading: "5. Advertising",
        paragraphs: [
          "AHADEX Tools is supported by Google AdSense advertising, which helps keep our tools free. Google may use cookies and similar technologies for ad delivery and measurement, subject to applicable settings and consent signals.",
          "Google may use cookies to serve ads based on your prior visits to this and other websites. You can opt out of personalised advertising at Google Ads Settings (adssettings.google.com).",
          "Google and its advertising partners may process technical information such as browser or device data, cookie identifiers, approximate location, and interactions with ads, subject to Google's policies and applicable law.",
          "We do not place ads on top of tool workspaces, download buttons, or anywhere that would confuse the user about what is an ad and what is a tool."
        ]
      },
      {
        heading: "6. Consent Management",
        paragraphs: [
          "When you first visit, our own consent banner lets you choose whether to allow analytics and advertising. Google Consent Mode defaults are configured before Google tags load, and the site sends consent updates when you save your choice. This custom banner is not represented as a Google-certified consent management platform.",
          "Optional analytics and advertising consent signals default to denied until you make a choice. Google scripts may still be requested by the page, and rejecting consent does not guarantee that every third-party network request is blocked.",
          "To display the consent banner again, clear this site's stored site data in your browser and reload the page."
        ]
      },
      {
        heading: "7. Third-party services",
        paragraphs: ["The following third parties may receive limited technical data when you visit the site:"],
        bullets: [
          "Google Analytics 4 — anonymous page-view and tool-usage analytics (measurement ID G-NJB6S9E9N3).",
          "Google AdSense — advertising delivery and measurement (publisher ID ca-pub-5216241068377334).",
          "Google Fonts — web font delivery (only your IP address is exposed to Google's servers).",
          "Cloudflare — CDN, security, and performance (all traffic passes through Cloudflare's edge)."
        ]
      },
      {
        heading: "8. Cookies and similar technologies",
        paragraphs: ["We use the following categories of cookies and browser storage:"],
        bullets: [
          "Essential — needed for the site to function (consent preferences, theme, language).",
          "Analytics — anonymous usage statistics via Google Analytics 4 (only after you consent).",
          "Advertising — Google AdSense ad delivery and measurement, subject to consent signals, product settings, and applicable law."
        ]
      },
      {
        heading: "9. Children's privacy",
        paragraphs: ["AHADEX Tools is suitable for general audiences. We do not knowingly collect personal information from anyone, including children under 13. If you believe a child has submitted personal information to us (for example, via the contact form), please email us and we'll delete it."]
      },
      {
        heading: "10. Your rights",
        paragraphs: [
          "You have the right to request access to any personal data we hold about you, to correct it, or to have it deleted. In practice, we hold almost no personal data — only what you send us through the contact form.",
          `To exercise any of these rights, email us at ${CONTACT}.`
        ]
      },
      {
        heading: "11. Changes to this policy",
        paragraphs: ["We may update this policy from time to time. The latest version will always be available on this page, with the 'Last updated' date at the top. Significant changes will be highlighted on the homepage."]
      },
      {
        heading: "12. Contact",
        paragraphs: [`Questions about privacy? Email us at ${CONTACT}. We aim to respond within 48 hours.`]
      }
    ]
  },
  bn: {
    eyebrow: "প্রাইভেসি পলিসি",
    title: "আপনার প্রাইভেসি, সুরক্ষিত।",
    subtitle: "এই পেজে ব্যাখ্যা করা হয়েছে আমরা ঠিক কী ডেটা হ্যান্ডেল করি — এবং উত্তর হলো খুব সামান্য। আপনার টুলে প্রসেস করা ফাইল আমরা কখনো আপলোড বা সংরক্ষণ করি না, এবং আপনার ফাইল কনটেন্টে কখনো অ্যানালিটিক্স চালাই না। Anonymous usage analytics (Google Analytics) এবং বিজ্ঞাপন (Google AdSense) সীমিত প্রযুক্তিগত তথ্য প্রসেস করতে পারে — যেমন পেজ ভিউ, cookie identifier, এবং আনুমানিক অবস্থান — যা আপনার সম্মতির পছন্দের উপর নির্ভরশীল।",
    lastUpdated: UPDATED_BN,
    contactEmail: CONTACT,
    sections: [
      {
        heading: "ফাইল প্রসেসিং বনাম ওয়েবসাইট অ্যানালিটিক্স",
        paragraphs: ["গুরুত্বপূর্ণ পার্থক্য: আমাদের সমস্ত ফাইল প্রসেসিং ১০০% লোকাল এবং কোনো ফাইল কখনোই আপলোড হয় না। তবে ওয়েবসাইটটি ফ্রি রাখার জন্য আমরা বেনামী ওয়েবসাইট অ্যানালিটিক্স এবং (ভবিষ্যতে) বিজ্ঞাপন স্ক্রিপ্ট (যেমন Google AdSense) ব্যবহার করতে পারি। এই স্ক্রিপ্টগুলোর আপনার ফাইলগুলোর কোনো অ্যাক্সেস নেই, তবে তারা ওয়েবসাইট অ্যানালিটিক্স এবং ব্যক্তিগতকৃত বিজ্ঞাপনের জন্য কুকি ব্যবহার করতে পারে। আপনি আপনার ব্রাউজার সেটিংসে কুকি পছন্দ নিয়ন্ত্রণ করতে পারেন।"]
      },
      {
        heading: "১. সংক্ষিপ্ত সংস্করণ",
        paragraphs: [
          "AHADEX Tools প্রাইভেসি-প্রথম দর্শনে ডিজাইন করা। টুলগুলো সম্পূর্ণ আপনার ব্রাউজারে চলে। আপনার ফাইল — ছবি, PDF, টেক্সট, বা অন্য যেকোনো কনটেন্ট — কখনো আমাদের সার্ভারে আপলোড হয় না, সংরক্ষণ হয় না, বিশ্লেষণ হয় না।",
          "আমরা শুধু anonymous analytics (পেজ ভিউ, টুল ওপেন) ও বিজ্ঞাপনের জন্য যা প্রয়োজন তা সংগ্রহ করি। আপনাকে অ্যাকাউন্ট খুলতে হবে না, আমরা ব্যক্তিগত তথ্য চাই না।"
        ]
      },
      {
        heading: "২. আমরা যা সংগ্রহ করি না",
        bullets: [
          "আপনার কোনো ফাইলের কনটেন্ট।",
          "আপনার নাম, ইমেইল, বা ফোন নম্বর (সরাসরি যোগাযোগ না করলে)।",
          "আপনার সঠিক অবস্থান।",
          "পেমেন্ট তথ্য — আমরা পেমেন্ট প্রসেস করি না।",
          "আপনি যেসব পাসওয়ার্ড তৈরি বা ব্যবহার করেন।"
        ]
      },
      {
        heading: "৩. লোকাল স্টোরেজ",
        paragraphs: ["আমরা আপনার ব্রাউজারের local storage-এ কয়েকটি ছোট পছন্দ সংরক্ষণ করি:"],
        bullets: [
          "আপনার পছন্দের থিম (light, dark, বা system)।",
          "আপনার পছন্দের ভাষা (English বা বাংলা)।",
          "কোন টুলগুলো আপনি পছন্দে যোগ করেছেন।",
          "সাউন্ড ইফেক্ট চালু আছে কিনা।"
        ]
      },
      {
        heading: "৪. অ্যানালিটিক্স",
        paragraphs: [
          "কোন পেজ জনপ্রিয় এবং সাইট কীভাবে ব্যবহৃত হয় বুঝতে আমরা Google Analytics 4 ব্যবহার করি। ডেটা aggregated ও anonymous। আমরা টুলে আপনার ফাইল বা টেক্সটের কনটেন্ট পাঠাই না।",
          "আপনি চাইলে যেকোনো আধুনিক ad blocker বা browser privacy extension দিয়ে analytics ব্লক করতে পারেন। টুলগুলো স্বাভাবিকভাবে কাজ করবে।"
        ]
      },
      {
        heading: "৫. বিজ্ঞাপন",
        paragraphs: [
          "AHADEX Tools Google AdSense বিজ্ঞাপনের সহায়তায় চলে, যা আমাদের টুলগুলো বিনামূল্যে রাখতে সাহায্য করে। Google প্রযোজ্য সেটিংস ও সম্মতির সংকেত অনুযায়ী বিজ্ঞাপন দেখানো এবং তার কার্যকারিতা মাপার জন্য cookies ও অনুরূপ প্রযুক্তি ব্যবহার করতে পারে।",
          "Google আপনার এই ও অন্যান্য ওয়েবসাইটে পূর্বের ভিজিটের ওপর ভিত্তি করে বিজ্ঞাপন দেখাতে cookies ব্যবহার করতে পারে। Google Ads Settings (adssettings.google.com) থেকে আপনি পার্সোনালাইজড বিজ্ঞাপন বন্ধ করতে পারেন।",
          "Google এবং তার বিজ্ঞাপন-সংক্রান্ত পার্টনাররা ব্রাউজার বা ডিভাইসের তথ্য, cookie identifier, আনুমানিক অবস্থান এবং বিজ্ঞাপনের সঙ্গে ব্যবহারকারীর মিথস্ক্রিয়ার মতো প্রযুক্তিগত তথ্য প্রক্রিয়া করতে পারে। এটি Google-এর নীতি ও প্রযোজ্য আইন অনুযায়ী পরিচালিত হয়।",
          "আমরা টুল workspace, ডাউনলোড বাটন বা এমন কোনো জায়গায় বিজ্ঞাপন বসাই না যা ব্যবহারকারীকে বিভ্রান্ত করতে পারে কোনটা বিজ্ঞাপন আর কোনটা টুল।"
        ]
      },
      {
        heading: "৬. কনসেন্ট ম্যানেজমেন্ট",
        paragraphs: [
          "প্রথমবার ভিজিট করলে আমাদের নিজস্ব কনসেন্ট ব্যানারে অ্যানালিটিক্স ও বিজ্ঞাপনের অনুমতি বেছে নেওয়া যায়। Google tag লোড হওয়ার আগেই Consent Mode-এর ডিফল্ট সেটিংস নির্ধারণ করা হয় এবং পছন্দ সেভ করলে Google-কে আপডেট পাঠানো হয়। এই কাস্টম ব্যানারকে Google-certified consent management platform বলে দাবি করা হচ্ছে না।",
          "আপনি পছন্দ জানানোর আগে ঐচ্ছিক অ্যানালিটিক্স ও বিজ্ঞাপনের সম্মতির সংকেত ডিফল্টভাবে denied থাকে। তবুও পেজ থেকে Google-এর script-এর অনুরোধ যেতে পারে; সম্মতি প্রত্যাখ্যান করলেই প্রতিটি third-party network request বন্ধ হবে, এমন নিশ্চয়তা নেই।",
          "কনসেন্ট ব্যানার আবার দেখাতে ব্রাউজারে এই সাইটের সংরক্ষিত site data মুছে পেজ রিলোড করুন।"
        ]
      },
      {
        heading: "৭. থার্ড-পার্টি সেবা",
        paragraphs: ["নিম্নলিখিত থার্ড-পার্টিরা সাইট ভিজিটের সময় সীমিত টেকনিক্যাল ডেটা পেতে পারে:"],
        bullets: [
          "Google Analytics 4 — anonymous page-view এবং tool-usage analytics (measurement ID G-NJB6S9E9N3)।",
          "Google AdSense — বিজ্ঞাপন ডেলিভারি ও মাপ (publisher ID ca-pub-5216241068377334)।",
          "Google Fonts — ওয়েব ফন্ট ডেলিভারি (শুধু আপনার IP ঠিকানা Google-এর সার্ভারে যায়)।",
          "Cloudflare — CDN, সিকিউরিটি ও পারফরম্যান্স (সব ট্রাফিক Cloudflare edge দিয়ে যায়)।"
        ]
      },
      {
        heading: "৮. Cookies ও অনুরূপ টেকনোলজি",
        paragraphs: ["আমরা নিম্নলিখিত ধরনের cookies ও ব্রাউজার স্টোরেজ ব্যবহার করি:"],
        bullets: [
          "Essential — সাইট কাজ করার জন্য প্রয়োজন (কনসেন্ট পছন্দ, থিম, ভাষা)।",
          "Analytics — Google Analytics 4-এর মাধ্যমে anonymous usage statistics (শুধু আপনার সম্মতির পরে)।",
          "বিজ্ঞাপন — সম্মতির সংকেত, পণ্যের সেটিংস ও প্রযোজ্য আইন অনুযায়ী Google AdSense-এর বিজ্ঞাপন প্রদর্শন ও পরিমাপ।"
        ]
      },
      {
        heading: "৯. শিশুদের প্রাইভেসি",
        paragraphs: ["AHADEX Tools সাধারণ দর্শকদের জন্য উপযোগী। আমরা কারো কাছ থেকে, বিশেষ করে ১৩ বছরের কম শিশুদের কাছ থেকে, সচেতনভাবে ব্যক্তিগত তথ্য সংগ্রহ করি না।"]
      },
      {
        heading: "১০. আপনার অধিকার",
        paragraphs: [
          "আপনার আমাদের কাছে থাকা যেকোনো ব্যক্তিগত ডেটা দেখতে, সংশোধন করতে বা মুছতে বলার অধিকার আছে। বাস্তবে আমরা প্রায় কোনো ব্যক্তিগত ডেটা রাখি না — শুধু contact form-এ যা পাঠান।",
          `এই অধিকার প্রয়োগ করতে ${CONTACT}-এ ইমেইল করুন।`
        ]
      },
      {
        heading: "১১. পলিসি পরিবর্তন",
        paragraphs: ["আমরা সময়ে সময়ে এই পলিসি আপডেট করতে পারি। সর্বশেষ সংস্করণ এই পেজে থাকবে, উপরে 'সর্বশেষ আপডেট' তারিখ সহ।"]
      },
      {
        heading: "১২. যোগাযোগ",
        paragraphs: [`প্রাইভেসি নিয়ে প্রশ্ন? ${CONTACT}-এ ইমেইল করুন। ৪৮ ঘণ্টার মধ্যে উত্তর দেওয়ার চেষ্টা করি।`]
      }
    ]
  }
};

export default function PrivacyPage() {
  const { language } = useLanguage();
  return <TrustPageLayout content={PRIVACY_CONTENT[language]} icon="shield" />;
}

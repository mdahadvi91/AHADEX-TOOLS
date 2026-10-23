import { TrustPageLayout } from "@components/trust/TrustPageLayout";
import { useLanguage } from "@contexts/LanguageContext";

const CONTACT = "mdahadvi91@gmail.com";
const UPDATED_EN = "Last updated: October 2026";
const UPDATED_BN = "সর্বশেষ আপডেট: অক্টোবর ২০২৬";

export const COOKIE_CONTENT = {
  en: {
    eyebrow: "Cookie Policy",
    title: "How we use cookies.",
    subtitle: "The minimum needed to make the site work. Nothing more, nothing shady.",
    lastUpdated: UPDATED_EN,
    contactEmail: CONTACT,
    sections: [
      { 
        heading: "1. What are cookies?", 
        paragraphs: ["Cookies are small text files stored on your device by websites you visit. They help sites remember your preferences and understand how you use them."] 
      },
      { 
        heading: "2. Cookies we use", 
        bullets: [
          "Essential: None. AHADEX Tools does not require cookies to function — we use localStorage instead.",
          "Preferences: Stored in localStorage (theme, language, favourites, sound setting). These are stored only in your browser.",
          "Analytics: Google Analytics 4 may set cookies to measure anonymous usage. You can block these without affecting the tools.",
          "Advertising: Google AdSense may set cookies to serve relevant ads. You can opt out via your Google Ads Settings."
        ] 
      },
      { 
        heading: "3. Managing cookies", 
        paragraphs: [
          "You can clear or block cookies from your browser settings at any time. Doing so will not affect the core functionality of any tool.",
          "To opt out of personalised ads from Google, visit: https://adssettings.google.com"
        ] 
      },
      { 
        heading: "4. Local storage", 
        paragraphs: ["We primarily use localStorage (a modern alternative to cookies) to remember your theme, language, and preferences. Like cookies, this data stays entirely on your device."] 
      },
      { 
        heading: "5. Contact", 
        paragraphs: [`Questions about cookies or this policy? Email us at ${CONTACT}.`] 
      }
    ]
  },
  bn: {
    eyebrow: "কুকি পলিসি",
    title: "আমরা কীভাবে কুকি ব্যবহার করি।",
    subtitle: "সাইট চালানোর জন্য যতটুকু দরকার, ঠিক ততটুকু। এর বেশি নয়।",
    lastUpdated: UPDATED_BN,
    contactEmail: CONTACT,
    sections: [
      { 
        heading: "১. কুকি কী?", 
        paragraphs: ["কুকি হলো আপনার ব্রাউজারে সংরক্ষিত ছোট টেক্সট ফাইল। সাইট আপনার পছন্দ মনে রাখতে ও আপনি কীভাবে সাইট ব্যবহার করছেন বুঝতে এগুলো কাজে লাগে।"] 
      },
      { 
        heading: "২. আমরা কোন কুকি ব্যবহার করি", 
        bullets: [
          "Essential: কোনোটিই নয়। AHADEX Tools-এর কুকি ছাড়াই কাজ করে — আমরা localStorage ব্যবহার করি।",
          "Preferences: localStorage-এ সংরক্ষিত (theme, language, favourites, sound)। এগুলো কখনো ব্রাউজার ছাড়ে না।",
          "Analytics: Google Analytics 4 anonymous ব্যবহার মাপতে কুকি সেট করতে পারে। টুল প্রভাবিত না করে block করতে পারেন।",
          "Advertising: Google AdSense প্রাসঙ্গিক ad দেখাতে কুকি সেট করতে পারে। Google Ads Settings থেকে opt out করুন।"
        ] 
      },
      { 
        heading: "৩. কুকি নিয়ন্ত্রণ", 
        paragraphs: [
          "যেকোনো সময় ব্রাউজার সেটিংস থেকে কুকি মুছতে বা ব্লক করতে পারেন। এতে টুলের মূল কাজ প্রভাবিত হবে না।",
          "Google-এর personalised ads থেকে opt out করতে: https://adssettings.google.com"
        ] 
      },
      { 
        heading: "৪. লোকাল স্টোরেজ", 
        paragraphs: ["আমরা মূলত localStorage (কুকির আধুনিক বিকল্প) ব্যবহার করি theme, language ও পছন্দ মনে রাখতে। এগুলো সম্পূর্ণ আপনার ডিভাইসে থাকে।"] 
      },
      { 
        heading: "৫. যোগাযোগ", 
        paragraphs: [`কুকি বা এই পলিসি নিয়ে প্রশ্ন? ${CONTACT}-এ ইমেইল করুন।`] 
      }
    ]
  }
};

export default function CookiePolicyPage() {
  const { language } = useLanguage();
  return <TrustPageLayout content={COOKIE_CONTENT[language]} icon="cookie" />;
}

import { TrustPageLayout } from "@components/trust/TrustPageLayout";
import { useLanguage } from "@contexts/LanguageContext";

const CONTACT = "mdahadvi91@gmail.com";
const UPDATED_EN = "Last updated: October 2026";
const UPDATED_BN = "সর্বশেষ আপডেট: অক্টোবর ২০২৬";

export const ACCESSIBILITY_CONTENT = {
  en: {
    eyebrow: "Accessibility Statement",
    title: "Built for everyone.",
    subtitle: "Our commitment to making AHADEX Tools usable by as many people as possible.",
    lastUpdated: UPDATED_EN,
    contactEmail: CONTACT,
    sections: [
      { 
        heading: "1. Our commitment", 
        paragraphs: ["We believe every tool should work for everyone — regardless of ability, device, or connection speed. We are actively working to make AHADEX Tools meet the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA."] 
      },
      { 
        heading: "2. What we've done", 
        bullets: [
          "Semantic HTML so screen readers can understand the page structure.",
          "Full keyboard navigation — every tool works without a mouse.",
          "Visible focus states on all interactive elements.",
          "ARIA labels and live regions on dynamic content.",
          "Respect for 'prefers-reduced-motion' — animations are reduced or disabled.",
          "Colour contrast tested to meet WCAG AA requirements.",
          "Touch targets at least 44×44 px on mobile.",
          "Tool workspaces sized to avoid horizontal scrolling."
        ] 
      },
      { 
        heading: "3. Known limitations", 
        bullets: [
          "Some decorative animations may still be distracting. If they are, enable 'prefers-reduced-motion' in your operating system.",
          "The Bengali translation is a work in progress.",
          "Complex tools (like PDF rendering) may take longer on older devices."
        ] 
      },
      { 
        heading: "4. Feedback", 
        paragraphs: [
          "If you encounter an accessibility barrier, please let us know. We treat accessibility reports with priority — often fixing them within a few days.",
          `Email: ${CONTACT}`
        ] 
      },
      { 
        heading: "5. Standards", 
        paragraphs: ["We aim to conform to WCAG 2.2 Level AA. Where we don't yet meet a criterion, we document it above under 'Known limitations' and work to close the gap."] 
      },
      { 
        heading: "6. Assistive technology", 
        paragraphs: ["The site has been tested with NVDA (Windows) and VoiceOver (iOS/macOS). If you use another screen reader and find issues, please let us know."] 
      }
    ]
  },
  bn: {
    eyebrow: "অ্যাক্সেসিবিলিটি স্টেটমেন্ট",
    title: "সবার জন্য তৈরি।",
    subtitle: "AHADEX Tools যতটা সম্ভব বেশি মানুষের ব্যবহারযোগ্য করার প্রতিশ্রুতি।",
    lastUpdated: UPDATED_BN,
    contactEmail: CONTACT,
    sections: [
      { 
        heading: "১. আমাদের প্রতিশ্রুতি", 
        paragraphs: ["আমরা বিশ্বাস করি প্রতিটা টুল সবার জন্য কাজ করা উচিত — ক্ষমতা, ডিভাইস বা সংযোগের গতি নির্বিশেষে। আমরা WCAG 2.2 Level AA মেনে চলার চেষ্টা করছি।"] 
      },
      { 
        heading: "২. আমরা যা করেছি", 
        bullets: [
          "Semantic HTML — screen reader পেজের গঠন বুঝতে পারে।",
          "সম্পূর্ণ keyboard navigation — মাউস ছাড়াই সব টুল কাজ করে।",
          "সব interactive element-এ দৃশ্যমান focus state।",
          "Dynamic কনটেন্টে ARIA labels ও live regions।",
          "'prefers-reduced-motion' সম্মান — অ্যানিমেশন কমানো বা বন্ধ।",
          "WCAG AA অনুযায়ী রঙের contrast।",
          "মোবাইলে কমপক্ষে ৪৪×৪৪ px touch target।",
          "Tool workspace আকারে horizontal scroll নেই।"
        ] 
      },
      { 
        heading: "৩. পরিচিত সীমাবদ্ধতা", 
        bullets: [
          "কিছু decorative animation এখনো বিভ্রান্তিকর হতে পারে। চাইলে OS-এ 'prefers-reduced-motion' চালু করুন।",
          "বাংলা অনুবাদ এখনো চলমান।",
          "জটিল টুল (যেমন PDF রেন্ডারিং) পুরনো ডিভাইসে বেশি সময় নিতে পারে।"
        ] 
      },
      { 
        heading: "৪. ফিডব্যাক", 
        paragraphs: [
          "কোনো accessibility বাধা পেলে জানান। আমরা এগুলোকে অগ্রাধিকার দিই — প্রায়ই কয়েক দিনের মধ্যে ঠিক করি।",
          `ইমেইল: ${CONTACT}`
        ] 
      },
      { 
        heading: "৫. স্ট্যান্ডার্ড", 
        paragraphs: ["আমরা WCAG 2.2 Level AA মেনে চলার লক্ষ্য রাখি। যেখানে এখনো পূরণ করা যায়নি, সেখানে 'পরিচিত সীমাবদ্ধতা'-তে জানিয়েছি।"] 
      },
      { 
        heading: "৬. সহায়ক প্রযুক্তি", 
        paragraphs: ["সাইট NVDA (Windows) ও VoiceOver (iOS/macOS) দিয়ে পরীক্ষা করা হয়েছে। অন্য screen reader ব্যবহার করলে সমস্যা পেলে জানান।"] 
      }
    ]
  }
};

export default function AccessibilityPage() {
  const { language } = useLanguage();
  return <TrustPageLayout content={ACCESSIBILITY_CONTENT[language]} icon="access" />;
}

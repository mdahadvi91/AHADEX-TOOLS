import { TrustPageLayout } from "@components/trust/TrustPageLayout";
import { useLanguage } from "@contexts/LanguageContext";

const CONTACT = "mdahadvi91@gmail.com";
const UPDATED_EN = "Last updated: October 2026";
const UPDATED_BN = "সর্বশেষ আপডেট: অক্টোবর ২০২৬";

export const DISCLAIMER_CONTENT = {
  en: {
    eyebrow: "Disclaimer",
    title: "Important information about the tools.",
    subtitle: "What our tools are — and what they aren't. Please read this before relying on any result.",
    lastUpdated: UPDATED_EN,
    contactEmail: CONTACT,
    sections: [
      { 
        heading: "1. General information", 
        paragraphs: ["The tools on AHADEX Tools are provided for general informational and practical use. While we do our best to ensure accuracy, we make no guarantees about the results produced by any tool."] 
      },
      { 
        heading: "2. Not professional advice", 
        paragraphs: [
          "Calculators and information provided by the Service (including BMI, unit conversion, percentage, age, and date difference) are for general reference only.",
          "They are not a substitute for professional advice — medical, legal, financial, or otherwise. Always consult a qualified professional for important decisions."
        ] 
      },
      { 
        heading: "3. File handling", 
        paragraphs: [
          "All processing happens in your browser. We are not responsible for any corruption, loss, or unintended modification of your files.",
          "Always keep a backup of your original files. Never rely on a single tool to preserve critical data."
        ] 
      },
      { 
        heading: "4. Third-party links", 
        paragraphs: ["The Service may contain links to external websites (for example, our GitHub page or sponsor sites). We are not responsible for the content, policies, or practices of those sites."] 
      },
      { 
        heading: "5. Availability", 
        paragraphs: ["We aim to keep the Service online 24/7, but we cannot guarantee uninterrupted access. Downtime may occur for maintenance, updates, or issues outside our control."] 
      },
      { 
        heading: "6. Contact", 
        paragraphs: [`Spotted an error? Email us at ${CONTACT} and we'll fix it as soon as possible.`] 
      }
    ]
  },
  bn: {
    eyebrow: "ডিসক্লেইমার",
    title: "টুল সম্পর্কে গুরুত্বপূর্ণ তথ্য।",
    subtitle: "আমাদের টুল কী — আর কী নয়। যেকোনো ফলাফলের উপর নির্ভর করার আগে পড়ুন।",
    lastUpdated: UPDATED_BN,
    contactEmail: CONTACT,
    sections: [
      { 
        heading: "১. সাধারণ তথ্য", 
        paragraphs: ["AHADEX Tools-এর টুলগুলো সাধারণ তথ্য ও ব্যবহারিক উদ্দেশ্যে দেওয়া। আমরা সঠিকতার সর্বোচ্চ চেষ্টা করি, কিন্তু কোনো টুলের ফলাফলের গ্যারান্টি দিই না।"] 
      },
      { 
        heading: "২. পেশাদার পরামর্শ নয়", 
        paragraphs: [
          "সেবার ক্যালকুলেটর (BMI, unit conversion, percentage, age, date difference) শুধু সাধারণ রেফারেন্সের জন্য।",
          "এগুলো চিকিৎসা, আইন, আর্থিক বা অন্য কোনো পেশাদার পরামর্শের বিকল্প নয়। গুরুত্বপূর্ণ সিদ্ধান্তে যোগ্য পেশাদারের পরামর্শ নিন।"
        ] 
      },
      { 
        heading: "৩. ফাইল হ্যান্ডলিং", 
        paragraphs: [
          "সব প্রসেসিং আপনার ব্রাউজারে হয়। আপনার ফাইলের ক্ষতি, হারানো বা অনিচ্ছাকৃত পরিবর্তনের দায় আমাদের নয়।",
          "সবসময় মূল ফাইলের ব্যাকআপ রাখুন।"
        ] 
      },
      { 
        heading: "৪. থার্ড-পার্টি লিংক", 
        paragraphs: ["সেবায় বাইরের ওয়েবসাইটের লিংক থাকতে পারে (যেমন আমাদের GitHub পেজ)। সেই সাইটগুলোর কনটেন্ট, পলিসি বা প্র্যাকটিসের দায় আমাদের নয়।"] 
      },
      { 
        heading: "৫. উপলব্ধতা", 
        paragraphs: ["আমরা সেবা ২৪/৭ অনলাইন রাখার চেষ্টা করি, কিন্তু নিরবচ্ছিন্ন অ্যাক্সেসের গ্যারান্টি দিই না।"] 
      },
      { 
        heading: "৬. যোগাযোগ", 
        paragraphs: [`ভুল দেখেছেন? ${CONTACT}-এ ইমেইল করুন, দ্রুত ঠিক করব।`] 
      }
    ]
  }
};

export default function DisclaimerPage() {
  const { language } = useLanguage();
  return <TrustPageLayout content={DISCLAIMER_CONTENT[language]} icon="alert" />;
}

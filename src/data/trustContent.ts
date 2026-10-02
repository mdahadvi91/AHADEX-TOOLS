import type { TrustPageContent } from "@components/trust/TrustPageLayout";
import type { Language } from "@/types/common";

const CONTACT = "mdahadvi91@gmail.com";
const UPDATED_EN = "Last updated: October 2025";
const UPDATED_BN = "সর্বশেষ আপডেট: অক্টোবর ২০২৫";

export const trustContent: Record<
  Language,
  {
    privacy: TrustPageContent;
    terms: TrustPageContent;
    disclaimer: TrustPageContent;
    accessibility: TrustPageContent;
    cookie: TrustPageContent;
  }
> = {
  en: {
    privacy: {
      eyebrow: "Privacy Policy",
      title: "Your privacy, protected.",
      subtitle:
        "This page explains what we collect (almost nothing) and what we never touch (almost everything).",
      lastUpdated: UPDATED_EN,
      contactEmail: CONTACT,
      sections: [
        {
          heading: "1. The short version",
          paragraphs: [
            "AHADEX Tools is designed to be privacy-first. The tools run entirely in your browser. Your files — images, PDFs, text, and any other content — are never uploaded to our servers, never stored, and never analysed.",
            "The only data we collect is anonymous analytics (page views, tool opens) and whatever is needed to serve advertising. You don't need to create an account, and we don't ask for personal information.",
          ],
        },
        {
          heading: "2. What we do NOT collect",
          bullets: [
            "The contents of any file you use with our tools.",
            "Your name, email, or phone number (unless you contact us directly).",
            "Your exact location.",
            "Payment information — we don't process payments.",
            "Passwords you generate or enter in any tool.",
          ],
        },
        {
          heading: "3. Local storage",
          paragraphs: [
            "We store a few small preferences in your browser's local storage:",
          ],
          bullets: [
            "Your preferred theme (light, dark, or system).",
            "Your preferred language (English or Bengali).",
            "Which tools you've marked as favourites.",
            "Whether sound effects are enabled.",
          ],
        },
        {
          heading: "4. Analytics",
          paragraphs: [
            "We use Google Analytics 4 to understand which pages are popular and how the site is being used. Analytics data is aggregated and anonymous. We do not send the contents of any file or text you enter into a tool.",
            "If you prefer, you can block analytics with any modern ad blocker or browser privacy extension. The tools will continue to work normally.",
          ],
        },
        {
          heading: "5. Advertising",
          paragraphs: [
            "The site may display advertising served by Google AdSense and its partners. These ads help keep AHADEX Tools free for everyone.",
            "Google may use cookies to serve ads based on your prior visits to this and other websites. You can opt out of personalised advertising in your Google Ads Settings.",
            "We do not place ads on top of tool workspaces, download buttons, or anywhere that would confuse the user about what is an ad and what is a tool.",
          ],
        },
        {
          heading: "6. Third-party services",
          paragraphs: [
            "Aside from Google Analytics and Google AdSense, we do not use any third-party services that receive your data. Fonts are loaded from Google Fonts. If you prefer, you can block them — the site will still work, using system fonts.",
          ],
        },
        {
          heading: "7. Children's privacy",
          paragraphs: [
            "AHADEX Tools is suitable for general audiences. We do not knowingly collect personal information from anyone, including children under 13. If you believe a child has submitted personal information to us (for example, via the contact form), please email us and we'll delete it.",
          ],
        },
        {
          heading: "8. Your rights",
          paragraphs: [
            "You have the right to request access to any personal data we hold about you, to correct it, or to have it deleted. In practice, we hold almost no personal data — only what you send us through the contact form.",
            `To exercise any of these rights, email us at ${CONTACT}.`,
          ],
        },
        {
          heading: "9. Changes to this policy",
          paragraphs: [
            "We may update this policy from time to time. The latest version will always be available on this page, with the 'Last updated' date at the top. Significant changes will be highlighted on the homepage.",
          ],
        },
        {
          heading: "10. Contact",
          paragraphs: [
            `Questions about privacy? Email us at ${CONTACT}. We aim to respond within 48 hours.`,
          ],
        },
      ],
    },
    terms: {
      eyebrow: "Terms of Service",
      title: "The rules for using AHADEX Tools.",
      subtitle:
        "Plain-language terms that explain what you can expect from us, and what we expect from you.",
      lastUpdated: UPDATED_EN,
      contactEmail: CONTACT,
      sections: [
        {
          heading: "1. Acceptance",
          paragraphs: [
            "By using AHADEX Tools ('the Service'), you agree to these Terms of Service. If you do not agree, please do not use the Service.",
          ],
        },
        {
          heading: "2. What the Service is",
          paragraphs: [
            "AHADEX Tools provides free, browser-based utilities for working with images, PDFs, text, QR codes, and other everyday tasks. All processing runs on your device.",
            "The Service is provided 'as-is' and 'as-available'. We do not guarantee that any specific tool will always be available, error-free, or produce a specific result.",
          ],
        },
        {
          heading: "3. Acceptable use",
          bullets: [
            "Do not use the Service for anything illegal or harmful.",
            "Do not process content you don't have the rights to.",
            "Do not attempt to overload, scrape, or attack the Service.",
            "Do not remove or hide advertisements or copyright notices.",
            "Do not use automated scripts to abuse the Service.",
          ],
        },
        {
          heading: "4. Your content",
          paragraphs: [
            "Because every tool runs in your browser, we never receive your files or text. You retain full ownership of everything you process with the Service. We claim no rights over your content.",
          ],
        },
        {
          heading: "5. Intellectual property",
          paragraphs: [
            "The AHADEX Tools name, logo, website design, and underlying code are owned by AHADEX. You may not copy, redistribute, or create derivative works without permission.",
            "Outputs you create with the tools (converted images, generated QR codes, formatted text) belong entirely to you.",
          ],
        },
        {
          heading: "6. No warranty",
          paragraphs: [
            "The Service is provided without any warranty, express or implied. We do not guarantee accuracy of calculations, suitability for any particular purpose, or uninterrupted availability.",
            "Always keep backups of important files. Use the Service at your own risk.",
          ],
        },
        {
          heading: "7. Limitation of liability",
          paragraphs: [
            "To the maximum extent permitted by law, AHADEX is not liable for any direct, indirect, incidental, or consequential damages arising from your use of the Service.",
          ],
        },
        {
          heading: "8. Advertising",
          paragraphs: [
            "The Service may display advertising to help cover hosting and development costs. Ads are labelled and never disguised as tool features or navigation.",
          ],
        },
        {
          heading: "9. Changes",
          paragraphs: [
            "We may update these terms at any time. Continued use of the Service after changes means you accept the updated terms.",
          ],
        },
        {
          heading: "10. Contact",
          paragraphs: [
            `Questions about these terms? Email us at ${CONTACT}.`,
          ],
        },
      ],
    },
    disclaimer: {
      eyebrow: "Disclaimer",
      title: "Important information about the tools.",
      subtitle:
        "What our tools are — and what they aren't. Please read this before relying on any result.",
      lastUpdated: UPDATED_EN,
      contactEmail: CONTACT,
      sections: [
        {
          heading: "1. General information",
          paragraphs: [
            "The tools on AHADEX Tools are provided for general informational and practical use. While we do our best to ensure accuracy, we make no guarantees about the results produced by any tool.",
          ],
        },
        {
          heading: "2. Not professional advice",
          paragraphs: [
            "Calculators and information provided by the Service (including BMI, unit conversion, percentage, age, and date difference) are for general reference only.",
            "They are not a substitute for professional advice — medical, legal, financial, or otherwise. Always consult a qualified professional for important decisions.",
          ],
        },
        {
          heading: "3. File handling",
          paragraphs: [
            "All processing happens in your browser. We are not responsible for any corruption, loss, or unintended modification of your files.",
            "Always keep a backup of your original files. Never rely on a single tool to preserve critical data.",
          ],
        },
        {
          heading: "4. Third-party links",
          paragraphs: [
            "The Service may contain links to external websites (for example, our GitHub page or sponsor sites). We are not responsible for the content, policies, or practices of those sites.",
          ],
        },
        {
          heading: "5. Availability",
          paragraphs: [
            "We aim to keep the Service online 24/7, but we cannot guarantee uninterrupted access. Downtime may occur for maintenance, updates, or issues outside our control.",
          ],
        },
        {
          heading: "6. Contact",
          paragraphs: [
            `Spotted an error? Email us at ${CONTACT} and we'll fix it as soon as possible.`,
          ],
        },
      ],
    },
    accessibility: {
      eyebrow: "Accessibility Statement",
      title: "Built for everyone.",
      subtitle:
        "Our commitment to making AHADEX Tools usable by as many people as possible.",
      lastUpdated: UPDATED_EN,
      contactEmail: CONTACT,
      sections: [
        {
          heading: "1. Our commitment",
          paragraphs: [
            "We believe every tool should work for everyone — regardless of ability, device, or connection speed. We are actively working to make AHADEX Tools meet the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA.",
          ],
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
            "Tool workspaces sized to avoid horizontal scrolling.",
          ],
        },
        {
          heading: "3. Known limitations",
          bullets: [
            "Some decorative animations may still be distracting. If they are, enable 'prefers-reduced-motion' in your operating system.",
            "The Bengali translation is a work in progress.",
            "Complex tools (like Background Remover) may take longer on older devices.",
          ],
        },
        {
          heading: "4. Feedback",
          paragraphs: [
            "If you encounter an accessibility barrier, please let us know. We treat accessibility reports with priority — often fixing them within a few days.",
            `Email: ${CONTACT}`,
          ],
        },
        {
          heading: "5. Standards",
          paragraphs: [
            "We aim to conform to WCAG 2.2 Level AA. Where we don't yet meet a criterion, we document it above under 'Known limitations' and work to close the gap.",
          ],
        },
        {
          heading: "6. Assistive technology",
          paragraphs: [
            "The site has been tested with NVDA (Windows) and VoiceOver (iOS/macOS). If you use another screen reader and find issues, please let us know.",
          ],
        },
      ],
    },
    cookie: {
      eyebrow: "Cookie Policy",
      title: "How we use cookies.",
      subtitle:
        "The minimum needed to make the site work. Nothing more, nothing shady.",
      lastUpdated: UPDATED_EN,
      contactEmail: CONTACT,
      sections: [
        {
          heading: "1. What are cookies?",
          paragraphs: [
            "Cookies are small text files stored on your device by websites you visit. They help sites remember your preferences and understand how you use them.",
          ],
        },
        {
          heading: "2. Cookies we use",
          bullets: [
            "Essential: None. AHADEX Tools does not require cookies to function — we use localStorage instead.",
            "Preferences: Stored in localStorage (theme, language, favourites, sound setting). These never leave your browser.",
            "Analytics: Google Analytics 4 may set cookies to measure anonymous usage. You can block these without affecting the tools.",
            "Advertising: Google AdSense may set cookies to serve relevant ads. You can opt out via your Google Ads Settings.",
          ],
        },
        {
          heading: "3. Managing cookies",
          paragraphs: [
            "You can clear or block cookies from your browser settings at any time. Doing so will not affect the core functionality of any tool.",
            "To opt out of personalised ads from Google, visit: https://adssettings.google.com",
          ],
        },
        {
          heading: "4. Local storage",
          paragraphs: [
            "We primarily use localStorage (a modern alternative to cookies) to remember your theme, language, and preferences. Like cookies, this data stays entirely on your device.",
          ],
        },
        {
          heading: "5. Contact",
          paragraphs: [
            `Questions about cookies or this policy? Email us at ${CONTACT}.`,
          ],
        },
      ],
    },
  },

  bn: {
    privacy: {
      eyebrow: "প্রাইভেসি পলিসি",
      title: "আপনার প্রাইভেসি, সুরক্ষিত।",
      subtitle:
        "এই পেজে ব্যাখ্যা করা হয়েছে আমরা কী সংগ্রহ করি (প্রায় কিছুই না) এবং কী স্পর্শ করি না (প্রায় সবকিছু)।",
      lastUpdated: UPDATED_BN,
      contactEmail: CONTACT,
      sections: [
        {
          heading: "১. সংক্ষিপ্ত সংস্করণ",
          paragraphs: [
            "AHADEX Tools প্রাইভেসি-প্রথম দর্শনে ডিজাইন করা। টুলগুলো সম্পূর্ণ আপনার ব্রাউজারে চলে। আপনার ফাইল — ছবি, PDF, টেক্সট, বা অন্য যেকোনো কনটেন্ট — কখনো আমাদের সার্ভারে আপলোড হয় না, সংরক্ষণ হয় না, বিশ্লেষণ হয় না।",
            "আমরা শুধু anonymous analytics (পেজ ভিউ, টুল ওপেন) ও বিজ্ঞাপনের জন্য যা প্রয়োজন তা সংগ্রহ করি। আপনাকে অ্যাকাউন্ট খুলতে হবে না, আমরা ব্যক্তিগত তথ্য চাই না।",
          ],
        },
        {
          heading: "২. আমরা যা সংগ্রহ করি না",
          bullets: [
            "আপনার কোনো ফাইলের কনটেন্ট।",
            "আপনার নাম, ইমেইল, বা ফোন নম্বর (সরাসরি যোগাযোগ না করলে)।",
            "আপনার সঠিক অবস্থান।",
            "পেমেন্ট তথ্য — আমরা পেমেন্ট প্রসেস করি না।",
            "আপনি যেসব পাসওয়ার্ড তৈরি বা ব্যবহার করেন।",
          ],
        },
        {
          heading: "৩. লোকাল স্টোরেজ",
          paragraphs: [
            "আমরা আপনার ব্রাউজারের local storage-এ কয়েকটি ছোট পছন্দ সংরক্ষণ করি:",
          ],
          bullets: [
            "আপনার পছন্দের থিম (light, dark, বা system)।",
            "আপনার পছন্দের ভাষা (English বা বাংলা)।",
            "কোন টুলগুলো আপনি পছন্দে যোগ করেছেন।",
            "সাউন্ড ইফেক্ট চালু আছে কিনা।",
          ],
        },
        {
          heading: "৪. অ্যানালিটিক্স",
          paragraphs: [
            "কোন পেজ জনপ্রিয় এবং সাইট কীভাবে ব্যবহৃত হয় বুঝতে আমরা Google Analytics 4 ব্যবহার করি। ডেটা aggregated ও anonymous। আমরা টুলে আপনার ফাইল বা টেক্সটের কনটেন্ট পাঠাই না।",
            "আপনি চাইলে যেকোনো আধুনিক ad blocker বা browser privacy extension দিয়ে analytics ব্লক করতে পারেন। টুলগুলো স্বাভাবিকভাবে কাজ করবে।",
          ],
        },
        {
          heading: "৫. বিজ্ঞাপন",
          paragraphs: [
            "সাইটে Google AdSense ও তার পার্টনারদের বিজ্ঞাপন দেখানো হতে পারে। এগুলো AHADEX Tools ফ্রি রাখতে সাহায্য করে।",
            "Google আপনার আগের ভিজিটের ভিত্তিতে ad serve করতে cookie ব্যবহার করতে পারে। আপনি Google Ads Settings থেকে personalised ads বন্ধ করতে পারেন।",
            "আমরা টুল workspace, download button, বা বিভ্রান্তিকর কোথাও ad বসাই না।",
          ],
        },
        {
          heading: "৬. থার্ড-পার্টি সেবা",
          paragraphs: [
            "Google Analytics ও Google AdSense ছাড়া আপনার ডেটা পাওয়ার মতো কোনো থার্ড-পার্টি সেবা আমরা ব্যবহার করি না। ফন্ট Google Fonts থেকে লোড হয়। চাইলে block করুন — সাইট system font দিয়ে চলবে।",
          ],
        },
        {
          heading: "৭. শিশুদের প্রাইভেসি",
          paragraphs: [
            "AHADEX Tools সাধারণ দর্শকদের জন্য উপযোগী। আমরা কারো কাছ থেকে, বিশেষ করে ১৩ বছরের কম শিশুদের কাছ থেকে, সচেতনভাবে ব্যক্তিগত তথ্য সংগ্রহ করি না।",
          ],
        },
        {
          heading: "৮. আপনার অধিকার",
          paragraphs: [
            "আপনার আমাদের কাছে থাকা যেকোনো ব্যক্তিগত ডেটা দেখতে, সংশোধন করতে বা মুছতে বলার অধিকার আছে। বাস্তবে আমরা প্রায় কোনো ব্যক্তিগত ডেটা রাখি না — শুধু contact form-এ যা পাঠান।",
            `এই অধিকার প্রয়োগ করতে ${CONTACT}-এ ইমেইল করুন।`,
          ],
        },
        {
          heading: "৯. পলিসি পরিবর্তন",
          paragraphs: [
            "আমরা সময়ে সময়ে এই পলিসি আপডেট করতে পারি। সর্বশেষ সংস্করণ এই পেজে থাকবে, উপরে 'সর্বশেষ আপডেট' তারিখ সহ।",
          ],
        },
        {
          heading: "১০. যোগাযোগ",
          paragraphs: [
            `প্রাইভেসি নিয়ে প্রশ্ন? ${CONTACT}-এ ইমেইল করুন। ৪৮ ঘণ্টার মধ্যে উত্তর দেওয়ার চেষ্টা করি।`,
          ],
        },
      ],
    },
    terms: {
      eyebrow: "শর্তাবলী",
      title: "AHADEX Tools ব্যবহারের নিয়ম।",
      subtitle:
        "সহজ ভাষায় শর্তাবলী যা ব্যাখ্যা করে আমাদের কাছ থেকে আপনি কী আশা করতে পারেন, আর আপনার কাছ থেকে আমরা কী আশা করি।",
      lastUpdated: UPDATED_BN,
      contactEmail: CONTACT,
      sections: [
        {
          heading: "১. সম্মতি",
          paragraphs: [
            "AHADEX Tools ('সেবা') ব্যবহার করে আপনি এই শর্তাবলীতে সম্মত হচ্ছেন। যদি সম্মত না হন, সেবা ব্যবহার করবেন না।",
          ],
        },
        {
          heading: "২. সেবা কী",
          paragraphs: [
            "AHADEX Tools ফ্রি, ব্রাউজার-ভিত্তিক utility দেয় — ছবি, PDF, টেক্সট, QR কোড ও অন্যান্য প্রতিদিনের কাজের জন্য। সব প্রসেসিং আপনার ডিভাইসেই চলে।",
            "সেবা 'as-is' ও 'as-available' হিসেবে দেওয়া হয়। আমরা গ্যারান্টি দিই না যে কোনো নির্দিষ্ট টুল সবসময় উপলব্ধ, error-free, বা নির্দিষ্ট ফলাফল দেবে।",
          ],
        },
        {
          heading: "৩. গ্রহণযোগ্য ব্যবহার",
          bullets: [
            "বেআইনি বা ক্ষতিকর কাজে সেবা ব্যবহার করবেন না।",
            "যে কনটেন্টের অধিকার নেই তা প্রসেস করবেন না।",
            "সেবা overload, scrape বা attack করার চেষ্টা করবেন না।",
            "বিজ্ঞাপন বা copyright notice সরাবেন না।",
            "স্বয়ংক্রিয় স্ক্রিপ্ট দিয়ে সেবার অপব্যবহার করবেন না।",
          ],
        },
        {
          heading: "৪. আপনার কনটেন্ট",
          paragraphs: [
            "প্রতিটা টুল আপনার ব্রাউজারে চলার কারণে আমরা আপনার ফাইল বা টেক্সট পাই না। আপনি আপনার সব কনটেন্টের পূর্ণ মালিকানা রাখেন।",
          ],
        },
        {
          heading: "৫. বৌদ্ধিক সম্পত্তি",
          paragraphs: [
            "AHADEX Tools-এর নাম, লোগো, ওয়েবসাইট ডিজাইন ও কোড AHADEX-এর মালিকানাধীন। অনুমতি ছাড়া copy, redistribute বা derivative কাজ করা যাবে না।",
            "টুল দিয়ে আপনি যা তৈরি করেন (রূপান্তরিত ছবি, QR কোড, formatted text) সম্পূর্ণ আপনার।",
          ],
        },
        {
          heading: "৬. কোনো ওয়ারেন্টি নেই",
          paragraphs: [
            "সেবা কোনো ওয়ারেন্টি ছাড়াই দেওয়া হয়। আমরা হিসাবের সঠিকতা, নির্দিষ্ট উদ্দেশ্যে উপযুক্ততা, বা নিরবচ্ছিন্ন উপলব্ধতার গ্যারান্টি দিই না।",
            "গুরুত্বপূর্ণ ফাইলের ব্যাকআপ রাখুন। নিজের ঝুঁকিতে সেবা ব্যবহার করুন।",
          ],
        },
        {
          heading: "৭. দায় সীমাবদ্ধতা",
          paragraphs: [
            "আইন যতটা অনুমতি দেয়, AHADEX সেবা ব্যবহারে সৃষ্ট কোনো প্রত্যক্ষ, পরোক্ষ, আকস্মিক বা ফলস্বরূপ ক্ষতির জন্য দায়ী নয়।",
          ],
        },
        {
          heading: "৮. বিজ্ঞাপন",
          paragraphs: [
            "হোস্টিং ও ডেভেলপমেন্ট খরচ কভার করতে সেবা বিজ্ঞাপন দেখাতে পারে। বিজ্ঞাপন লেবেলযুক্ত এবং কখনো টুল ফিচার বা navigation হিসেবে দেখানো হয় না।",
          ],
        },
        {
          heading: "৯. পরিবর্তন",
          paragraphs: [
            "আমরা সময়ে সময়ে এই শর্তাবলী আপডেট করতে পারি। পরিবর্তনের পর সেবা ব্যবহার মানে আপনি আপডেট করা শর্তাবলী গ্রহণ করেন।",
          ],
        },
        {
          heading: "১০. যোগাযোগ",
          paragraphs: [
            `এই শর্তাবলী নিয়ে প্রশ্ন? ${CONTACT}-এ ইমেইল করুন।`,
          ],
        },
      ],
    },
    disclaimer: {
      eyebrow: "ডিসক্লেইমার",
      title: "টুল সম্পর্কে গুরুত্বপূর্ণ তথ্য।",
      subtitle:
        "আমাদের টুল কী — আর কী নয়। যেকোনো ফলাফলের উপর নির্ভর করার আগে পড়ুন।",
      lastUpdated: UPDATED_BN,
      contactEmail: CONTACT,
      sections: [
        {
          heading: "১. সাধারণ তথ্য",
          paragraphs: [
            "AHADEX Tools-এর টুলগুলো সাধারণ তথ্য ও ব্যবহারিক উদ্দেশ্যে দেওয়া। আমরা সঠিকতার সর্বোচ্চ চেষ্টা করি, কিন্তু কোনো টুলের ফলাফলের গ্যারান্টি দিই না।",
          ],
        },
        {
          heading: "২. পেশাদার পরামর্শ নয়",
          paragraphs: [
            "সেবার ক্যালকুলেটর (BMI, unit conversion, percentage, age, date difference) শুধু সাধারণ রেফারেন্সের জন্য।",
            "এগুলো চিকিৎসা, আইন, আর্থিক বা অন্য কোনো পেশাদার পরামর্শের বিকল্প নয়। গুরুত্বপূর্ণ সিদ্ধান্তে যোগ্য পেশাদারের পরামর্শ নিন।",
          ],
        },
        {
          heading: "৩. ফাইল হ্যান্ডলিং",
          paragraphs: [
            "সব প্রসেসিং আপনার ব্রাউজারে হয়। আপনার ফাইলের ক্ষতি, হারানো বা অনিচ্ছাকৃত পরিবর্তনের দায় আমাদের নয়।",
            "সবসময় মূল ফাইলের ব্যাকআপ রাখুন।",
          ],
        },
        {
          heading: "৪. থার্ড-পার্টি লিংক",
          paragraphs: [
            "সেবায় বাইরের ওয়েবসাইটের লিংক থাকতে পারে (যেমন আমাদের GitHub পেজ)। সেই সাইটগুলোর কনটেন্ট, পলিসি বা প্র্যাকটিসের দায় আমাদের নয়।",
          ],
        },
        {
          heading: "৫. উপলব্ধতা",
          paragraphs: [
            "আমরা সেবা ২৪/৭ অনলাইন রাখার চেষ্টা করি, কিন্তু নিরবচ্ছিন্ন অ্যাক্সেসের গ্যারান্টি দিই না।",
          ],
        },
        {
          heading: "৬. যোগাযোগ",
          paragraphs: [
            `ভুল দেখেছেন? ${CONTACT}-এ ইমেইল করুন, দ্রুত ঠিক করব।`,
          ],
        },
      ],
    },
    accessibility: {
      eyebrow: "অ্যাক্সেসিবিলিটি স্টেটমেন্ট",
      title: "সবার জন্য তৈরি।",
      subtitle:
        "AHADEX Tools যতটা সম্ভব বেশি মানুষের ব্যবহারযোগ্য করার প্রতিশ্রুতি।",
      lastUpdated: UPDATED_BN,
      contactEmail: CONTACT,
      sections: [
        {
          heading: "১. আমাদের প্রতিশ্রুতি",
          paragraphs: [
            "আমরা বিশ্বাস করি প্রতিটা টুল সবার জন্য কাজ করা উচিত — ক্ষমতা, ডিভাইস বা সংযোগের গতি নির্বিশেষে। আমরা WCAG 2.2 Level AA মেনে চলার চেষ্টা করছি।",
          ],
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
            "Tool workspace আকারে horizontal scroll নেই।",
          ],
        },
        {
          heading: "৩. পরিচিত সীমাবদ্ধতা",
          bullets: [
            "কিছু decorative animation এখনো বিভ্রান্তিকর হতে পারে। চাইলে OS-এ 'prefers-reduced-motion' চালু করুন।",
            "বাংলা অনুবাদ এখনো চলমান।",
            "জটিল টুল (Background Remover) পুরনো ডিভাইসে বেশি সময় নিতে পারে।",
          ],
        },
        {
          heading: "৪. ফিডব্যাক",
          paragraphs: [
            "কোনো accessibility বাধা পেলে জানান। আমরা এগুলোকে অগ্রাধিকার দিই — প্রায়ই কয়েক দিনের মধ্যে ঠিক করি।",
            `ইমেইল: ${CONTACT}`,
          ],
        },
        {
          heading: "৫. স্ট্যান্ডার্ড",
          paragraphs: [
            "আমরা WCAG 2.2 Level AA মেনে চলার লক্ষ্য রাখি। যেখানে এখনো পূরণ করা যায়নি, সেখানে 'পরিচিত সীমাবদ্ধতা'-তে জানিয়েছি।",
          ],
        },
        {
          heading: "৬. সহায়ক প্রযুক্তি",
          paragraphs: [
            "সাইট NVDA (Windows) ও VoiceOver (iOS/macOS) দিয়ে পরীক্ষা করা হয়েছে। অন্য screen reader ব্যবহার করলে সমস্যা পেলে জানান।",
          ],
        },
      ],
    },
    cookie: {
      eyebrow: "কুকি পলিসি",
      title: "আমরা কীভাবে কুকি ব্যবহার করি।",
      subtitle:
        "সাইট চালানোর জন্য যতটুকু দরকার, ঠিক ততটুকু। এর বেশি নয়।",
      lastUpdated: UPDATED_BN,
      contactEmail: CONTACT,
      sections: [
        {
          heading: "১. কুকি কী?",
          paragraphs: [
            "কুকি হলো আপনার ব্রাউজারে সংরক্ষিত ছোট টেক্সট ফাইল। সাইট আপনার পছন্দ মনে রাখতে ও আপনি কীভাবে সাইট ব্যবহার করছেন বুঝতে এগুলো কাজে লাগে।",
          ],
        },
        {
          heading: "২. আমরা কোন কুকি ব্যবহার করি",
          bullets: [
            "Essential: কোনোটিই নয়। AHADEX Tools-এর কুকি ছাড়াই কাজ করে — আমরা localStorage ব্যবহার করি।",
            "Preferences: localStorage-এ সংরক্ষিত (theme, language, favourites, sound)। এগুলো কখনো ব্রাউজার ছাড়ে না।",
            "Analytics: Google Analytics 4 anonymous ব্যবহার মাপতে কুকি সেট করতে পারে। টুল প্রভাবিত না করে block করতে পারেন।",
            "Advertising: Google AdSense প্রাসঙ্গিক ad দেখাতে কুকি সেট করতে পারে। Google Ads Settings থেকে opt out করুন।",
          ],
        },
        {
          heading: "৩. কুকি নিয়ন্ত্রণ",
          paragraphs: [
            "যেকোনো সময় ব্রাউজার সেটিংস থেকে কুকি মুছতে বা ব্লক করতে পারেন। এতে টুলের মূল কাজ প্রভাবিত হবে না।",
            "Google-এর personalised ads থেকে opt out করতে: https://adssettings.google.com",
          ],
        },
        {
          heading: "৪. লোকাল স্টোরেজ",
          paragraphs: [
            "আমরা মূলত localStorage (কুকির আধুনিক বিকল্প) ব্যবহার করি theme, language ও পছন্দ মনে রাখতে। এগুলো সম্পূর্ণ আপনার ডিভাইসে থাকে।",
          ],
        },
        {
          heading: "৫. যোগাযোগ",
          paragraphs: [
            `কুকি বা এই পলিসি নিয়ে প্রশ্ন? ${CONTACT}-এ ইমেইল করুন।`,
          ],
        },
      ],
    },
  },
};

/* ============================================================
 * CV Builder — Bilingual content
 * ============================================================ */

export const cvBuilderContent = {
  en: {
    heroTag: "Document Studio",
    heroSubtitle:
      "Build a professional CV in minutes. Choose from hand-crafted templates, fill in your details, and download a print-ready PDF — with selectable text, accurate page breaks, and full browser-side privacy. No account, no uploads, no watermarks.",

    heroStats: [
      { value: "1", label: "Template ready" },
      { value: "A4/Letter", label: "Page sizes" },
      { value: "PDF", label: "Print-ready" },
      { value: "100%", label: "Private" },
    ],

    introHighlights: [
      { emoji: "📄", title: "Real templates", text: "Hand-designed layouts — not screenshot cards." },
      { emoji: "👁️", title: "Live preview", text: "See your CV update as you type." },
      { emoji: "🖨️", title: "True A4 PDF", text: "Selectable text, correct page breaks." },
      { emoji: "💾", title: "Auto-save", text: "Draft recovery if the browser closes." },
      { emoji: "🌐", title: "EN + BN", text: "Bilingual interface and content." },
      { emoji: "🔒", title: "100% private", text: "Nothing leaves your browser. Ever." },
    ],

    introBlocks: [
      {
        emoji: "🪄",
        icon: "sparkle",
        title: "What this tool does",
        text: "The CV Builder turns a blank page into a professional, ATS-friendly resume in under ten minutes. Pick a template, type your details into simple forms, and watch a real A4 layout update live on screen. When you are done, the browser's native print pipeline converts your CV to a PDF with selectable text, correct page breaks, and print-accurate margins — the same file you would hand to a professional printer.",
      },
      {
        emoji: "🖨️",
        icon: "printer",
        title: "Why PDF, not canvas",
        text: "Many online CV tools render your resume as an image, which means ATS software cannot read your job titles, dates, or skills. This builder uses real HTML and CSS — so the exported PDF keeps every letter as selectable, searchable text. Recruiter systems can parse it. You can copy-paste from it. It prints crisply at any size.",
      },
      {
        emoji: "🎯",
        icon: "target",
        title: "Built for real hiring",
        text: "Every layout keeps standard section headings (Summary, Experience, Education, Skills) so ATS parsers recognize them. The single-column ATS Cleanline template deliberately avoids icon-only contact info, decorative bars, and multi-column tricks that break resume parsers. Photos are optional and off by default — most corporate applications do not want them.",
      },
      {
        emoji: "🔐",
        icon: "lock",
        title: "Your data never leaves",
        text: "All form data, live preview, PDF generation, and save/load happen entirely inside your browser. No server sees your personal details. No analytics track your edits. Close the tab and your draft is gone — or recovered from local storage if you come back. That is the only place your CV ever exists unless you explicitly export or print it.",
      },
    ],

    featuresTitle: "Built for real CVs",
    features: [
      { emoji: "📄", title: "Real templates", description: "Hand-designed A4 layouts. Every visual element is code, not an image." },
      { emoji: "👁️", title: "Live preview", description: "Type into a form and the CV updates instantly on the page beside it." },
      { emoji: "🖨️", title: "Selectable-text PDF", description: "Exports through the browser print pipeline. ATS software can read every word." },
      { emoji: "💾", title: "Save and load", description: "Multiple CVs in local storage. Auto-save with draft recovery if the browser closes." },
      { emoji: "🎨", title: "Design control", description: "Accent color, font, font size, section spacing, page margin — all adjustable." },
      { emoji: "🔒", title: "Private by design", description: "No server, no account, no analytics on your content. Everything in-browser." },
    ],

    howToTitle: "How to build your CV",
    howTo: [
      { step: 1, title: "Pick a template", description: "Choose from the gallery. Each preview is rendered from real sample data, so you see exactly what you'll get." },
      { step: 2, title: "Fill in your details", description: "Type your name, contact info, summary, experience, education, skills, and projects into the forms on the left." },
      { step: 3, title: "Design your look", description: "Open the Design tab and adjust accent color, font, spacing, margins, and page size. Everything updates live." },
      { step: 4, title: "Save your work", description: "Click Save to store your CV in the browser. Draft recovery brings your work back if the browser closes." },
      { step: 5, title: "Print or save as PDF", description: "Click Print / Save as PDF. In the dialog choose 'Save as PDF'. The output is A4 or Letter at exact print dimensions." },
    ],

    faqTitle: "Questions people ask",
    faq: [
      { question: "Is this CV Builder really free?", answer: "Yes. Every template, every export format, every design control is available without an account, watermark, or hidden limit." },
      { question: "Do you upload my CV data anywhere?", answer: "No. Everything — forms, preview, PDF export, save/load — runs entirely in your browser. Nothing is sent to any server." },
      { question: "Is the PDF ATS-friendly?", answer: "Yes. The PDF is generated through the browser print pipeline, so text stays selectable. ATS parsers can read your job titles, dates, and skills. The ATS Cleanline template deliberately uses standard headings and no icon-only contact info." },
      { question: "Can I add a photo?", answer: "Yes, in the Design tab. Photos are optional and off by default — most corporate applications prefer no photo." },
      { question: "What page sizes are supported?", answer: "A4 (210 × 297 mm) and US Letter (216 × 279 mm). The PDF matches the exact print dimensions of your chosen size." },
      { question: "Can I have multiple CVs?", answer: "Yes. Saved CVs appear in the Save tab. You can create, duplicate, rename, and delete as many as you want. All stored locally in your browser." },
      { question: "What happens if I close the browser?", answer: "Your current work is auto-saved as a draft. When you return, a banner offers to recover it. Nothing is lost unless you explicitly discard it." },
      { question: "Can I export my CV as JSON?", answer: "Yes. The Save tab has JSON export and import. Useful for backups or moving between devices." },
    ],

    privacyNote:
      "Your CV data — name, contact info, experience, education, everything — is processed entirely inside your browser. Nothing is uploaded, tracked, or stored on any server. The only place your CV exists is in your local browser storage and in the files you explicitly download.",

    relatedTitle: "Other tools you may like",
  },

  bn: {
    heroTag: "ডকুমেন্ট স্টুডিও",
    heroSubtitle:
      "মিনিটেই পেশাদার CV তৈরি করুন। হাতে-ডিজাইন করা টেমপ্লেট থেকে বেছে নিন, আপনার তথ্য লিখুন, এবং প্রিন্ট-রেডি PDF ডাউনলোড করুন — selectable text, সঠিক পেজ ব্রেক এবং সম্পূর্ণ ব্রাউজার-ভিত্তিক প্রাইভেসি সহ। অ্যাকাউন্ট নেই, আপলোড নেই, ওয়াটারমার্ক নেই।",

    heroStats: [
      { value: "১", label: "টেমপ্লেট" },
      { value: "A4/Letter", label: "পেজ সাইজ" },
      { value: "PDF", label: "প্রিন্ট-রেডি" },
      { value: "১০০%", label: "প্রাইভেট" },
    ],

    introHighlights: [
      { emoji: "📄", title: "আসল টেমপ্লেট", text: "হাতে-ডিজাইন করা লেআউট — স্ক্রিনশট নয়।" },
      { emoji: "👁️", title: "লাইভ প্রিভিউ", text: "টাইপ করার সাথে সাথে CV আপডেট।" },
      { emoji: "🖨️", title: "আসল A4 PDF", text: "Selectable text, সঠিক পেজ ব্রেক।" },
      { emoji: "💾", title: "অটো-সেভ", text: "ব্রাউজার বন্ধ হলে ড্রাফট উদ্ধার।" },
      { emoji: "🌐", title: "EN + BN", text: "দুই ভাষায় ইন্টারফেস ও কনটেন্ট।" },
      { emoji: "🔒", title: "১০০% প্রাইভেট", text: "কিছুই ব্রাউজার ছাড়ে না। কখনোই না।" },
    ],

    introBlocks: [
      {
        emoji: "🪄",
        icon: "sparkle",
        title: "এই টুল কী করে",
        text: "CV বিল্ডার দশ মিনিটেরও কম সময়ে একটি খালি পেজকে পেশাদার, ATS-বান্ধব রেজুমে পরিণত করে। একটি টেমপ্লেট বেছে নিন, সহজ ফর্মে আপনার তথ্য লিখুন, আর স্ক্রিনে লাইভ আপডেট হওয়া আসল A4 লেআউট দেখুন। শেষ হলে ব্রাউজারের নেটিভ প্রিন্ট পাইপলাইন আপনার CV-কে selectable text, সঠিক পেজ ব্রেক এবং প্রিন্ট-নির্ভুল মার্জিন সহ PDF-এ পরিণত করে।",
      },
      {
        emoji: "🖨️",
        icon: "printer",
        title: "কেন PDF, ক্যানভাস নয়",
        text: "অনেক অনলাইন CV টুল আপনার রেজুমে একটি ছবি হিসেবে রেন্ডার করে, যার ফলে ATS সফটওয়্যার আপনার পদবি, তারিখ বা স্কিল পড়তে পারে না। এই বিল্ডার আসল HTML ও CSS ব্যবহার করে — তাই এক্সপোর্ট করা PDF-এ প্রতিটি অক্ষর selectable ও searchable থাকে। রিক্রুটার সিস্টেম এটা পার্স করতে পারে।",
      },
      {
        emoji: "🎯",
        icon: "target",
        title: "প্রকৃত নিয়োগের জন্য তৈরি",
        text: "প্রতিটি লেআউটে স্ট্যান্ডার্ড সেকশন হেডিং (Summary, Experience, Education, Skills) থাকে যাতে ATS পার্সার এগুলো চিনতে পারে। সিঙ্গেল-কলাম ATS Cleanline টেমপ্লেট সচেতনভাবে icon-only কনট্যাক্ট, ডেকোরেটিভ বার এবং multi-column কৌশল এড়িয়ে যায় যা রেজুমে পার্সার ভেঙে দেয়।",
      },
      {
        emoji: "🔐",
        icon: "lock",
        title: "আপনার ডেটা কখনো ডিভাইস ছাড়ে না",
        text: "সব ফর্ম ডেটা, লাইভ প্রিভিউ, PDF জেনারেশন এবং সেভ/লোড সম্পূর্ণ আপনার ব্রাউজারেই হয়। কোনো সার্ভার আপনার ব্যক্তিগত তথ্য দেখে না। ট্যাব বন্ধ করুন — আপনার ড্রাফট চলে যায়, অথবা লোকাল স্টোরেজ থেকে উদ্ধার হয়। আপনি নিজে এক্সপোর্ট বা প্রিন্ট না করলে আপনার CV কোথাও যায় না।",
      },
    ],

    featuresTitle: "প্রকৃত CV-র জন্য তৈরি",
    features: [
      { emoji: "📄", title: "আসল টেমপ্লেট", description: "হাতে-ডিজাইন করা A4 লেআউট। প্রতিটি ভিজ্যুয়াল এলিমেন্ট কোড, ছবি নয়।" },
      { emoji: "👁️", title: "লাইভ প্রিভিউ", description: "ফর্মে টাইপ করুন, পাশে সাথে সাথে CV আপডেট।" },
      { emoji: "🖨️", title: "Selectable-text PDF", description: "ব্রাউজার প্রিন্ট পাইপলাইনে এক্সপোর্ট। ATS প্রতি শব্দ পড়তে পারে।" },
      { emoji: "💾", title: "সেভ ও লোড", description: "লোকাল স্টোরেজে একাধিক CV। ব্রাউজার বন্ধ হলে ড্রাফট উদ্ধার।" },
      { emoji: "🎨", title: "ডিজাইন নিয়ন্ত্রণ", description: "অ্যাকসেন্ট রঙ, ফন্ট, সাইজ, স্পেসিং, মার্জিন — সব সমন্বয়যোগ্য।" },
      { emoji: "🔒", title: "প্রাইভেসি বাই ডিজাইন", description: "সার্ভার নেই, অ্যাকাউন্ট নেই, কনটেন্টে অ্যানালিটিক্স নেই।" },
    ],

    howToTitle: "আপনার CV কীভাবে বানাবেন",
    howTo: [
      { step: 1, title: "টেমপ্লেট বেছে নিন", description: "গ্যালারি থেকে বেছে নিন। প্রতিটি প্রিভিউ আসল স্যাম্পল ডেটা দিয়ে রেন্ডার করা, তাই আপনি ঠিক যা পাবেন তা দেখেন।" },
      { step: 2, title: "তথ্য লিখুন", description: "বাম দিকের ফর্মে নাম, কনট্যাক্ট, সারাংশ, অভিজ্ঞতা, শিক্ষা, স্কিল ও প্রজেক্ট লিখুন।" },
      { step: 3, title: "ডিজাইন সাজান", description: "Design ট্যাব খুলে অ্যাকসেন্ট রঙ, ফন্ট, স্পেসিং, মার্জিন ও পেজ সাইজ পরিবর্তন করুন। সব লাইভ আপডেট হয়।" },
      { step: 4, title: "কাজ সেভ করুন", description: "Save-এ ক্লিক করুন ব্রাউজারে CV সংরক্ষণ করতে। ব্রাউজার বন্ধ হলে ড্রাফট উদ্ধার আপনার কাজ ফিরিয়ে দেয়।" },
      { step: 5, title: "প্রিন্ট বা PDF সেভ", description: "Print / Save as PDF চাপুন। ডায়ালগে 'Save as PDF' বেছে নিন। আউটপুট A4 বা Letter — সঠিক প্রিন্ট ডাইমেনশনে।" },
    ],

    faqTitle: "মানুষ যা জিজ্ঞেস করে",
    faq: [
      { question: "এই CV বিল্ডার কি সত্যিই ফ্রি?", answer: "হ্যাঁ। প্রতিটি টেমপ্লেট, প্রতিটি এক্সপোর্ট ফরম্যাট, প্রতিটি ডিজাইন কন্ট্রোল — অ্যাকাউন্ট, ওয়াটারমার্ক বা লুকানো সীমা ছাড়াই।" },
      { question: "আমার CV ডেটা কোথাও আপলোড হয়?", answer: "না। সব — ফর্ম, প্রিভিউ, PDF এক্সপোর্ট, সেভ/লোড — সম্পূর্ণ আপনার ব্রাউজারেই। কোনো সার্ভারে পাঠানো হয় না।" },
      { question: "PDF কি ATS-বান্ধব?", answer: "হ্যাঁ। ব্রাউজার প্রিন্ট পাইপলাইনে PDF তৈরি হয়, তাই টেক্সট selectable থাকে। ATS পার্সার আপনার পদবি, তারিখ ও স্কিল পড়তে পারে।" },
      { question: "ছবি যোগ করতে পারি?", answer: "হ্যাঁ, Design ট্যাবে। ছবি ঐচ্ছিক এবং ডিফল্টভাবে বন্ধ — বেশিরভাগ কর্পোরেট অ্যাপ্লিকেশন ছবি পছন্দ করে না।" },
      { question: "কোন পেজ সাইজ সাপোর্টেড?", answer: "A4 (২১০ × ২৯৭ মিমি) এবং US Letter (২১৬ × ২৭৯ মিমি)। PDF আপনার বেছে নেওয়া সাইজের সঠিক প্রিন্ট ডাইমেনশনে মেলে।" },
      { question: "একাধিক CV রাখতে পারি?", answer: "হ্যাঁ। সেভ করা CV Save ট্যাবে দেখা যায়। আপনি যত চান তৈরি, ডুপ্লিকেট, নাম পরিবর্তন ও ডিলিট করতে পারেন।" },
      { question: "ব্রাউজার বন্ধ করলে কী হয়?", answer: "আপনার বর্তমান কাজ একটি ড্রাফট হিসেবে অটো-সেভ হয়। ফিরে এলে একটি ব্যানার উদ্ধারের প্রস্তাব দেয়।" },
      { question: "CV JSON হিসেবে এক্সপোর্ট করা যায়?", answer: "হ্যাঁ। Save ট্যাবে JSON export ও import আছে। ব্যাকআপ বা ডিভাইস পরিবর্তনের জন্য উপকারী।" },
    ],

    privacyNote:
      "আপনার CV ডেটা — নাম, কনট্যাক্ট, অভিজ্ঞতা, শিক্ষা, সবকিছু — সম্পূর্ণ আপনার ব্রাউজারেই প্রসেস হয়। কোনো কিছু আপলোড, ট্র্যাক বা সার্ভারে সংরক্ষণ করা হয় না। আপনার CV শুধু আপনার লোকাল ব্রাউজার স্টোরেজে এবং আপনি যে ফাইলগুলো ডাউনলোড করেন সেগুলোতে থাকে।",

    relatedTitle: "অন্য যেসব টুল ভালো লাগতে পারে",
  },
};

export type CVBuilderContent = typeof cvBuilderContent;

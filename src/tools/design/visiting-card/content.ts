/* ============================================================
 * Visiting Card — Bilingual Content (Corrected Claims)
 * ============================================================ */

export const visitingCardContent = {
  en: {
    heroTag: "Design Studio",
    heroSubtitle:
      "Design business cards in seconds. 20 premium hand-crafted templates, each with a distinct front and back layout — ready to customize with your logo, contact details, and QR code. Export high-resolution files in PNG, JPG, or PDF.",
    heroStats: [
      { value: "20", label: "Templates" },
      { value: "40", label: "Layouts" },
      { value: "4", label: "Sizes" },
      { value: "Local", label: "Processing" }, 
    ],
    introHighlights: [
      { emoji: "🎨", title: "20 premium templates", text: "Each with unique front + back layouts." },
      { emoji: "👁️", title: "Live preview", text: "Every change reflects in real-time on the canvas." },
      { emoji: "🖨️", title: "High-resolution export", text: "PNG, JPG, PDF at scalable resolutions." },
      { emoji: "🏷️", title: "Custom logo upload", text: "PNG, JPG, WebP, or SVG up to 5 MB." },
      { emoji: "📱", title: "QR code built-in", text: "Every card auto-generates a scannable QR." },
      { emoji: "🔒", title: "Client-side processing", text: "Your data stays in your browser during editing." },
    ],
    introBlocks: [
      {
        emoji: "🪄",
        icon: "sparkle",
        title: "What this tool does",
        text: "The Visiting Card Maker turns a blank canvas into a professional business card in under a minute. Pick one of twenty hand-designed templates from the gallery, click it, and you are immediately dropped into an editor where you can type your details, upload a logo, and download a high-quality file. Every template has two sides — a front for identity and a back for contact details and a QR code — and both are fully editable.",
      },
      {
        emoji: "🎯",
        icon: "target",
        title: "Built for high-quality output",
        text: "Every card is rendered at a baseline of 1050 × 600 pixels. When exporting, the tool scales the canvas to provide higher resolution files. While this is suitable for many standard printing workflows, please note that professional printing may require specific bleed margins, trim lines, or CMYK color profiles, which are not natively handled by standard web browsers.",
      },
      {
        emoji: "🖨️",
        icon: "printer",
        title: "Two sides, one workflow",
        text: "Each template gives you a matching front and back. The front usually holds the logo, brand name, and tagline — the back carries the person's name, title, phone, email, website, location, and a QR code. Both sides render side-by-side in the editor so you can see exactly what the final card will look like.",
      },
      {
        emoji: "🔐",
        icon: "lock",
        title: "Your design stays in your browser",
        text: "There is no server involved in the editing process. Templates, fonts, colors, your uploaded logo, and the QR code are all processed locally in your browser using the HTML5 Canvas API. Closing the tab clears the editing session. (Note: Standard website analytics and ad scripts may still run on the page, but your card data is not uploaded).",
      },
    ],
    howToTitle: "How to make your card",
    howTo: [
      { step: 1, title: "Pick a template", description: "Scroll through 20 hand-designed templates in the gallery. Each card preview shows the front and back side-by-side, so you can judge the whole design before clicking." },
      { step: 2, title: "Enter your details", description: "Type your brand name, tagline, full name, job title, phone, email, website, and location into the fields on the left. The canvas updates in real time." },
      { step: 3, title: "Upload a logo", description: "Drag and drop a PNG, JPG, WebP, or SVG logo — up to 5 MB. The logo scales proportionally and renders in the correct position on the front of the card." },
      { step: 4, title: "Preview and adjust", description: "Both front and back sides render live in the editor. The QR code is generated automatically from your website URL using error-correction level H." },
      { step: 5, title: "Download your card", description: "Choose PNG, JPG, or PDF. Exporting at higher resolution settings provides larger image dimensions, suitable for many common printing workflows. Both sides download as separate files." },
    ],
    featuresTitle: "Built for real cards",
    features: [
      { emoji: "🎨", title: "20 unique templates", description: "Every template is hand-designed — no algorithmic variation. Each has its own front and back layout, palette, and typography." },
      { emoji: "👁️", title: "Real-time preview", description: "Fonts, colors, positions, and your logo all reflect in real-time. You can see exactly what you'll get." },
      { emoji: "🖨️", title: "High-res exports", description: "Export high-resolution PNG, JPG, or PDF files. Always verify with your specific printer for bleed and color profile requirements." },
      { emoji: "📱", title: "QR code included", description: "Every card back has a scannable QR code generated from your website URL. Error-correction level H keeps it readable." },
      { emoji: "🔒", title: "No uploads", description: "Your card data is not sent to a server; the editing process runs locally in your browser via the Canvas API." },
      { emoji: "📐", title: "Standard card sizes", description: "Standard, square, slim, and US sizes are all supported. Every dimension is measured in exact print millimetres." },
    ],
    faqTitle: "Questions people ask",
    faq: [
      { question: "Is the Visiting Card Maker really free?", answer: "Yes — completely. All 20 templates, all export formats, and all resolution options are available without an account, watermark, or hidden limit. The tool is supported by ads shown outside the editor." },
      { question: "Do my files get uploaded to a server?", answer: "No. Every render happens inside your browser using the HTML5 Canvas API. Your logo, text, and design are not uploaded to any server. Closing the tab clears the editing session." },
      { question: "Is this a single-side or double-side tool?", answer: "It's both. Every template has a matching front and back side. The front usually carries the brand identity, the back carries contact details and the QR code. Both sides are fully editable and export as separate files." },
      { question: "Can I upload my own logo?", answer: "Yes. The editor accepts PNG, JPG, WebP, and SVG files up to 5 MB. Uploaded logos render with transparent backgrounds where supported, and they scale proportionally to preserve aspect ratio." },
      { question: "What export formats and resolutions are supported?", answer: "PNG, JPG, and PDF formats are all supported. You can export at different resolution scales (e.g., 150, 300, or higher) to get larger pixel dimensions. Note that these are image resolutions, not embedded print DPI metadata." },
      { question: "Is the QR code on the back actually scannable?", answer: "Yes. Every card back generates a QR code using error-correction level H — the highest standard available — which keeps the code readable even at small sizes or on slightly uneven paper." },
      { question: "Does it work on mobile and tablets?", answer: "The editor is fully responsive. On a phone, the settings and canvas stack side by side; on a tablet or desktop, they sit in a wider layout. Every element is touch-friendly." },
      { question: "Will the exported card actually be print-ready?", answer: "The exported files are high-resolution images or standard PDFs suitable for many home and office printers. However, if you are sending the file to a commercial print shop, they may require specific CMYK color profiles, bleed margins, or trim lines, which you should confirm directly with them." },
    ],
    privacyNote: "Your design is processed entirely inside your browser. No logo, text, or template choice is uploaded to any server. Close the tab and the editing session is gone. Please note that standard website analytics and third-party ad scripts may operate on the page.",
  },
  bn: {
    heroTag: "ডিজাইন স্টুডিও",
    // 🚨 ফিক্স: 'প্রিন্ট-রেডি' শব্দটি সরিয়ে শুধু 'বিজনেস কার্ড' করা হলো
    heroSubtitle: "সেকেন্ডের মধ্যে বিজনেস কার্ড ডিজাইন করুন। ২০টি প্রিমিয়াম হাতে-ডিজাইন করা টেমপ্লেট, প্রতিটি আলাদা সামনে ও পিছনে লেআউট সহ — আপনার লোগো, যোগাযোগের তথ্য ও QR কোড দিয়ে কাস্টমাইজ করতে তৈরি। PNG, JPG বা PDF-এ উচ্চ রেজোলিউশনে এক্সপোর্ট করুন।",
    heroStats: [
      { value: "২০", label: "টেমপ্লেট" },
      { value: "৪০", label: "লেআউট" },
      { value: "৪", label: "সাইজ" },
      { value: "লোকাল", label: "প্রসেসিং" }, 
    ],
    introHighlights: [
      { emoji: "🎨", title: "২০টি প্রিমিয়াম টেমপ্লেট", text: "প্রতিটির আলাদা সামনে ও পিছনে লেআউট।" },
      { emoji: "👁️", title: "লাইভ প্রিভিউ", text: "প্রতিটি পরিবর্তন রিয়েল-টাইমে প্রতিফলিত হয়।" },
      { emoji: "🖨️", title: "উচ্চ রেজোলিউশন এক্সপোর্ট", text: "PNG, JPG, PDF স্কেলেবল রেজোলিউশনে।" },
      { emoji: "🏷️", title: "লোগো আপলোড", text: "PNG, JPG, WebP বা SVG ৫ MB পর্যন্ত।" },
      { emoji: "📱", title: "QR কোড বিল্ট-ইন", text: "প্রতিটি কার্ডে স্বয়ংক্রিয় স্ক্যানযোগ্য QR।" },
      { emoji: "🔒", title: "ক্লায়েন্ট-সাইড প্রসেসিং", text: "এডিটিংয়ের সময় আপনার ডেটা ব্রাউজারেই থাকে।" },
    ],
    introBlocks: [
      {
        emoji: "🪄",
        icon: "sparkle",
        title: "এই টুল কী করে",
        text: "ভিজিটিং কার্ড মেকার এক মিনিটেরও কম সময়ে একটি খালি ক্যানভাসকে পেশাদার বিজনেস কার্ডে পরিণত করে। গ্যালারি থেকে বিশটি হাতে-ডিজাইন করা টেমপ্লেটের একটি বেছে নিন, ক্লিক করুন, আর সাথে সাথেই এডিটরে পৌঁছে যাবেন যেখানে আপনি আপনার তথ্য টাইপ করতে, লোগো আপলোড করতে এবং উচ্চ মানের ফাইল ডাউনলোড করতে পারবেন।",
      },
      {
        emoji: "🎯",
        icon: "target",
        title: "উচ্চ মানের আউটপুটের জন্য তৈরি",
        text: "প্রতিটি কার্ড ১০৫০ × ৬০০ পিক্সেল বেসলাইনে রেন্ডার হয়। এক্সপোর্ট করার সময়, টুলটি উচ্চ রেজোলিউশনের ফাইল সরবরাহ করতে ক্যানভাসের স্কেল বাড়ায়। এটি অনেক সাধারণ প্রিন্টিংয়ের জন্য উপযুক্ত, তবে মনে রাখবেন পেশাদার প্রিন্টিংয়ের জন্য নির্দিষ্ট ব্লিড, ট্রিম বা CMYK কালার প্রোফাইলের প্রয়োজন হতে পারে, যা সাধারণ ওয়েব ব্রাউজার সরাসরি হ্যান্ডেল করে না।",
      },
      {
        emoji: "🖨️",
        icon: "printer",
        title: "দুই দিক, এক ওয়ার্কফ্লো",
        text: "প্রতিটি টেমপ্লেটে মিলে যাওয়া সামনে ও পিছনের দিক আছে। সামনের দিকে সাধারণত লোগো, ব্র্যান্ড নেম ও ট্যাগলাইন থাকে — পিছনে ব্যক্তির নাম, পদবি, ফোন, ইমেইল, ওয়েবসাইট, ঠিকানা এবং QR কোড। এডিটরে দুই দিক পাশাপাশি রেন্ডার হয় যাতে আপনি দেখতে পারেন চূড়ান্ত কার্ড কেমন হবে।",
      },
      {
        emoji: "🔐",
        icon: "lock",
        title: "আপনার ডিজাইন ব্রাউজারেই থাকে",
        text: "এডিটিং প্রক্রিয়ায় কোনো সার্ভার জড়িত নেই। টেমপ্লেট, ফন্ট, রঙ, আপনার লোগো এবং QR কোড—সব HTML5 Canvas API দিয়ে ব্রাউজারেই প্রসেস হয়। ট্যাব বন্ধ করলে এডিটিং সেশন শেষ হয়ে যায়। (নোট: পেজে সাধারণ ওয়েবসাইট অ্যানালিটিক্স এবং বিজ্ঞাপন স্ক্রিপ্ট চলতে পারে, তবে আপনার কার্ড ডেটা আপলোড হয় না)।",
      },
    ],
    howToTitle: "কীভাবে আপনার কার্ড বানাবেন",
    howTo: [
      { step: 1, title: "একটি টেমপ্লেট বেছে নিন", description: "গ্যালারিতে ২০টি হাতে-ডিজাইন করা টেমপ্লেট স্ক্রল করুন। প্রতিটি কার্ডের প্রিভিউতে সামনে ও পিছনে পাশাপাশি দেখা যায়।" },
      { step: 2, title: "আপনার তথ্য দিন", description: "বাম দিকের ফিল্ডে ব্র্যান্ড নেম, ট্যাগলাইন, পুরো নাম, পদবি, ফোন, ইমেইল, ওয়েবসাইট ও ঠিকানা টাইপ করুন। ক্যানভাস রিয়েল-টাইমে আপডেট হয়।" },
      { step: 3, title: "লোগো আপলোড করুন", description: "৫ MB পর্যন্ত PNG, JPG, WebP বা SVG লোগো ড্র্যাগ ও ড্রপ করুন। লোগো আনুপাতিকভাবে স্কেল হয় এবং কার্ডের সামনে সঠিক জায়গায় রেন্ডার হয়।" },
      { step: 4, title: "প্রিভিউ ও অ্যাডজাস্ট", description: "এডিটরে সামনে ও পিছনে দুই দিকই লাইভ রেন্ডার হয়। QR কোড আপনার ওয়েবসাইট URL থেকে স্বয়ংক্রিয়ভাবে error-correction level H দিয়ে তৈরি হয়।" },
      { step: 5, title: "আপনার কার্ড ডাউনলোড", description: "PNG, JPG বা PDF বেছে নিন। উচ্চ রেজোলিউশনে এক্সপোর্ট করলে বড় পিক্সেল ডাইমেনশন পাওয়া যায়, যা অনেক সাধারণ প্রিন্টিংয়ের জন্য উপযুক্ত।" },
    ],
    featuresTitle: "প্রকৃত কার্ডের জন্য তৈরি",
    features: [
      { emoji: "🎨", title: "২০টি ইউনিক টেমপ্লেট", description: "প্রতিটি টেমপ্লেট হাতে ডিজাইন করা — নিজস্ব সামনে ও পিছনে লেআউট, প্যালেট এবং টাইপোগ্রাফি সহ।" },
      { emoji: "👁️", title: "রিয়েল-টাইম প্রিভিউ", description: "ফন্ট, রঙ, পজিশন ও লোগো সব রিয়েল-টাইমে প্রতিফলিত হয়। আপনি দেখতে পাবেন ঠিক কী পাবেন।" },
      { emoji: "🖨️", title: "হাই-রেজ এক্সপোর্ট", description: "উচ্চ রেজোলিউশনে PNG, JPG বা PDF এক্সপোর্ট। ব্লিড এবং কালার প্রোফাইলের জন্য সর্বদা আপনার প্রিন্টারের সাথে যোগাযোগ করুন।" },
      { emoji: "📱", title: "QR কোড অন্তর্ভুক্ত", description: "প্রতিটি কার্ডের পিছনে ওয়েবসাইট URL থেকে তৈরি স্ক্যানযোগ্য QR কোড থাকে।" },
      { emoji: "🔒", title: "শূন্য আপলোড", description: "আপনার কার্ড ডেটা সার্ভারে পাঠানো হয় না; এডিটিং প্রক্রিয়া আপনার ব্রাউজারেই Canvas API দিয়ে চলে।" },
      { emoji: "📐", title: "স্ট্যান্ডার্ড কার্ড সাইজ", description: "স্ট্যান্ডার্ড, স্কয়ার, স্লিম এবং ইউএস সাইজ সাপোর্টেড। প্রতিটি মাপ সঠিক প্রিন্ট মিলিমিটারে।" },
    ],
    faqTitle: "মানুষ যা জিজ্ঞেস করে",
    faq: [
      { question: "ভিজিটিং কার্ড মেকার কি সত্যিই ফ্রি?", answer: "হ্যাঁ — সম্পূর্ণ ফ্রি। ২০টি টেমপ্লেট, সব এক্সপোর্ট ফরম্যাট এবং সব রেজোলিউশন অপশন অ্যাকাউন্ট, ওয়াটারমার্ক বা লুকানো সীমা ছাড়াই পাওয়া যায়।" },
      { question: "আমার ফাইল কি সার্ভারে আপলোড হয়?", answer: "না। প্রতিটি রেন্ডার আপনার ব্রাউজারেই HTML5 Canvas API দিয়ে হয়। আপনার লোগো, টেক্সট ও ডিজাইন কখনো ডিভাইস ছাড়ে না।" },
      { question: "এটা কি একদিক নাকি দুইদিক টুল?", answer: "দুইটাই। প্রতিটি টেমপ্লেটে মিলে যাওয়া সামনে ও পিছনের দিক আছে। দুটোই সম্পূর্ণ এডিটেবল এবং আলাদা ফাইল হিসেবে এক্সপোর্ট হয়।" },
      { question: "আমি কি নিজের লোগো আপলোড করতে পারি?", answer: "হ্যাঁ। এডিটর ৫ MB পর্যন্ত PNG, JPG, WebP এবং SVG ফাইল গ্রহণ করে। লোগো আনুপাতিকভাবে স্কেল হয়।" },
      { question: "কোন এক্সপোর্ট ফরম্যাট ও রেজোলিউশন সাপোর্টেড?", answer: "PNG, JPG এবং PDF — তিনটাই। আপনি বিভিন্ন রেজোলিউশন স্কেলে এক্সপোর্ট করে বড় পিক্সেল ডাইমেনশন পেতে পারেন। মনে রাখবেন, এগুলো ইমেজ রেজোলিউশন, এমবেডেড প্রিন্ট DPI মেটাডেটা নয়।" },
      { question: "পিছনের QR কোড সত্যিই স্ক্যান হয়?", answer: "হ্যাঁ। প্রতিটি কার্ডের পিছনে error-correction level H দিয়ে QR তৈরি হয় — সর্বোচ্চ স্ট্যান্ডার্ড। ছোট সাইজেও স্ক্যান হয়।" },
      { question: "মোবাইল ও ট্যাবলেটে কাজ করে?", answer: "এডিটর সম্পূর্ণ রেসপন্সিভ। ফোন, ট্যাবলেট বা ডেস্কটপে কাজ করে। প্রতিটি এলিমেন্ট টাচ-বান্ধব।" },
      { question: "এক্সপোর্ট করা কার্ড কি প্রিন্ট-রেডি হবে?", answer: "এক্সপোর্ট করা ফাইলগুলো উচ্চ রেজোলিউশনের ইমেজ বা স্ট্যান্ডার্ড PDF, যা হোম বা অফিস প্রিন্টারের জন্য উপযুক্ত। তবে বাণিজ্যিক প্রিন্ট শপে পাঠালে, তাদের নির্দিষ্ট CMYK কালার প্রোফাইল, ব্লিড বা ট্রিম লাইনের প্রয়োজন হতে পারে, যা আপনি সরাসরি তাদের সাথে কনফার্ম করে নেবেন।" },
    ],
    privacyNote: "আপনার ডিজাইন সম্পূর্ণ আপনার ব্রাউজারেই প্রসেস হয়। কোনো লোগো, টেক্সট বা টেমপ্লেট পছন্দ কোনো সার্ভারে আপলোড করা হয় না। ট্যাব বন্ধ করলেই এডিটিং সেশন শেষ হয়ে যায়। অনুগ্রহ করে মনে রাখবেন, পেজে সাধারণ অ্যানালিটিক্স এবং থার্ড-পার্টি বিজ্ঞাপন স্ক্রিপ্ট কাজ করতে পারে।",
  },
};

export type VisitingCardContent = typeof visitingCardContent;
export type VisitingCardLangContent = typeof visitingCardContent.en;

/* ============================================================
 * JPG → PNG — Bilingual Content
 * ============================================================ */

export const jpgToPngContent = {
  en: {
    heroTag: "Image Converter",
    heroSubtitle:
      "Convert JPG images to PNG format instantly in your browser. No uploads, no servers, no quality loss — your files stay on your device from start to finish. Batch-convert multiple JPGs at once and download them individually or all together.",
    heroStats: [
      { value: "100%", label: "Private" },
      { value: "Batch", label: "Supported" },
      { value: "Lossless", label: "Output" },
      { value: "Free", label: "Forever" },
    ],

    introHighlights: [
      { emoji: "🔒", title: "100% private", text: "Files never leave your device. Zero uploads." },
      { emoji: "⚡", title: "Instant conversion", text: "Runs in your browser — no server wait." },
      { emoji: "📦", title: "Batch support", text: "Convert multiple JPGs at once." },
      { emoji: "🎨", title: "Lossless quality", text: "Every pixel preserved exactly." },
      { emoji: "🔍", title: "No size limit", text: "Up to 50 MB per file, no account needed." },
      { emoji: "💾", title: "Download anytime", text: "Individual or bulk download with one click." },
    ],

    introBlocks: [
      {
        emoji: "🪄",
        icon: "sparkle",
        title: "What this tool does",
        text: "JPG to PNG Converter takes your JPEG photos and re-encodes them into lossless PNG images. It reads the JPG file locally in your browser, draws it onto an off-screen canvas at full resolution, and exports the result as a PNG blob — all without a single byte leaving your device. You can drop in one file or a hundred, and the tool converts them one by one, showing you both the original and converted sizes side by side.",
      },
      {
        emoji: "🎨",
        icon: "target",
        title: "Why PNG?",
        text: "PNG is a lossless format. Unlike JPG, it does not introduce compression artefacts every time you re-save. This makes PNG ideal for editing workflows, screenshots, graphics with sharp edges, and any image that will be edited multiple times. PNG also supports transparency, which matters if you plan to cut out parts of the image later — though the transparency information is not present in a JPG source file, so the resulting PNG will still have a solid background.",
      },
      {
        emoji: "⚡",
        icon: "printer",
        title: "How the conversion works",
        text: "The tool uses the browser's built-in HTML5 Canvas API. When you drop a JPG, the browser decodes it into raw pixel data. The canvas re-draws those pixels one by one, then exports the result as a PNG using a lossless encoder. Because both decoding and encoding happen inside your browser, no network traffic is involved. The conversion typically takes under a second for images up to a few megapixels, and a couple of seconds for very large photos.",
      },
      {
        emoji: "🔐",
        icon: "lock",
        title: "Your files stay with you",
        text: "There is no server. There are no accounts. There are no analytics tracking your uploads. The entire tool runs as JavaScript inside the page you are looking at. When you close the tab, every trace of your files is gone from memory. This makes the tool suitable for sensitive photos, confidential screenshots, and any image you would not want a third party to see.",
      },
    ],

    howToTitle: "How to convert JPG to PNG",
    howTo: [
      { step: 1, title: "Drop your JPG files", description: "Drag and drop one or more JPG or JPEG files into the upload area, or click to browse. Files up to 50 MB each are supported." },
      { step: 2, title: "Wait a moment", description: "The tool converts each file in sequence. Conversion happens on your device, so it usually takes less than a second per file." },
      { step: 3, title: "Review the results", description: "Each converted file appears in a list showing the original name, original size, and the new PNG size. Compare before/after with the preview thumbnails." },
      { step: 4, title: "Download individually or all at once", description: "Click the Download button on any single file, or use Download All to grab every converted PNG in one go." },
    ],

    featuresTitle: "Built for real conversions",
    features: [
      { emoji: "🔒", title: "Zero uploads", description: "The file is decoded and re-encoded entirely in your browser. Nothing travels over the network." },
      { emoji: "⚡", title: "Instant results", description: "No queue, no waiting for a server. Every file converts in under a second on modern hardware." },
      { emoji: "📦", title: "Batch processing", description: "Drop multiple JPGs at once and convert them all in a single session." },
      { emoji: "🎨", title: "Pixel-perfect output", description: "PNG encoding is lossless, so every pixel from the JPG is preserved exactly." },
      { emoji: "📐", title: "Original resolution", description: "Your photo's width, height, and DPI metadata are kept exactly as they were." },
      { emoji: "💾", title: "No size limits", description: "Files up to 50 MB each are accepted. No signup, no watermark, no daily quota." },
    ],

    faqTitle: "Questions people ask",
    faq: [
      { question: "Is this really free?", answer: "Yes — completely. No account, no watermark, no hidden size limit. The tool is supported by ads shown outside the workspace." },
      { question: "Do my files get uploaded to a server?", answer: "No. Everything — decoding, canvas rendering, and PNG encoding — happens inside your browser. Your files never leave your device." },
      { question: "Does the image quality drop?", answer: "No. PNG is a lossless format, so every pixel is preserved exactly. The converted PNG has the same visual quality as the original JPG, just in a different file format." },
      { question: "Will the PNG be bigger than the JPG?", answer: "Usually yes — PNG uses lossless compression, which is less efficient for photographs than JPG's lossy compression. A 2 MB JPG might become a 5 MB PNG. This is expected and means no quality was lost." },
      { question: "Can I convert multiple files at once?", answer: "Yes. Drop as many JPGs as you want into the upload area and they will all be converted. Use Download All to save every converted file in one click." },
      { question: "Is there a file size limit?", answer: "Each file can be up to 50 MB. There is no limit on the number of files you convert in one session." },
      { question: "Does it work on mobile?", answer: "Yes. The tool is fully responsive and works on iOS Safari, Android Chrome, and every modern mobile browser." },
      { question: "Can I convert PNG back to JPG?", answer: "Yes — we also have a PNG to JPG converter. It works the same way in reverse." },
    ],

    privacyNote:
      "Your images are processed entirely inside your browser using the HTML5 Canvas API. Nothing is uploaded, tracked, or stored on any server. Close the tab and everything disappears.",

    relatedTitle: "Other tools you may like",
  },

  bn: {
    heroTag: "ইমেজ কনভার্টার",
    heroSubtitle:
      "JPG ছবি PNG ফরম্যাটে সাথে সাথে রূপান্তর করুন — সম্পূর্ণ আপনার ব্রাউজারেই। কোনো আপলোড নেই, সার্ভার নেই, কোয়ালিটি লস নেই। একাধিক JPG একসাথে রূপান্তর করুন এবং আলাদা বা একসাথে ডাউনলোড করুন।",
    heroStats: [
      { value: "১০০%", label: "প্রাইভেট" },
      { value: "ব্যাচ", label: "সাপোর্টেড" },
      { value: "লসলেস", label: "আউটপুট" },
      { value: "ফ্রি", label: "চিরকাল" },
    ],

    introHighlights: [
      { emoji: "🔒", title: "১০০% প্রাইভেট", text: "ফাইল কখনো ডিভাইস ছাড়ে না। শূন্য আপলোড।" },
      { emoji: "⚡", title: "তাৎক্ষণিক রূপান্তর", text: "ব্রাউজারেই চলে — সার্ভারের অপেক্ষা নেই।" },
      { emoji: "📦", title: "ব্যাচ সাপোর্ট", text: "একাধিক JPG একসাথে রূপান্তর করুন।" },
      { emoji: "🎨", title: "লসলেস কোয়ালিটি", text: "প্রতিটি পিক্সেল হুবহু সংরক্ষিত।" },
      { emoji: "🔍", title: "সাইজ লিমিট নেই", text: "প্রতি ফাইল ৫০ MB পর্যন্ত, অ্যাকাউন্ট লাগে না।" },
      { emoji: "💾", title: "যেকোনো সময় ডাউনলোড", text: "এক ক্লিকে আলাদা বা সব একসাথে।" },
    ],

    introBlocks: [
      { emoji: "🪄", icon: "sparkle", title: "এই টুল কী করে", text: "JPG থেকে PNG কনভার্টার আপনার JPEG ছবিগুলোকে lossless PNG ছবিতে রূপান্তর করে। এটি JPG ফাইলটি আপনার ব্রাউজারেই পড়ে, সম্পূর্ণ রেজোলিউশনে একটি off-screen ক্যানভাসে আঁকে এবং ফলাফলটি PNG হিসেবে এক্সপোর্ট করে — সবকিছু আপনার ডিভাইসেই, একটি বাইটও বাইরে যায় না। আপনি একটি ফাইল বা একশ ফাইল — যত খুশি দিন, টুলটি একটার পর একটা কনভার্ট করবে এবং মূল ও নতুন সাইজ পাশাপাশি দেখাবে।" },
      { emoji: "🎨", icon: "target", title: "কেন PNG?", text: "PNG একটি lossless ফরম্যাট। JPG-এর বিপরীতে, প্রতিবার re-save করার সময় এতে কোনো কম্প্রেশন আর্টিফ্যাক্ট তৈরি হয় না। তাই PNG এডিটিং ওয়ার্কফ্লো, স্ক্রিনশট, তীক্ষ্ণ কিনারাযুক্ত গ্রাফিক্স এবং বারবার এডিট করা ছবির জন্য আদর্শ। PNG স্বচ্ছতাও সাপোর্ট করে — যদিও JPG সোর্সে স্বচ্ছতার তথ্য থাকে না, তাই ফলস্বরূপ PNG-তে ব্যাকগ্রাউন্ড সলিডই থাকবে।" },
      { emoji: "⚡", icon: "printer", title: "কনভার্সন কীভাবে কাজ করে", text: "টুলটি ব্রাউজারের HTML5 Canvas API ব্যবহার করে। আপনি যখন JPG ড্রপ করেন, ব্রাউজার সেটি raw pixel data-তে ডিকোড করে। ক্যানভাস সেই পিক্সেলগুলো এক এক করে আঁকে, তারপর lossless encoder দিয়ে PNG হিসেবে এক্সপোর্ট করে। যেহেতু ডিকোডিং ও এনকোডিং দুটোই আপনার ব্রাউজারে ঘটে, কোনো নেটওয়ার্ক ট্রাফিক নেই। কয়েক মেগাপিক্সেল পর্যন্ত সাধারণত এক সেকেন্ডেরও কম সময় লাগে।" },
      { emoji: "🔐", icon: "lock", title: "আপনার ফাইল আপনার সাথেই থাকে", text: "কোনো সার্ভার নেই। কোনো অ্যাকাউন্ট নেই। আপনার আপলোড ট্র্যাক করার কোনো অ্যানালিটিক্স নেই। পুরো টুলটি আপনি যে পেজটি দেখছেন সেটির ভেতরেই JavaScript হিসেবে চলে। ট্যাব বন্ধ করলেই আপনার ফাইলের সব চিহ্ন মেমরি থেকে মুছে যায়।" },
    ],

    howToTitle: "JPG কীভাবে PNG-তে রূপান্তর করবেন",
    howTo: [
      { step: 1, title: "আপনার JPG ফাইল দিন", description: "এক বা একাধিক JPG/JPEG ফাইল upload এলাকায় ড্র্যাগ করে আনুন, বা ক্লিক করে ব্রাউজ করুন। প্রতি ফাইল ৫০ MB পর্যন্ত সাপোর্টেড।" },
      { step: 2, title: "একটু অপেক্ষা করুন", description: "টুলটি একটার পর একটা ফাইল কনভার্ট করে। কনভার্সন আপনার ডিভাইসেই হয়, তাই সাধারণত প্রতি ফাইল এক সেকেন্ডেরও কম সময় লাগে।" },
      { step: 3, title: "ফলাফল দেখুন", description: "প্রতিটি কনভার্টেড ফাইল একটি তালিকায় দেখা যায় — মূল নাম, মূল সাইজ এবং নতুন PNG সাইজ সহ। প্রিভিউ থাম্বনেইল দিয়ে আগে-পরে তুলনা করুন।" },
      { step: 4, title: "আলাদা বা সব একসাথে ডাউনলোড", description: "যেকোনো ফাইলে Download চাপুন, বা Download All দিয়ে সব PNG একবারে ডাউনলোড করুন।" },
    ],

    featuresTitle: "প্রকৃত কনভার্সনের জন্য তৈরি",
    features: [
      { emoji: "🔒", title: "শূন্য আপলোড", description: "ফাইল ডিকোড ও রি-এনকোড সম্পূর্ণ আপনার ব্রাউজারেই। নেটওয়ার্কে কিছুই যায় না।" },
      { emoji: "⚡", title: "তাৎক্ষণিক ফলাফল", description: "কিউ নেই, সার্ভারের অপেক্ষা নেই। আধুনিক হার্ডওয়্যারে প্রতিটি ফাইল এক সেকেন্ডেরও কমে।" },
      { emoji: "📦", title: "ব্যাচ প্রসেসিং", description: "একাধিক JPG একবারে দিন এবং একটি সেশনেই সব কনভার্ট করুন।" },
      { emoji: "🎨", title: "পিক্সেল-পারফেক্ট আউটপুট", description: "PNG এনকোডিং lossless, তাই JPG-এর প্রতিটি পিক্সেল হুবহু সংরক্ষিত।" },
      { emoji: "📐", title: "মূল রেজোলিউশন", description: "আপনার ছবির প্রস্থ, উচ্চতা ও DPI মেটাডেটা হুবহু রাখা হয়।" },
      { emoji: "💾", title: "সাইজ লিমিট নেই", description: "প্রতি ফাইল ৫০ MB পর্যন্ত। কোনো signup নেই, ওয়াটারমার্ক নেই, দৈনিক কোটা নেই।" },
    ],

    faqTitle: "মানুষ যা জিজ্ঞেস করে",
    faq: [
      { question: "এটা কি সত্যিই ফ্রি?", answer: "হ্যাঁ — সম্পূর্ণ ফ্রি। কোনো অ্যাকাউন্ট নেই, ওয়াটারমার্ক নেই, লুকানো সাইজ লিমিট নেই।" },
      { question: "আমার ফাইল কি সার্ভারে আপলোড হয়?", answer: "না। সবকিছু — ডিকোডিং, ক্যানভাস রেন্ডারিং, PNG এনকোডিং — আপনার ব্রাউজারেই হয়।" },
      { question: "ছবির কোয়ালিটি কমে যায়?", answer: "না। PNG lossless, তাই প্রতিটি পিক্সেল হুবহু সংরক্ষিত।" },
      { question: "PNG কি JPG-এর চেয়ে বড় হবে?", answer: "সাধারণত হ্যাঁ — PNG lossless কম্প্রেশন ব্যবহার করে যা ছবির জন্য কম efficient। ২ MB JPG, ৫ MB PNG হতে পারে। এটাই প্রত্যাশিত এবং কোনো কোয়ালিটি লস হয়নি।" },
      { question: "একসাথে একাধিক ফাইল কনভার্ট করা যায়?", answer: "হ্যাঁ। যত চান JPG ড্রপ করুন, সব কনভার্ট হবে। Download All দিয়ে সব একসাথে সেভ করুন।" },
      { question: "ফাইল সাইজের লিমিট আছে?", answer: "প্রতি ফাইল ৫০ MB পর্যন্ত। এক সেশনে কতগুলো ফাইল করবেন তার সীমা নেই।" },
      { question: "মোবাইলে কাজ করে?", answer: "হ্যাঁ। টুলটি সম্পূর্ণ responsive — iOS Safari, Android Chrome সহ সব আধুনিক মোবাইল ব্রাউজারে।" },
      { question: "PNG থেকে JPG-তে কনভার্ট করা যায়?", answer: "হ্যাঁ — আমাদের PNG to JPG কনভার্টারও আছে। উল্টো পথে একইভাবে কাজ করে।" },
    ],

    privacyNote:
      "আপনার ছবি HTML5 Canvas API দিয়ে সম্পূর্ণ আপনার ব্রাউজারেই প্রসেস হয়। কোনো কিছু আপলোড, ট্র্যাক বা সার্ভারে সংরক্ষণ করা হয় না। ট্যাব বন্ধ করলেই সব চলে যায়।",

    relatedTitle: "অন্য যেসব টুল ভালো লাগতে পারে",
  },
};

export type JpgToPngContent = typeof jpgToPngContent;

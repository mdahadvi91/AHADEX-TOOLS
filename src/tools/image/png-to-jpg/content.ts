/* ============================================================
 * PNG → JPG — Bilingual Content
 * ============================================================ */

export const pngToJpgContent = {
  en: {
    heroTag: "Image Converter",
    heroSubtitle:
      "Convert PNG images to JPG format instantly in your browser. Smaller files, universal compatibility, and zero uploads — your images stay on your device from start to finish. Batch-convert multiple PNGs at once and download them individually or all together.",
    heroStats: [
      { value: "100%", label: "Private" },
      { value: "Batch", label: "Supported" },
      { value: "Smaller", label: "Output" },
      { value: "Free", label: "Forever" },
    ],
    introHighlights: [
      { emoji: "🔒", title: "100% private", text: "Files never leave your device. Zero uploads." },
      { emoji: "⚡", title: "Instant conversion", text: "Runs in your browser — no server wait." },
      { emoji: "📦", title: "Batch support", text: "Convert multiple PNGs at once." },
      { emoji: "📉", title: "Much smaller files", text: "JPG compression dramatically reduces size." },
      { emoji: "🌐", title: "Universal format", text: "JPG opens on every device and app." },
      { emoji: "💾", title: "Download anytime", text: "Individual or bulk download with one click." },
    ],
    introBlocks: [
      { emoji: "🪄", icon: "sparkle", title: "What this tool does", text: "PNG to JPG Converter takes your PNG images and re-encodes them as compressed JPG files. It reads the PNG locally in your browser, draws it onto an off-screen canvas with a white background, and exports the result as a JPEG blob using a quality setting of 92%. No byte leaves your device. Drop in one file or a hundred — the tool converts them one by one and shows both the original and converted sizes side by side." },
      { emoji: "📉", icon: "target", title: "Why the file becomes smaller", text: "PNG uses lossless compression, which is great for graphics but very inefficient for photographs and screenshots. JPG uses lossy compression tuned for real-world images. As a result, a PNG that is 3 MB often becomes a 400 KB JPG with only minimal, usually invisible, visual differences. This makes JPG ideal for email attachments, website images, and any situation where file size matters more than absolute fidelity." },
      { emoji: "⚡", icon: "printer", title: "How the conversion works", text: "The tool uses the browser's built-in HTML5 Canvas API. When you drop a PNG, the browser decodes it into raw pixel data. The canvas re-draws those pixels on a white background — because JPG does not support transparency — and then exports the result as a JPEG blob at 92% quality. Both decoding and encoding happen inside your browser, so no network traffic is involved, and conversion typically takes under a second per file." },
      { emoji: "🔐", icon: "lock", title: "Your files stay with you", text: "There is no server. There are no accounts. There is no analytics tracking your uploads. The entire tool runs as JavaScript inside the page you are looking at. When you close the tab, every trace of your files is gone from memory. This makes the tool suitable for sensitive screenshots, confidential documents, and any image you would not want a third party to see." },
    ],
    howToTitle: "How to convert PNG to JPG",
    howTo: [
      { step: 1, title: "Drop your PNG files", description: "Drag and drop one or more PNG files into the upload area, or click to browse. Files up to 50 MB each are supported." },
      { step: 2, title: "Wait a moment", description: "The tool converts each file in sequence. Conversion happens on your device, so it usually takes less than a second per file." },
      { step: 3, title: "Review the results", description: "Each converted file appears in a list showing the original name, original size, and the new JPG size — usually much smaller. Compare with preview thumbnails." },
      { step: 4, title: "Download individually or all at once", description: "Click the Download button on any single file, or use Download All to grab every converted JPG in one go." },
    ],
    featuresTitle: "Built for real conversions",
    features: [
      { emoji: "🔒", title: "Zero uploads", description: "The file is decoded and re-encoded entirely in your browser. Nothing travels over the network." },
      { emoji: "⚡", title: "Instant results", description: "No queue, no waiting for a server. Every file converts in under a second on modern hardware." },
      { emoji: "📦", title: "Batch processing", description: "Drop multiple PNGs at once and convert them all in a single session." },
      { emoji: "📉", title: "Dramatically smaller", description: "JPG files are often 5-10x smaller than the original PNGs, without visible quality loss." },
      { emoji: "🌐", title: "Universal compatibility", description: "JPG opens in every browser, every photo app, every device — no exceptions." },
      { emoji: "💾", title: "No size limits", description: "Files up to 50 MB each are accepted. No signup, no watermark, no daily quota." },
    ],
    faqTitle: "Questions people ask",
    faq: [
      { question: "Is this really free?", answer: "Yes — completely. No account, no watermark, no hidden size limit. The tool is supported by ads shown outside the workspace." },
      { question: "Do my files get uploaded to a server?", answer: "No. Everything — decoding, canvas rendering, and JPEG encoding — happens inside your browser. Your files never leave your device." },
      { question: "Will the quality drop?", answer: "JPG uses lossy compression, so there is some quality loss — but at 92% quality, the difference is usually invisible to the naked eye. You will see a much smaller file for essentially the same visual result." },
      { question: "What happens to transparent backgrounds?", answer: "JPG does not support transparency. Any transparent areas in your PNG will be filled with white in the converted JPG. If you need transparency, keep the PNG version." },
      { question: "How much smaller will the file be?", answer: "Typically 5-10x smaller. A 3 MB PNG often becomes a 300-600 KB JPG. The exact ratio depends on the image content — photos compress much better than screenshots." },
      { question: "Can I convert multiple files at once?", answer: "Yes. Drop as many PNGs as you want into the upload area and they will all be converted. Use Download All to save every converted file in one click." },
      { question: "Is there a file size limit?", answer: "Each file can be up to 50 MB. There is no limit on the number of files you convert in one session." },
      { question: "Can I convert JPG back to PNG?", answer: "Yes — we also have a JPG to PNG converter. It works the same way in reverse." },
    ],
    privacyNote:
      "Your images are processed entirely inside your browser using the HTML5 Canvas API. Nothing is uploaded, tracked, or stored on any server. Close the tab and everything disappears.",
    relatedTitle: "Other tools you may like",
  },
  bn: {
    heroTag: "ইমেজ কনভার্টার",
    heroSubtitle:
      "PNG ছবি JPG ফরম্যাটে সাথে সাথে রূপান্তর করুন — সম্পূর্ণ আপনার ব্রাউজারেই। ছোট ফাইল, সার্বজনীন সাপোর্ট, শূন্য আপলোড। একাধিক PNG একসাথে রূপান্তর করুন এবং আলাদা বা একসাথে ডাউনলোড করুন।",
    heroStats: [
      { value: "১০০%", label: "প্রাইভেট" },
      { value: "ব্যাচ", label: "সাপোর্টেড" },
      { value: "ছোট", label: "আউটপুট" },
      { value: "ফ্রি", label: "চিরকাল" },
    ],
    introHighlights: [
      { emoji: "🔒", title: "১০০% প্রাইভেট", text: "ফাইল কখনো ডিভাইস ছাড়ে না।" },
      { emoji: "⚡", title: "তাৎক্ষণিক রূপান্তর", text: "ব্রাউজারেই চলে — সার্ভারের অপেক্ষা নেই।" },
      { emoji: "📦", title: "ব্যাচ সাপোর্ট", text: "একাধিক PNG একসাথে রূপান্তর করুন।" },
      { emoji: "📉", title: "অনেক ছোট ফাইল", text: "JPG কম্প্রেশন সাইজ নাটকীয়ভাবে কমায়।" },
      { emoji: "🌐", title: "সার্বজনীন ফরম্যাট", text: "JPG সব ডিভাইসে ও অ্যাপে খোলে।" },
      { emoji: "💾", title: "যেকোনো সময় ডাউনলোড", text: "এক ক্লিকে আলাদা বা সব একসাথে।" },
    ],
    introBlocks: [
      { emoji: "🪄", icon: "sparkle", title: "এই টুল কী করে", text: "PNG থেকে JPG কনভার্টার আপনার PNG ছবিগুলোকে কমপ্রেসড JPG ফাইলে রূপান্তর করে। এটি PNG ফাইলটি আপনার ব্রাউজারেই পড়ে, সাদা ব্যাকগ্রাউন্ডে একটি off-screen ক্যানভাসে আঁকে এবং ৯২% কোয়ালিটিতে JPEG হিসেবে এক্সপোর্ট করে। একটি বাইটও আপনার ডিভাইস ছাড়ে না।" },
      { emoji: "📉", icon: "target", title: "ফাইল কেন ছোট হয়", text: "PNG lossless কম্প্রেশন ব্যবহার করে, যা গ্রাফিক্সের জন্য ভালো কিন্তু ছবির জন্য খুবই inefficient। JPG lossy কম্প্রেশন ব্যবহার করে যা আসল ছবির জন্য টিউন করা। ফলে ৩ MB PNG প্রায়ই ৪০০ KB JPG হয়ে যায় — প্রায় অদৃশ্য পার্থক্য নিয়ে।" },
      { emoji: "⚡", icon: "printer", title: "কনভার্সন কীভাবে কাজ করে", text: "টুলটি ব্রাউজারের HTML5 Canvas API ব্যবহার করে। PNG ড্রপ করলে ব্রাউজার সেটি raw pixel data-তে ডিকোড করে। ক্যানভাস সাদা ব্যাকগ্রাউন্ডে পিক্সেলগুলো আঁকে — কারণ JPG স্বচ্ছতা সাপোর্ট করে না — তারপর ৯২% কোয়ালিটিতে JPEG হিসেবে এক্সপোর্ট করে।" },
      { emoji: "🔐", icon: "lock", title: "আপনার ফাইল আপনার সাথেই থাকে", text: "কোনো সার্ভার নেই। কোনো অ্যাকাউন্ট নেই। আপনার আপলোড ট্র্যাক করার কোনো অ্যানালিটিক্স নেই। ট্যাব বন্ধ করলেই আপনার ফাইলের সব চিহ্ন মেমরি থেকে মুছে যায়।" },
    ],
    howToTitle: "PNG কীভাবে JPG-তে রূপান্তর করবেন",
    howTo: [
      { step: 1, title: "আপনার PNG ফাইল দিন", description: "এক বা একাধিক PNG ফাইল upload এলাকায় ড্র্যাগ করে আনুন, বা ক্লিক করে ব্রাউজ করুন। প্রতি ফাইল ৫০ MB পর্যন্ত।" },
      { step: 2, title: "একটু অপেক্ষা করুন", description: "টুলটি একটার পর একটা ফাইল কনভার্ট করে। সাধারণত প্রতি ফাইল এক সেকেন্ডেরও কম সময় লাগে।" },
      { step: 3, title: "ফলাফল দেখুন", description: "প্রতিটি কনভার্টেড ফাইল তালিকায় দেখা যায় — মূল সাইজ ও নতুন JPG সাইজ সহ, সাধারণত অনেক ছোট।" },
      { step: 4, title: "আলাদা বা সব একসাথে ডাউনলোড", description: "যেকোনো ফাইলে Download চাপুন, বা Download All দিয়ে সব JPG একবারে ডাউনলোড করুন।" },
    ],
    featuresTitle: "প্রকৃত কনভার্সনের জন্য তৈরি",
    features: [
      { emoji: "🔒", title: "শূন্য আপলোড", description: "ফাইল ডিকোড ও রি-এনকোড সম্পূর্ণ আপনার ব্রাউজারেই।" },
      { emoji: "⚡", title: "তাৎক্ষণিক ফলাফল", description: "আধুনিক হার্ডওয়্যারে প্রতি ফাইল এক সেকেন্ডেরও কমে।" },
      { emoji: "📦", title: "ব্যাচ প্রসেসিং", description: "একাধিক PNG একবারে দিন এবং একটি সেশনেই সব কনভার্ট করুন।" },
      { emoji: "📉", title: "নাটকীয়ভাবে ছোট", description: "JPG ফাইল প্রায়ই মূল PNG-এর ৫-১০ গুণ ছোট, দৃশ্যমান কোয়ালিটি লস ছাড়াই।" },
      { emoji: "🌐", title: "সার্বজনীন সাপোর্ট", description: "JPG সব ব্রাউজার, ফটো অ্যাপ, ডিভাইসে খোলে — ব্যতিক্রম ছাড়াই।" },
      { emoji: "💾", title: "সাইজ লিমিট নেই", description: "প্রতি ফাইল ৫০ MB পর্যন্ত। কোনো signup নেই, ওয়াটারমার্ক নেই।" },
    ],
    faqTitle: "মানুষ যা জিজ্ঞেস করে",
    faq: [
      { question: "এটা কি সত্যিই ফ্রি?", answer: "হ্যাঁ — সম্পূর্ণ ফ্রি। কোনো অ্যাকাউন্ট নেই, ওয়াটারমার্ক নেই, লুকানো সাইজ লিমিট নেই।" },
      { question: "আমার ফাইল কি সার্ভারে আপলোড হয়?", answer: "না। সবকিছু আপনার ব্রাউজারেই হয়। ফাইল কখনো ডিভাইস ছাড়ে না।" },
      { question: "কোয়ালিটি কমে যাবে?", answer: "JPG lossy কম্প্রেশন ব্যবহার করে, তাই কিছু লস হয় — কিন্তু ৯২% কোয়ালিটিতে পার্থক্য সাধারণত চোখে পড়ে না। আপনি অনেক ছোট ফাইল পাবেন প্রায় একই ভিজ্যুয়াল রেজাল্টে।" },
      { question: "স্বচ্ছ ব্যাকগ্রাউন্ডের কী হবে?", answer: "JPG স্বচ্ছতা সাপোর্ট করে না। আপনার PNG-এর স্বচ্ছ অংশ সাদা হয়ে যাবে। স্বচ্ছতা দরকার হলে PNG সংস্করণ রাখুন।" },
      { question: "ফাইল কতটা ছোট হবে?", answer: "সাধারণত ৫-১০ গুণ ছোট। ৩ MB PNG প্রায়ই ৩০০-৬০০ KB JPG হয়।" },
      { question: "একসাথে একাধিক ফাইল কনভার্ট করা যায়?", answer: "হ্যাঁ। যত চান PNG ড্রপ করুন, সব কনভার্ট হবে।" },
      { question: "ফাইল সাইজের লিমিট আছে?", answer: "প্রতি ফাইল ৫০ MB পর্যন্ত। এক সেশনে ফাইল সংখ্যার সীমা নেই।" },
      { question: "JPG থেকে PNG-তে কনভার্ট করা যায়?", answer: "হ্যাঁ — আমাদের JPG to PNG কনভার্টারও আছে। উল্টো পথে একইভাবে কাজ করে।" },
    ],
    privacyNote:
      "আপনার ছবি HTML5 Canvas API দিয়ে সম্পূর্ণ আপনার ব্রাউজারেই প্রসেস হয়। কোনো কিছু আপলোড, ট্র্যাক বা সার্ভারে সংরক্ষণ করা হয় না।",
    relatedTitle: "অন্য যেসব টুল ভালো লাগতে পারে",
  },
};

export type PngToJpgContent = typeof pngToJpgContent;

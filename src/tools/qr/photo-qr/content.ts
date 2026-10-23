export const photoQrContent = {
  en: {
    heroTag: "QR + Photo",
    heroSubtitle: "📸 Turn any photo into a scannable invitation. Choose a platform, drop your picture, and share something people can actually tap. ✨",
    introHighlights: [
      { emoji: "🎯", title: "Scannable QR", text: "high error-correction standard" },
      { emoji: "🏷️", title: "Platform icon inside", text: "recognizable brand mark at the centre" },
      { emoji: "🎨", title: "11 platforms", text: "WhatsApp, Facebook, Instagram, WiFi & more" },
      { emoji: "💎", title: "Original dimensions", text: "keeps your photo's pixel size" },
      { emoji: "⚡", title: "Live preview", text: "updates as you type" },
      { emoji: "🔒", title: "Browser processing", text: "not uploaded to servers" },
    ],
    introBlocks: [
      { 
        emoji: "🪄", icon: "sparkle", title: "What it does", 
        text: "Add a real, working QR code directly onto any photo — right in your browser. 🚀 The exported image keeps the original pixel dimensions. The QR overlay is rendered on top of the image. ✨" 
      },
      { 
        emoji: "🛡️", icon: "shield", title: "Why it works", 
        text: "Every QR is generated with a high error-correction level. Higher error correction can help a QR code remain readable when part of the code is obscured or damaged, but actual scan reliability depends on size, contrast, placement, and the scanning environment. 📱 The platform icon sits in the centre for quick recognition. 🏷️" 
      },
      { 
        emoji: "🎁", icon: "gift", title: "Where to use it", 
        text: "Business cards 💼, product packaging 📦, restaurant menus 🍽️, event flyers 🎫, social media posts 📸, wedding invitations 💌 — anywhere you want to make a photo interactive. 💫" 
      },
      { 
        emoji: "🔐", icon: "lock", title: "Your privacy", 
        text: "Everything runs locally in your browser using the Canvas API. Your photo is processed locally and is not uploaded to any server. Close the tab and the editing session is gone. 🫧" 
      },
    ],
    scanReliability: {
      title: "QR Scan Reliability & Best Practices",
      intro: "To ensure your QR code scans successfully on the first try, follow these technical guidelines. Actual scan success depends on your specific printer, camera, and environment.",
      tips: [
        { title: "Size & Distance", text: "As a general rule, the QR code should be at least 1/10th the distance from which it will be scanned. For a phone scanning from 20cm away, the QR should be at least 2cm wide." },
        { title: "Contrast is Key", text: "Use the 'Padding' slider to add a white background behind the QR. Scanning a dark QR on a dark photo is likely to fail." },
        { title: "Error Correction Level", text: "Our generator uses high error correction (Level H). This means the QR remains readable even if up to 30% of the code is damaged, but it should not be intentionally obscured." },
        { title: "Print Quality", text: "If printing, ensure a minimum of 300 DPI. Low-resolution printing causes blurred edges, making the QR unscannable." }
      ],
      disclaimer: "Note: We do not claim guaranteed scan success in all conditions. Lighting, camera quality, and background complexity all play a role. Please test your final design before mass production."
    },
    howTo: [
      { step: 1, title: "Upload your photo 📤", description: "Click the upload area or drag an image into it. We support JPG, PNG, and WebP up to 50 MB. Nothing gets uploaded — the file is read locally by your browser. 🔒" },
      { step: 2, title: "Choose a platform 🎯", description: "Pick WhatsApp, Facebook, Instagram, Telegram, Phone, Email, WiFi, Website, SMS, Contact, or plain text. The form updates to ask for the right details. ⚡" },
      { step: 3, title: "Fill in your details ✏️", description: "Type your phone number, social link, WiFi password, or message. The QR code updates in the preview as you type, so you see exactly what will be shared. 👀" },
      { step: 4, title: "Pick a corner and adjust 🎨", description: "Choose top-left, top-right, bottom-left, or bottom-right. Use the sliders to make the QR bigger or smaller and to control the white padding around it. 🎛️" },
      { step: 5, title: "Download at full resolution ⬇️", description: "Click Download to save a PNG at the original photo resolution. The QR remains sharp and scannable at typical sizes — screen or print. 🖨️" },
    ],
    features: [
      { emoji: "🎯", title: "Scannable QR", description: "Every code is generated with high error correction. While this helps with minor damage, scan reliability ultimately depends on the QR size, contrast, and the scanning environment." },
      { emoji: "🏷️", title: "Platform icon inside", description: "The chosen platform's logo or icon sits in the centre of the QR — helping users recognize what to expect when they scan." },
      { emoji: "🎨", title: "11 platforms supported", description: "WhatsApp, Facebook, Instagram, Telegram, phone call, email, WiFi, website, SMS, digital contact card, and plain text — all handled with the right deep-link format." },
      { emoji: "💎", title: "Original dimensions", description: "The exported image keeps the original pixel dimensions. The QR overlay is rendered on top, without aggressive re-encoding or downsampling." },
      { emoji: "⚡", title: "Live preview", description: "Every change updates the preview in real time, so you can see the result before you download it." },
      { emoji: "🔒", title: "Browser processing", description: "All processing happens inside your browser using the HTML5 Canvas API. The file is not uploaded to any server." },
    ],
    faq: [
      { question: "Will the QR code still scan after I add it to a photo? 🤔", answer: "Yes, but scan reliability depends on size, contrast, placement, and the scanning environment. We use a high error-correction level to help the code remain readable, but you should test the final image with your own phone camera before mass printing. 📱" },
      { question: "Does the photo quality drop when I add the QR? 🖼️", answer: "The exported image keeps the original pixel dimensions. The QR overlay is rendered on top of the image. We use PNG format to maintain image quality without aggressive compression. 💎" },
      { question: "Which file formats are supported? 📁", answer: "You can upload JPG, PNG, and WebP images. The upload is limited to 50 MB per file. The output is a PNG file — we choose PNG because it is lossless and keeps both your original photo and the QR code sharp. ✨" },
      { question: "Can I use the result for commercial purposes? 💼", answer: "Yes. The output image is entirely yours — you can use it on business cards, product packaging, restaurant menus, coffee shop tables, event posters, delivery flyers, wedding invitations, and any other printed or digital material without attribution, royalties, or restrictions. 🎉" },
      { question: "Is my photo uploaded to a server? ☁️", answer: "No. ❌ Photo QR Code is a client-side tool. Everything — reading the file, decoding the image, generating the QR, drawing the badge, and exporting the final PNG — happens inside your browser using the Canvas API and pure JavaScript. Your photo is not uploaded to any server. 🌍" },
      { question: "Does it work on mobile phones and tablets? 📱", answer: "Yes. The tool is fully responsive and tested on iOS Safari, Android Chrome, Firefox for Android, and Samsung Internet. 🎯" },
      { question: "Why is my QR code not scanning sometimes? 🔍", answer: "If the QR is too small, placed on a busy background without enough white padding, or printed with low contrast, smartphone cameras may struggle. Use the Size slider to increase the QR width and ensure the Padding is set to 10 or higher. 📏" },
    ],
    privacyNote: "🔒 Your photo is processed entirely in your browser using the HTML5 Canvas API. It is not uploaded to any server. The moment you close this tab 🫧, the image is gone from memory. ✨",
  },
  bn: {
    heroTag: "QR + ছবি",
    heroSubtitle: "📸 যেকোনো ছবিকে বানান একটা স্ক্যানযোগ্য আমন্ত্রণ। প্ল্যাটফর্ম বেছে নিন, ছবি আপলোড করুন, আর শেয়ার করুন এমন কিছু যা মানুষ সত্যিই ট্যাপ করতে পারবে। ✨",
    introHighlights: [
      { emoji: "🎯", title: "স্ক্যানযোগ্য QR", text: "উচ্চ এরর-কারেকশন স্ট্যান্ডার্ড" },
      { emoji: "🏷️", title: "মাঝখানে প্ল্যাটফর্ম আইকন", text: "সহজে চেনা যায় এমন ব্র্যান্ড মার্ক" },
      { emoji: "🎨", title: "১১টি প্ল্যাটফর্ম", text: "হোয়াটসঅ্যাপ, ফেসবুক, ইনস্টাগ্রাম, ওয়াইফাই" },
      { emoji: "💎", title: "মূল ডাইমেনশন", text: "আপনার ছবির পিক্সেল সাইজ বজায় থাকে" },
      { emoji: "⚡", title: "লাইভ প্রিভিউ", text: "টাইপ করার সাথে সাথে আপডেট" },
      { emoji: "🔒", title: "ব্রাউজার প্রসেসিং", text: "সার্ভারে আপলোড হয় না" },
    ],
    introBlocks: [
      { 
        emoji: "🪄", icon: "sparkle", title: "এটা কী করে", 
        text: "যেকোনো ছবিতে সত্যিকারের কাজ করা QR কোড যোগ করুন — সম্পূর্ণ আপনার ব্রাউজারেই। 🚀 এক্সপোর্ট করা ছবিটি মূল পিক্সেল ডাইমেনশন ধরে রাখে। QR ওভারলে ছবির ওপরে রেন্ডার করা হয়। ✨" 
      },
      { 
        emoji: "🛡️", icon: "shield", title: "কেন কাজ করে", 
        text: "প্রতিটি QR উচ্চ এরর-কারেকশন লেভেলে তৈরি। উচ্চ এরর কারেকশন লেভেল QR কোডের কিছু অংশ ঢেকে গেলেও পড়তে সাহায্য করে, তবে স্ক্যান করার নির্ভরযোগ্যতা সাইজ, কনট্রাস্ট, প্লেসমেন্ট এবং স্ক্যানিং পরিবেশের ওপর নির্ভর করে। 📱 প্ল্যাটফর্মের আইকন মাঝখানে বসানো হয়, যাতে সহজে চেনা যায়। 🏷️" 
      },
      { 
        emoji: "🎁", icon: "gift", title: "কোথায় ব্যবহার করবেন", 
        text: "বিজনেস কার্ড 💼, প্রোডাক্ট প্যাকেজিং 📦, রেস্টুরেন্ট মেনু 🍽️, ইভেন্ট ফ্লায়ার 🎫, সোশ্যাল মিডিয়া পোস্ট 📸, বিয়ের আমন্ত্রণপত্র 💌 — যেকোনো জায়গায় যেখানে একটা ছবিকে ইন্টার্যাকটিভ করতে চান। 💫" 
      },
      { 
        emoji: "🔐", icon: "lock", title: "আপনার প্রাইভেসি", 
        text: "সবকিছু আপনার ব্রাউজারেই Canvas API দিয়ে চলে। আপনার ছবি লোকালি প্রসেস হয় এবং কোনো সার্ভারে আপলোড হয় না। ট্যাব বন্ধ করলেই এডিটিং সেশন শেষ হয়ে যায়। 🫧" 
      },
    ],
    scanReliability: {
      title: "QR স্ক্যান নির্ভরযোগ্যতা ও সেরা টিপস",
      intro: "আপনার QR কোড যাতে প্রথমবারেই সফলভাবে স্ক্যান হয়, তার জন্য নিচের টেকনিক্যাল গাইডলাইনগুলো অনুসরণ করুন। আসল স্ক্যানের সাফল্য আপনার প্রিন্টার, ক্যামেরা এবং পরিবেশের ওপর নির্ভর করে।",
      tips: [
        { title: "সাইজ ও দূরত্ব", text: "সাধারণ নিয়ম হলো, QR কোডের সাইজ দূরত্বের অন্তত ১/১০ ভাগ হওয়া উচিত। যেমন- ২০ সেমি দূর থেকে স্ক্যান করতে চাইলে QR কমপক্ষে ২ সেমি চওড়া হওয়া উচিত।" },
        { title: "কনট্রাস্ট (বৈপরীত্য) সবচেয়ে জরুরি", text: "QR-এর পেছনে সাদা ব্যাকগ্রাউন্ড দিতে 'Padding' স্লাইডার ব্যবহার করুন। অন্ধকার ছবির ওপরে অন্ধকার QR স্ক্যান হওয়ার সম্ভাবনা কম।" },
        { title: "এরর কারেকশন লেভেল", text: "আমাদের জেনারেটর উচ্চ এরর কারেকশন (লেভেল H) ব্যবহার করে। এর মানে হলো কোডের ৩০% পর্যন্ত ক্ষতিগ্রস্ত হলেও তা পড়া যায়, তবে ইচ্ছাকৃতভাবে ঢেকে দেওয়া উচিত নয়।" },
        { title: "প্রিন্টের মান", text: "প্রিন্ট করার সময় কমপক্ষে ৩০০ DPI নিশ্চিত করুন। কম রেজোলিউশনে প্রিন্ট করলে কোডের কিনারা ঘোলা হয়ে যায়, যা স্ক্যান করা কঠিন করে তোলে।" }
      ],
      disclaimer: "নোট: আমরা সব পরিস্থিতিতে নিশ্চিত স্ক্যান সাফল্যের দাবি করি না। আলো, ক্যামেরার মান এবং ব্যাকগ্রাউন্ডের জটিলতা সবই ভূমিকা রাখে। বড় আকারে প্রিন্ট করার আগে অনুগ্রহ করে আপনার ডিজাইনটি টেস্ট করুন।"
    },
    howTo: [
      { step: 1, title: "আপনার ছবি আপলোড করুন 📤", description: "Upload এলাকায় ক্লিক করুন বা ছবি টেনে আনুন। আমরা JPG, PNG, WebP সাপোর্ট করি — ৫০ MB পর্যন্ত। কিছুই আপলোড হয় না — আপনার ব্রাউজার ফাইলটি লোকালি পড়ে। 🔒" },
      { step: 2, title: "একটা প্ল্যাটফর্ম বেছে নিন 🎯", description: "হোয়াটসঅ্যাপ, ফেসবুক, ইনস্টাগ্রাম, টেলিগ্রাম, ফোন, ইমেইল, ওয়াইফাই, ওয়েবসাইট, এসএমএস, যোগাযোগ, বা সাধারণ টেক্সট — যেকোনোটা। ফর্মটি সঠিক তথ্য চাইবে। ⚡" },
      { step: 3, title: "আপনার তথ্য দিন ✏️", description: "ফোন নম্বর, সোশ্যাল লিংক, ওয়াইফাই পাসওয়ার্ড, বা বার্তা লিখুন। টাইপ করার সাথে সাথে QR প্রিভিউতে আপডেট হবে — আপনি দেখবেন ঠিক কী শেয়ার হবে। 👀" },
      { step: 4, title: "কোণা বেছে নিন ও সাজান 🎨", description: "উপরে-বাম, উপরে-ডান, নিচে-বাম, বা নিচে-ডান। স্লাইডার দিয়ে QR বড়/ছোট করুন, আর চারপাশের সাদা প্যাডিং নিয়ন্ত্রণ করুন। 🎛️" },
      { step: 5, title: "ফুল রেজোলিউশনে ডাউনলোড করুন ⬇️", description: "Download ক্লিক করে PNG সেভ করুন আসল রেজোলিউশনে। QR স্ক্রিন বা প্রিন্টে স্ক্যানযোগ্য থাকবে। 🖨️" },
    ],
    features: [
      { emoji: "🎯", title: "স্ক্যানযোগ্য QR", description: "প্রতিটি কোড উচ্চ এরর কারেকশন দিয়ে তৈরি। এটি সামান্য ক্ষতির ক্ষেত্রে সাহায্য করে, তবে স্ক্যানের নির্ভরযোগ্যতা মূলত QR-এর সাইজ, কনট্রাস্ট এবং স্ক্যানিং পরিবেশের ওপর নির্ভর করে।" },
      { emoji: "🏷️", title: "মাঝখানে প্ল্যাটফর্ম আইকন", description: "নির্বাচিত প্ল্যাটফর্মের আইকন QR-এর মাঝখানে থাকে — যা গ্রাহককে বুঝতে সাহায্য করে কী আশা করবেন।" },
      { emoji: "🎨", title: "১১টি প্ল্যাটফর্ম", description: "হোয়াটসঅ্যাপ, ফেসবুক, ইনস্টাগ্রাম, টেলিগ্রাম, ফোন কল, ইমেইল, ওয়াইফাই, ওয়েবসাইট, এসএমএস, যোগাযোগ কার্ড, আর সাধারণ টেক্সট — সব সঠিক deep-link ফরম্যাটে।" },
      { emoji: "💎", title: "মূল ডাইমেনশন", description: "এক্সপোর্ট করা ছবিটি মূল পিক্সেল ডাইমেনশন ধরে রাখে। QR ওভারলে ছবির ওপরে রেন্ডার করা হয়, কোনো আক্রমণাত্মক রি-এনকোডিং ছাড়াই।" },
      { emoji: "⚡", title: "লাইভ প্রিভিউ", description: "প্রতিটা পরিবর্তন রিয়েল-টাইমে আপডেট হয় — ডাউনলোডের আগেই আপনি দেখবেন চূড়ান্ত ছবি।" },
      { emoji: "🔒", title: "ব্রাউজার প্রসেসিং", description: "সব প্রসেসিং আপনার ব্রাউজারেই HTML5 Canvas API দিয়ে। ফাইল কোনো সার্ভারে আপলোড হয় না।" },
    ],
    faq: [
      { question: "ছবিতে QR যোগ করার পরেও কি স্ক্যান হবে? 🤔", answer: "হ্যাঁ, তবে স্ক্যানের নির্ভরযোগ্যতা সাইজ, কনট্রাস্ট, প্লেসমেন্ট এবং স্ক্যানিং পরিবেশের ওপর নির্ভর করে। আমরা উচ্চ এরর-কারেকশন লেভেল ব্যবহার করি যাতে কোডটি পড়া যায়, তবে বড় আকারে প্রিন্ট করার আগে নিজের ফোনে টেস্ট করে নেওয়া ভালো। 📱" },
      { question: "QR যোগ করলে ছবির কোয়ালিটি কমে যায়? 🖼️", answer: "এক্সপোর্ট করা ছবিটি মূল পিক্সেল ডাইমেনশন ধরে রাখে। QR ওভারলে ছবির ওপরে রেন্ডার করা হয়। আমরা PNG ফরম্যাট ব্যবহার করি যাতে ছবির কোয়ালিটি বজায় থাকে। 💎" },
      { question: "কোন ফাইল ফরম্যাট সাপোর্টেড? 📁", answer: "JPG, PNG, WebP আপলোড করা যায়। প্রতি ফাইল সর্বোচ্চ ৫০ MB। আউটপুট সবসময় PNG। ✨" },
      { question: "ফলাফল কি ব্যবসায়িক কাজে ব্যবহার করা যাবে? 💼", answer: "হ্যাঁ। আউটপুট ছবি সম্পূর্ণ আপনার — বিজনেস কার্ড, প্রোডাক্ট প্যাকেজিং, রেস্টুরেন্ট মেনু, ইভেন্ট পোস্টার, এবং অন্য যেকোনো প্রিন্ট বা ডিজিটাল ম্যাটেরিয়ালে ব্যবহার করতে পারেন। 🎉" },
      { question: "আমার ছবি কি সার্ভারে আপলোড হয়? ☁️", answer: "না। ❌ Photo QR Code সম্পূর্ণ client-side টুল। সবকিছু — ফাইল পড়া, QR তৈরি, PNG এক্সপোর্ট — আপনার ব্রাউজারেই হয়। 🌍" },
      { question: "মোবাইল ফোন বা ট্যাবলেটে কাজ করে? 📱", answer: "হ্যাঁ। টুলটি সম্পূর্ণ responsive — iOS Safari, Android Chrome, Firefox for Android, Samsung Internet-এ পরীক্ষিত। 🎯" },
      { question: "আমার QR কোড মাঝে মাঝে স্ক্যান হচ্ছে না কেন? 🔍", answer: "যদি QR খুব ছোট হয়, সাদা প্যাডিং ছাড়া জটিল ব্যাকগ্রাউন্ডে থাকে বা কম কন্ট্রাস্টে প্রিন্ট হয়, তবে ক্যামেরা স্ক্যান করতে সমস্যা করে। Size স্লাইডার দিয়ে QR-এর প্রস্থ বাড়ান এবং Padding ১০ বা তার বেশি রাখুন। 📏" },
    ],
    privacyNote: "🔒 আপনার ছবি সম্পূর্ণ আপনার ব্রাউজারেই HTML5 Canvas API দিয়ে প্রসেস হয়। কোনো সার্ভারে আপলোড হয় না। ট্যাব বন্ধ করলেই ছবিটি মেমরি থেকে চলে যায় 🫧।",
  },
};

export type PhotoQrContent = typeof photoQrContent;
export type PhotoQrLangContent = typeof photoQrContent.en;

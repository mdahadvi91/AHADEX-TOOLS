export const photoQrData = {
  id: "photo-qr",
  slug: "photo-qr",
  name: "Photo QR Code",
  category: "qr" as const,
  path: "/tools/photo-qr",
  description: "Add a scannable QR badge to any photo, instantly.",
  popular: true,
  newTool: true,
  keywords: ["photo", "qr", "image", "badge", "whatsapp", "facebook"],

  content: {
    en: {
      intro:
        "Photo QR Code lets you add a real, working QR code to any photo in seconds. Upload a picture, choose a platform (WhatsApp, Facebook, Instagram, Telegram, phone, email, WiFi, website, SMS, or contact card), enter your details, and we'll place a scannable QR badge on a corner of your photo. The photo stays exactly as it was — only the badge is added. Every QR code is generated at high error-correction so it scans perfectly even when printed, and includes the platform's official logo in the center for instant recognition.",
      howTo: [
        {
          step: 1,
          title: "Upload your photo",
          description:
            "Click the upload area or drag an image into it. JPG, PNG, and WebP are supported up to 50 MB.",
        },
        {
          step: 2,
          title: "Choose a platform",
          description:
            "Pick WhatsApp, Facebook, Instagram, Telegram, Phone, Email, WiFi, Website, SMS, or Contact. The form updates automatically for each.",
        },
        {
          step: 3,
          title: "Fill in your details",
          description:
            "Type your phone number, link, or message. The QR updates live in the preview as you type.",
        },
        {
          step: 4,
          title: "Pick a corner",
          description:
            "Choose top-left, top-right, bottom-left, or bottom-right. Adjust the QR size and padding with the sliders.",
        },
        {
          step: 5,
          title: "Download at full resolution",
          description:
            "Click Download to save a PNG at the original photo resolution. The QR stays sharp and scannable.",
        },
      ],
      features: [
        {
          title: "Real scannable QR",
          description:
            "Uses error-correction level H so the code scans reliably even after printing.",
        },
        {
          title: "Platform logo inside",
          description:
            "Every QR has the official brand logo in the center — instantly recognizable.",
        },
        {
          title: "11 platforms supported",
          description:
            "WhatsApp, Facebook, Instagram, Telegram, Phone, Email, WiFi, Website, SMS, Contact, and plain text.",
        },
        {
          title: "Full-resolution output",
          description:
            "The photo is preserved at its original size. Nothing gets compressed or resized.",
        },
        {
          title: "100% private",
          description:
            "Everything happens in your browser. Your photo never leaves your device.",
        },
      ],
      faq: [
        {
          question: "Will the QR code still scan after adding it to a photo?",
          answer:
            "Yes. We use error-correction level H — the highest available — which allows the code to be scanned even if up to 30% of it is obscured. The platform logo in the center is well within that safe zone.",
        },
        {
          question: "Does the photo quality drop?",
          answer:
            "No. The photo is drawn at its original resolution on a canvas, and the QR is added at native quality. When you download, you get the same pixel dimensions as the original.",
        },
        {
          question: "What file formats are supported?",
          answer:
            "You can upload JPG, PNG, and WebP. The output is always a PNG so the QR stays pixel-perfect.",
        },
        {
          question: "Can I use it for commercial purposes?",
          answer:
            "Yes. All output is yours to use however you want — business cards, product packaging, posters, menus, event flyers, anything.",
        },
        {
          question: "Is my photo uploaded to a server?",
          answer:
            "Never. Everything runs inside your browser using the Canvas API. Your photo stays on your device from start to finish.",
        },
        {
          question: "Does it work on mobile?",
          answer:
            "Yes. The tool is fully responsive and works on iOS Safari, Android Chrome, and every modern mobile browser.",
        },
      ],
      privacyNote:
        "Your photo is processed entirely in your browser. It is never uploaded, stored, or shared. The moment you close this tab, the image is gone from memory.",
    },
    bn: {
      intro:
        "Photo QR Code দিয়ে আপনি সেকেন্ডেই যেকোনো ছবিতে একটা সত্যিকারের QR কোড যোগ করতে পারেন। একটা ছবি আপলোড করুন, একটা প্ল্যাটফর্ম বেছে নিন (হোয়াটসঅ্যাপ, ফেসবুক, ইনস্টাগ্রাম, টেলিগ্রাম, ফোন, ইমেইল, ওয়াইফাই, ওয়েবসাইট, এসএমএস, বা যোগাযোগ), আপনার তথ্য দিন — আমরা ছবির এক কোণে একটা স্ক্যানযোগ্য QR ব্যাজ বসিয়ে দেব। ছবি হুবহু আগের মতোই থাকবে — শুধু ব্যাজটা যোগ হবে। প্রতিটা QR সবচেয়ে বেশি error-correction দিয়ে তৈরি হয়, তাই প্রিন্ট করার পরেও নিখুঁতভাবে স্ক্যান হয়, এবং মাঝখানে প্ল্যাটফর্মের অফিসিয়াল লোগো থাকে যাতে সাথে সাথে চেনা যায়।",
      howTo: [
        {
          step: 1,
          title: "আপনার ছবি আপলোড করুন",
          description:
            "Upload এলাকায় ক্লিক করুন বা ছবি টেনে আনুন। JPG, PNG, WebP — ৫০ MB পর্যন্ত।",
        },
        {
          step: 2,
          title: "প্ল্যাটফর্ম বেছে নিন",
          description:
            "হোয়াটসঅ্যাপ, ফেসবুক, ইনস্টাগ্রাম, টেলিগ্রাম, ফোন, ইমেইল, ওয়াইফাই, ওয়েবসাইট, এসএমএস, যোগাযোগ — যেকোনোটা।",
        },
        {
          step: 3,
          title: "আপনার তথ্য দিন",
          description:
            "ফোন নম্বর, লিংক, বা বার্তা লিখুন। টাইপ করার সাথে সাথেই QR লাইভ আপডেট হবে।",
        },
        {
          step: 4,
          title: "কোণা বেছে নিন",
          description:
            "উপরে-বাম, উপরে-ডান, নিচে-বাম, নিচে-ডান — যেকোনোটা। স্লাইডার দিয়ে সাইজ ও প্যাডিং ঠিক করুন।",
        },
        {
          step: 5,
          title: "ফুল রেজোলিউশনে ডাউনলোড",
          description:
            "Download চাপুন — PNG সেভ হবে আসল ছবির রেজোলিউশনে। QR নিখুঁত থাকবে।",
        },
      ],
      features: [
        {
          title: "সত্যিকারের স্ক্যানযোগ্য QR",
          description: "Error-correction level H — প্রিন্টের পরেও নিখুঁতভাবে স্ক্যান হয়।",
        },
        {
          title: "মাঝখানে প্ল্যাটফর্ম লোগো",
          description: "প্রতিটা QR-এর মাঝে ব্র্যান্ডের অফিসিয়াল লোগো — সাথে সাথে চেনা যায়।",
        },
        {
          title: "১১টি প্ল্যাটফর্ম",
          description:
            "হোয়াটসঅ্যাপ, ফেসবুক, ইনস্টাগ্রাম, টেলিগ্রাম, ফোন, ইমেইল, ওয়াইফাই, ওয়েবসাইট, এসএমএস, যোগাযোগ, সাধারণ টেক্সট।",
        },
        {
          title: "ফুল রেজোলিউশন আউটপুট",
          description: "আসল সাইজেই ছবি থাকে। কোনো কম্প্রেশন নেই।",
        },
        {
          title: "১০০% প্রাইভেট",
          description: "সব আপনার ব্রাউজারেই। ছবি কখনো ডিভাইস ছাড়ে না।",
        },
      ],
      faq: [
        {
          question: "ছবিতে QR যোগ করার পরেও কি স্ক্যান হবে?",
          answer:
            "হ্যাঁ। আমরা error-correction level H ব্যবহার করি — সবচেয়ে বেশি। এর ফলে QR-এর ৩০% পর্যন্ত ঢেকে গেলেও স্ক্যান হয়। মাঝখানের লোগো সেই সীমার মধ্যে থাকে।",
        },
        {
          question: "ছবির কোয়ালিটি কমে যায়?",
          answer:
            "না। ছবি তার আসল রেজোলিউশনে canvas-এ draw হয়, QR native quality-তে বসে। ডাউনলোডে হুবহু একই pixel dimension পাবেন।",
        },
        {
          question: "কোন ফাইল ফরম্যাট সাপোর্টেড?",
          answer: "JPG, PNG, WebP আপলোড করা যায়। আউটপুট সবসময় PNG — যাতে QR নিখুঁত থাকে।",
        },
        {
          question: "ব্যবসায়িক কাজে ব্যবহার করা যাবে?",
          answer:
            "হ্যাঁ। সব আউটপুট আপনার — বিজনেস কার্ড, প্রোডাক্ট প্যাকেজিং, পোস্টার, মেনু, ইভেন্ট ফ্লায়ার — যেকোনো কিছুতে।",
        },
        {
          question: "ছবি কি সার্ভারে আপলোড হয়?",
          answer:
            "কখনো না। সব আপনার ব্রাউজারে Canvas API দিয়ে হয়। ছবি ডিভাইসেই থাকে।",
        },
        {
          question: "মোবাইলে কাজ করে?",
          answer:
            "হ্যাঁ। iOS Safari, Android Chrome এবং সব আধুনিক মোবাইল ব্রাউজারে কাজ করে।",
        },
      ],
      privacyNote:
        "আপনার ছবি সম্পূর্ণ আপনার ব্রাউজারেই প্রসেস হয়। কখনো আপলোড হয় না, সংরক্ষণ হয় না, শেয়ার হয় না। ট্যাব বন্ধ করলেই ছবি মেমরি থেকে মুছে যায়।",
    },
  },

  seo: {
    title: "Photo QR Code — Add QR to Photos Free | AHADEX Tools",
    description:
      "Add a real, scannable QR code to any photo. Choose from WhatsApp, Facebook, Instagram, WiFi, and more. Free, private, no uploads.",
    ogImage: "/images/og/tools/photo-qr-og.jpg",
  },

  relatedTools: ["qr-code-generator", "qr-code-with-logo", "wifi-qr-generator"],
};

export type PhotoQrData = typeof photoQrData;

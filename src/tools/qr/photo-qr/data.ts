export const photoQrData = {
  id: "photo-qr",
  slug: "photo-qr",
  name: "Photo QR Code",
  category: "qr" as const,
  path: "/tools/photo-qr",
  description: "Add a real, scannable QR badge to any photo — WhatsApp, Facebook, WiFi, and more.",
  popular: true,
  newTool: true,
  keywords: ["photo", "qr", "image", "badge", "whatsapp", "facebook", "instagram", "wifi"],

  content: {
    en: {
      heroTag: "QR + Photo",
      heroSubtitle:
        "Turn any photo into a scannable invitation. Choose a platform, drop your picture, and share something people can actually tap.",
      intro:
        "Photo QR Code is a simple but powerful tool that lets you add a real, working QR code directly onto any photo — right in your browser, in seconds. Upload a picture, pick a platform like WhatsApp, Facebook, Instagram, Telegram, phone call, email, WiFi, website, SMS, contact card, or plain text, enter your details, and we'll place a scannable QR badge on any corner you choose. The photo itself stays exactly as it was: same resolution, same colours, same pixels — only a small branded badge is added. Every QR code is generated at error-correction level H, the highest available, so it scans reliably even after printing, being photographed, or getting slightly damaged. The platform's official logo is embedded in the centre of the QR code, making it instantly recognisable. Everything runs locally in your browser using the Canvas API — your photo never leaves your device, is never uploaded, and is never stored on any server. Download the result at full original resolution in PNG format, ready for business cards, product packaging, restaurant menus, event flyers, social media posts, or anywhere else you want to make a photo interactive.",
      howTo: [
        {
          step: 1,
          title: "Upload your photo",
          description:
            "Click the upload area or drag an image into it. We support JPG, PNG, and WebP up to 50 MB. Nothing gets uploaded — the file is read locally by your browser.",
        },
        {
          step: 2,
          title: "Choose a platform",
          description:
            "Pick WhatsApp, Facebook, Instagram, Telegram, Phone, Email, WiFi, Website, SMS, Contact, or plain text. The form updates instantly to ask for the right details.",
        },
        {
          step: 3,
          title: "Fill in your details",
          description:
            "Type your phone number, social link, WiFi password, or message. The QR code updates live in the preview as you type, so you always see exactly what will be shared.",
        },
        {
          step: 4,
          title: "Pick a corner and adjust",
          description:
            "Choose top-left, top-right, bottom-left, or bottom-right. Use the sliders to make the QR bigger or smaller and to control the white padding around it.",
        },
        {
          step: 5,
          title: "Download at full resolution",
          description:
            "Click Download to save a PNG at the original photo resolution. The QR stays perfectly sharp and scannable at any size — screen or print.",
        },
      ],
      features: [
        {
          title: "Real scannable QR",
          description:
            "Every code is generated with error-correction level H, which allows it to be scanned even if up to 30% of the surface is covered, damaged, or photographed at an angle.",
        },
        {
          title: "Platform logo inside",
          description:
            "The official brand logo of the chosen platform sits in the centre of the QR — customers instantly know what to expect when they scan.",
        },
        {
          title: "11 platforms supported",
          description:
            "WhatsApp, Facebook, Instagram, Telegram, phone call, email, WiFi, website, SMS, digital contact card, and plain text — all handled with the right deep-link format.",
        },
        {
          title: "Full-resolution output",
          description:
            "Your original photo is preserved exactly as it was — same width, height, and pixel count. Only the badge is drawn on top, never any compression.",
        },
        {
          title: "Live preview",
          description:
            "Every change updates the preview in real time, so you never have to guess. You see the exact final image before you download it.",
        },
        {
          title: "100% private",
          description:
            "All processing happens inside your browser using the HTML5 Canvas API. The file is never uploaded, never stored, and never shared — close the tab and it's gone.",
        },
      ],
      faq: [
        {
          question: "Will the QR code still scan after I add it to a photo?",
          answer:
            "Yes, absolutely. We use error-correction level H — the highest QR standard — which allows a code to remain readable even when up to 30% of its surface is obscured. The platform logo in the middle is well within that safe threshold, and we always draw a white or rounded background behind the logo to keep the surrounding pixels crisp. You should still test the final image with your own phone camera before printing thousands of copies, but in normal use the code scans instantly on any modern iPhone or Android device.",
        },
        {
          question: "Does the photo quality drop when I add the QR?",
          answer:
            "No. When you click download, the photo is first drawn at its original resolution on an off-screen canvas, and then the QR badge is drawn on top at native pixel quality. The output is a PNG file that has exactly the same pixel dimensions as your original image — there is no compression, no downsampling, and no re-encoding loss. Even if your original was a 4000×6000 photo from a phone, the downloaded PNG will still be 4000×6000, with only the small QR badge added to a corner.",
        },
        {
          question: "Which file formats are supported?",
          answer:
            "You can upload JPG, PNG, and WebP images. The upload is limited to 50 MB per file, which covers almost every photo taken by any modern phone or camera. The output is always a PNG file — we choose PNG because it is lossless and keeps both your original photo and the QR code perfectly sharp. If you specifically need a JPG, you can convert the downloaded PNG using any of the other tools in the AHADEX library.",
        },
        {
          question: "Can I use the result for commercial purposes?",
          answer:
            "Yes. The output image is entirely yours — you can use it on business cards, product packaging, restaurant menus, coffee shop tables, event posters, delivery flyers, wedding invitations, and any other printed or digital material without attribution, royalties, or restrictions. The only thing to keep in mind is that the original photo must also be yours or properly licensed, and that any platform logos embedded in the QR are trademarks of their respective owners — you can use them in the QR because that's what they're designed for, but you shouldn't imply sponsorship or endorsement.",
        },
        {
          question: "Is my photo uploaded to a server?",
          answer:
            "Never. Photo QR Code is a fully client-side tool. Everything — reading the file, decoding the image, generating the QR, drawing the badge, and exporting the final PNG — happens inside your browser using the Canvas API and pure JavaScript. Your photo never leaves your device and never travels over the network. Even if you disconnect your internet after the page has loaded, the tool will continue to work. You can verify this yourself by opening your browser's developer tools and watching the Network tab — you'll see zero outbound requests when you upload a photo.",
        },
        {
          question: "Does it work on mobile phones and tablets?",
          answer:
            "Yes. The tool is fully responsive and tested on iOS Safari, Android Chrome, Firefox for Android, and Samsung Internet. The interface rearranges itself so that on a phone you get a compact two-column layout with settings on the left and the preview on the right, and on a tablet or desktop you get a larger, more spacious layout. Uploading from your phone's photo library, taking a new photo directly from the camera, and saving the downloaded PNG to your device all work perfectly.",
        },
        {
          question: "What happens if the QR code is too small on the final image?",
          answer:
            "You can make the QR bigger using the Size slider in the right-hand panel — it goes from 10% to 35% of the smaller side of your photo. As a rule of thumb, the QR should be at least 2 cm wide when printed if it will be scanned from 20 cm away, and at least 4 cm wide if it will be scanned from 1 metre away. You can also increase the white padding around the QR to make it stand out better against a busy or dark background. If the QR still feels small, consider using a squarer original photo, or cropping the image before you add the QR.",
        },
      ],
      privacyNote:
        "Your photo is processed entirely in your browser using the HTML5 Canvas API. It is never uploaded, never stored, and never shared with anyone. The moment you close this tab, the image is gone from memory — nothing remains on any server, because nothing was ever sent to one.",
    },
    bn: {
      heroTag: "QR + ছবি",
      heroSubtitle:
        "যেকোনো ছবিকে বানান একটা স্ক্যানযোগ্য আমন্ত্রণ। প্ল্যাটফর্ম বেছে নিন, ছবি আপলোড করুন, আর শেয়ার করুন এমন কিছু যা মানুষ সত্যিই ট্যাপ করতে পারবে।",
      intro:
        "Photo QR Code একটি সহজ কিন্তু শক্তিশালী টুল — যা দিয়ে আপনি যেকোনো ছবিতে সত্যিকারের কাজ করা একটা QR কোড যোগ করতে পারেন, সম্পূর্ণ আপনার ব্রাউজারেই, সেকেন্ডের মধ্যে। ছবি আপলোড করুন, একটা প্ল্যাটফর্ম বেছে নিন যেমন হোয়াটসঅ্যাপ, ফেসবুক, ইনস্টাগ্রাম, টেলিগ্রাম, ফোন কল, ইমেইল, ওয়াইফাই, ওয়েবসাইট, এসএমএস, ডিজিটাল যোগাযোগ কার্ড, বা সাধারণ টেক্সট — আপনার তথ্য দিন, আমরা যেকোনো কোণে একটা স্ক্যানযোগ্য QR ব্যাজ বসিয়ে দেব। ছবি হুবহু আগের মতোই থাকবে: একই রেজোলিউশন, একই রঙ, একই পিক্সেল — শুধু একটা ছোট ব্র্যান্ডেড ব্যাজ যোগ হবে। প্রতিটা QR কোড error-correction level H দিয়ে তৈরি হয়, যেটা সবচেয়ে বেশি — তাই প্রিন্ট করার পরেও, ছবি তোলার পরেও, বা সামান্য ক্ষতিগ্রস্ত হলেও নির্ভুলভাবে স্ক্যান হয়। প্ল্যাটফর্মের অফিসিয়াল লোগো QR-এর মাঝখানে বসানো হয়, যাতে সাথে সাথে চেনা যায়। সবকিছু আপনার ব্রাউজারেই Canvas API দিয়ে চলে — আপনার ছবি কখনো ডিভাইস ছাড়ে না, কখনো আপলোড হয় না, কখনো কোনো সার্ভারে সংরক্ষিত হয় না। ডাউনলোড করুন আসল রেজোলিউশনে PNG হিসেবে — বিজনেস কার্ড, প্রোডাক্ট প্যাকেজিং, রেস্টুরেন্ট মেনু, ইভেন্ট ফ্লায়ার, সোশ্যাল মিডিয়া পোস্ট, বা যেকোনো জায়গার জন্য প্রস্তুত যেখানে আপনি একটা ছবিকে ইন্টার্যাকটিভ করতে চান।",
      howTo: [
        {
          step: 1,
          title: "আপনার ছবি আপলোড করুন",
          description:
            "Upload এলাকায় ক্লিক করুন বা ছবি টেনে আনুন। আমরা JPG, PNG, WebP সাপোর্ট করি — ৫০ MB পর্যন্ত। কিছুই আপলোড হয় না — আপনার ব্রাউজার ফাইলটি লোকালি পড়ে।",
        },
        {
          step: 2,
          title: "একটা প্ল্যাটফর্ম বেছে নিন",
          description:
            "হোয়াটসঅ্যাপ, ফেসবুক, ইনস্টাগ্রাম, টেলিগ্রাম, ফোন, ইমেইল, ওয়াইফাই, ওয়েবসাইট, এসএমএস, যোগাযোগ, বা সাধারণ টেক্সট — যেকোনোটা। ফর্মটি সাথে সাথে সঠিক তথ্য চাইবে।",
        },
        {
          step: 3,
          title: "আপনার তথ্য দিন",
          description:
            "ফোন নম্বর, সোশ্যাল লিংক, ওয়াইফাই পাসওয়ার্ড, বা বার্তা লিখুন। টাইপ করার সাথে সাথে QR লাইভ আপডেট হবে — আপনি দেখবেন ঠিক কী শেয়ার হবে।",
        },
        {
          step: 4,
          title: "কোণা বেছে নিন ও সাজান",
          description:
            "উপরে-বাম, উপরে-ডান, নিচে-বাম, বা নিচে-ডান। স্লাইডার দিয়ে QR বড়/ছোট করুন, আর চারপাশের সাদা প্যাডিং নিয়ন্ত্রণ করুন।",
        },
        {
          step: 5,
          title: "ফুল রেজোলিউশনে ডাউনলোড করুন",
          description:
            "Download ক্লিক করে PNG সেভ করুন আসল রেজোলিউশনে। QR সব সাইজে — স্ক্রিন বা প্রিন্টে — নিখুঁতভাবে স্ক্যানযোগ্য থাকবে।",
        },
      ],
      features: [
        {
          title: "সত্যিকারের স্ক্যানযোগ্য QR",
          description:
            "প্রতিটা কোড error-correction level H দিয়ে তৈরি — ৩০% পর্যন্ত ঢাকা, ক্ষতিগ্রস্ত, বা কোণাকুণি ছবি তোলা হলেও স্ক্যান হয়।",
        },
        {
          title: "মাঝখানে প্ল্যাটফর্ম লোগো",
          description:
            "নির্বাচিত প্ল্যাটফর্মের অফিসিয়াল ব্র্যান্ড লোগো QR-এর মাঝখানে — গ্রাহক সাথে সাথে বুঝে যাবেন কী আশা করবেন।",
        },
        {
          title: "১১টি প্ল্যাটফর্ম",
          description:
            "হোয়াটসঅ্যাপ, ফেসবুক, ইনস্টাগ্রাম, টেলিগ্রাম, ফোন কল, ইমেইল, ওয়াইফাই, ওয়েবসাইট, এসএমএস, যোগাযোগ কার্ড, আর সাধারণ টেক্সট — সব সঠিক deep-link ফরম্যাটে।",
        },
        {
          title: "ফুল রেজোলিউশন আউটপুট",
          description:
            "আপনার আসল ছবি হুবহু সংরক্ষিত — একই প্রস্থ, উচ্চতা, পিক্সেল সংখ্যা। শুধু ব্যাজটা উপর আঁকা হয়, কোনো কম্প্রেশন নেই।",
        },
        {
          title: "লাইভ প্রিভিউ",
          description:
            "প্রতিটা পরিবর্তন রিয়েল-টাইমে আপডেট হয় — আপনাকে অনুমান করতে হবে না। ডাউনলোডের আগেই আপনি দেখবেন চূড়ান্ত ছবি।",
        },
        {
          title: "১০০% প্রাইভেট",
          description:
            "সব প্রসেসিং আপনার ব্রাউজারেই HTML5 Canvas API দিয়ে। ফাইল কখনো আপলোড হয় না, সংরক্ষণ হয় না — ট্যাব বন্ধ করলেই মুছে যায়।",
        },
      ],
      faq: [
        {
          question: "ছবিতে QR যোগ করার পরেও কি স্ক্যান হবে?",
          answer:
            "হ্যাঁ, অবশ্যই। আমরা error-correction level H ব্যবহার করি — QR স্ট্যান্ডার্ডের সর্বোচ্চ। এই লেভেলে কোডের ৩০% পর্যন্ত ঢেকে গেলেও পড়া যায়। মাঝখানের প্ল্যাটফর্ম লোগো সেই নিরাপদ সীমার ভেতরেই থাকে, আর আমরা সবসময় লোগোর পিছনে একটা সাদা বা গোলাকার ব্যাকগ্রাউন্ড আঁকি যাতে আশেপাশের পিক্সেল পরিষ্কার থাকে। হাজার কপি প্রিন্ট করার আগে নিজের ফোন ক্যামেরা দিয়ে টেস্ট করে নিন — কিন্তু সাধারণ ব্যবহারে যেকোনো আধুনিক আইফোন বা অ্যান্ড্রয়েডে কোডটি সাথে সাথে স্ক্যান হয়।",
        },
        {
          question: "QR যোগ করলে ছবির কোয়ালিটি কমে যায়?",
          answer:
            "না। ডাউনলোড ক্লিক করলে ছবিটি প্রথমে তার আসল রেজোলিউশনে একটি off-screen ক্যানভাসে আঁকা হয়, তারপর QR ব্যাজটি native pixel quality-তে উপর আঁকা হয়। আউটপুট একটি PNG ফাইল — যার pixel dimension হুবহু আপনার আসল ছবির সমান। কোনো কম্প্রেশন নেই, downsampling নেই, re-encoding loss নেই। আপনার আসল ছবি যদি ফোন থেকে তোলা ৪০০০×৬০০০ হয়, ডাউনলোড PNG-ও ৪০০০×৬০০০ থাকবে — শুধু কোণায় ছোট QR ব্যাজ যোগ হবে।",
        },
        {
          question: "কোন ফাইল ফরম্যাট সাপোর্টেড?",
          answer:
            "JPG, PNG, WebP আপলোড করা যায়। প্রতি ফাইল সর্বোচ্চ ৫০ MB — যা যেকোনো আধুনিক ফোন বা ক্যামেরার তোলা ছবির জন্য যথেষ্ট। আউটপুট সবসময় PNG — কারণ PNG লসলেস, তাই আপনার আসল ছবি ও QR কোড দুটোই নিখুঁত থাকে। যদি আপনার নির্দিষ্টভাবে JPG দরকার হয়, তাহলে AHADEX লাইব্রেরির অন্য টুল দিয়ে ডাউনলোড করা PNG কনভার্ট করতে পারেন।",
        },
        {
          question: "ফলাফল কি ব্যবসায়িক কাজে ব্যবহার করা যাবে?",
          answer:
            "হ্যাঁ। আউটপুট ছবি সম্পূর্ণ আপনার — বিজনেস কার্ড, প্রোডাক্ট প্যাকেজিং, রেস্টুরেন্ট মেনু, কফি শপের টেবিল, ইভেন্ট পোস্টার, ডেলিভারি ফ্লায়ার, বিয়ের আমন্ত্রণপত্র, এবং অন্য যেকোনো প্রিন্ট বা ডিজিটাল ম্যাটেরিয়ালে ব্যবহার করতে পারেন — কোনো attribution, royalty, বা restriction ছাড়াই। শুধু মনে রাখবেন: আসল ছবিটা আপনার বা সঠিকভাবে লাইসেন্সড হতে হবে, আর QR-এ বসানো প্ল্যাটফর্ম লোগো সেই কোম্পানিগুলোর ট্রেডমার্ক — সেগুলো QR-এ ব্যবহার করতে পারেন কারণ সেটাই তাদের ডিজাইন, কিন্তু sponsorship বা endorsement-এর ইঙ্গিত দেওয়া উচিত নয়।",
        },
        {
          question: "আমার ছবি কি সার্ভারে আপলোড হয়?",
          answer:
            "কখনো না। Photo QR Code সম্পূর্ণ client-side টুল। সবকিছু — ফাইল পড়া, ছবি ডিকোড করা, QR তৈরি, ব্যাজ আঁকা, আর চূড়ান্ত PNG এক্সপোর্ট — আপনার ব্রাউজারেই Canvas API ও pure JavaScript দিয়ে হয়। আপনার ছবি কখনো ডিভাইস ছাড়ে না, নেটওয়ার্কে যায় না। পেজ লোড হওয়ার পর ইন্টারনেট বন্ধ করলেও টুলটি কাজ করবে। আপনি নিজেই যাচাই করতে পারেন — browser-এর developer tools খুলে Network tab দেখুন: ছবি আপলোড করার সময় শূন্য outbound request দেখবেন।",
        },
        {
          question: "মোবাইল ফোন বা ট্যাবলেটে কাজ করে?",
          answer:
            "হ্যাঁ। টুলটি সম্পূর্ণ responsive — iOS Safari, Android Chrome, Firefox for Android, Samsung Internet-এ পরীক্ষিত। ইন্টারফেস নিজেই নিজেকে সাজায় — ফোনে আপনি compact দুই column layout পাবেন যেখানে বাম দিকে settings আর ডান দিকে preview, আর ট্যাবলেট/ডেস্কটপে বড় আরামদায়ক layout। ফোনের photo library থেকে আপলোড, সরাসরি ক্যামেরা দিয়ে নতুন ছবি তোলা, আর ডাউনলোড PNG সেভ — সবই নিখুঁতভাবে কাজ করে।",
        },
        {
          question: "QR চূড়ান্ত ছবিতে খুব ছোট হলে কী হবে?",
          answer:
            "ডান পাশের প্যানেলে Size slider দিয়ে QR বড় করতে পারেন — এটা আপনার ছবির ছোট দিকের ১০% থেকে ৩৫% পর্যন্ত যায়। সাধারণ নিয়ম: ২০ সেমি দূর থেকে স্ক্যান করা হলে QR কমপক্ষে ২ সেমি চওড়া হওয়া উচিত, আর ১ মিটার দূর থেকে হলে কমপক্ষে ৪ সেমি। QR-এর চারপাশের সাদা প্যাডিং বাড়িয়েও ব্যাজটিকে ব্যস্ত বা অন্ধকার ব্যাকগ্রাউন্ড থেকে আলাদা করতে পারেন। এরপরও QR ছোট লাগলে, বর্গাকার আসল ছবি ব্যবহার করুন, বা QR যোগ করার আগে ছবিটি ক্রপ করুন।",
        },
      ],
      privacyNote:
        "আপনার ছবি সম্পূর্ণ আপনার ব্রাউজারেই HTML5 Canvas API দিয়ে প্রসেস হয়। কখনো আপলোড হয় না, সংরক্ষণ হয় না, কারো সাথে শেয়ার হয় না। ট্যাব বন্ধ করলেই ছবিটি মেমরি থেকে চলে যায় — কোনো সার্ভারে কিছু থাকে না, কারণ কোনো সার্ভারে কিছু পাঠানোই হয়নি।",
    },
  },

  seo: {
    title: "Photo QR Code — Add QR to Photos Free | AHADEX Tools",
    description:
      "Add a real, scannable QR code to any photo. WhatsApp, Facebook, Instagram, WiFi, and more. Free, private, no uploads.",
    ogImage: "/images/og/tools/photo-qr-og.jpg",
  },

  relatedTools: ["qr-code-generator", "qr-code-with-logo", "wifi-qr-generator"],
};

export type PhotoQrData = typeof photoQrData;

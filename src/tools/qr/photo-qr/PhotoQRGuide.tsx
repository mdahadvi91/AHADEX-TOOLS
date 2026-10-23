import { useLanguage } from "@contexts/LanguageContext";

/** Practical, bilingual guide written for Photo QR users. Keep claims tied to observable behavior. */
export function PhotoQRGuide() {
  const { language } = useLanguage();
  const bn = language === "bn";

  return (
    <article
      aria-labelledby="photo-qr-guide-title"
      className="mx-auto my-10 sm:my-14 max-w-4xl rounded-3xl border border-silk-rose/20 bg-white/80 p-5 sm:p-8 lg:p-10 text-light-text dark:bg-dark-surface/80 dark:text-dark-text"
    >
      <header className="mb-8 border-b border-silk-rose/20 pb-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-silk-rose">
          {bn ? "ব্যবহারিক গাইড" : "Practical guide"}
        </p>
        <h2 id="photo-qr-guide-title" className="mb-4 text-2xl font-bold leading-tight sm:text-3xl">
          {bn
            ? "ছবির সঙ্গে QR কোড যোগ করার আগে যে বিষয়গুলো জানা দরকার"
            : "What to Know Before Adding a QR Code to a Photo"}
        </h2>
        <p className="text-base leading-7 text-light-textSecondary dark:text-dark-textSecondary">
          {bn
            ? "একটি ছবির ওপর QR কোড বসালে পোস্টার, প্যাকেজিং, বিজনেস কার্ড বা সোশ্যাল পোস্ট থেকে মানুষ দ্রুত কোনো লিংক, যোগাযোগের তথ্য বা অন্য কোনো বার্তায় পৌঁছাতে পারে। তবে শুধু QR যোগ করলেই কাজ শেষ নয়। কোডটি স্ক্যান করা সহজ কি না এবং স্ক্যান করলে ঠিক জায়গায় যায় কি না, সেটিও গুরুত্বপূর্ণ।"
            : "Adding a QR code to a photo can help people move from a poster, package, business card, or social post to a link, contact detail, or message. But placing a code on an image is only part of the job. People also need to be able to scan it easily and reach the right destination."}
        </p>
      </header>

      <div className="space-y-8 text-sm leading-7 text-light-textSecondary dark:text-dark-textSecondary sm:text-base">
        <section>
          <h3 className="mb-2 text-lg font-bold text-light-text dark:text-dark-text sm:text-xl">
            {bn ? "১. আগে ঠিক করুন QR স্ক্যান করলে কী হবে" : "1. Decide what the scan should do"}
          </h3>
          <p>
            {bn
              ? "QR কোড বানানোর আগে তার গন্তব্য ঠিক করে নিন। এটি কি ওয়েবসাইট খুলবে, WhatsApp-এ চ্যাট শুরু করবে, Wi-Fi-তে যুক্ত হতে সাহায্য করবে, নাকি যোগাযোগের তথ্য দেখাবে? গন্তব্য পরিষ্কার হলে সঠিক অপশন বেছে নেওয়া সহজ হয়। ওয়েবসাইটের লিংক ব্যবহার করলে সেটি অন্য ফোনে খুলে দেখে নিন এবং লিংকটি প্রকাশের পরেও চালু থাকবে কি না ভাবুন।"
              : "Choose the destination before generating the code. Should it open a website, start a WhatsApp chat, help someone join Wi-Fi, or share contact details? A clear purpose makes it easier to choose the right option. If you use a website link, open it on another device and make sure it is the intended page."}
          </p>
        </section>

        <section>
          <h3 className="mb-2 text-lg font-bold text-light-text dark:text-dark-text sm:text-xl">
            {bn ? "২. ছবির কোথায় QR রাখবেন?" : "2. Choose a spot where the code can be scanned"}
          </h3>
          <p>
            {bn
              ? "এমন জায়গায় QR রাখুন যেখানে মুখ, পণ্যের নাম, গুরুত্বপূর্ণ লেখা বা ছবির মূল বিষয় ঢেকে যায় না। খুব ব্যস্ত ব্যাকগ্রাউন্ডের ওপর বসালে কোডের চারপাশের পার্থক্য বোঝা কঠিন হতে পারে। সাদা ব্যাকগ্রাউন্ড বা ফাঁকা মার্জিন কোডকে ছবির বাকি অংশ থেকে আলাদা করে দেখতে সাহায্য করে। ডিজাইন সুন্দর দেখালেই যে স্ক্যান হবে, এমন কোনো জাদুকরী নিয়ম নেই।"
              : "Place the QR where it will not cover a face, product name, essential text, or the main subject of the photo. A busy background can make the code harder to distinguish. A light background or clear margin helps separate the code from the image. Attractive design alone does not guarantee a successful scan."}
          </p>
        </section>

        <section>
          <h3 className="mb-2 text-lg font-bold text-light-text dark:text-dark-text sm:text-xl">
            {bn ? "৩. সাইজ ঠিক করুন ব্যবহারের জায়গা অনুযায়ী" : "3. Match the QR size to where it will be used"}
          </h3>
          <p>
            {bn
              ? "ফোনের স্ক্রিনে দেখা ছোট ছবির জন্য যে সাইজ চলে, দূর থেকে স্ক্যান করতে হবে এমন পোস্টার বা প্রিন্টে সেটি যথেষ্ট নাও হতে পারে। কোনো একক সাইজ সব পরিস্থিতিতে কাজ করে না। স্ক্যানের দূরত্ব, প্রিন্টের মান, ছবির রেজোলিউশন এবং কোডের জটিলতা ফলাফলে প্রভাব ফেলে। তাই চূড়ান্ত PNG ব্যবহার করার আগে নিজের ফোন দিয়ে স্ক্যান করে দেখুন।"
              : "A size that works on a small image viewed on a phone may be too small for a poster scanned from farther away. There is no single size that suits every situation. Scanning distance, print quality, image resolution, and code complexity all matter. Test the final PNG with a phone before using it publicly or sending it to print."}
          </p>
        </section>

        <section>
          <h3 className="mb-2 text-lg font-bold text-light-text dark:text-dark-text sm:text-xl">
            {bn ? "৪. ডাউনলোডের পর পরীক্ষা করুন" : "4. Test the exported image"}
          </h3>
          <p>
            {bn
              ? "ডাউনলোড করা ছবিটি শুধু প্রিভিউতে দেখে সিদ্ধান্ত নেবেন না। সম্ভব হলে অন্য একটি ফোনের ক্যামেরা দিয়ে QR স্ক্যান করুন, গন্তব্য ঠিক আছে কি না যাচাই করুন এবং স্ক্রিনের পাশাপাশি প্রিন্ট করা কপিতেও পরীক্ষা করুন। প্রিন্টের আগে ভুল লিংক ধরা পড়লে সহজে ঠিক করা যায়; হাজার কপি ছাপার পরে বিষয়টি বেশ ব্যয়বহুল শিক্ষা হয়ে দাঁড়ায়।"
              : "Do not rely on the preview alone. If possible, scan the downloaded image with a second phone, confirm that it opens the correct destination, and test a printed copy if you plan to print it. Finding a broken link before printing is easy; discovering it after a large print run is a much more expensive lesson."}
          </p>
        </section>

        <section>
          <h3 className="mb-2 text-lg font-bold text-light-text dark:text-dark-text sm:text-xl">
            {bn ? "৫. কোন কাজে Photo QR ব্যবহার করা যায়?" : "5. Practical ways to use a Photo QR"}
          </h3>
          <p>
            {bn
              ? "ছবির সঙ্গে QR কোড ব্যবহার করা যেতে পারে পণ্যের প্যাকেজিং, রেস্তোরাঁর মেনু, ইভেন্টের পোস্টার, ব্যবসায়িক কার্ড, নির্দেশনামূলক লিফলেট বা সোশ্যাল মিডিয়ার গ্রাফিকে। প্রতিটি ক্ষেত্রে স্ক্যান করার কারণটি পরিষ্কার রাখুন। উদাহরণ হিসেবে, মেনুর পাশে থাকা QR যেন সত্যিই মেনু খোলে, আর ইভেন্ট পোস্টারের QR যেন টিকিট বা ইভেন্টের তথ্যের দিকে নিয়ে যায়।"
              : "A Photo QR can be useful on product packaging, restaurant menus, event posters, business cards, instruction sheets, or social graphics. Make the reason to scan obvious. A QR beside a menu should open the menu, while one on an event poster should lead to the event details or ticket page."}
          </p>
        </section>

        <section>
          <h3 className="mb-2 text-lg font-bold text-light-text dark:text-dark-text sm:text-xl">
            {bn ? "৬. গোপনীয়তা ও ফাইল সম্পর্কে বাস্তব কথা" : "6. Be clear about privacy and file handling"}
          </h3>
          <p>
            {bn
              ? "ব্যক্তিগত ছবি ব্যবহারের আগে টুলটি ফাইল কীভাবে প্রসেস করে তা বুঝে নিন। কোনো টুলে ছবি ব্রাউজারের ভেতরে প্রসেস হলে সেটি সার্ভারে আপলোড হওয়া থেকে আলাদা বিষয়; তবে এমন দাবি কোড যাচাই না করে করা উচিত নয়। সংবেদনশীল ছবি ব্যবহার না করাই ভালো, বিশেষ করে যদি ফাইল হ্যান্ডলিং সম্পর্কে নিশ্চিত না হন।"
              : "Before using a personal image, understand how the tool handles files. Processing an image in the browser is different from uploading it to a server, but that privacy claim should only be made after checking the implementation. Avoid using sensitive images if you are unsure how a tool handles them."}
          </p>
        </section>

        <aside className="rounded-2xl border border-silk-rose/25 bg-silk-rose/5 p-4 sm:p-5">
          <h3 className="mb-2 font-bold text-light-text dark:text-dark-text">
            {bn ? "ডাউনলোডের আগে ছোট চেকলিস্ট" : "A quick checklist before you download"}
          </h3>
          <ul className="list-disc space-y-1 pl-5">
            <li>{bn ? "সঠিক প্ল্যাটফর্ম ও গন্তব্য বেছে নিয়েছেন" : "The platform and destination are correct"}</li>
            <li>{bn ? "QR গুরুত্বপূর্ণ লেখা বা ছবির বিষয় ঢেকে রাখেনি" : "The QR does not cover important content"}</li>
            <li>{bn ? "কোডের চারপাশে যথেষ্ট পরিষ্কার জায়গা আছে" : "There is clear space around the code"}</li>
            <li>{bn ? "ডাউনলোড করা ছবিটি স্ক্যান করে পরীক্ষা করেছেন" : "You tested the downloaded image by scanning it"}</li>
          </ul>
        </aside>
      </div>
    </article>
  );
}

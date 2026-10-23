import { useLanguage } from "@contexts/LanguageContext";
import { motion } from "framer-motion";

export function HomeFAQ() {
  const { language } = useLanguage();
  const bn = language === "bn";

  const faqs = [
    {
      q: bn ? "এই টুলগুলো কি সত্যিই ফ্রি?" : "Are these tools really free?",
      a: bn ? "হ্যাঁ — সব টুল সম্পূর্ণ ফ্রি। কোনো লুকানো সীমা, সাইন-আপ বা সাবস্ক্রিপশন নেই। সাইটটি বিজ্ঞাপনের মাধ্যমে সাপোর্ট করে।" : "Yes — every tool is completely free with no hidden limits, no sign-ups, and no subscriptions. The site is supported by non-intrusive advertising.",
    },
    {
      q: bn ? "আমার ফাইল কি সার্ভারে আপলোড হয়?" : "Are my files uploaded to a server?",
      a: bn ? "না। সব টুল আধুনিক ওয়েব API ব্যবহার করে সরাসরি আপনার ব্রাউজারে চলে। আপনার ফাইল লোকালি প্রসেস হয় এবং কোনো সার্ভারে আপলোড বা সংরক্ষণ করা হয় না।" : "No. All tools run directly in your browser using modern web APIs. Your files are processed locally and are not uploaded or stored on our servers.",
    },
    {
      q: bn ? "আমার ডেটা কি ট্র্যাক করা হয়?" : "Is my data tracked?",
      a: bn ? "আপনার ফাইল প্রসেস করার সময় আমরা কোনো ডেটা ট্র্যাক করি না। তবে সাইটের পারফরম্যান্স এবং বিজ্ঞাপনের জন্য স্ট্যান্ডার্ড অ্যানালিটিক্স ব্যবহার করা হতে পারে।" : "We do not track the contents of your files. However, standard website analytics and ad scripts may run on the page to improve performance and serve ads.",
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
          {bn ? "সাধারণ প্রশ্ন" : "Frequently Asked Questions"}
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
            >
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{faq.q}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

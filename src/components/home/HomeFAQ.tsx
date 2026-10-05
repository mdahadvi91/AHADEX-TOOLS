import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, HelpCircle } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";

const FAQS_EN = [
  {
    question: "Is AHADEX Tools really free?",
    answer:
      "Yes — every tool is 100% free with no hidden limits, no sign-ups, and no subscriptions. The site is supported by non-intrusive advertising.",
  },
  {
    question: "Are my files safe?",
    answer:
      "Absolutely. All tools run directly in your browser using modern web APIs. Your files are never uploaded to our servers, never stored, and never tracked.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No account needed. Just open the site, pick a tool, and use it. Your theme and language preferences are stored locally in your browser.",
  },
  {
    question: "How many tools are available?",
    answer:
      "We currently offer 35+ free tools for images, PDFs, documents, text, and developer tasks. New tools are added regularly.",
  },
  {
    question: "Does it work on mobile?",
    answer:
      "Yes — AHADEX Tools is fully responsive and works on phones, tablets, and desktops. All tools are touch-friendly.",
  },
  {
    question: "Is there an app?",
    answer:
      "You can install AHADEX Tools as a Progressive Web App (PWA) from your browser menu. It works offline for most tools.",
  },
];

const FAQS_BN = [
  {
    question: "AHADEX Tools কি সত্যিই ফ্রি?",
    answer:
      "হ্যাঁ — প্রতিটি টুল ১০০% ফ্রি, কোনো গোপন সীমা নেই, সাইন-আপ নেই, সাবস্ক্রিপশন নেই। সাইটটি শুধু বিজ্ঞাপনে চলে।",
  },
  {
    question: "আমার ফাইল কি নিরাপদ?",
    answer:
      "অবশ্যই। সব টুল সরাসরি আপনার ব্রাউজারে চলে। আপনার ফাইল কখনো আমাদের সার্ভারে যায় না, সংরক্ষিত হয় না।",
  },
  {
    question: "অ্যাকাউন্ট খুলতে হবে কি?",
    answer:
      "না। সাইট খুলুন, টুল বেছে নিন, ব্যবহার করুন। আপনার থিম ও ভাষার পছন্দ আপনার ব্রাউজারেই থাকে।",
  },
  {
    question: "কতগুলো টুল আছে?",
    answer:
      "আমরা ইমেজ, PDF, ডকুমেন্ট, টেক্সট ও ডেভেলপার কাজের জন্য ৩৫+ ফ্রি টুল অফার করছি। নিয়মিত নতুন টুল যোগ হচ্ছে।",
  },
  {
    question: "মোবাইলে কাজ করে?",
    answer:
      "হ্যাঁ — সম্পূর্ণ responsive, ফোন, ট্যাব, ডেস্কটপ সবখানে চলে। সব টুল touch-friendly।",
  },
  {
    question: "কোনো অ্যাপ আছে?",
    answer:
      "ব্রাউজার থেকে PWA হিসেবে ইনস্টল করতে পারেন। বেশিরভাগ টুল অফলাইনে কাজ করে।",
  },
];

export function HomeFAQ() {
  const { language, t } = useLanguage();
  const [open, setOpen] = useState<number | null>(0);
  const faqs = language === "bn" ? FAQS_BN : FAQS_EN;

  return (
    <section className="relative py-20 sm:py-28">
      {/* Section header */}
      <div className="text-center mb-12 sm:mb-14 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-silk-rose/10 border border-silk-rose/25 mb-5"
        >
          <HelpCircle className="w-3.5 h-3.5 text-silk-rose" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-silk-wine dark:text-silk-rose-soft font-bold">
            {t.home.faqEyebrow}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.025em] text-light-text dark:text-dark-text"
        >
          {t.home.faqTitle1}{" "}
          <span className="font-script text-silk-rose text-[1.15em]">
            {t.home.faqTitle2}
          </span>
        </motion.h2>
      </div>

      {/* FAQ list */}
      <div className="max-w-3xl mx-auto space-y-2.5">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={cn(
                "rounded-2xl border overflow-hidden transition-all duration-300",
                isOpen
                  ? "bg-white/90 dark:bg-dark-surface/90 border-silk-rose/45 shadow-[0_12px_32px_-16px_rgba(139,58,79,0.3)]"
                  : "bg-white/60 dark:bg-dark-surface/60 border-silk-rose/15 hover:border-silk-rose/35"
              )}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left"
              >
                <span
                  className={cn(
                    "font-serif font-bold text-[14px] sm:text-[16px] tracking-[-0.01em] transition-colors",
                    isOpen
                      ? "text-silk-wine dark:text-silk-rose-soft"
                      : "text-light-text dark:text-dark-text"
                  )}
                >
                  {faq.question}
                </span>

                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors duration-300",
                    isOpen
                      ? "bg-gradient-to-br from-silk-rose to-silk-wine-deep text-white shadow-[0_6px_16px_-6px_rgba(139,58,79,0.5)]"
                      : "bg-silk-rose/15 text-silk-rose"
                  )}
                >
                  <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.4} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                      <div className="h-px w-full bg-gradient-to-r from-silk-rose/30 via-silk-rose/10 to-transparent mb-4" />
                      <p className="text-[13px] sm:text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

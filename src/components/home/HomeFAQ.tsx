import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
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
      "We currently offer 17 free tools for images, PDFs, documents, and text. More tools are added regularly.",
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
      "আমরা ইমেজ, PDF, ডকুমেন্ট ও টেক্সটের জন্য ১৭টি ফ্রি টুল অফার করছি। নিয়মিত নতুন টুল যোগ হচ্ছে।",
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
    <section className="cv-auto relative py-16 sm:py-20">
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-silk-rose animate-soft-pulse" />
          <p className="text-[11px] uppercase tracking-[0.3em] text-silk-wine/70 dark:text-silk-rose/60 font-semibold">
            {t.home.faqEyebrow}
          </p>
        </div>

        <h2 className="font-display font-bold text-3xl sm:text-4xl leading-[1.1] tracking-tight text-light-text dark:text-dark-text">
          {t.home.faqTitle1}{" "}
          <span className="font-script text-silk-rose text-[1.1em]">
            {t.home.faqTitle2}
          </span>
        </h2>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className={cn(
                "rounded-2xl border transition-all duration-300 overflow-hidden",
                isOpen
                  ? "bg-white/85 dark:bg-dark-surface/85 border-silk-rose/40 shadow-silk-soft"
                  : "bg-white/60 dark:bg-dark-surface/60 border-silk-rose/15 hover:border-silk-rose/30"
              )}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-display font-semibold text-sm sm:text-base text-light-text dark:text-dark-text">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors",
                    isOpen
                      ? "bg-silk-rose text-white"
                      : "bg-silk-rose/15 text-silk-rose"
                  )}
                >
                  <Plus className="w-3.5 h-3.5" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

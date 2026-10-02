import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { photoQrContent } from "./content";

interface FAQProps {
  faqs: typeof photoQrContent.en.faq;
}

export function FAQ({ faqs }: FAQProps) {
  const { language } = useLanguage();

  return (
    <section className="max-w-3xl mb-14">
      <h2 className="font-display font-bold text-2xl sm:text-3xl text-light-text dark:text-dark-text mb-6">
        {language === "bn" ? "প্রশ্নোত্তর" : "FAQ"}
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <FAQItem
            key={i}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-2xl border transition-all duration-300 overflow-hidden",
        open
          ? "bg-white/85 dark:bg-dark-surface/85 border-silk-rose/40 shadow-silk-soft"
          : "bg-white/60 dark:bg-dark-surface/60 border-silk-rose/15 hover:border-silk-rose/30"
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-display font-semibold text-[14px] sm:text-[15px] text-light-text dark:text-dark-text leading-snug">
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 text-silk-rose"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-[13px] sm:text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

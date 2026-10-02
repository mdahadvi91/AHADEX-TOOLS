import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { imageCropperContent } from "../content";

export function FAQ() {
  const { language } = useLanguage();
  const c = imageCropperContent[language];
  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display font-black text-2xl sm:text-3xl text-light-text dark:text-dark-text mb-8 text-center">{c.faqTitle}</h2>
        <div className="space-y-2.5">{c.faq.map((item, i) => (<Item key={i} q={item.question} a={item.answer} />))}</div>
      </div>
    </section>
  );
}

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("rounded-2xl border transition-all overflow-hidden", open ? "bg-white/85 dark:bg-dark-surface/85 border-silk-rose/40" : "bg-white/60 dark:bg-dark-surface/60 border-silk-rose/15")}>
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="w-full flex items-center justify-between gap-4 px-4 py-3.5 text-left">
        <span className="font-display font-semibold text-[13px] sm:text-[14px] text-light-text dark:text-dark-text leading-snug">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0 text-silk-rose"><ChevronDown className="w-4 h-4" /></motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }} className="overflow-hidden"><p className="px-4 pb-4 text-[12px] sm:text-[13px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">{a}</p></motion.div>)}
      </AnimatePresence>
    </div>
  );
}

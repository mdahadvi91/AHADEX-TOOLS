import { motion } from "framer-motion";
import { useLanguage } from "@contexts/LanguageContext";
import { pdfRotatorContent } from "../content";

export function HowTo() {
  const { language } = useLanguage();
  const c = pdfRotatorContent[language];
  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display font-black text-2xl sm:text-3xl text-light-text dark:text-dark-text mb-8 text-center">{c.howToTitle}</h2>
        <ol className="space-y-3">
          {c.howTo.map((s, i) => (
            <motion.li key={s.step} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: i * 0.07 }} className="flex gap-4 p-4 rounded-2xl bg-white/60 dark:bg-dark-surface/60 backdrop-blur-xl border border-silk-rose/15">
              <span className="shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-silk-rose to-silk-wine-deep text-white text-sm font-bold flex items-center justify-center shadow-silk-soft">{s.step}</span>
              <div><h3 className="font-display font-semibold text-light-text dark:text-dark-text text-[14px] sm:text-[15px] mb-1">{s.title}</h3><p className="text-[12px] sm:text-[13px] text-lightTextSecondary dark:text-dark-textSecondary leading-relaxed">{s.description}</p></div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

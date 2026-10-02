import { motion } from "framer-motion";
import { useLanguage } from "@contexts/LanguageContext";
import { pngToPdfContent } from "../content";

export function Intro() {
  const { language } = useLanguage();
  const c = pngToPdfContent[language];
  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-10">
          {c.introHighlights.map((h, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: i * 0.05 }} className="p-3.5 rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/15">
              <span className="text-2xl block mb-2">{h.emoji}</span>
              <h3 className="font-display font-bold text-[12px] sm:text-sm text-light-text dark:text-dark-text mb-1 leading-tight">{h.title}</h3>
              <p className="text-[10px] sm:text-[11px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">{h.text}</p>
            </motion.div>
          ))}
        </div>
        <div className="space-y-4">
          {c.introBlocks.map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: i * 0.05 }} className="p-5 sm:p-6 rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/15">
              <div className="flex items-start gap-3"><span className="text-3xl shrink-0">{b.emoji}</span><div className="min-w-0 flex-1"><h3 className="font-display font-bold text-base sm:text-lg text-light-text dark:text-dark-text mb-1.5">{b.title}</h3><p className="text-[13px] sm:text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">{b.text}</p></div></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

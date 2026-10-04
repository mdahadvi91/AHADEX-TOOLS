import { motion } from "framer-motion";
import { useLanguage } from "@contexts/LanguageContext";
import { uuidGeneratorContent } from "../content";

export function Features() {
  const { language } = useLanguage();
  const c = uuidGeneratorContent[language];
  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display font-black text-2xl sm:text-3xl text-light-text dark:text-dark-text mb-8 text-center">{c.featuresTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {c.features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: i * 0.05 }} className="p-4 rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/15">
              <span className="text-2xl block mb-2">{f.emoji}</span>
              <h3 className="font-display font-bold text-sm text-light-text dark:text-dark-text mb-1.5">{f.title}</h3>
              <p className="text-[12px] text-lightTextSecondary dark:text-dark-textSecondary leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

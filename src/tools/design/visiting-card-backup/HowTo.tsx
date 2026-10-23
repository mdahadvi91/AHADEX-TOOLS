import { motion } from "framer-motion";
import { useLanguage } from "@contexts/LanguageContext";
import { visitingCardContent } from "./content";

export function HowTo() {
  const { language } = useLanguage();
  const content = visitingCardContent[language];

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-light-text dark:text-dark-text mb-8 sm:mb-10 text-center"
        >
          {content.howToTitle}
        </motion.h2>

        <ol className="space-y-4">
          {content.howTo.map((step, i) => (
            <motion.li
              key={step.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex gap-4 p-4 sm:p-5 rounded-2xl bg-white/60 dark:bg-dark-surface/60 backdrop-blur-xl border border-silk-rose/15"
            >
              <span className="shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-silk-rose to-silk-wine-deep text-white text-sm font-bold flex items-center justify-center shadow-silk-soft">
                {step.step}
              </span>
              <div>
                <h3 className="font-display font-semibold text-light-text dark:text-dark-text text-[15px] sm:text-base mb-1.5">
                  {step.title}
                </h3>
                <p className="text-[13px] sm:text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

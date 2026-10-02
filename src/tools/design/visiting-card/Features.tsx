import { motion } from "framer-motion";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { visitingCardContent } from "./content";

export function Features() {
  const { language } = useLanguage();
  const content = visitingCardContent[language];

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-light-text dark:text-dark-text mb-8 sm:mb-10 text-center"
        >
          {content.featuresTitle}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {content.features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={cn(
                "group relative p-4 sm:p-5 rounded-2xl",
                "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl",
                "border border-silk-rose/15 hover:border-silk-rose/45",
                "hover:-translate-y-1 transition-all duration-500"
              )}
            >
              <span className="text-2xl sm:text-3xl block mb-2.5 group-hover:scale-110 transition-transform duration-500">
                {f.emoji}
              </span>
              <h3 className="font-display font-bold text-sm sm:text-base text-light-text dark:text-dark-text mb-1.5 leading-tight">
                {f.title}
              </h3>
              <p className="text-[12px] sm:text-[13px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

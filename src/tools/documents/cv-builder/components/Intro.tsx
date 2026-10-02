import { motion } from "framer-motion";
import { Sparkles, Printer, Target, Lock } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { useReducedMotion } from "@hooks/useReducedMotion";
import { cn } from "@lib/cn";
import { cvBuilderContent } from "../content";

const ICONS = { sparkle: Sparkles, printer: Printer, target: Target, lock: Lock };

export function CVBuilderIntro() {
  const { language } = useLanguage();
  const prefersReduced = useReducedMotion();
  const c = cvBuilderContent[language];

  return (
    <section className="relative py-10 sm:py-14">
      <div className="max-w-4xl mx-auto">
        {/* Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4 mb-10 sm:mb-14">
          {c.introHighlights.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="p-3.5 sm:p-4 rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/15 hover:border-silk-rose/40 transition-all"
            >
              <span className="text-2xl sm:text-3xl block mb-2">{h.emoji}</span>
              <h3 className="font-display font-bold text-[12px] sm:text-sm text-light-text dark:text-dark-text mb-1 leading-tight">
                {h.title}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                {h.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Blocks */}
        <div className="space-y-4">
          {c.introBlocks.map((b, i) => {
            const Icon = ICONS[b.icon as keyof typeof ICONS] ?? Sparkles;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={cn(
                  "p-5 sm:p-6 rounded-2xl",
                  "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl",
                  "border border-silk-rose/15 hover:border-silk-rose/40",
                  "transition-all"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="shrink-0 flex flex-col items-center gap-1.5">
                    <span className="text-3xl sm:text-4xl">{b.emoji}</span>
                    <span className="w-9 h-9 rounded-xl bg-silk-rose/15 border border-silk-rose/25 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-silk-rose" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display font-bold text-base sm:text-lg text-light-text dark:text-dark-text mb-1.5">
                      {b.title}
                    </h3>
                    <p className="text-[13px] sm:text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                      {b.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

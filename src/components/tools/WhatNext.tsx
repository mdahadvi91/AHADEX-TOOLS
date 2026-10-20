import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@contexts/LanguageContext";

export interface WhatNextAction {
  emoji: string;
  label: string;
  to: string;
  action: string;
}

interface WhatNextProps {
  actions: WhatNextAction[];
  title?: string;
}

export function WhatNext({ actions, title }: WhatNextProps) {
  const { language } = useLanguage();
  const bn = language === "bn";
  if (actions.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="mt-6 mb-2 rounded-3xl border border-silk-rose/25 bg-gradient-to-br from-silk-rose/8 via-silk-gold/5 to-transparent p-5 sm:p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-silk-gold" />
        <h3 className="font-serif font-black text-lg sm:text-xl text-light-text dark:text-dark-text">
          {title || (bn ? "এরপর কী করবেন?" : "What's next?")}
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {actions.map((a, i) => (
          <Link
            key={i}
            to={a.to}
            className="group flex items-start gap-3 p-3.5 rounded-xl bg-white/70 dark:bg-dark-surface/70 border border-silk-rose/20 hover:border-silk-rose/50 hover:shadow-md transition-all"
          >
            <span className="text-2xl shrink-0">{a.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-bold text-light-text dark:text-dark-text leading-tight mb-0.5">
                {a.label}
              </p>
              <p className="text-[10px] text-light-textSecondary dark:text-dark-textSecondary leading-snug">
                {a.action}
              </p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-silk-rose shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        ))}
      </div>
    </motion.section>
  );
}

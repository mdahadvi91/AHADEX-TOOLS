import { Search, MousePointerClick, Download } from "lucide-react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@hooks/useReducedMotion";
import { useLanguage } from "@contexts/LanguageContext";

const ICONS = [Search, MousePointerClick, Download];

export function HowItWorks() {
  const prefersReduced = useReducedMotion();
  const { language } = useLanguage();
  const bn = language === "bn";

  const steps = [
    {
      number: "01",
      title: bn ? "টুল খুঁজুন" : "Find your tool",
      description: bn
        ? "সার্চ বা ফিল্টার করে ঠিক যে টুলটি দরকার সেটি খুঁজে নিন।"
        : "Search or filter the full tool list to find exactly what you need.",
    },
    {
      number: "02",
      title: bn ? "সাথে সাথে ব্যবহার" : "Use it instantly",
      description: bn
        ? "আপলোড বা টাইপ করুন। সব আপনার ব্রাউজারেই প্রসেস হয়।"
        : "Upload or type. Everything processes right in your browser.",
    },
    {
      number: "03",
      title: bn ? "ডাউনলোড করুন" : "Download the result",
      description: bn
        ? "এক ক্লিকে সেভ। আপনার ফাইল কোথাও যায় না।"
        : "One click to save. Your file never touched a server.",
    },
  ];

  return (
    <section className="relative py-20 sm:py-28">
      {/* Section header */}
      <div className="text-center mb-14 sm:mb-16 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-silk-rose/10 border border-silk-rose/25 mb-5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-silk-rose animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-silk-wine dark:text-silk-rose-soft font-bold">
            {bn ? "কীভাবে কাজ করে" : "How it works"}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.025em] text-light-text dark:text-dark-text"
        >
          {bn ? "মাত্র " : "Three steps to "}
          <span className="font-script text-silk-rose text-[1.15em]">
            {bn ? "৩ ধাপে শেষ।" : "get things done."}
          </span>
        </motion.h2>
      </div>

      {/* Steps grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
        {/* Connecting line (desktop only) */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute top-[42px] left-[calc(16.66%+40px)] right-[calc(16.66%+40px)] h-px"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="h-full origin-left bg-gradient-to-r from-silk-rose/50 via-silk-rose/30 to-silk-rose/50"
          />
        </div>

        {steps.map((step, i) => {
          const Icon = ICONS[i] ?? Search;
          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.55,
                delay: 0.15 + i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Icon circle with pulse */}
              <div className="relative mb-6">
                {/* Outer pulse */}
                <motion.span
                  aria-hidden="true"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: [0, 0.4, 0], scale: [0.8, 1.2, 1.4] }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 2,
                    delay: 0.8 + i * 0.15,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  className="absolute inset-0 rounded-3xl bg-silk-rose/40 blur-md"
                />

                <div
                  className={cn(
                    "relative w-[84px] h-[84px] rounded-3xl flex items-center justify-center",
                    "bg-gradient-to-br from-silk-rose via-silk-rose-deep to-silk-wine",
                    "shadow-[0_16px_36px_-12px_rgba(139,58,79,0.55),inset_0_1px_0_rgba(255,255,255,0.3)]",
                    "group-hover:scale-105 group-hover:rotate-2",
                    "transition-transform duration-500"
                  )}
                >
                  <Icon className="w-8 h-8 text-white" strokeWidth={1.8} />

                  {/* Step number badge */}
                  <span
                    className={cn(
                      "absolute -top-2 -right-2 w-8 h-8 rounded-full",
                      "bg-silk-cream dark:bg-[#32202A]",
                      "border-2 border-silk-rose/40",
                      "flex items-center justify-center",
                      "text-[10px] font-mono font-black text-silk-rose",
                      "shadow-[0_4px_12px_-4px_rgba(139,58,79,0.4)]"
                    )}
                  >
                    {step.number}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-serif font-bold text-lg sm:text-xl text-light-text dark:text-dark-text mb-2.5 tracking-[-0.015em]">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[13px] sm:text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed max-w-[280px]">
                {step.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* Helper */
function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

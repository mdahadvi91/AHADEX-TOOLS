import { Shield, Zap, Heart, Wand2 } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@contexts/LanguageContext";
import { useReducedMotion } from "@hooks/useReducedMotion";
import { cn } from "@lib/cn";

const ICONS = [Shield, Zap, Heart, Wand2];

export function WhySection() {
  const { t } = useLanguage();
  const prefersReduced = useReducedMotion();

  const features = [
    { title: t.home.whyPrivateTitle, description: t.home.whyPrivateDesc },
    { title: t.home.whyFastTitle, description: t.home.whyFastDesc },
    { title: t.home.whySimpleTitle, description: t.home.whySimpleDesc },
    { title: t.home.whyFreeTitle, description: t.home.whyFreeDesc },
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
            {t.home.whyEyebrow}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.025em] text-light-text dark:text-dark-text"
        >
          {t.home.whyTitle1}{" "}
          <span className="font-script text-silk-rose text-[1.15em]">
            {t.home.whyTitle2}
          </span>
        </motion.h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {features.map((feature, i) => {
          const Icon = ICONS[i] ?? Shield;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.55,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(
                "group relative p-6 rounded-3xl overflow-hidden",
                "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl",
                "border border-silk-rose/15",
                "hover:border-silk-rose/50",
                "hover:-translate-y-1.5",
                "hover:shadow-[0_20px_45px_-18px_rgba(139,58,79,0.35)]",
                "transition-all duration-500"
              )}
            >
              {/* Corner glow on hover */}
              <span
                aria-hidden="true"
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(216,139,154,0.45) 0%, transparent 70%)",
                  filter: "blur(28px)",
                }}
              />

              {/* Icon container */}
              <div className="relative mb-5 inline-flex">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-2xl bg-silk-rose/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <span
                  className={cn(
                    "relative inline-flex w-12 h-12 rounded-2xl items-center justify-center",
                    "bg-gradient-to-br from-silk-rose/20 via-silk-rose/10 to-silk-gold/15",
                    "border border-silk-rose/30",
                    "shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]",
                    "group-hover:scale-110 group-hover:rotate-3",
                    "transition-all duration-500"
                  )}
                >
                  <Icon className="w-5 h-5 text-silk-rose" />
                </span>
              </div>

              {/* Title */}
              <h3 className="relative font-serif font-bold text-base sm:text-lg text-light-text dark:text-dark-text mb-2 tracking-[-0.01em]">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="relative text-[13px] sm:text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

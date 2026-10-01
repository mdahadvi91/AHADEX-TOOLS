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
    <section className="relative py-16 sm:py-20">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-silk-rose animate-soft-pulse" />
          <p className="text-[11px] uppercase tracking-[0.3em] text-silk-wine/70 dark:text-silk-rose/60 font-semibold">
            {t.home.whyEyebrow}
          </p>
        </div>

        <h2 className="font-display font-bold text-3xl sm:text-4xl leading-[1.1] tracking-tight text-light-text dark:text-dark-text">
          {t.home.whyTitle1}{" "}
          <span className="font-script text-silk-rose text-[1.1em]">
            {t.home.whyTitle2}
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, i) => {
          const Icon = ICONS[i] ?? Shield;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={cn(
                "group relative p-6 rounded-3xl",
                "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl",
                "border border-silk-rose/15 hover:border-silk-rose/50",
                "hover:-translate-y-1",
                "transition-all duration-500"
              )}
            >
              <span className="inline-flex w-12 h-12 rounded-2xl bg-silk-rose/15 border border-silk-rose/25 items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <Icon className="w-5 h-5 text-silk-rose" />
              </span>
              <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

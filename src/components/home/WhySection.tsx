import { Shield, Zap, Sparkles, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@hooks/useReducedMotion";
import { cn } from "@lib/cn";

const FEATURES = [
  {
    Icon: Shield,
    title: "100% private",
    description: "Files never leave your device. No uploads, no tracking, ever.",
    color: "#D88B9A",
  },
  {
    Icon: Zap,
    title: "Lightning fast",
    description: "Everything runs in your browser. No server round trips.",
    color: "#C99667",
  },
  {
    Icon: Sparkles,
    title: "Beautifully simple",
    description: "Clean design, keyboard-friendly, works on every device.",
    color: "#8B3A4F",
  },
  {
    Icon: Heart,
    title: "Free forever",
    description: "No accounts. No subscriptions. No watermarks. Just tools.",
    color: "#E8B4B8",
  },
];

export function WhySection() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-silk-wine/60 dark:text-silk-rose/50 font-semibold mb-3">
            Why AHADEX
          </p>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-light-text dark:text-dark-text leading-tight max-w-2xl mx-auto">
            Built the way tools{" "}
            <span className="font-script text-silk-rose">
              should be
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map(({ Icon, title, description, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={cn(
                "group relative p-7 rounded-3xl h-full",
                "bg-white/60 dark:bg-dark-surface/60 backdrop-blur-xl",
                "border border-silk-rose/15 hover:border-silk-rose/40",
                "shadow-[0_4px_20px_-8px_rgba(139,58,79,0.1)]",
                "hover:shadow-[0_12px_40px_-10px_rgba(139,58,79,0.25)]",
                "hover:-translate-y-1",
                "transition-all duration-500"
              )}
            >
              <span
                className="inline-flex w-12 h-12 rounded-2xl items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500"
                style={{ backgroundColor: `${color}20` }}
              >
                <Icon className="w-5 h-5" style={{ color }} />
              </span>
              <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-2">
                {title}
              </h3>
              <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

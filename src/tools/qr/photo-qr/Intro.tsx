import { motion } from "framer-motion";
import { Sparkles, Shield, Gift, Lock, Zap } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { useReducedMotion } from "@hooks/useReducedMotion";
import { cn } from "@lib/cn";
import { photoQrContent } from "./content";

const ICON_MAP = {
  sparkle: Sparkles,
  shield: Shield,
  gift: Gift,
  lock: Lock,
};

export function Intro() {
  const { language } = useLanguage();
  const prefersReduced = useReducedMotion();
  const content = photoQrContent[language];

  return (
    <section className="relative py-14 sm:py-20 overflow-hidden">
      {/* Background glow */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 -left-20 w-[400px] h-[400px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(216,139,154,0.4) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-20 -right-20 w-[400px] h-[400px] rounded-full opacity-25"
          style={{
            background:
              "radial-gradient(circle, rgba(201,150,103,0.4) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />

        {/* Floating emojis */}
        <span
          className="absolute top-12 left-[8%] text-2xl sm:text-3xl opacity-30 animate-gentle-float"
          style={{ animationDelay: "0s" }}
        >
          ✨
        </span>
        <span
          className="absolute top-32 right-[10%] text-3xl sm:text-4xl opacity-25 animate-gentle-float"
          style={{ animationDelay: "1.5s" }}
        >
          🎯
        </span>
        <span
          className="absolute bottom-24 left-[12%] text-2xl sm:text-3xl opacity-25 animate-gentle-float"
          style={{ animationDelay: "3s" }}
        >
          🪄
        </span>
        <span
          className="absolute bottom-16 right-[8%] text-3xl sm:text-4xl opacity-20 animate-gentle-float"
          style={{ animationDelay: "4.5s" }}
        >
          🚀
        </span>
      </div>

      <div className="relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-silk-rose animate-soft-pulse" />
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-silk-wine/70 dark:text-silk-rose/60 font-semibold">
              {language === "bn" ? "টুল সম্পর্কে" : "About this tool"}
            </p>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-light-text dark:text-dark-text">
            {language === "bn" ? "যে টুল" : "The tool that"}{" "}
            <span className="font-script text-silk-rose text-[1.15em]">
              {language === "bn" ? "আপনার ছবিকে জীবন্ত করে" : "brings photos to life"}
            </span>{" "}
            ✨
          </h2>

          <p className="mt-5 text-base sm:text-lg text-light-textSecondary dark:text-dark-textSecondary leading-relaxed max-w-2xl mx-auto">
            {language === "bn"
              ? "🎨 একটা ছবি, একটা স্ক্যান — সেকেন্ডের মধ্যে যোগাযোগ। 💫"
              : "🎨 One photo, one scan — a connection made in seconds. 💫"}
          </p>
        </motion.div>

        {/* Highlights Grid — 6 items with emojis */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4 mb-12 sm:mb-16">
          {content.introHighlights.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={cn(
                "group relative p-4 sm:p-5 rounded-2xl",
                "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl",
                "border border-silk-rose/15 hover:border-silk-rose/50",
                "hover:-translate-y-1",
                "transition-all duration-500"
              )}
            >
              <span className="text-3xl sm:text-4xl block mb-2.5 group-hover:scale-110 transition-transform duration-500">
                {h.emoji}
              </span>
              <h3 className="font-display font-bold text-[13px] sm:text-[15px] text-light-text dark:text-dark-text mb-1 leading-tight">
                {h.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                {h.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Intro Blocks — 4 rich cards */}
        <div className="space-y-5 sm:space-y-6 max-w-4xl mx-auto">
          {content.introBlocks.map((block, i) => {
            const Icon =
              ICON_MAP[block.icon as keyof typeof ICON_MAP] ?? Sparkles;
            const isEven = i % 2 === 0;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: prefersReduced ? 0 : isEven ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={cn(
                  "group relative p-5 sm:p-7 rounded-3xl overflow-hidden",
                  "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl",
                  "border border-silk-rose/15 hover:border-silk-rose/40",
                  "hover:shadow-[0_20px_50px_-15px_rgba(139,58,79,0.25)]",
                  "transition-all duration-500"
                )}
              >
                {/* Corner glow */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -top-16 w-40 h-40 rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none",
                    isEven ? "-right-16" : "-left-16"
                  )}
                  style={{
                    background:
                      "radial-gradient(circle, rgba(216,139,154,0.5) 0%, transparent 70%)",
                    filter: "blur(40px)",
                  }}
                />

                <div className="relative flex items-start gap-4">
                  {/* Big Emoji + Icon */}
                  <div className="shrink-0 flex flex-col items-center gap-2">
                    <span className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform duration-500">
                      {block.emoji}
                    </span>
                    <span className="w-10 h-10 rounded-xl bg-silk-rose/15 border border-silk-rose/25 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-silk-rose" />
                    </span>
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display font-bold text-lg sm:text-xl text-light-text dark:text-dark-text mb-2 leading-tight">
                      {block.title}
                    </h3>
                    <p className="text-[14px] sm:text-base text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                      {block.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom decorative row */}
        <div className="flex items-center justify-center gap-3 mt-12">
          <span className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-silk-rose/40" />
          <span className="text-xl sm:text-2xl animate-soft-pulse">💖</span>
          <span className="text-xl sm:text-2xl animate-soft-pulse" style={{ animationDelay: "0.5s" }}>
            ✨
          </span>
          <span className="text-xl sm:text-2xl animate-soft-pulse" style={{ animationDelay: "1s" }}>
            🌸
          </span>
          <span className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-silk-rose/40" />
        </div>
      </div>
    </section>
  );
}

export { Zap };

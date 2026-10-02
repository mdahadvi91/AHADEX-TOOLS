import { motion } from "framer-motion";
import { Sparkles, Palette, Download, Shield } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { useReducedMotion } from "@hooks/useReducedMotion";
import { LiveText } from "@components/common/LiveText";
import { visitingCardContent } from "./content";

export function Hero() {
  const { language } = useLanguage();
  const prefersReduced = useReducedMotion();
  const content = visitingCardContent[language];

  return (
    <section className="relative overflow-hidden pt-6 sm:pt-12 pb-10 sm:pb-14">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(216,139,154,0.35) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-25"
          style={{
            background:
              "radial-gradient(circle, rgba(201,150,103,0.35) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-5 sm:mb-7"
        >
          <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/60 dark:bg-dark-surface/60 backdrop-blur-xl border border-silk-rose/25 text-silk-wine dark:text-silk-rose text-[10px] sm:text-xs font-medium tracking-[0.12em] sm:tracking-[0.2em] uppercase">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            {content.heroTag}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-silk-rose/5 border border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary text-[10px] sm:text-xs font-medium">
            <Palette className="w-3 h-3" />
            20 Templates
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-silk-rose/5 border border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary text-[10px] sm:text-xs font-medium">
            <Download className="w-3 h-3" />
            PNG · JPG · PDF
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-silk-rose/5 border border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary text-[10px] sm:text-xs font-medium">
            <Shield className="w-3 h-3" />
            {language === "bn" ? "১০০% প্রাইভেট" : "100% Private"}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-black text-[2.25rem] leading-[1] sm:text-5xl lg:text-6xl tracking-tight text-light-text dark:text-dark-text"
        >
          <LiveText
            text={
              language === "bn"
                ? "ভিজিটিং কার্ড মেকার"
                : "Visiting Card Maker"
            }
            gradient="rose"
            waveAmplitude={prefersReduced ? 0 : 12}
            waveDuration={2.8}
            letterStagger={0.09}
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-5 sm:mt-7 text-[15px] sm:text-lg text-light-textSecondary dark:text-dark-textSecondary leading-relaxed"
        >
          {content.heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto"
        >
          {content.heroStats.map((s) => (
            <div
              key={s.label}
              className="p-3 sm:p-4 rounded-2xl bg-white/60 dark:bg-dark-surface/60 backdrop-blur-xl border border-silk-rose/15"
            >
              <p className="font-display font-black text-xl sm:text-2xl text-silk-rose">
                {s.value}
              </p>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary mt-0.5">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Scan, Zap } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { useReducedMotion } from "@hooks/useReducedMotion";
import { LiveText } from "@components/common/LiveText";
import { photoQrData } from "./data";
import { photoQrContent } from "./content";

export function Hero() {
  const { language, t } = useLanguage();
  const prefersReduced = useReducedMotion();
  const content = photoQrContent[language];

  return (
    <section className="relative overflow-hidden pt-8 sm:pt-14 pb-8 sm:pb-12">
      {/* Background glows — same as homepage hero */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(216,139,154,0.35) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(201,150,103,0.35) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
        />
        <span className="absolute top-16 right-[12%] text-4xl opacity-40 animate-gentle-float">
          🌸
        </span>
        <span
          className="absolute bottom-20 left-[8%] text-3xl opacity-30 animate-gentle-float"
          style={{ animationDelay: "1.5s" }}
        >
          💗
        </span>
      </div>

      <div className="relative">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose transition-colors mb-5 sm:mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          {t.common.home}
        </Link>

        {/* Badges row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 sm:mb-7"
        >
          <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/60 dark:bg-dark-surface/60 backdrop-blur-xl border border-silk-rose/25 text-silk-wine dark:text-silk-rose text-[10px] sm:text-xs font-medium tracking-[0.12em] sm:tracking-[0.2em] uppercase">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            {content.heroTag}
          </span>

          {photoQrData.newTool && (
            <span className="inline-flex items-center px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-silk-wine/15 text-silk-wine dark:text-silk-rose-soft text-[9px] sm:text-[10px] font-bold tracking-widest uppercase border border-silk-wine/25">
              New
            </span>
          )}

          <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-silk-rose/5 border border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary text-[10px] sm:text-xs font-medium">
            <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <Scan className="w-3 h-3 sm:w-3.5 sm:h-3.5 hidden sm:inline" />
            {language === "bn" ? "১০০% প্রাইভেট" : "100% Private"}
          </span>
        </motion.div>

        {/* Big title with LiveText — same style as homepage */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-black text-[2.25rem] leading-[1] sm:text-5xl lg:text-6xl tracking-tight text-light-text dark:text-dark-text"
        >
          <LiveText
            text={photoQrData.name}
            gradient="rose"
            waveAmplitude={prefersReduced ? 0 : 12}
            waveDuration={2.8}
            letterStagger={0.09}
          />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-5 sm:mt-7 text-[15px] sm:text-lg lg:text-xl text-light-textSecondary dark:text-dark-textSecondary max-w-2xl leading-relaxed"
        >
          {content.heroSubtitle}
        </motion.p>
      </div>
    </section>
  );
}

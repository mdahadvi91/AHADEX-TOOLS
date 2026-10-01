import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { LiveText } from "@components/common/LiveText";
import { ManifestoBlock } from "./ManifestoBlock";
import { useLanguage } from "@contexts/LanguageContext";

export function ToolsHero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-24">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-50"
          style={{
            background: "radial-gradient(circle, rgba(216,139,154,0.35) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(201,150,103,0.35) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
        />
        <span className="absolute top-16 right-[12%] text-4xl opacity-40 animate-gentle-float">🌸</span>
        <span className="absolute bottom-20 left-[8%] text-3xl opacity-30 animate-gentle-float" style={{ animationDelay: "1.5s" }}>💗</span>
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-dark-surface/60 backdrop-blur-xl border border-silk-rose/25 text-silk-wine dark:text-silk-rose mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[10px] font-medium tracking-[0.25em] uppercase">
              {t.tools.heroEyebrow}
            </span>
          </motion.div>

          <h1 className="font-display font-bold tracking-tight leading-[1.05] text-light-text dark:text-dark-text">
            <span className="block text-[clamp(2.5rem,7vw,6rem)]">
              <LiveText
                text={t.tools.heroTitle1}
                gradient="rose"
                waveAmplitude={12}
                waveDuration={2.8}
                letterStagger={0.09}
              />
            </span>

            <span className="block mt-3 text-[clamp(2rem,6vw,5rem)]">
              <span className="font-script text-silk-rose mr-3">
                {t.tools.heroTitle2}
              </span>
              <span className="font-display">
                <LiveText
                  text={t.tools.heroTitle3}
                  waveAmplitude={10}
                  waveDuration={3.2}
                  letterStagger={0.1}
                />
              </span>
            </span>
          </h1>

          <ManifestoBlock />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-silk-rose/40 to-transparent"
      />
    </section>
  );
}

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { LiveText } from "@components/common/LiveText";
import { ManifestoBlock } from "./ManifestoBlock";
import { LiquidBlobs } from "@components/hero/LiquidBlobs";

export function ToolsHero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-24">
      {/* Liquid morphing blobs — background */}
      <LiquidBlobs />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-dark-surface/60 backdrop-blur-xl border border-silk-rose/25 text-silk-wine dark:text-silk-rose mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[10px] font-medium tracking-[0.25em] uppercase">
              The Library
            </span>
          </motion.div>

          {/* Main headline — magnetic + wave + gradient */}
          <h1 className="font-display font-bold tracking-tight leading-[0.92] text-light-text dark:text-dark-text">
            <span className="block text-[clamp(3rem,7vw,6rem)]">
              <LiveText
                text="Every tool,"
                gradient="rose"
                waveAmplitude={12}
                waveDuration={2.8}
                letterStagger={0.09}
                magnetic
              />
            </span>

            <span className="block mt-3 text-[clamp(2.5rem,6vw,5rem)]">
              <span className="font-script text-silk-rose mr-3">
                beautifully
              </span>
              <span className="font-display">
                <LiveText
                  text="crafted."
                  waveAmplitude={10}
                  waveDuration={3.2}
                  letterStagger={0.1}
                  magnetic
                />
              </span>
            </span>
          </h1>

          {/* Manifesto */}
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

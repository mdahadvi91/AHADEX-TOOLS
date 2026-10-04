import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@hooks/useReducedMotion";
import { useTheme } from "@contexts/ThemeContext";
import {
  ROTATING_BACKGROUNDS,
  BACKGROUND_ROTATE_INTERVAL_MS,
  BACKGROUND_FADE_DURATION_S,
  BACKGROUND_OPACITY_LIGHT,
  BACKGROUND_OPACITY_DARK,
} from "@lib/backgrounds";

export function RotatingBackground() {
  const prefersReduced = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Preload only the first image on mount; others load on demand
  // (saves 500 KB of eager downloads on first visit)
  useEffect(() => {
    if (ROTATING_BACKGROUNDS.length === 0) return;
    const img = new Image();
    img.src = ROTATING_BACKGROUNDS[0];

    // Preload the rest after the page is fully idle
    const idle = () => {
      ROTATING_BACKGROUNDS.slice(1).forEach((src) => {
        const i = new Image();
        i.src = src;
      });
    };
    type IdleWindow = Window & {
      requestIdleCallback?: (cb: () => void) => void;
    };
    const w = window as IdleWindow;
    if (typeof w.requestIdleCallback === "function") {
      w.requestIdleCallback(idle);
    } else {
      window.setTimeout(idle, 4000);
    }
  }, []);

  // Pause rotation while the tab is hidden (battery-friendly)
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    onVisibility();
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Rotate every N ms
  useEffect(() => {
    if (prefersReduced || paused || ROTATING_BACKGROUNDS.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % ROTATING_BACKGROUNDS.length);
    }, BACKGROUND_ROTATE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [prefersReduced, paused]);

  const currentSrc = ROTATING_BACKGROUNDS[index];
  const targetOpacity = isDark ? BACKGROUND_OPACITY_DARK : BACKGROUND_OPACITY_LIGHT;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-20 overflow-hidden pointer-events-none bg-silk-cream dark:bg-dark-bg"
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={currentSrc}
          initial={{ opacity: 0 }}
          animate={{ opacity: targetOpacity }}
          exit={{ opacity: 0 }}
          transition={{
            duration: prefersReduced ? 0 : BACKGROUND_FADE_DURATION_S,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${currentSrc})` }}
        />
      </AnimatePresence>

      {/* Readability overlay — matches previous ImageBackground */}
      <div className="absolute inset-0 bg-gradient-to-b from-silk-cream/40 via-transparent to-silk-cream/50 dark:from-dark-bg/50 dark:via-transparent dark:to-dark-bg/60" />
    </div>
  );
}

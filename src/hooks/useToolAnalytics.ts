import { useEffect, useRef } from "react";
import { analytics } from "@lib/analytics";
import { speak as speakFn } from "@lib/speech";
import { useLanguage } from "@contexts/LanguageContext";
import { useSound } from "@contexts/SoundContext";
import { tools } from "@data/tools";
import { getToolTranslation } from "@i18n/toolTranslations";

/* ============================================================
 * useToolAnalytics
 * ------------------------------------------------------------
 * Auto-fires GA4 events for a tool:
 *   - tool_open      → on mount (also speaks the tool name)
 *   - tool_complete  → on unmount (with duration in ms)
 * ============================================================ */

export function useToolAnalytics(toolId: string): void {
  const startRef = useRef<number>(Date.now());
  const { language } = useLanguage();
  const { soundEnabled } = useSound();

  useEffect(() => {
    startRef.current = Date.now();
    analytics.toolOpen(toolId);

    // Speak the tool name after a small delay (let page settle)
    const tool = tools.find((t) => t.id === toolId);
    if (tool && soundEnabled) {
      const translated = getToolTranslation(toolId, language, {
        name: tool.name,
        description: tool.description,
      });
      const timer = window.setTimeout(() => {
        void speakFn(translated.name, { lang: language, rate: 0.95 });
      }, 500);

      return () => {
        window.clearTimeout(timer);
        const duration = Date.now() - startRef.current;
        if (duration > 3000) analytics.toolComplete(toolId, duration);
      };
    }

    return () => {
      const duration = Date.now() - startRef.current;
      if (duration > 3000) analytics.toolComplete(toolId, duration);
    };
  }, [toolId, language, soundEnabled]);
}

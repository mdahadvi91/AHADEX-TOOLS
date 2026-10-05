import { useCallback, useEffect, useState } from "react";
import {
  speak as speakFn,
  stopSpeaking,
  isSpeechSupported,
} from "@lib/speech";
import { useLanguage } from "@contexts/LanguageContext";
import { useSound } from "@contexts/SoundContext";

export function useSpeech() {
  const { language } = useLanguage();
  const { soundEnabled } = useSound();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [supported] = useState(() => isSpeechSupported());

  const speak = useCallback(
    async (text: string) => {
      if (!soundEnabled || !supported || !text.trim()) return;
      setIsSpeaking(true);
      try {
        await speakFn(text, { lang: language });
        // Rough duration estimate: 12 chars/second
        const est = Math.max(800, (text.length / 12) * 1000);
        window.setTimeout(() => setIsSpeaking(false), est);
      } catch {
        setIsSpeaking(false);
      }
    },
    [soundEnabled, supported, language]
  );

  const stop = useCallback(() => {
    stopSpeaking();
    setIsSpeaking(false);
  }, []);

  useEffect(() => {
    return () => {
      // Stop speech when component unmounts
      stopSpeaking();
    };
  }, []);

  return { speak, stop, isSpeaking, supported };
}

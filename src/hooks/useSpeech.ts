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
        await speakFn(text, { lang: language }); // Wait for speech to finish
      } catch {
        // Handle any unexpected errors silently
      } finally {
        setIsSpeaking(false); // Only turn off when speech is truly done
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
      stopSpeaking();
    };
  }, []);

  return { speak, stop, isSpeaking, supported };
}

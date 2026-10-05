import { Volume2, Square } from "lucide-react";
import { useSpeech } from "@hooks/useSpeech";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";

interface SpeakButtonProps {
  text: string;
  className?: string;
  size?: "sm" | "md";
}

export function SpeakButton({ text, className, size = "sm" }: SpeakButtonProps) {
  const { speak, stop, isSpeaking, supported } = useSpeech();
  const { language } = useLanguage();

  if (!supported) return null;

  const handleClick = () => {
    if (isSpeaking) stop();
    else void speak(text);
  };

  const label = language === "bn"
    ? isSpeaking ? "পড়া বন্ধ করুন" : "শুনুন"
    : isSpeaking ? "Stop reading" : "Listen";

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border transition-all select-none",
        size === "sm" ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-[12px]",
        isSpeaking
          ? "bg-silk-rose/20 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft"
          : "bg-silk-rose/10 border-silk-rose/25 text-silk-rose hover:bg-silk-rose/20 hover:border-silk-rose/50",
        className
      )}
    >
      {isSpeaking ? (
        <Square className="w-3 h-3 fill-current" />
      ) : (
        <Volume2 className="w-3 h-3" />
      )}
      <span className="font-medium">{label}</span>
    </button>
  );
}

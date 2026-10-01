import { useEffect, useState } from "react";
import { cn } from "@lib/cn";

interface LiveTextProps {
  text: string;
  className?: string;
  waveAmplitude?: number;
  waveDuration?: number;
  letterStagger?: number;
  as?: "span" | "h1" | "h2" | "h3";
  /** Apply per-letter gradient — for gradient text */
  gradient?: "rose" | "warm" | "cool" | "none";
}

const GRADIENTS: Record<string, string> = {
  rose:
    "linear-gradient(90deg, #B36878 0%, #D88B9A 25%, #C99667 50%, #8B3A4F 75%, #B36878 100%)",
  warm:
    "linear-gradient(90deg, #D88B9A 0%, #E8B4B8 25%, #E5C9A4 50%, #C99667 75%, #D88B9A 100%)",
  cool:
    "linear-gradient(90deg, #8B3A4F 0%, #B36878 33%, #D88B9A 66%, #8B3A4F 100%)",
};

const DARK_GRADIENTS: Record<string, string> = {
  rose:
    "linear-gradient(90deg, #E8B4B8 0%, #D88B9A 25%, #E5C9A4 50%, #F0DCC4 75%, #E8B4B8 100%)",
  warm:
    "linear-gradient(90deg, #F0DCC4 0%, #E8B4B8 25%, #E5C9A4 50%, #D88B9A 75%, #F0DCC4 100%)",
  cool:
    "linear-gradient(90deg, #F0DCC4 0%, #E8B4B8 33%, #D88B9A 66%, #F0DCC4 100%)",
};

export function LiveText({
  text,
  className,
  waveAmplitude = 8,
  waveDuration = 2.5,
  letterStagger = 0.1,
  as: Tag = "span",
  gradient = "none",
}: LiveTextProps) {
  const [ready, setReady] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setReady(true);
    const check = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const chars = text.split("");
  const totalChars = Math.max(chars.length - 1, 1);
  const gradientCSS =
    gradient !== "none"
      ? (isDark ? DARK_GRADIENTS[gradient] : GRADIENTS[gradient])
      : null;

  return (
    <>
      <style>{`
        @keyframes ahadex-live-wave {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-${waveAmplitude}px); }
        }
        @keyframes ahadex-gradient-flow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>

      <Tag className={cn("inline-block", className)} aria-label={text}>
        {chars.map((char, i) => {
          const style: React.CSSProperties = {
            display: "inline-block",
            animation: ready
              ? `ahadex-live-wave ${waveDuration}s ease-in-out ${i * letterStagger}s infinite`
              : "none",
            willChange: "transform",
          };

          if (gradientCSS) {
            // Each letter gets the full gradient positioned so it shows only
            // its "slice" — creating a continuous gradient across all letters
            const pct = (i / totalChars) * 100;
            style.backgroundImage = gradientCSS;
            style.backgroundSize = `${chars.length * 100}% 100%`;
            style.backgroundPosition = `${pct}% 50%`;
            style.backgroundRepeat = "no-repeat";
            (style as Record<string, unknown>).WebkitBackgroundClip = "text";
            (style as Record<string, unknown>).backgroundClip = "text";
            (style as Record<string, unknown>).WebkitTextFillColor =
              "transparent";
            (style as Record<string, unknown>).color = "transparent";
          }

          return (
            <span key={i} aria-hidden="true" style={style}>
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </Tag>
    </>
  );
}

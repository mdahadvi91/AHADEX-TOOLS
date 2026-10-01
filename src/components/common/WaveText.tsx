import { cn } from "@lib/cn";

interface WaveTextProps {
  text: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3";
}

/**
 * Text that waves letter-by-letter when hovered.
 * Each letter bobs up and down in sequence — creates a "wave" effect.
 */
export function WaveText({ text, className, as: Tag = "span" }: WaveTextProps) {
  return (
    <Tag className={cn("wave-text", className)}>
      {text.split("").map((char, i) => (
        <span key={i} style={{ animationDelay: `${i * 0.05}s` }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Tag>
  );
}

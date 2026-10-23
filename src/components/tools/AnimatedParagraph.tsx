import { cn } from "@lib/cn";

interface AnimatedParagraphProps {
  text: string;
  className?: string;
  delay?: number;
  /** Words that should be highlighted */
  highlights?: string[];
}

export function AnimatedParagraph({
  text,
  className,
  highlights = [],
}: AnimatedParagraphProps) {
  const words = text.split(" ");

  return (
    <p className={cn("flex flex-wrap gap-x-2 gap-y-1", className)}>
      {words.map((word, i) => {
        const cleanWord = word.replace(/[.,!?—]/g, "").toLowerCase();
        const isHighlight = highlights.some(
          (h) => h.toLowerCase() === cleanWord
        );

        return (
          <span
            key={i}
            className={cn(
              "inline-block",
              isHighlight &&
                "font-script text-silk-rose text-[1.15em] leading-none -rotate-1"
            )}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
}

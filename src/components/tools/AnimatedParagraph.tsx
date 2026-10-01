import { motion } from "framer-motion";
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
  delay = 0,
  highlights = [],
}: AnimatedParagraphProps) {
  const words = text.split(" ");

  return (
    <p className={cn("flex flex-wrap gap-x-2 gap-y-1", className)}>
      {words.map((word, i) => {
        // Check if this word (stripped of punctuation) is a highlight
        const cleanWord = word.replace(/[.,!?—]/g, "").toLowerCase();
        const isHighlight = highlights.some(
          (h) => h.toLowerCase() === cleanWord
        );

        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            whileInView={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={cn(
              "inline-block",
              isHighlight &&
                "font-script text-silk-rose text-[1.15em] leading-none -rotate-1"
            )}
          >
            {word}
          </motion.span>
        );
      })}
    </p>
  );
}

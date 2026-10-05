import { motion } from "framer-motion";
import { cn } from "@lib/cn";

interface ResultStatProps {
  label: string;
  value: string;
  accent?: "rose" | "gold" | "emerald";
  className?: string;
}

export function ResultStat({
  label,
  value,
  accent = "rose",
  className,
}: ResultStatProps) {
  const accents = {
    rose: "text-silk-rose",
    gold: "text-silk-gold",
    emerald: "text-emerald-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "flex flex-col items-center justify-center px-4 py-3 rounded-xl sm:rounded-2xl",
        "bg-white/60 dark:bg-dark-surface/60 backdrop-blur-xl",
        "border border-silk-rose/15",
        className
      )}
    >
      <span className={cn("text-lg sm:text-xl font-black font-mono", accents[accent])}>
        {value}
      </span>
      <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-light-textSecondary dark:text-dark-textSecondary mt-0.5">
        {label}
      </span>
    </motion.div>
  );
}

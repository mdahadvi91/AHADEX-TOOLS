import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@lib/cn";

interface FavoriteButtonProps {
  active: boolean;
  onToggle: () => void;
  size?: number;
  className?: string;
}

export function FavoriteButton({
  active,
  onToggle,
  size = 16,
  className,
}: FavoriteButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.1 }}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={active}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full transition-all duration-300",
        "w-7 h-7 shrink-0",
        active
          ? "bg-gradient-to-br from-silk-gold to-silk-rose text-white shadow-[0_4px_12px_-4px_rgba(201,150,103,0.6)]"
          : "bg-silk-rose/8 text-silk-wine/50 dark:text-silk-rose/40 hover:bg-silk-rose/15 hover:text-silk-rose border border-silk-rose/15",
        className
      )}
    >
      <Star
        size={size}
        strokeWidth={2}
        className={cn(
          "transition-all duration-300",
          active && "fill-current"
        )}
      />

      {/* Sparkle burst when activated */}
      {active && (
        <motion.span
          aria-hidden="true"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 rounded-full bg-silk-gold/50 pointer-events-none"
        />
      )}
    </motion.button>
  );
}

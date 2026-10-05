import { motion, type HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useSound } from "@contexts/SoundContext";
import { cn } from "@lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ToolButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function ToolButton({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  children,
  className,
  onClick,
  disabled,
  ...rest
}: ToolButtonProps) {
  const { play } = useSound();

  const base = cn(
    "relative inline-flex items-center justify-center gap-2 font-bold rounded-xl sm:rounded-full",
    "transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-silk-rose/60",
    "select-none"
  );

  const sizes: Record<Size, string> = {
    sm: "px-3 py-1.5 text-[11px] sm:text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3.5 text-sm sm:text-base",
  };

  const variants: Record<Variant, string> = {
    primary: cn(
      "bg-gradient-to-r from-silk-rose via-silk-rose-deep to-silk-wine text-white",
      "shadow-[0_10px_26px_-10px_rgba(139,58,79,0.55)]",
      "hover:shadow-[0_16px_38px_-12px_rgba(139,58,79,0.75)]",
      "hover:-translate-y-0.5"
    ),
    secondary: cn(
      "bg-silk-rose/10 border border-silk-rose/25 text-silk-wine dark:text-silk-rose-soft",
      "hover:bg-silk-rose/20 hover:border-silk-rose/45",
      "hover:-translate-y-0.5"
    ),
    ghost: cn(
      "bg-transparent text-silk-wine dark:text-silk-rose-soft",
      "hover:bg-silk-rose/10"
    ),
    danger: cn(
      "bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400",
      "hover:bg-red-500/20 hover:border-red-500/50"
    ),
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={(e) => {
        if (!disabled && !loading) play("click");
        onClick?.(e);
      }}
      disabled={disabled || loading}
      className={cn(base, sizes[size], variants[variant], className)}
      {...rest}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        icon
      )}
      {children}
    </motion.button>
  );
}

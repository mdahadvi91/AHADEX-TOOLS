import type { ReactNode } from "react";
import { cn } from "@lib/cn";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "popular" | "new";
  className?: string;
}

const variants = {
  default: "bg-silk-sand/60 text-silk-wine border-silk-rose/30",
  popular:
    "bg-gradient-to-r from-silk-rose to-silk-gold text-white border-transparent shadow-silk-soft",
  new: "bg-silk-gold/20 text-silk-wine border-silk-gold/40",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

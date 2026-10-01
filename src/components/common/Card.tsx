import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@lib/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "interactive";
  padding?: "none" | "sm" | "md" | "lg";
  children: ReactNode;
}

const variants = {
  default: "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/15",
  elevated: "bg-white dark:bg-dark-elevated border border-silk-rose/20 shadow-silk-medium",
  interactive:
    "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/15 hover:border-silk-rose/50 hover:shadow-silk-deep transition-all duration-500 cursor-pointer",
};

const paddings = {
  none: "",
  sm: "p-3",
  md: "p-6",
  lg: "p-8",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = "default", padding = "md", className, children, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn("rounded-3xl", variants[variant], paddings[padding], className)}
      {...rest}
    >
      {children}
    </div>
  );
});

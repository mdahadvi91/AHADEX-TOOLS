import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  to?: string;
  href?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white shadow-silk-medium hover:shadow-silk-deep active:scale-[0.98]",
  secondary:
    "bg-silk-sand/50 text-light-text dark:text-dark-text border border-silk-rose/30 hover:bg-silk-linen/50",
  ghost:
    "bg-transparent text-light-textSecondary dark:text-dark-textSecondary hover:bg-silk-rose/10 hover:text-light-text dark:hover:text-dark-text",
  outline:
    "bg-transparent border-2 border-silk-rose/40 text-silk-rose hover:bg-silk-rose/10",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm gap-1.5 rounded-full",
  md: "h-11 px-6 text-base gap-2 rounded-full",
  lg: "h-14 px-8 text-lg gap-2.5 rounded-full",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    leftIcon,
    rightIcon,
    fullWidth,
    to,
    href,
    className,
    children,
    ...rest
  },
  ref
) {
  const classes = cn(
    "inline-flex items-center justify-center font-medium transition-all duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-silk-rose focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className
  );

  const content = (
    <>
      {leftIcon}
      {children}
      {rightIcon}
    </>
  );

  if (to) return <Link to={to} className={classes}>{content}</Link>;
  if (href) return <a href={href} className={classes} target="_blank" rel="noopener noreferrer">{content}</a>;

  return (
    <button ref={ref} className={classes} {...rest}>
      {content}
    </button>
  );
});

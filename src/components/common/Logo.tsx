import { Link } from "react-router-dom";
import { cn } from "@lib/cn";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  linkTo?: string | null;
  className?: string;
}

const sizes = {
  sm: { box: "w-8 h-8", text: "text-base", letter: "text-sm" },
  md: { box: "w-10 h-10", text: "text-lg", letter: "text-lg" },
  lg: { box: "w-14 h-14", text: "text-2xl", letter: "text-2xl" },
};

export function Logo({
  size = "md",
  showText = true,
  linkTo = "/",
  className,
}: LogoProps) {
  const s = sizes[size];

  const inner = (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          s.box,
          "rounded-2xl bg-gradient-to-br from-silk-rose via-silk-wine to-silk-wine-deep",
          "flex items-center justify-center shadow-silk-medium",
          "font-display font-bold text-white",
          s.letter
        )}
      >
        A
      </span>
      {showText && (
        <span className={cn("font-display font-bold tracking-tight", s.text)}>
          AHADEX
        </span>
      )}
    </span>
  );

  if (linkTo) {
    return (
      <Link
        to={linkTo}
        aria-label="AHADEX Tools — Home"
        className="inline-flex items-center focus-visible:outline-none"
      >
        {inner}
      </Link>
    );
  }

  return inner;
}

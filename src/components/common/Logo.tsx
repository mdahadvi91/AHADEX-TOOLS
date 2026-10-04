import { Link } from "react-router-dom";
import { cn } from "@lib/cn";
import { useTheme } from "@contexts/ThemeContext";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  linkTo?: string | null;
  className?: string;
}

const HEIGHTS = {
  sm: "h-9",
  md: "h-11 sm:h-12",
  lg: "h-14 sm:h-16",
};

const TEXT = {
  sm: { main: "text-base", sub: "text-[10px]" },
  md: { main: "text-lg sm:text-xl", sub: "text-[11px]" },
  lg: { main: "text-2xl sm:text-3xl", sub: "text-sm" },
};

export function Logo({
  size = "md",
  showText = true,
  linkTo = "/",
  className,
}: LogoProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const markSrc = isDark
    ? "/images/logo/ahadex-mark-white.png"
    : "/images/logo/ahadex-mark-black.png";

  const inner = (
    <span
      className={cn(
        "inline-flex items-center gap-2 sm:gap-3 group",
        className
      )}
    >
      <img
        src={markSrc}
        alt="AHADEX Tools"
        className={cn(
          "w-auto max-w-[72px] sm:max-w-[84px] object-contain shrink-0 transition-transform duration-500 group-hover:scale-105",
          HEIGHTS[size]
        )}
        draggable={false}
      />

      {showText && (
        <span className="hidden sm:flex flex-col leading-none">
          <span
            className={cn(
              "font-display font-black tracking-[-0.03em]",
              isDark ? "text-white" : "text-light-text",
              TEXT[size].main
            )}
          >
            AHADEX
          </span>

          <span className="flex items-center gap-1.5 mt-1">
            <span
              className={cn(
                "w-4 h-px",
                isDark ? "bg-silk-rose/70" : "bg-silk-wine/60"
              )}
            />

            <span
              className={cn(
                "font-script tracking-wider",
                isDark ? "text-silk-rose/80" : "text-silk-wine/80",
                TEXT[size].sub
              )}
            >
              Tools
            </span>
          </span>
        </span>
      )}
    </span>
  );

  if (linkTo) {
    return (
      <Link
        to={linkTo}
        aria-label="AHADEX Tools — Home"
        className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-silk-rose rounded-xl"
      >
        {inner}
      </Link>
    );
  }

  return inner;
}

export default Logo;

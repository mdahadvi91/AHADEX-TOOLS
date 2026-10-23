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

const MARK_WIDTH = {
  sm: "max-w-[42px]",
  md: "max-w-[52px] sm:max-w-[60px]",
  lg: "max-w-[72px] sm:max-w-[84px]",
};

const TEXT = {
  sm: { main: "text-sm", sub: "text-[8px]" },
  md: { main: "text-[15px] sm:text-lg", sub: "text-[9px] sm:text-[11px]" },
  lg: { main: "text-xl sm:text-2xl", sub: "text-xs sm:text-sm" },
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

  const letters = "AHADEX".split("");

  const inner = (
    <span className={cn("inline-flex items-center gap-2 sm:gap-3 group", className)}>
      {/* Logo mark */}
      <img
        src={markSrc}
        alt="AHADEX Tools"
        width={60}  // 🚨 Core Web Vitals (CLS ফিক্স): ব্রাউজারকে আগেই সাইজ জানানো হলো
        height={60} // 🚨 Core Web Vitals (CLS ফিক্স)
        fetchPriority="high" // 🚨 Core Web Vitals (LCP ফিক্স): লোগো দ্রুত লোড হবে
        className={cn(
          "w-auto object-contain shrink-0",
          HEIGHTS[size],
          MARK_WIDTH[size]
        )}
        draggable={false}
      />

      {/* Text */}
      {showText && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display font-black tracking-[-0.03em] inline-flex",
              isDark ? "text-white" : "text-light-text",
              TEXT[size].main
            )}
          >
            {letters.map((letter, i) => (
              <span key={`${letter}-${i}`} className="inline-block">
                {letter}
              </span>
            ))}
          </span>

          {/* Tools line */}
          <span className="flex items-center gap-1.5 mt-1">
            <span
              className={cn(
                "h-px w-4",
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

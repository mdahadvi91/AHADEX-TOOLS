import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@lib/cn";
import { useTheme } from "@contexts/ThemeContext";
import { useReducedMotion } from "@hooks/useReducedMotion";

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

// Silk easing (matches your tailwind ease-silk)
const SILK = [0.22, 1, 0.36, 1] as const;

export function Logo({
  size = "md",
  showText = true,
  linkTo = "/",
  className,
}: LogoProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const prefersReduced = useReducedMotion();

  const markSrc = isDark
    ? "/images/logo/ahadex-mark-white.png"
    : "/images/logo/ahadex-mark-black.png";

  const letters = "AHADEX".split("");

  const inner = (
    <span className={cn("inline-flex items-center gap-2 sm:gap-3 group", className)}>
      {/* Logo mark — fade in + scale + subtle rotate */}
      <motion.img
        src={markSrc}
        alt="AHADEX Tools"
        initial={prefersReduced ? false : { opacity: 0, scale: 0.6, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{
          duration: prefersReduced ? 0 : 0.7,
          ease: SILK,
          delay: 0.05,
        }}
        whileHover={prefersReduced ? undefined : { scale: 1.08, rotate: 3 }}
        className={cn(
          "w-auto object-contain shrink-0",
          HEIGHTS[size],
          MARK_WIDTH[size]
        )}
        draggable={false}
      />

      {/* Text — letter-by-letter reveal */}
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
              <motion.span
                key={`${letter}-${i}`}
                initial={prefersReduced ? false : { opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: prefersReduced ? 0 : 0.45,
                  ease: SILK,
                  delay: 0.35 + i * 0.05,
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </span>

          {/* Tools line — draw + fade */}
          <motion.span
            initial={prefersReduced ? false : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: prefersReduced ? 0 : 0.5,
              ease: SILK,
              delay: 0.75,
            }}
            className="flex items-center gap-1.5 mt-1"
          >
            <motion.span
              initial={prefersReduced ? false : { width: 0 }}
              animate={{ width: "1rem" }}
              transition={{
                duration: prefersReduced ? 0 : 0.5,
                ease: SILK,
                delay: 0.85,
              }}
              className={cn(
                "h-px",
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
          </motion.span>
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

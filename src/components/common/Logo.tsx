import { Link } from "react-router-dom";
import { cn } from "@lib/cn";
import { useTheme } from "@contexts/ThemeContext";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  linkTo?: string | null;
  className?: string;
}

const SIZES = {
  sm: { mark: 32, text: "text-base", sub: "text-[10px]" },
  md: { mark: 40, text: "text-lg", sub: "text-[11px]" },
  lg: { mark: 56, text: "text-2xl", sub: "text-sm" },
};

export function Logo({
  size = "md",
  showText = true,
  linkTo = "/",
  className,
}: LogoProps) {
  const s = SIZES[size];
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const markSrc = isDark
    ? "/images/logo/ahadex-mark-white.png"
    : "/images/logo/ahadex-mark-wine.png";

  const inner = (
    <span className={cn("inline-flex items-center gap-3 group", className)}>
      {/* A mark */}
      <span
        className="relative shrink-0 transition-transform duration-500 group-hover:scale-105"
        style={{ width: s.mark, height: s.mark }}
      >
        <img
          src={markSrc}
          alt="AHADEX Tools"
          width={s.mark}
          height={s.mark}
          className="w-full h-full object-contain"
          draggable={false}
        />
      </span>

      {/* Text — site's own typography */}
      {showText && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display font-black tracking-[-0.03em] text-silk-gradient dark:text-silk-gradient-dark",
              s.text
            )}
          >
            AHADEX
          </span>
          <span className="flex items-center gap-1.5 mt-1">
            <span className="w-4 h-px bg-silk-rose/60" />
            <span
              className={cn(
                "font-script text-silk-rose/80 tracking-wider",
                s.sub
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
        className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-silk-rose rounded-2xl"
      >
        {inner}
      </Link>
    );
  }

  return inner;
}

export default Logo;

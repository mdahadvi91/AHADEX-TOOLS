import { Link } from "react-router-dom";
import { cn } from "@lib/cn";

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

  const inner = (
    <span className={cn("inline-flex items-center gap-3 group", className)}>
      {/* Custom mark */}
      <span
        className="relative shrink-0 transition-transform duration-500 group-hover:scale-105"
        style={{ width: s.mark, height: s.mark }}
      >
        <svg
          viewBox="0 0 64 64"
          width={s.mark}
          height={s.mark}
          fill="none"
          aria-hidden="true"
          className="drop-shadow-[0_4px_20px_rgba(216,139,154,0.35)]"
        >
          <defs>
            <linearGradient id="logoMarkBg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E8B4B8" />
              <stop offset="45%" stopColor="#D88B9A" />
              <stop offset="100%" stopColor="#8B3A4F" />
            </linearGradient>
            <linearGradient id="logoMarkAccent" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFBF7" />
              <stop offset="100%" stopColor="#F7EDE4" />
            </linearGradient>
            <linearGradient id="logoMarkGold" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E5C9A4" />
              <stop offset="100%" stopColor="#C99667" />
            </linearGradient>
          </defs>

          {/* Diamond/shield base */}
          <path
            d="M32 2 L58 16 L58 48 L32 62 L6 48 L6 16 Z"
            fill="url(#logoMarkBg)"
          />

          {/* Inner accent ring */}
          <path
            d="M32 8 L52 19 L52 45 L32 56 L12 45 L12 19 Z"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
          />

          {/* Stylized "A" — sharp, geometric */}
          <path
            d="M32 14 L18 50 L25 50 L28 40 L36 40 L39 50 L46 50 L32 14 Z M30.5 33 L33.5 33 L32 24 L30.5 33 Z"
            fill="url(#logoMarkAccent)"
          />

          {/* Gold accent dot */}
          <circle cx="32" cy="55" r="1.8" fill="url(#logoMarkGold)" />
        </svg>

        {/* Breathing ring */}
        <span
          aria-hidden="true"
          className="absolute -inset-1 rounded-[20px] border border-silk-rose/30 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
        />
      </span>

      {/* Text */}
      {showText && (
        <span className="flex flex-col leading-none">
          <span className={cn("font-display font-black tracking-[-0.03em] text-silk-gradient dark:text-silk-gradient-dark", s.text)}>
            AHADEX
          </span>
          <span className="flex items-center gap-1.5 mt-1">
            <span className="w-4 h-px bg-silk-rose/60" />
            <span className={cn("font-script text-silk-rose/80 tracking-wider", s.sub)}>
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

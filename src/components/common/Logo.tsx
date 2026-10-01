import { Link } from "react-router-dom";
import { cn } from "@lib/cn";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  linkTo?: string | null;
  className?: string;
}

const SIZES = {
  sm: { mark: 28, text: "text-sm", sub: "text-[10px]" },
  md: { mark: 36, text: "text-lg", sub: "text-xs" },
  lg: { mark: 52, text: "text-2xl", sub: "text-sm" },
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
      {/* SVG Mark */}
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
          className="drop-shadow-[0_4px_16px_rgba(216,139,154,0.4)]"
        >
          <defs>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E8B4B8" />
              <stop offset="50%" stopColor="#D88B9A" />
              <stop offset="100%" stopColor="#8B3A4F" />
            </linearGradient>
            <linearGradient id="logoInner" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFB F7" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FDF8F3" stopOpacity="0.85" />
            </linearGradient>
            <filter id="logoGlow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer rounded square */}
          <rect x="2" y="2" width="60" height="60" rx="18" fill="url(#logoGrad)" />

          {/* Subtle highlight ring */}
          <rect
            x="2" y="2" width="60" height="60" rx="18"
            fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1"
          />

          {/* Stylized "A" letterform */}
          <path
            d="M32 14 L19 48 L25 48 L28.5 38 L35.5 38 L39 48 L45 48 L32 14 Z M30.5 33 L33.5 33 L32 24 L30.5 33 Z"
            fill="url(#logoInner)"
            filter="url(#logoGlow)"
          />

          {/* Small accent dot */}
          <circle cx="32" cy="52" r="1.5" fill="#FFFB F7" opacity="0.8" />
        </svg>

        {/* Pulse ring */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-[18px] border border-silk-rose/40 animate-soft-pulse pointer-events-none"
        />
      </span>

      {/* Text — only if showText */}
      {showText && (
        <span className="flex flex-col leading-none">
          <span className={cn("font-display font-black tracking-tight text-silk-gradient dark:text-silk-gradient-dark", s.text)}>
            AHADEX
          </span>
          <span className={cn("font-script text-silk-rose/80 dark:text-silk-rose-soft tracking-wide", s.sub)}>
            Tools
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

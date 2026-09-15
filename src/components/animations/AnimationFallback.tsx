import React from 'react';

export interface AnimationFallbackProps {
  /** Optional container class names */
  className?: string;
  /** Width or aspect ratio hint (e.g. 'w-full', 'h-48') */
  width?: string | number;
  height?: string | number;
  /** Custom fallback content (e.g. vector graphic or icon) */
  children?: React.ReactNode;
  /** Accessible label for the graphic (empty string if purely decorative) */
  ariaLabel?: string;
  /** Whether the fallback is purely decorative (hides from screen readers) */
  decorative?: boolean;
  /** Optional title to show inside fallback when relevant */
  title?: string;
  /** Whether to show a subtle non-intrusive skeleton pulse */
  showSkeleton?: boolean;
}

/**
 * Universal, accessible animation fallback component for AHADEX TOOLS.
 * 
 * Rules:
 * - Never renders a broken image icon or empty black rectangle.
 * - Prevents layout collapse by maintaining expected dimensions.
 * - Silent and failure-safe (no console errors).
 * - Matches AHADEX liquid glass styling tokens.
 */
export default function AnimationFallback({
  className = '',
  width,
  height,
  children,
  ariaLabel,
  decorative = true,
  title,
  showSkeleton = false,
}: AnimationFallbackProps) {
  const style: React.CSSProperties = {};
  if (width !== undefined) {
    style.width = typeof width === 'number' ? `${width}px` : width;
  }
  if (height !== undefined) {
    style.height = typeof height === 'number' ? `${height}px` : height;
  }

  return (
    <div
      role={decorative ? 'presentation' : 'img'}
      aria-hidden={decorative}
      aria-label={decorative ? undefined : (ariaLabel || title || 'Animation preview')}
      style={style}
      className={`relative overflow-hidden rounded-2xl flex items-center justify-center select-none ${
        showSkeleton ? 'skeleton-shimmer' : 'bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60'
      } ${className}`}
    >
      {children ? (
        <div className="relative z-10 flex items-center justify-center p-4">{children}</div>
      ) : (
        <div className="relative z-10 flex flex-col items-center justify-center gap-2 p-4 text-center">
          {title && (
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {title}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

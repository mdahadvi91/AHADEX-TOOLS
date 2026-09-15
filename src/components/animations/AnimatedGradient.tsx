import React from 'react';
import { useReducedMotion } from '@/src/hooks';

export interface AnimatedGradientProps {
  /** Color variant presets or custom CSS classes */
  variant?: 'subtle' | 'vibrant' | 'cosmic' | 'mesh';
  /** Animation speed in seconds (default: 16s) */
  durationSeconds?: number;
  /** Direction */
  direction?: 'diagonal' | 'radial' | 'horizontal';
  /** Styling */
  className?: string;
  /** Whether the gradient should pass through clicks/pointer interactions */
  interactive?: boolean;
  children?: React.ReactNode;
}

/**
 * Lightweight, GPU-accelerated CSS animated gradient foundation.
 * 
 * Architectural Highlights:
 * - Pure CSS with GPU-accelerated opacity/transform compositions.
 * - Zero WebGL or canvas dependencies for instant startup.
 * - Automatically pauses animations when `prefers-reduced-motion` is active.
 * - Safe for ambient backdrops without degrading frame rates or draining battery.
 */
export default function AnimatedGradient({
  variant = 'subtle',
  durationSeconds = 16,
  direction = 'diagonal',
  className = '',
  interactive = false,
  children,
}: AnimatedGradientProps) {
  const prefersReducedMotion = useReducedMotion();

  // Preset styles based on variant
  const getGradientClasses = () => {
    switch (variant) {
      case 'vibrant':
        return 'from-sky-500/20 via-indigo-500/20 to-teal-400/20';
      case 'cosmic':
        return 'from-indigo-600/15 via-purple-600/10 to-sky-500/15';
      case 'mesh':
        return 'from-sky-400/15 via-teal-300/10 to-blue-500/15';
      case 'subtle':
      default:
        return 'from-sky-500/10 via-slate-400/5 to-indigo-500/10 dark:from-sky-500/5 dark:via-slate-800/10 dark:to-indigo-500/5';
    }
  };

  const getDirectionClass = () => {
    switch (direction) {
      case 'horizontal':
        return 'bg-gradient-to-r';
      case 'radial':
        return 'radial-gradient-ambient';
      case 'diagonal':
      default:
        return 'bg-gradient-to-tr';
    }
  };

  const animationStyle: React.CSSProperties = prefersReducedMotion
    ? { animation: 'none' }
    : {
        animationDuration: `${durationSeconds}s`,
      };

  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden ${
        interactive ? '' : 'pointer-events-none select-none'
      } ${className}`}
    >
      <div
        style={animationStyle}
        className={`absolute inset-0 w-full h-full ${getDirectionClass()} ${getGradientClasses()} ${
          prefersReducedMotion ? '' : 'animate-gradient-shift'
        }`}
      />
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}

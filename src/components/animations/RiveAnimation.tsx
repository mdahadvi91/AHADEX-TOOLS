import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from '@/src/hooks';
import AnimationFallback from './AnimationFallback';

export interface RiveAnimationProps {
  /** URL to the .riv asset file */
  src?: string | null;

  /** State machine name or artboard to trigger */
  stateMachines?: string | string[];
  artboard?: string;
  autoplay?: boolean;

  /** Sizing & styling */
  className?: string;
  width?: string | number;
  height?: string | number;

  /** Accessibility */
  ariaLabel?: string;
  decorative?: boolean;

  /** Static fallback content */
  fallback?: React.ReactNode;
}

/**
 * Production-ready, lazy-loadable Rive Animation Foundation.
 * 
 * Architectural Highlights:
 * - Completely decouples the heavy WebAssembly/WebGL Rive runtime from critical initial load.
 * - Dynamic import ensures zero bundle bloat if no Rive animations are mounted.
 * - Graceful degradation: falls back cleanly without console spew if runtime or asset fails.
 * - Respects `prefers-reduced-motion` by freezing or falling back to static visual.
 */
export default function RiveAnimation({
  src = null,
  stateMachines,
  artboard,
  autoplay = true,
  className = '',
  width,
  height,
  ariaLabel = 'Interactive vector animation',
  decorative = true,
  fallback,
}: RiveAnimationProps) {
  const prefersReducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const riveInstanceRef = useRef<unknown>(null);

  const shouldRenderFallback = prefersReducedMotion || !src || hasError;

  useEffect(() => {
    if (shouldRenderFallback) return;

    let isMounted = true;

    async function initRive() {
      try {
        // Dynamic import attempt for @rive-app/canvas or @rive-app/webgl
        const riveModule = await import(/* @vite-ignore */ '@rive-app/canvas').catch(() => null);

        if (!isMounted) return;

        if (!riveModule || !canvasRef.current || !src) {
          setHasError(true);
          return;
        }

        const Rive = riveModule.Rive || riveModule.default?.Rive;
        if (!Rive) {
          setHasError(true);
          return;
        }

        const r = new Rive({
          src,
          canvas: canvasRef.current,
          autoplay: autoplay && !prefersReducedMotion,
          artboard,
          stateMachines,
          onLoad: () => {
            if (isMounted) {
              setIsLoaded(true);
            }
          },
          onLoadError: () => {
            if (isMounted) {
              setHasError(true);
            }
          },
        });

        riveInstanceRef.current = r;
      } catch {
        if (isMounted) {
          setHasError(true);
        }
      }
    }

    initRive();

    return () => {
      isMounted = false;
      if (riveInstanceRef.current && typeof (riveInstanceRef.current as { cleanup?: () => void }).cleanup === 'function') {
        (riveInstanceRef.current as { cleanup: () => void }).cleanup();
        riveInstanceRef.current = null;
      }
    };
  }, [src, stateMachines, artboard, autoplay, prefersReducedMotion, shouldRenderFallback]);

  if (shouldRenderFallback) {
    if (fallback) return <>{fallback}</>;
    return (
      <AnimationFallback
        className={className}
        width={width}
        height={height}
        ariaLabel={ariaLabel}
        decorative={decorative}
      />
    );
  }

  const containerStyle: React.CSSProperties = {};
  if (width !== undefined) containerStyle.width = typeof width === 'number' ? `${width}px` : width;
  if (height !== undefined) containerStyle.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      style={containerStyle}
      role={decorative ? 'presentation' : 'img'}
      aria-hidden={decorative}
      aria-label={decorative ? undefined : ariaLabel}
      className={`relative overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      {!isLoaded && !hasError && (
        <div className="absolute inset-0">
          {fallback || (
            <AnimationFallback
              width={width}
              height={height}
              decorative={decorative}
              showSkeleton={true}
            />
          )}
        </div>
      )}
    </div>
  );
}

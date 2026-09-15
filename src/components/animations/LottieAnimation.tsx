import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from '@/src/hooks';
import AnimationFallback from './AnimationFallback';

export interface LottieAnimationProps {
  /**
   * Animation data object (parsed JSON) or URL string pointing to a Lottie animation file.
   */
  animationData?: Record<string, unknown> | null;
  src?: string | null;

  /** Playback configurations */
  autoplay?: boolean;
  loop?: boolean;

  /** Play/pause state override */
  isPlaying?: boolean;

  /** Styling & sizing */
  className?: string;
  width?: string | number;
  height?: string | number;

  /** Accessibility */
  ariaLabel?: string;
  decorative?: boolean;

  /** Static fallback content to display while loading, if error, or when reduced motion is enabled */
  fallback?: React.ReactNode;
}

/**
 * Production-ready, lazy-loadable Lottie Animation Foundation.
 * 
 * Architectural Highlights:
 * - Lazy-loads the Lottie runtime dynamically only when the component is rendered.
 * - Does not bundle heavy Lottie engines into the initial application chunk.
 * - Fails safely without crashing if the runtime or asset is unavailable.
 * - Respects `prefers-reduced-motion` by honoring freeze/static fallback.
 * - Fully isolated: no fake assets or hardcoded remote URLs.
 */
export default function LottieAnimation({
  animationData = null,
  src = null,
  autoplay = true,
  loop = true,
  isPlaying = true,
  className = '',
  width,
  height,
  ariaLabel = 'Interactive animation',
  decorative = true,
  fallback,
}: LottieAnimationProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const animInstanceRef = useRef<unknown>(null);

  // If reduced motion is active, or if no source or animationData is provided, render the fallback immediately
  const shouldRenderFallback = prefersReducedMotion || (!animationData && !src) || hasError;

  useEffect(() => {
    if (shouldRenderFallback) {
      return;
    }

    let isMounted = true;

    async function initLottie() {
      try {
        // Dynamic import attempt: if 'lottie-web' or 'lottie-react' is installed in future,
        // it gets loaded here asynchronously. If not installed, it gracefully catches without crashing.
        // We use a safe dynamic import wrapper.
        const lottieModule = await import(/* @vite-ignore */ 'lottie-web').catch(() => null);

        if (!isMounted) return;

        if (!lottieModule || !containerRef.current) {
          // If library is not installed, fail safely to the fallback
          setHasError(true);
          return;
        }

        const lottie = (lottieModule.default || lottieModule) as {
          loadAnimation: (params: {
            container: HTMLElement;
            renderer: 'svg' | 'canvas' | 'html';
            loop: boolean;
            autoplay: boolean;
            animationData?: Record<string, unknown>;
            path?: string;
          }) => {
            destroy: () => void;
            play: () => void;
            pause: () => void;
          };
        };

        const anim = lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop: loop && !prefersReducedMotion,
          autoplay: autoplay && isPlaying && !prefersReducedMotion,
          ...(animationData ? { animationData } : {}),
          ...(src ? { path: src } : {}),
        });

        animInstanceRef.current = anim;
        setIsLoaded(true);
      } catch {
        if (isMounted) {
          setHasError(true);
        }
      }
    }

    initLottie();

    return () => {
      isMounted = false;
      if (animInstanceRef.current && typeof (animInstanceRef.current as { destroy?: () => void }).destroy === 'function') {
        (animInstanceRef.current as { destroy: () => void }).destroy();
        animInstanceRef.current = null;
      }
    };
  }, [animationData, src, autoplay, loop, isPlaying, prefersReducedMotion, shouldRenderFallback]);

  if (shouldRenderFallback) {
    if (fallback) {
      return <>{fallback}</>;
    }
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
      ref={containerRef}
      style={containerStyle}
      role={decorative ? 'presentation' : 'img'}
      aria-hidden={decorative}
      aria-label={decorative ? undefined : ariaLabel}
      className={`relative overflow-hidden ${className}`}
    >
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

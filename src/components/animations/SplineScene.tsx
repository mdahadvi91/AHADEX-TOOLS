import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from '@/src/hooks';
import AnimationFallback from './AnimationFallback';

export interface SplineSceneProps {
  /** Spline .splinecode scene URL */
  scene?: string | null;

  /** Sizing & styling */
  className?: string;
  width?: string | number;
  height?: string | number;

  /** Accessibility */
  ariaLabel?: string;
  decorative?: boolean;

  /** Static fallback content to display while loading, if error, or when reduced motion is requested */
  fallback?: React.ReactNode;
}

/**
 * Production-ready, lazy-loadable Spline 3D Scene Foundation.
 * 
 * Architectural Highlights:
 * - Extremely heavy 3D WebGL runtimes are strictly decoupled from standard UI rendering.
 * - Dynamic runtime loading ensures that regular tools load with zero 3D overhead.
 * - Respects `prefers-reduced-motion` and weak GPU contexts by utilizing the fallback component.
 * - Completely un-crashable: if network, WebGL, or runtime is unavailable, gracefully renders static fallback.
 */
export default function SplineScene({
  scene = null,
  className = '',
  width,
  height,
  ariaLabel = '3D interactive scene',
  decorative = true,
  fallback,
}: SplineSceneProps) {
  const prefersReducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const splineAppRef = useRef<unknown>(null);

  const shouldRenderFallback = prefersReducedMotion || !scene || hasError;

  useEffect(() => {
    if (shouldRenderFallback) return;

    let isMounted = true;

    async function initSpline() {
      try {
        // Attempt lazy dynamic import of @splinetool/runtime
        const splineModule = await import(/* @vite-ignore */ '@splinetool/runtime').catch(() => null);

        if (!isMounted) return;

        if (!splineModule || !canvasRef.current || !scene) {
          setHasError(true);
          return;
        }

        const Application = splineModule.Application || splineModule.default?.Application;
        if (!Application) {
          setHasError(true);
          return;
        }

        const spline = new Application(canvasRef.current);
        splineAppRef.current = spline;

        await spline.load(scene);

        if (isMounted) {
          setIsLoaded(true);
        }
      } catch {
        if (isMounted) {
          setHasError(true);
        }
      }
    }

    initSpline();

    return () => {
      isMounted = false;
      if (splineAppRef.current && typeof (splineAppRef.current as { dispose?: () => void }).dispose === 'function') {
        (splineAppRef.current as { dispose: () => void }).dispose();
        splineAppRef.current = null;
      }
    };
  }, [scene, prefersReducedMotion, shouldRenderFallback]);

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

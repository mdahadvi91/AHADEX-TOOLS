import { useEffect, useRef, useState } from "react";
import { cn } from "@lib/cn";
import { renderSide } from "../shared/renderer";
import { getCardSizeFromId } from "../shared/sizes";
import type { Template, CardSizeId, CardSideId, UserData } from "../types";

interface CanvasProps {
  template: Template;
  side: CardSideId;
  sizeId: CardSizeId;
  userData: UserData;
  className?: string;
  /** When provided, parent gets canvas element for export */
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
}

export function Canvas({
  template,
  side,
  sizeId,
  userData,
  className,
  onCanvasReady,
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rendering, setRendering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const size = getCardSizeFromId(sizeId);
  const W = size.widthPx;
  const H = size.heightPx;

  useEffect(() => {
    let cancelled = false;
    async function go() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      setRendering(true);
      try {
        await renderSide({
          ctx,
          template,
          side,
          userData,
          W,
          H,
        });
        if (!cancelled) {
          setError(null);
          onCanvasReady?.(canvas);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Render failed");
        }
      } finally {
        if (!cancelled) setRendering(false);
      }
    }
    void go();
    return () => {
      cancelled = true;
    };
  }, [template, side, userData, W, H, onCanvasReady]);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl shadow-silk-deep bg-white",
        className
      )}
      style={{ aspectRatio: `${W} / ${H}` }}
    >
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        className="w-full h-full block"
      />
      {rendering && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/30 pointer-events-none">
          <span className="w-5 h-5 rounded-full border-2 border-silk-rose/40 border-t-silk-rose animate-spin" />
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-silk-rose/10">
          <p className="text-xs text-silk-rose">{error}</p>
        </div>
      )}
    </div>
  );
}

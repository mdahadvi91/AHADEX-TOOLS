import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import type { Template, CardSideState, CardSize } from "../types";
import { drawCard } from "./renderer";
import { cn } from "@lib/cn";

export interface CardCanvasHandle {
  getCanvas: () => HTMLCanvasElement | null;
  redraw: () => Promise<void>;
}

interface CardCanvasProps {
  template: Template;
  state: CardSideState;
  size: CardSize;
  className?: string;
  showPlaceholders?: boolean;
  onReady?: () => void;
  side?: "front" | "back";
}

export const CardCanvas = forwardRef<CardCanvasHandle, CardCanvasProps>(
  function CardCanvas(
    { template, state, size, className, showPlaceholders = true, onReady, side = "front" },
    ref
  ) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [rendering, setRendering] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const W = size.widthPx;
    const H = size.heightPx;

    const render = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      setRendering(true);
      try {
        await drawCard({
          ctx,
          template,
          state,
          W,
          H,
          isPreview: showPlaceholders,
          side,
        });
        setError(null);
        onReady?.();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Render failed");
      } finally {
        setRendering(false);
      }
    };

    useImperativeHandle(ref, () => ({
      getCanvas: () => canvasRef.current,
      redraw: render,
    }));

    useEffect(() => {
      void render();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [template, state, W, H, showPlaceholders, side]);

    return (
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-xl bg-white shadow-silk-medium",
          className
        )}
        style={{ aspectRatio: `${W} / ${H}` }}
      >
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="w-full h-full block"
          aria-label={`${template.name} card preview`}
        />
        {rendering && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="w-6 h-6 rounded-full border-2 border-silk-rose/40 border-t-silk-rose animate-spin" />
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
);

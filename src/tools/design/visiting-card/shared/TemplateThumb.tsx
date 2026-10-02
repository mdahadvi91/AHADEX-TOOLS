import { useEffect, useMemo, useRef, useState } from "react";
import type { Template, CardSize } from "../types";
import { buildDemoState } from "./demoState";
import { drawCard } from "./renderer";
import { cn } from "@lib/cn";

interface TemplateThumbProps {
  template: Template;
  size: CardSize;
  selected?: boolean;
  onClick?: () => void;
}

export function TemplateThumb({
  template,
  size,
  selected = false,
  onClick,
}: TemplateThumbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  const W = 420;
  const H = Math.round((W * size.heightPx) / size.widthPx);

  const demoState = useMemo(() => buildDemoState(template), [template]);

  useEffect(() => {
    let cancelled = false;
    async function go() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      try {
        await drawCard({
          ctx,
          template,
          state: demoState,
          W,
          H,
          isPreview: true,
        });
        if (!cancelled) setReady(true);
      } catch {
        // ignore
      }
    }
    void go();
    return () => {
      cancelled = true;
    };
  }, [template, demoState, W, H]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-stretch gap-2 rounded-2xl p-2 text-left",
        "border-2 transition-all duration-300",
        "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl",
        selected
          ? "border-silk-rose shadow-silk-medium"
          : "border-silk-rose/15 hover:border-silk-rose/50 hover:-translate-y-0.5"
      )}
    >
      <div
        className="relative w-full overflow-hidden rounded-xl bg-white"
        style={{ aspectRatio: `${W} / ${H}` }}
      >
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="w-full h-full block"
        />
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-4 h-4 rounded-full border-2 border-silk-rose/40 border-t-silk-rose animate-spin" />
          </div>
        )}
        {selected && (
          <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-silk-rose text-white text-[10px] font-bold flex items-center justify-center shadow">
            ✓
          </span>
        )}
      </div>

      <div className="px-1 pb-1">
        <p className="text-[12px] font-semibold text-light-text dark:text-dark-text leading-tight truncate">
          {template.name}
        </p>
        <p className="text-[10px] text-light-textSecondary dark:text-dark-textSecondary capitalize">
          {template.category}
        </p>
      </div>
    </button>
  );
}

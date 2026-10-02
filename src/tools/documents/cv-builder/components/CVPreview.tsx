import { useEffect, useRef, useState } from "react";
import { cn } from "@lib/cn";
import type { CVData, CVTemplateProps } from "../types";
import { PAGE_SIZES } from "../constants";

interface CVPreviewProps {
  Template: React.ComponentType<CVTemplateProps>;
  data: CVData;
  /** Scale relative to real A4. 1 = full size, 0.5 = half */
  scale?: number;
  className?: string;
}

/**
 * Renders the A4 page at a scaled-down visual size but with
 * real CSS millimetres inside so the layout stays print-accurate.
 */
export function CVPreview({
  Template,
  data,
  scale = 0.7,
  className,
}: CVPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const size = PAGE_SIZES[data.settings.pageSize];
  const naturalWidthPx = mmToPx(size.widthMm);
  const naturalHeightPx = mmToPx(size.heightMm);

  // Measure container to auto-fit on small screens
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const update = () => setContainerWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const autoScale =
    containerWidth > 0 && containerWidth < naturalWidthPx * scale
      ? containerWidth / naturalWidthPx
      : scale;

  const displayWidth = naturalWidthPx * autoScale;
  const displayHeight = naturalHeightPx * autoScale;

  return (
    <div ref={containerRef} className={cn("w-full flex justify-center", className)}>
      <div
        className="relative overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-black/5"
        style={{ width: displayWidth, height: displayHeight }}
      >
        <div
          style={{
            width: `${size.widthMm}mm`,
            height: `${size.heightMm}mm`,
            transform: `scale(${autoScale})`,
            transformOrigin: "top left",
            background: "#FFFFFF",
            padding: `${data.settings.pageMargin}mm`,
            boxSizing: "border-box",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <Template data={data} />
        </div>
      </div>
    </div>
  );
}

/* 1mm = 96/25.4 px at 96 DPI reference */
function mmToPx(mm: number): number {
  return (mm * 96) / 25.4;
}

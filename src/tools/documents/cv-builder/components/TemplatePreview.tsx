import type { CVData, CVTemplateProps } from "../types";
import { PAGE_SIZES } from "../constants";

interface TemplatePreviewProps {
  Template: React.ComponentType<CVTemplateProps>;
  data: CVData;
  /** Scale factor for gallery thumbnail (e.g. 0.4) */
  scale?: number;
}

export function TemplatePreview({
  Template,
  data,
  scale = 0.4,
}: TemplatePreviewProps) {
  const size = PAGE_SIZES[data.settings.pageSize];

  return (
    <div
      className="relative overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black/5"
      style={{
        width: `${size.widthMm * scale}mm`,
        height: `${size.heightMm * scale}mm`,
      }}
    >
      <div
        style={{
          width: `${size.widthMm}mm`,
          height: `${size.heightMm}mm`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          background: "#FFFFFF",
          padding: `${data.settings.pageMargin}mm`,
          boxSizing: "border-box",
        }}
      >
        <Template data={data} />
      </div>
    </div>
  );
}

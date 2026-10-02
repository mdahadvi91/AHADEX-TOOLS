import type { CVData, CVTemplateProps } from "../types";
import { PAGE_SIZES } from "../constants";

interface PrintRootProps {
  Template: React.ComponentType<CVTemplateProps>;
  data: CVData;
}

/**
 * Rendered off-screen.
 * Only visible during print (via body.cv-printing .cv-print-root rules).
 *
 * Real A4/Letter millimetres, no transform scale,
 * so text renders at full fidelity.
 */
export function PrintRoot({ Template, data }: PrintRootProps) {
  const size = PAGE_SIZES[data.settings.pageSize];

  return (
    <div
      className="cv-print-root"
      style={{
        position: "absolute",
        left: "-10000px",
        top: 0,
        display: "none",
      }}
    >
      <div
        className="cv-print-page"
        style={{
          width: `${size.widthMm}mm`,
          minHeight: `${size.heightMm}mm`,
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

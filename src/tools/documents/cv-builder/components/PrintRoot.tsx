import type { CVData, CVTemplateProps } from "../types";
import { PAGE_SIZES } from "../constants";

interface PrintRootProps {
  Template: React.ComponentType<CVTemplateProps>;
  data: CVData;
  captureMode?: boolean;
}

export function PrintRoot({
  Template,
  data,
  captureMode = false,
}: PrintRootProps) {
  const size = PAGE_SIZES[data.settings.pageSize];

  return (
    <div
      className="cv-print-root"
      style={
        captureMode
          ? {
              position: "relative",
              left: "auto",
              top: "auto",
              display: "block",
              width: "100%",
              background: "#FFFFFF",
              color: "#000000",
            }
          : {
              position: "absolute",
              left: "-10000px",
              top: 0,
              display: "none",
            }
      }
    >
      <div
        className="cv-print-page"
        style={{
          width: `${size.widthMm}mm`,
          minHeight: `${size.heightMm}mm`,
          background: "#FFFFFF",
          color: "#000000",
          padding: `${data.settings.pageMargin}mm`,
          boxSizing: "border-box",
        }}
      >
        <Template data={data} />
      </div>
    </div>
  );
}

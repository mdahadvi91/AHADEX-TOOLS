import type { CategoryId } from "@types/category";

interface ToolIconProps {
  category: CategoryId;
  size?: number;
  className?: string;
}

const GRADIENTS: Record<CategoryId, [string, string]> = {
  image: ["#E8B4B8", "#D88B9A"],
  pdf: ["#D88B9A", "#8B3A4F"],
  qr: ["#E5C9A4", "#C99667"],
  text: ["#C99667", "#8B3A4F"],
  developer: ["#E8B4B8", "#B36878"],
  calculators: ["#C99667", "#B36878"],
};

export function ToolIcon({ category, size = 24, className }: ToolIconProps) {
  const [c1, c2] = GRADIENTS[category] ?? GRADIENTS.image;
  const gradId = `ticon-${category}`;

  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    className,
    xmlns: "http://www.w3.org/2000/svg",
  };

  const stroke = `url(#${gradId})`;

  return (
    <svg {...common} aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
      </defs>

      {category === "image" && (
        <>
          <rect x="3" y="4" width="18" height="16" rx="3" stroke={stroke} strokeWidth="1.8" />
          <circle cx="9" cy="10" r="1.8" fill={stroke} />
          <path
            d="M4 18 L9.5 12.5 L13 16 L17 12 L20 15"
            stroke={stroke}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}

      {category === "pdf" && (
        <>
          <path
            d="M6 3 H14 L19 8 V21 H6 Z"
            stroke={stroke}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M14 3 V8 H19"
            stroke={stroke}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M9 13 H15 M9 17 H13"
            stroke={stroke}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </>
      )}

      {category === "qr" && (
        <>
          <rect x="3" y="3" width="7" height="7" rx="1.5" stroke={stroke} strokeWidth="1.8" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" stroke={stroke} strokeWidth="1.8" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" stroke={stroke} strokeWidth="1.8" />
          <path d="M14 14 H17 V17 H14 Z M19 17 H21 V21 H17 V19" stroke={stroke} strokeWidth="1.8" strokeLinejoin="round" />
        </>
      )}

      {category === "text" && (
        <>
          <path d="M5 6 H19" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M5 11 H19" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M5 16 H14" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M5 20 H11" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}

      {category === "developer" && (
        <>
          <path
            d="M9 7 L3.5 12 L9 17"
            stroke={stroke}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 7 L20.5 12 L15 17"
            stroke={stroke}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M13 6 L11 18" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}

      {category === "calculators" && (
        <>
          <rect x="5" y="3" width="14" height="18" rx="2" stroke={stroke} strokeWidth="1.8" />
          <rect x="7.5" y="5.5" width="9" height="3" rx="0.8" fill={stroke} opacity="0.5" />
          <circle cx="9" cy="12.5" r="1" fill={stroke} />
          <circle cx="12" cy="12.5" r="1" fill={stroke} />
          <circle cx="15" cy="12.5" r="1" fill={stroke} />
          <circle cx="9" cy="16" r="1" fill={stroke} />
          <circle cx="12" cy="16" r="1" fill={stroke} />
          <circle cx="15" cy="16" r="1" fill={stroke} />
        </>
      )}
    </svg>
  );
}

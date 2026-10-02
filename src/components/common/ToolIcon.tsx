import {
  Image,
  FileText,
  QrCode,
  Type,
  Code2,
  Calculator,
  Palette,
} from "lucide-react";
import type { CategoryId } from "../../types/category";

interface ToolIconProps {
  category: CategoryId;
  size?: number;
  className?: string;
}

const ICON_MAP: Record<CategoryId, typeof Image> = {
  image: Image,
  pdf: FileText,
  qr: QrCode,
  documents: Palette,
  text: Type,
  developer: Code2,
  calculators: Calculator,
};

const COLOR_MAP: Record<CategoryId, string> = {
  image: "text-silk-rose",
  pdf: "text-silk-wine dark:text-silk-rose-soft",
  qr: "text-silk-gold",
  documents: "text-silk-rose",
  text: "text-silk-rose-deep",
  developer: "text-silk-rose-soft",
  calculators: "text-silk-wine",
};

export function ToolIcon({ category, size = 24, className }: ToolIconProps) {
  const Icon = ICON_MAP[category] ?? Image;
  const color = COLOR_MAP[category] ?? "text-silk-rose";

  return (
    <Icon
      size={size}
      strokeWidth={1.8}
      className={`${color} ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}

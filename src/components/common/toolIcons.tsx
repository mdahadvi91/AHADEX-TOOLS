import {
  Images,
  RefreshCw,
  Zap,
  Package,
  Repeat,
  Repeat2,
  Minimize2,
  Maximize2,
  Crop,
  FileOutput,
  FileSearch,
  Eraser,
  FilePlus,
  FilePlus2,
  Layers,
  Scissors,
  FileImage,
  FileSpreadsheet,
  QrCode,
  Wifi,
  Mail,
  Phone,
  Contact,
  ScanLine,
  Barcode,
  ImagePlus,
  Type,
  CaseSensitive,
  Text,
  Braces,
  Table,
  Binary,
  Link2,
  Hash,
  Regex,
  Percent,
  Calendar,
  CalendarRange,
  Ruler,
  Activity,
  CreditCard,
  FileText,
  UserRound,
} from "lucide-react";

/* ============================================================
 * Tool Icons — every tool ID → real lucide icon
 * ============================================================ */

export const TOOL_ICONS: Record<string, typeof Images> = {
  // Working
  "photo-qr": QrCode,
  "visiting-card": CreditCard,
  "cv-builder": UserRound,

  // Image
  "jpg-to-png": Images,
  "png-to-jpg": RefreshCw,
  "jpg-to-webp": Zap,
  "png-to-webp": Package,
  "webp-to-jpg": Repeat,
  "webp-to-png": Repeat2,
  "image-compressor": Minimize2,
  "image-resizer": Maximize2,
  "image-cropper": Crop,
  "image-to-pdf": FileOutput,
  "image-metadata-viewer": FileSearch,
  "background-remover": Eraser,

  // PDF
  "jpg-to-pdf": FilePlus,
  "png-to-pdf": FilePlus2,
  "merge-pdf": Layers,
  "split-pdf": Scissors,
  "compress-pdf": Minimize2,
  "pdf-to-jpg": FileImage,
  "pdf-to-png": FileSpreadsheet,
  "pdf-page-extractor": FileOutput,

  // QR
  "qr-code-generator": QrCode,
  "wifi-qr-generator": Wifi,
  "email-qr-generator": Mail,
  "phone-qr-generator": Phone,
  "vcard-qr-generator": Contact,
  "qr-code-scanner": ScanLine,
  "barcode-generator": Barcode,
  "qr-code-with-logo": ImagePlus,

  // Text
  "word-counter": Type,
  "case-converter": CaseSensitive,
  "text-cleaner": Text,
  "json-formatter": Braces,
  "json-to-csv": Table,
  "base64-tool": Binary,

  // Developer
  "url-encoder": Link2,
  "uuid-generator": Hash,
  "regex-tester": Regex,

  // Calculators
  "percentage-calculator": Percent,
  "age-calculator": Calendar,
  "date-difference": CalendarRange,
  "unit-converter": Ruler,
  "bmi-calculator": Activity,
};

export function getToolIcon(toolId: string): typeof Images {
  return TOOL_ICONS[toolId] ?? FileText;
}

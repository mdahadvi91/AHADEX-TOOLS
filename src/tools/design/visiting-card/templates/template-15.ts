import type { Template } from "../types";

export const template15: Template = {
  id: "purple-sunset-creative",
  name: "Purple Sunset Creative",
  nameBn: "পার্পল সানসেট ক্রিয়েটিভ",
  category: "creative",
  palette: { primary: "#3A1A5A", accent: "#E040FB", text: "#FFFFFF", subtext: "#C8A8E8" },

  front: {
    background: { type: "gradient", color1: "#3A1A5A", color2: "#C8106E", angle: 160 },
    elements: [
      /* Sunset sun circle */
      { id: "sun", type: "shape", shape: "circle", visible: true, x: 0.5, y: 0.62, width: 0.14, height: 0.14, fill: "#FFB74D", opacity: 0.9 },
      /* Mountain silhouette */
      { id: "mountain-1", type: "shape", shape: "triangle", visible: true, x: 0.28, y: 0.85, width: 0.4, height: 0.2, fill: "#1A0A2E", opacity: 0.85 },
      { id: "mountain-2", type: "shape", shape: "triangle", visible: true, x: 0.72, y: 0.85, width: 0.36, height: 0.16, fill: "#1A0A2E", opacity: 0.75 },
      /* Logo */
      { id: "logo", type: "logo", visible: true, x: 0.5, y: 0.28, size: 0.1, align: "center" },
      /* Brand */
      { id: "brand", type: "text", contentKey: "brand", defaultValue: "AHADEX", defaultValueBn: "আহাদেক্স", visible: true, x: 0.5, y: 0.45, fontFamily: "sans", fontSize: 44, fontWeight: 900, color: "#FFFFFF", align: "center", letterSpacing: 4, uppercase: true },
      /* Tagline */
      { id: "tagline", type: "text", contentKey: "tagline", defaultValue: "CREATE · DREAM · BUILD", defaultValueBn: "তৈরি · স্বপ্ন · নির্মাণ", visible: true, x: 0.5, y: 0.55, fontFamily: "sans", fontSize: 10, fontWeight: 500, color: "#FFB74D", align: "center", letterSpacing: 5, uppercase: true },
    ],
  },

  back: {
    background: { type: "gradient", color1: "#3A1A5A", color2: "#C8106E", angle: 160 },
    elements: [
      /* Sunset continues bottom */
      { id: "mountain-b", type: "shape", shape: "triangle", visible: true, x: 0.5, y: 0.95, width: 0.7, height: 0.14, fill: "#1A0A2E", opacity: 0.6 },
      { id: "name", type: "text", contentKey: "name", defaultValue: "Md. Ahadvi", visible: true, x: 0.08, y: 0.24, fontFamily: "sans", fontSize: 34, fontWeight: 900, color: "#FFFFFF", align: "left" },
      { id: "title", type: "text", contentKey: "title", defaultValue: "FOUNDER & DEVELOPER", visible: true, x: 0.08, y: 0.38, fontFamily: "sans", fontSize: 11, fontWeight: 500, color: "#E040FB", align: "left", letterSpacing: 4, uppercase: true },
      { id: "rule", type: "shape", shape: "line", visible: true, x: 0.08, y: 0.46, width: 0.34, height: 0, stroke: "#E040FB", strokeWidth: 1, direction: "l-r" },
      { id: "phone", type: "text", contentKey: "phone", defaultValue: "+880 123 456 789", visible: true, x: 0.08, y: 0.54, fontFamily: "sans", fontSize: 12, fontWeight: 400, color: "#FFFFFF", align: "left" },
      { id: "email", type: "text", contentKey: "email", defaultValue: "ahadvi@gmail.com", visible: true, x: 0.08, y: 0.63, fontFamily: "sans", fontSize: 12, fontWeight: 400, color: "#FFFFFF", align: "left" },
      { id: "website", type: "text", contentKey: "website", defaultValue: "www.ahadex.fun", visible: true, x: 0.08, y: 0.72, fontFamily: "sans", fontSize: 12, fontWeight: 400, color: "#C8A8E8", align: "left" },
      { id: "location", type: "text", contentKey: "location", defaultValue: "Dhaka, Bangladesh", visible: true, x: 0.08, y: 0.81, fontFamily: "sans", fontSize: 11, fontWeight: 400, color: "#C8A8E8", align: "left" },
      { id: "qr", type: "qr", visible: true, x: 0.79, y: 0.52, size: 0.26, fgColor: "#3A1A5A", bgColor: "#FFFFFF", padding: 0.12 },
      { id: "qr-label", type: "text", contentKey: "qrLabel", defaultValue: "SCAN TO VISIT", defaultValueBn: "স্ক্যান করুন", visible: true, x: 0.79, y: 0.83, fontFamily: "sans", fontSize: 8, fontWeight: 500, color: "#FFB74D", align: "center", letterSpacing: 3, uppercase: true },
    ],
  },
};

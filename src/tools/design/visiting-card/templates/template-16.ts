import type { Template } from "../types";

export const template16: Template = {
  id: "dark-carbon-silver",
  name: "Dark Carbon & Silver",
  nameBn: "ডার্ক কার্বন ও সিলভার",
  category: "technology",
  palette: { primary: "#0A0A0A", accent: "#C0C0C0", text: "#F0F0F0", subtext: "#909090" },

  front: {
    background: { type: "solid", color1: "#0A0A0A" },
    elements: [
      /* Carbon fiber texture */
      { id: "carbon", type: "ornament", ornament: "carbon-fiber", visible: true, x: 0.5, y: 0.5, size: 0.9, colors: ["#1A1A1A"], opacity: 0.6 },
      /* Silver diagonal stripe top */
      { id: "silver-1", type: "shape", shape: "diagonal-stripe", visible: true, x: 0.5, y: 0.16, width: 1, height: 0.02, fill: "#C0C0C0", direction: "tr-bl" },
      { id: "silver-2", type: "shape", shape: "diagonal-stripe", visible: true, x: 0.5, y: 0.84, width: 1, height: 0.02, fill: "#C0C0C0", direction: "tr-bl" },
      /* Logo */
      { id: "logo", type: "logo", visible: true, x: 0.5, y: 0.4, size: 0.11, align: "center" },
      /* Brand */
      { id: "brand", type: "text", contentKey: "brand", defaultValue: "AHADEX TOOLS", defaultValueBn: "আহাদেক্স টুলস", visible: true, x: 0.5, y: 0.6, fontFamily: "sans", fontSize: 46, fontWeight: 800, color: "#F0F0F0", align: "center", letterSpacing: 6, uppercase: true },
      /* Silver underline */
      { id: "underline", type: "shape", shape: "rect", visible: true, x: 0.5, y: 0.69, width: 0.18, height: 0.005, fill: "#C0C0C0" },
      /* Tagline */
      { id: "tagline", type: "text", contentKey: "tagline", defaultValue: "ENGINEERED FOR EXCELLENCE", defaultValueBn: "শ্রেষ্ঠত্বের জন্য প্রকৌশল", visible: true, x: 0.5, y: 0.78, fontFamily: "mono", fontSize: 10, fontWeight: 500, color: "#909090", align: "center", letterSpacing: 4, uppercase: true },
    ],
  },

  back: {
    background: { type: "solid", color1: "#0A0A0A" },
    elements: [
      /* Carbon texture */
      { id: "carbon-b", type: "ornament", ornament: "carbon-fiber", visible: true, x: 0.5, y: 0.5, size: 0.9, colors: ["#1A1A1A"], opacity: 0.5 },
      /* Silver diagonals */
      { id: "silver-tl", type: "shape", shape: "diagonal-stripe", visible: true, x: 0.5, y: 0.12, width: 1, height: 0.01, fill: "#C0C0C0", direction: "tr-bl", opacity: 0.6 },
      { id: "silver-br", type: "shape", shape: "diagonal-stripe", visible: true, x: 0.5, y: 0.88, width: 1, height: 0.01, fill: "#C0C0C0", direction: "tr-bl", opacity: 0.6 },
      { id: "name", type: "text", contentKey: "name", defaultValue: "Md. Ahadvi", visible: true, x: 0.08, y: 0.26, fontFamily: "sans", fontSize: 34, fontWeight: 800, color: "#F0F0F0", align: "left" },
      { id: "title", type: "text", contentKey: "title", defaultValue: "FOUNDER & DEVELOPER", visible: true, x: 0.08, y: 0.4, fontFamily: "mono", fontSize: 11, fontWeight: 500, color: "#C0C0C0", align: "left", letterSpacing: 4, uppercase: true },
      { id: "rule", type: "shape", shape: "line", visible: true, x: 0.08, y: 0.48, width: 0.32, height: 0, stroke: "#C0C0C0", strokeWidth: 1, direction: "l-r" },
      { id: "phone", type: "text", contentKey: "phone", defaultValue: "+880 123 456 789", visible: true, x: 0.08, y: 0.56, fontFamily: "sans", fontSize: 12, fontWeight: 400, color: "#F0F0F0", align: "left" },
      { id: "email", type: "text", contentKey: "email", defaultValue: "ahadvi@gmail.com", visible: true, x: 0.08, y: 0.65, fontFamily: "sans", fontSize: 12, fontWeight: 400, color: "#F0F0F0", align: "left" },
      { id: "website", type: "text", contentKey: "website", defaultValue: "www.ahadex.online", visible: true, x: 0.08, y: 0.74, fontFamily: "sans", fontSize: 12, fontWeight: 400, color: "#909090", align: "left" },
      { id: "location", type: "text", contentKey: "location", defaultValue: "Dhaka, Bangladesh", visible: true, x: 0.08, y: 0.83, fontFamily: "sans", fontSize: 11, fontWeight: 400, color: "#909090", align: "left" },
      { id: "qr", type: "qr", visible: true, x: 0.79, y: 0.55, size: 0.25, fgColor: "#0A0A0A", bgColor: "#F0F0F0", padding: 0.12 },
      { id: "qr-label", type: "text", contentKey: "qrLabel", defaultValue: "SCAN TO VISIT", defaultValueBn: "স্ক্যান করুন", visible: true, x: 0.79, y: 0.84, fontFamily: "mono", fontSize: 8, fontWeight: 500, color: "#C0C0C0", align: "center", letterSpacing: 3, uppercase: true },
    ],
  },
};

import type { Template } from "../types";

export const template20: Template = {
  id: "cyber-hexagon-premium",
  name: "Cyber Hexagon Premium",
  nameBn: "সাইবার হেক্সাগন প্রিমিয়াম",
  category: "technology",
  palette: { primary: "#050A1A", accent: "#00C8FF", text: "#FFFFFF", subtext: "#7AA8D8" },

  front: {
    background: { type: "gradient", color1: "#050A1A", color2: "#0F1A3A", angle: 135 },
    elements: [
      /* Hexagonal frame around logo */
      { id: "hex-outer", type: "ornament", ornament: "hexagon-frame", visible: true, x: 0.5, y: 0.4, size: 0.16, colors: ["#00C8FF"] },
      { id: "hex-inner", type: "ornament", ornament: "hexagon-frame", visible: true, x: 0.5, y: 0.4, size: 0.13, colors: ["#00C8FF"], opacity: 0.5 },
      /* Corner circuit lines */
      { id: "circuit-tl", type: "ornament", ornament: "circuit-line", visible: true, x: 0.15, y: 0.15, size: 0.12, colors: ["#00C8FF"], opacity: 0.6 },
      { id: "circuit-br", type: "ornament", ornament: "circuit-line", visible: true, x: 0.85, y: 0.85, size: 0.12, colors: ["#00C8FF"], opacity: 0.6, rotation: 180 },
      /* Logo */
      { id: "logo", type: "logo", visible: true, x: 0.5, y: 0.4, size: 0.08, align: "center" },
      /* Brand */
      { id: "brand", type: "text", contentKey: "brand", defaultValue: "AHADEX TOOLS", defaultValueBn: "আহাদেক্স টুলস", visible: true, x: 0.5, y: 0.62, fontFamily: "sans", fontSize: 42, fontWeight: 800, color: "#FFFFFF", align: "center", letterSpacing: 6, uppercase: true },
      /* Cyan line */
      { id: "underline", type: "shape", shape: "rect", visible: true, x: 0.5, y: 0.71, width: 0.18, height: 0.005, fill: "#00C8FF" },
      /* Tagline */
      { id: "tagline", type: "text", contentKey: "tagline", defaultValue: "NEXT-GEN SOLUTIONS", defaultValueBn: "পরবর্তী প্রজন্মের সমাধান", visible: true, x: 0.5, y: 0.79, fontFamily: "mono", fontSize: 9, fontWeight: 500, color: "#7AA8D8", align: "center", letterSpacing: 4, uppercase: true },
    ],
  },

  back: {
    background: { type: "gradient", color1: "#050A1A", color2: "#0F1A3A", angle: 135 },
    elements: [
      /* Hexagon frame around QR */
      { id: "hex-qr", type: "ornament", ornament: "hexagon-frame", visible: true, x: 0.79, y: 0.55, size: 0.22, colors: ["#00C8FF"], opacity: 0.6 },
      /* Circuit top-right */
      { id: "circuit-tr", type: "ornament", ornament: "circuit-line", visible: true, x: 0.9, y: 0.15, size: 0.1, colors: ["#00C8FF"], opacity: 0.5 },
      { id: "name", type: "text", contentKey: "name", defaultValue: "Md. Ahadvi", visible: true, x: 0.08, y: 0.26, fontFamily: "sans", fontSize: 34, fontWeight: 800, color: "#FFFFFF", align: "left" },
      { id: "title", type: "text", contentKey: "title", defaultValue: "FOUNDER & DEVELOPER", visible: true, x: 0.08, y: 0.4, fontFamily: "mono", fontSize: 11, fontWeight: 500, color: "#00C8FF", align: "left", letterSpacing: 4, uppercase: true },
      { id: "rule", type: "shape", shape: "line", visible: true, x: 0.08, y: 0.48, width: 0.32, height: 0, stroke: "#00C8FF", strokeWidth: 1, direction: "l-r" },
      { id: "phone", type: "text", contentKey: "phone", defaultValue: "+880 123 456 789", visible: true, x: 0.08, y: 0.56, fontFamily: "sans", fontSize: 12, fontWeight: 400, color: "#FFFFFF", align: "left" },
      { id: "email", type: "text", contentKey: "email", defaultValue: "ahadvi@gmail.com", visible: true, x: 0.08, y: 0.65, fontFamily: "sans", fontSize: 12, fontWeight: 400, color: "#FFFFFF", align: "left" },
      { id: "website", type: "text", contentKey: "website", defaultValue: "www.ahadex.fun", visible: true, x: 0.08, y: 0.74, fontFamily: "sans", fontSize: 12, fontWeight: 400, color: "#7AA8D8", align: "left" },
      { id: "location", type: "text", contentKey: "location", defaultValue: "Dhaka, Bangladesh", visible: true, x: 0.08, y: 0.83, fontFamily: "sans", fontSize: 11, fontWeight: 400, color: "#7AA8D8", align: "left" },
      { id: "qr", type: "qr", visible: true, x: 0.79, y: 0.55, size: 0.22, fgColor: "#050A1A", bgColor: "#FFFFFF", padding: 0.12 },
      { id: "qr-label", type: "text", contentKey: "qrLabel", defaultValue: "SCAN TO VISIT", defaultValueBn: "স্ক্যান করুন", visible: true, x: 0.79, y: 0.84, fontFamily: "mono", fontSize: 8, fontWeight: 500, color: "#00C8FF", align: "center", letterSpacing: 3, uppercase: true },
    ],
  },
};

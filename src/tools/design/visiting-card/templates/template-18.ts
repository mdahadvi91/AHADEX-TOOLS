import type { Template } from "../types";

export const template18: Template = {
  id: "aqua-abstract-flow",
  name: "Aqua Abstract Flow",
  nameBn: "অ্যাকুয়া অ্যাবস্ট্রাক্ট ফ্লো",
  category: "technology",
  palette: { primary: "#0A1A2A", accent: "#00E5D0", text: "#FFFFFF", subtext: "#80C8C0" },

  front: {
    background: { type: "gradient", color1: "#0A1A2A", color2: "#0F2A3A", angle: 135 },
    elements: [
      /* Flowing aqua ribbon top */
      { id: "wave-1", type: "ornament", ornament: "wave", visible: true, x: 0.5, y: 0.2, size: 0.4, colors: ["#00E5D0"], opacity: 0.7 },
      /* Flowing ribbon bottom */
      { id: "wave-2", type: "ornament", ornament: "wave", visible: true, x: 0.5, y: 0.8, size: 0.4, colors: ["#00E5D0"], opacity: 0.4, rotation: 180 },
      /* Logo */
      { id: "logo", type: "logo", visible: true, x: 0.5, y: 0.4, size: 0.11, align: "center" },
      /* Brand */
      { id: "brand", type: "text", contentKey: "brand", defaultValue: "AHADEX TOOLS", defaultValueBn: "আহাদেক্স টুলস", visible: true, x: 0.5, y: 0.6, fontFamily: "sans", fontSize: 44, fontWeight: 700, color: "#FFFFFF", align: "center", letterSpacing: 6, uppercase: true },
      /* Underline */
      { id: "underline", type: "shape", shape: "rect", visible: true, x: 0.5, y: 0.69, width: 0.16, height: 0.006, fill: "#00E5D0" },
      /* Tagline */
      { id: "tagline", type: "text", contentKey: "tagline", defaultValue: "FLOW WITH THE FUTURE", defaultValueBn: "ভবিষ্যতের সাথে প্রবাহিত হোন", visible: true, x: 0.5, y: 0.78, fontFamily: "sans", fontSize: 10, fontWeight: 500, color: "#80C8C0", align: "center", letterSpacing: 4, uppercase: true },
    ],
  },

  back: {
    background: { type: "gradient", color1: "#0A1A2A", color2: "#0F2A3A", angle: 135 },
    elements: [
      /* Ribbon diagonal right */
      { id: "wave-r", type: "ornament", ornament: "wave", visible: true, x: 0.9, y: 0.5, size: 0.3, colors: ["#00E5D0"], opacity: 0.5, rotation: 90 },
      { id: "name", type: "text", contentKey: "name", defaultValue: "Md. Ahadvi", visible: true, x: 0.08, y: 0.26, fontFamily: "sans", fontSize: 34, fontWeight: 700, color: "#FFFFFF", align: "left" },
      { id: "title", type: "text", contentKey: "title", defaultValue: "FOUNDER & DEVELOPER", visible: true, x: 0.08, y: 0.4, fontFamily: "sans", fontSize: 11, fontWeight: 500, color: "#00E5D0", align: "left", letterSpacing: 4, uppercase: true },
      { id: "rule", type: "shape", shape: "line", visible: true, x: 0.08, y: 0.48, width: 0.32, height: 0, stroke: "#00E5D0", strokeWidth: 1, direction: "l-r" },
      { id: "phone", type: "text", contentKey: "phone", defaultValue: "+880 123 456 789", visible: true, x: 0.08, y: 0.56, fontFamily: "sans", fontSize: 12, fontWeight: 400, color: "#FFFFFF", align: "left" },
      { id: "email", type: "text", contentKey: "email", defaultValue: "ahadvi@gmail.com", visible: true, x: 0.08, y: 0.65, fontFamily: "sans", fontSize: 12, fontWeight: 400, color: "#FFFFFF", align: "left" },
      { id: "website", type: "text", contentKey: "website", defaultValue: "www.ahadex.fun", visible: true, x: 0.08, y: 0.74, fontFamily: "sans", fontSize: 12, fontWeight: 400, color: "#80C8C0", align: "left" },
      { id: "location", type: "text", contentKey: "location", defaultValue: "Dhaka, Bangladesh", visible: true, x: 0.08, y: 0.83, fontFamily: "sans", fontSize: 11, fontWeight: 400, color: "#80C8C0", align: "left" },
      { id: "qr", type: "qr", visible: true, x: 0.79, y: 0.55, size: 0.25, fgColor: "#0A1A2A", bgColor: "#FFFFFF", padding: 0.12 },
      { id: "qr-label", type: "text", contentKey: "qrLabel", defaultValue: "SCAN TO VISIT", defaultValueBn: "স্ক্যান করুন", visible: true, x: 0.79, y: 0.84, fontFamily: "sans", fontSize: 8, fontWeight: 500, color: "#00E5D0", align: "center", letterSpacing: 3, uppercase: true },
    ],
  },
};

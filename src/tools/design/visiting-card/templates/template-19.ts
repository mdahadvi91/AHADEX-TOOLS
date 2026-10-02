import type { Template } from "../types";

export const template19: Template = {
  id: "red-sun-japanese",
  name: "Red Sun Japanese",
  nameBn: "রেড সান জাপানিজ",
  category: "elegant",
  palette: { primary: "#0A0A0A", accent: "#C8102E", text: "#F5F0E8", subtext: "#9A9088" },

  front: {
    background: { type: "solid", color1: "#0A0A0A" },
    elements: [
      /* Red sun circle top-right */
      { id: "sun", type: "ornament", ornament: "japanese-sun", visible: true, x: 0.85, y: 0.25, size: 0.18, colors: ["#C8102E", "#F5F0E8"] },
      /* Bottom subtle red line */
      { id: "red-line", type: "shape", shape: "rect", visible: true, x: 0.5, y: 0.9, width: 0.6, height: 0.003, fill: "#C8102E" },
      /* Logo left */
      { id: "logo", type: "logo", visible: true, x: 0.22, y: 0.42, size: 0.1, align: "center" },
      /* Brand */
      { id: "brand", type: "text", contentKey: "brand", defaultValue: "AHADEX", defaultValueBn: "আহাদেক্স", visible: true, x: 0.22, y: 0.6, fontFamily: "display", fontSize: 40, fontWeight: 700, color: "#F5F0E8", align: "center", letterSpacing: 8, uppercase: true },
      /* Red dot divider */
      { id: "dot", type: "shape", shape: "circle", visible: true, x: 0.22, y: 0.7, width: 0.01, height: 0.01, fill: "#C8102E" },
      /* Tagline */
      { id: "tagline", type: "text", contentKey: "tagline", defaultValue: "SIMPLE · PRECISE · TIMELESS", defaultValueBn: "সরল · নির্ভুল · চিরন্তন", visible: true, x: 0.22, y: 0.78, fontFamily: "serif", fontSize: 9, fontWeight: 400, color: "#9A9088", align: "center", letterSpacing: 4, uppercase: true },
    ],
  },

  back: {
    background: { type: "solid", color1: "#0A0A0A" },
    elements: [
      /* Bamboo-inspired line right */
      { id: "bamboo", type: "ornament", ornament: "botanical-leaf", visible: true, x: 0.95, y: 0.5, size: 0.15, colors: ["#C8102E"], opacity: 0.4, rotation: 90 },
      { id: "name", type: "text", contentKey: "name", defaultValue: "Md. Ahadvi", visible: true, x: 0.08, y: 0.26, fontFamily: "display", fontSize: 34, fontWeight: 700, color: "#F5F0E8", align: "left" },
      { id: "title", type: "text", contentKey: "title", defaultValue: "FOUNDER & DEVELOPER", visible: true, x: 0.08, y: 0.4, fontFamily: "serif", fontSize: 11, fontWeight: 400, color: "#C8102E", align: "left", letterSpacing: 4, uppercase: true },
      { id: "rule", type: "shape", shape: "line", visible: true, x: 0.08, y: 0.48, width: 0.32, height: 0, stroke: "#C8102E", strokeWidth: 0.8, direction: "l-r" },
      { id: "phone", type: "text", contentKey: "phone", defaultValue: "+880 123 456 789", visible: true, x: 0.08, y: 0.56, fontFamily: "sans", fontSize: 12, fontWeight: 400, color: "#F5F0E8", align: "left" },
      { id: "email", type: "text", contentKey: "email", defaultValue: "ahadvi@gmail.com", visible: true, x: 0.08, y: 0.65, fontFamily: "sans", fontSize: 12, fontWeight: 400, color: "#F5F0E8", align: "left" },
      { id: "website", type: "text", contentKey: "website", defaultValue: "www.ahadex.fun", visible: true, x: 0.08, y: 0.74, fontFamily: "sans", fontSize: 12, fontWeight: 400, color: "#9A9088", align: "left" },
      { id: "location", type: "text", contentKey: "location", defaultValue: "Dhaka, Bangladesh", visible: true, x: 0.08, y: 0.83, fontFamily: "sans", fontSize: 11, fontWeight: 400, color: "#9A9088", align: "left" },
      { id: "qr", type: "qr", visible: true, x: 0.79, y: 0.55, size: 0.25, fgColor: "#0A0A0A", bgColor: "#F5F0E8", padding: 0.12 },
      { id: "qr-label", type: "text", contentKey: "qrLabel", defaultValue: "SCAN TO VISIT", defaultValueBn: "স্ক্যান করুন", visible: true, x: 0.79, y: 0.84, fontFamily: "serif", fontSize: 8, fontWeight: 400, color: "#C8102E", align: "center", letterSpacing: 3, uppercase: true },
    ],
  },
};

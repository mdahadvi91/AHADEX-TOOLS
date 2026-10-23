import type { Template } from "../types";

export const template01: Template = {
  id: "luxury-black-gold",
  name: "Luxury Black & Gold",
  nameBn: "লাক্সারি কালো ও সোনালি",
  category: "luxury",
  palette: { primary: "#0A0A0A", accent: "#C99667", text: "#E5C9A4", subtext: "#8B6A45" },
  front: {
    background: { type: "solid", color1: "#0A0A0A" },
    elements: [
      { id: "frame", type: "shape", shape: "rect", visible: true, x: 0.05, y: 0.05, width: 0.9, height: 0.9, stroke: "#C99667", strokeWidth: 0.6, fill: "transparent" },
      { id: "ornament-tr", type: "ornament", ornament: "gold-corner", visible: true, x: 0.88, y: 0.14, size: 0.28, colors: ["#C99667", "#8B6A45"], rotation: 0 },
      { id: "ornament-bl", type: "ornament", ornament: "gold-corner", visible: true, x: 0.12, y: 0.86, size: 0.28, colors: ["#C99667", "#8B6A45"], rotation: 180 },
      { id: "logo", type: "logo", visible: true, x: 0.5, y: 0.35, size: 0.65, align: "center" },
      { id: "brand", type: "text", contentKey: "brand", defaultValue: "AHADEX TOOLS", defaultValueBn: "আহাদেক্স টুলস", visible: true, x: 0.5, y: 0.78, fontFamily: "display", fontSize: 50, fontWeight: 700, color: "#E5C9A4", align: "center", letterSpacing: 6, uppercase: true },
      { id: "tagline", type: "text", contentKey: "tagline", defaultValue: "Tools for a Smarter Tomorrow", defaultValueBn: "আগামীর স্মার্ট টুলস", visible: true, x: 0.5, y: 0.90, fontFamily: "serif", fontSize: 44, fontWeight: 400, color: "#8B6A45", align: "center", letterSpacing: 4, uppercase: true },
    ],
  },
  back: {
    background: { type: "solid", color1: "#0A0A0A" },
    elements: [
      { id: "frame-back", type: "shape", shape: "rect", visible: true, x: 0.05, y: 0.05, width: 0.9, height: 0.9, stroke: "#C99667", strokeWidth: 0.5, fill: "transparent" },
      { id: "diag-top", type: "shape", shape: "diagonal-stripe", visible: true, x: 0, y: 0.06, width: 1, height: 0.04, fill: "#C99667", direction: "tr-bl" },
      { id: "name", type: "text", contentKey: "name", defaultValue: "Md. Ahadvi", visible: true, x: 0.1, y: 0.24, fontFamily: "display", fontSize: 56, fontWeight: 700, color: "#E5C9A4", align: "left" },
      { id: "title", type: "text", contentKey: "title", defaultValue: "FOUNDER & DEVELOPER", visible: true, x: 0.1, y: 0.38, fontFamily: "sans", fontSize: 44, fontWeight: 500, color: "#8B6A45", align: "left", letterSpacing: 4, uppercase: true },
      { id: "rule-1", type: "shape", shape: "line", visible: true, x: 0.1, y: 0.46, width: 0.35, height: 0, stroke: "#C99667", strokeWidth: 0.8, direction: "l-r" },
      { id: "phone", type: "text", contentKey: "phone", defaultValue: "+880 123 456 789", visible: true, x: 0.1, y: 0.54, fontFamily: "sans", fontSize: 44, fontWeight: 400, color: "#E5C9A4", align: "left" },
      { id: "email", type: "text", contentKey: "email", defaultValue: "ahadvi@gmail.com", visible: true, x: 0.1, y: 0.65, fontFamily: "sans", fontSize: 44, fontWeight: 400, color: "#E5C9A4", align: "left" },
      { id: "location", type: "text", contentKey: "location", defaultValue: "Dhaka, Bangladesh", visible: true, x: 0.1, y: 0.76, fontFamily: "sans", fontSize: 44, fontWeight: 400, color: "#E5C9A4", align: "left" },
      { id: "website", type: "text", contentKey: "website", defaultValue: "www.ahadex.fun", visible: true, x: 0.1, y: 0.87, fontFamily: "sans", fontSize: 43, fontWeight: 400, color: "#8B6A45", align: "left" },
      { id: "qr", type: "qr", visible: true, x: 0.78, y: 0.5, size: 0.28, fgColor: "#0A0A0A", bgColor: "#E5C9A4", padding: 0.12 },
      { id: "qr-label", type: "text", contentKey: "qrLabel", defaultValue: "SCAN TO VISIT", defaultValueBn: "স্ক্যান করুন", visible: true, x: 0.78, y: 0.85, fontFamily: "sans", fontSize: 40, fontWeight: 500, color: "#8B6A45", align: "center", letterSpacing: 3, uppercase: true },
    ],
  },
};

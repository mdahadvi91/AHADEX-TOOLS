import type { Template } from "../types";

export const template03: Template = {
  id: "white-marble-gold",
  name: "White Marble & Gold",
  nameBn: "হোয়াইট মার্বেল ও গোল্ড",
  category: "elegant",
  palette: {
    primary: "#FAF7F2",
    accent: "#C99667",
    text: "#1A1418",
    subtext: "#8B6A55",
  },
  front: {
    background: { type: "solid", color1: "#FAF7F2" },
    elements: [
      { id: "marble", type: "ornament", ornament: "marble-vein", visible: true, x: 0.3, y: 0.5, size: 0.5, colors: ["#C99667"], opacity: 0.6 },
      { id: "frame", type: "shape", shape: "rect", visible: true, x: 0.5, y: 0.5, width: 0.86, height: 0.86, stroke: "#C99667", strokeWidth: 0.8, fill: "transparent" },
      { id: "frame-inner", type: "shape", shape: "rect", visible: true, x: 0.5, y: 0.5, width: 0.8, height: 0.8, stroke: "#C99667", strokeWidth: 0.4, fill: "transparent", opacity: 0.5 },
      { id: "corner-tl", type: "ornament", ornament: "gold-corner", visible: true, x: 0.14, y: 0.14, size: 0.12, colors: ["#C99667", "#8B6A45"] },
      { id: "corner-br", type: "ornament", ornament: "gold-corner", visible: true, x: 0.86, y: 0.86, size: 0.12, colors: ["#C99667", "#8B6A45"], rotation: 180 },
      
      { id: "logo", type: "logo", visible: true, x: 0.5, y: 0.42, size: 0.55, align: "center" },
      { id: "brand", type: "text", contentKey: "brand", defaultValue: "AHADEX TOOLS", defaultValueBn: "আহাদেক্স টুলস", visible: true, x: 0.5, y: 0.77, fontFamily: "display", fontSize: 36, fontWeight: 700, color: "#1A1418", align: "center", letterSpacing: 4, uppercase: true },
      { id: "divider", type: "shape", shape: "line", visible: true, x: 0.5, y: 0.82, width: 0.15, height: 0, stroke: "#C99667", strokeWidth: 0.8, direction: "l-r" },
      { id: "tagline", type: "text", contentKey: "tagline", defaultValue: "Tools for a Smarter Tomorrow", defaultValueBn: "আগামীর স্মার্ট টুলস", visible: true, x: 0.5, y: 0.87, fontFamily: "serif", fontSize: 20, fontWeight: 400, color: "#8B6A55", align: "center", letterSpacing: 2, uppercase: true },
    ],
  },
  back: {
    background: { type: "solid", color1: "#FAF7F2" },
    elements: [
      { id: "marble-b", type: "ornament", ornament: "marble-vein", visible: true, x: 0.7, y: 0.5, size: 0.4, colors: ["#C99667"], opacity: 0.4 },
      { id: "frame-back", type: "shape", shape: "rect", visible: true, x: 0.5, y: 0.5, width: 0.88, height: 0.86, stroke: "#C99667", strokeWidth: 0.6, fill: "transparent" },
      
      { id: "name", type: "text", contentKey: "name", defaultValue: "Md. Ahadvi", visible: true, x: 0.1, y: 0.20, fontFamily: "display", fontSize: 56, fontWeight: 700, color: "#1A1418", align: "left" },
      { id: "title", type: "text", contentKey: "title", defaultValue: "FOUNDER & DEVELOPER", visible: true, x: 0.1, y: 0.32, fontFamily: "sans", fontSize: 44, fontWeight: 500, color: "#8B6A55", align: "left", letterSpacing: 4, uppercase: true },
      { id: "rule", type: "shape", shape: "line", visible: true, x: 0.1, y: 0.40, width: 0.35, height: 0, stroke: "#C99667", strokeWidth: 1, direction: "l-r" },
      
      { id: "phone", type: "text", contentKey: "phone", defaultValue: "+880 123 456 789", visible: true, x: 0.1, y: 0.48, fontFamily: "sans", fontSize: 44, fontWeight: 400, color: "#1A1418", align: "left" },
      { id: "email", type: "text", contentKey: "email", defaultValue: "ahadvi@gmail.com", visible: true, x: 0.1, y: 0.60, fontFamily: "sans", fontSize: 44, fontWeight: 400, color: "#1A1418", align: "left" },
      { id: "website", type: "text", contentKey: "website", defaultValue: "www.ahadex.fun", visible: true, x: 0.1, y: 0.72, fontFamily: "sans", fontSize: 43, fontWeight: 400, color: "#8B6A55", align: "left" },
      { id: "location", type: "text", contentKey: "location", defaultValue: "Dhaka, Bangladesh", visible: true, x: 0.1, y: 0.84, fontFamily: "sans", fontSize: 44, fontWeight: 400, color: "#8B6A55", align: "left" },
      
      { id: "qr", type: "qr", visible: true, x: 0.8, y: 0.55, size: 0.28, fgColor: "#1A1418", bgColor: "#FFFFFF", padding: 0.14 },
      
      /* 🚨 শুধুমাত্র এখানে fontSize: 40 থেকে 5 কমিয়ে 35 করা হয়েছে */
      { id: "qr-label", type: "text", contentKey: "qrLabel", defaultValue: "SCAN TO VISIT", defaultValueBn: "স্ক্যান করুন", visible: true, x: 0.8, y: 0.85, fontFamily: "sans", fontSize: 35, fontWeight: 500, color: "#8B6A55", align: "center", letterSpacing: 3, uppercase: true },
    ],
  },
};

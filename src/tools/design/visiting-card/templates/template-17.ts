import type { Template } from "../types";

export const template17: Template = {
  id: "white-marble-minimal-gold",
  name: "White Marble Minimal Gold",
  nameBn: "হোয়াইট মার্বেল মিনিমাল গোল্ড",
  category: "minimal",
  palette: { primary: "#FDFCFA", accent: "#B8935A", text: "#1A1418", subtext: "#8B7355" },

  front: {
    background: { type: "solid", color1: "#FDFCFA" },
    elements: [
      /* Marble veins subtle */
      { id: "marble", type: "ornament", ornament: "marble-vein", visible: true, x: 0.5, y: 0.5, size: 0.6, colors: ["#B8935A"], opacity: 0.35 },
      /* Top gold hairline */
      { id: "rule-t", type: "shape", shape: "rect", visible: true, x: 0.5, y: 0.16, width: 0.12, height: 0.003, fill: "#B8935A" },
      /* Bottom gold hairline */
      { id: "rule-b", type: "shape", shape: "rect", visible: true, x: 0.5, y: 0.84, width: 0.12, height: 0.003, fill: "#B8935A" },
      /* Logo */
      { id: "logo", type: "logo", visible: true, x: 0.5, y: 0.4, size: 0.1, align: "center" },
      /* Brand */
      { id: "brand", type: "text", contentKey: "brand", defaultValue: "AHADEX", defaultValueBn: "আহাদেক্স", visible: true, x: 0.5, y: 0.6, fontFamily: "display", fontSize: 48, fontWeight: 600, color: "#1A1418", align: "center", letterSpacing: 10, uppercase: true },
      /* Tagline */
      { id: "tagline", type: "text", contentKey: "tagline", defaultValue: "REFINED · SIMPLE · ELEGANT", defaultValueBn: "পরিমার্জিত · সরল · মার্জিত", visible: true, x: 0.5, y: 0.72, fontFamily: "serif", fontSize: 9, fontWeight: 400, color: "#8B7355", align: "center", letterSpacing: 5, uppercase: true },
    ],
  },

  back: {
    background: { type: "solid", color1: "#FDFCFA" },
    elements: [
      /* Marble */
      { id: "marble-b", type: "ornament", ornament: "marble-vein", visible: true, x: 0.5, y: 0.5, size: 0.5, colors: ["#B8935A"], opacity: 0.25 },
      /* Gold corner top-left */
      { id: "corner-tl", type: "ornament", ornament: "gold-corner", visible: true, x: 0.08, y: 0.08, size: 0.08, colors: ["#B8935A", "#8B7355"] },
      { id: "name", type: "text", contentKey: "name", defaultValue: "Md. Ahadvi", visible: true, x: 0.1, y: 0.28, fontFamily: "display", fontSize: 34, fontWeight: 600, color: "#1A1418", align: "left" },
      { id: "title", type: "text", contentKey: "title", defaultValue: "FOUNDER & DEVELOPER", visible: true, x: 0.1, y: 0.42, fontFamily: "serif", fontSize: 11, fontWeight: 400, color: "#8B7355", align: "left", letterSpacing: 4, uppercase: true },
      { id: "rule", type: "shape", shape: "line", visible: true, x: 0.1, y: 0.5, width: 0.3, height: 0, stroke: "#B8935A", strokeWidth: 0.6, direction: "l-r" },
      { id: "phone", type: "text", contentKey: "phone", defaultValue: "+880 123 456 789", visible: true, x: 0.1, y: 0.58, fontFamily: "sans", fontSize: 12, fontWeight: 400, color: "#1A1418", align: "left" },
      { id: "email", type: "text", contentKey: "email", defaultValue: "ahadvi@gmail.com", visible: true, x: 0.1, y: 0.67, fontFamily: "sans", fontSize: 12, fontWeight: 400, color: "#1A1418", align: "left" },
      { id: "website", type: "text", contentKey: "website", defaultValue: "www.ahadex.online", visible: true, x: 0.1, y: 0.76, fontFamily: "sans", fontSize: 12, fontWeight: 400, color: "#8B7355", align: "left" },
      { id: "location", type: "text", contentKey: "location", defaultValue: "Dhaka, Bangladesh", visible: true, x: 0.1, y: 0.85, fontFamily: "sans", fontSize: 11, fontWeight: 400, color: "#8B7355", align: "left" },
      { id: "qr", type: "qr", visible: true, x: 0.79, y: 0.55, size: 0.25, fgColor: "#1A1418", bgColor: "#FFFFFF", padding: 0.12 },
      { id: "qr-label", type: "text", contentKey: "qrLabel", defaultValue: "SCAN TO VISIT", defaultValueBn: "স্ক্যান করুন", visible: true, x: 0.79, y: 0.84, fontFamily: "serif", fontSize: 8, fontWeight: 400, color: "#8B7355", align: "center", letterSpacing: 3, uppercase: true },
    ],
  },
};

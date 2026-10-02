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
      /* Marble vein ornament */
      { id: "marble", type: "ornament", ornament: "marble-vein", visible: true, x: 0.3, y: 0.5, size: 0.5, colors: ["#C99667"], opacity: 0.6 },
      /* Outer gold frame */
      { id: "frame", type: "shape", shape: "rect", visible: true, x: 0.5, y: 0.5, width: 0.86, height: 0.86, stroke: "#C99667", strokeWidth: 0.8, fill: "transparent" },
      /* Inner gold frame */
      { id: "frame-inner", type: "shape", shape: "rect", visible: true, x: 0.5, y: 0.5, width: 0.8, height: 0.8, stroke: "#C99667", strokeWidth: 0.4, fill: "transparent", opacity: 0.5 },
      /* Gold corner TL */
      { id: "corner-tl", type: "ornament", ornament: "gold-corner", visible: true, x: 0.14, y: 0.14, size: 0.12, colors: ["#C99667", "#8B6A45"] },
      /* Gold corner BR */
      { id: "corner-br", type: "ornament", ornament: "gold-corner", visible: true, x: 0.86, y: 0.86, size: 0.12, colors: ["#C99667", "#8B6A45"], rotation: 180 },
      /* Logo */
      { id: "logo", type: "logo", visible: true, x: 0.5, y: 0.36, size: 0.11, align: "center" },
      /* Brand */
      { id: "brand", type: "text", contentKey: "brand", defaultValue: "AHADEX TOOLS", defaultValueBn: "আহাদেক্স টুলস", visible: true, x: 0.5, y: 0.58, fontFamily: "display", fontSize: 44, fontWeight: 700, color: "#1A1418", align: "center", letterSpacing: 6, uppercase: true },
      /* Divider */
      { id: "divider", type: "shape", shape: "line", visible: true, x: 0.5, y: 0.68, width: 0.12, height: 0, stroke: "#C99667", strokeWidth: 0.8, direction: "l-r" },
      /* Tagline */
      { id: "tagline", type: "text", contentKey: "tagline", defaultValue: "Tools for a Smarter Tomorrow", defaultValueBn: "আগামীর স্মার্ট টুলস", visible: true, x: 0.5, y: 0.78, fontFamily: "serif", fontSize: 12, fontWeight: 400, color: "#8B6A55", align: "center", letterSpacing: 3, uppercase: true },
    ],
  },

  back: {
    background: { type: "solid", color1: "#FAF7F2" },
    elements: [
      /* Marble vein subtle */
      { id: "marble-b", type: "ornament", ornament: "marble-vein", visible: true, x: 0.7, y: 0.5, size: 0.4, colors: ["#C99667"], opacity: 0.4 },
      /* Gold frame */
      { id: "frame-back", type: "shape", shape: "rect", visible: true, x: 0.5, y: 0.5, width: 0.88, height: 0.86, stroke: "#C99667", strokeWidth: 0.6, fill: "transparent" },
      /* Name */
      { id: "name", type: "text", contentKey: "name", defaultValue: "Md. Ahadvi", visible: true, x: 0.1, y: 0.24, fontFamily: "display", fontSize: 36, fontWeight: 700, color: "#1A1418", align: "left" },
      /* Title */
      { id: "title", type: "text", contentKey: "title", defaultValue: "FOUNDER & DEVELOPER", visible: true, x: 0.1, y: 0.39, fontFamily: "sans", fontSize: 12, fontWeight: 500, color: "#8B6A55", align: "left", letterSpacing: 4, uppercase: true },
      /* Gold rule */
      { id: "rule", type: "shape", shape: "line", visible: true, x: 0.1, y: 0.47, width: 0.35, height: 0, stroke: "#C99667", strokeWidth: 1, direction: "l-r" },
      /* Phone */
      { id: "phone", type: "text", contentKey: "phone", defaultValue: "+880 123 456 789", visible: true, x: 0.1, y: 0.55, fontFamily: "sans", fontSize: 13, fontWeight: 400, color: "#1A1418", align: "left" },
      /* Email */
      { id: "email", type: "text", contentKey: "email", defaultValue: "ahadvi@gmail.com", visible: true, x: 0.1, y: 0.65, fontFamily: "sans", fontSize: 13, fontWeight: 400, color: "#1A1418", align: "left" },
      /* Website */
      { id: "website", type: "text", contentKey: "website", defaultValue: "www.ahadex.online", visible: true, x: 0.1, y: 0.75, fontFamily: "sans", fontSize: 13, fontWeight: 400, color: "#8B6A55", align: "left" },
      /* Location */
      { id: "location", type: "text", contentKey: "location", defaultValue: "Dhaka, Bangladesh", visible: true, x: 0.1, y: 0.85, fontFamily: "sans", fontSize: 12, fontWeight: 400, color: "#8B6A55", align: "left" },
      /* QR */
      { id: "qr", type: "qr", visible: true, x: 0.79, y: 0.6, size: 0.26, fgColor: "#1A1418", bgColor: "#FFFFFF", padding: 0.14 },
      /* QR label */
      { id: "qr-label", type: "text", contentKey: "qrLabel", defaultValue: "SCAN TO VISIT", defaultValueBn: "স্ক্যান করুন", visible: true, x: 0.79, y: 0.85, fontFamily: "sans", fontSize: 9, fontWeight: 500, color: "#8B6A55", align: "center", letterSpacing: 3, uppercase: true },
    ],
  },
};

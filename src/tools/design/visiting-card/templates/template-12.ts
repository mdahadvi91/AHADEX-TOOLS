import type { Template } from "../types";

export const template12: Template = {
  id: "red-black-geometric",
  name: "Red & Black Geometric",
  nameBn: "রেড ও ব্ল্যাক জিওমেট্রিক",
  category: "bold",
  palette: { primary: "#0A0A0A", accent: "#C8102E", text: "#FFFFFF", subtext: "#A8A8B8" },

  front: {
    background: { type: "solid", color1: "#0A0A0A" },
    elements: [
      /* Red geometric triangle top-left */
      { id: "tri-1", type: "shape", shape: "triangle", visible: true, x: 0.12, y: 0.15, width: 0.3, height: 0.3, fill: "#C8102E" },
      /* Red geometric triangle bottom-right */
      { id: "tri-2", type: "shape", shape: "triangle", visible: true, x: 0.88, y: 0.85, width: 0.3, height: 0.3, fill: "#C8102E", rotation: 180 },
      /* Red thin diagonal accent */
      { id: "diag", type: "shape", shape: "diagonal-stripe", visible: true, x: 0.5, y: 0.5, width: 1, height: 0.008, fill: "#C8102E", direction: "tr-bl", opacity: 0.5 },
      /* Logo */
      { id: "logo", type: "logo", visible: true, x: 0.5, y: 0.4, size: 0.12, align: "center" },
      /* Brand */
      { id: "brand", type: "text", contentKey: "brand", defaultValue: "AHADEX TOOLS", defaultValueBn: "আহাদেক্স টুলস", visible: true, x: 0.5, y: 0.6, fontFamily: "sans", fontSize: 46, fontWeight: 900, color: "#FFFFFF", align: "center", letterSpacing: 4, uppercase: true },
      /* Red bar */
      { id: "bar", type: "shape", shape: "rect", visible: true, x: 0.5, y: 0.69, width: 0.18, height: 0.006, fill: "#C8102E" },
      /* Tagline */
      { id: "tagline", type: "text", contentKey: "tagline", defaultValue: "BUILD · SHIP · SCALE", defaultValueBn: "তৈরি · পাঠান · বৃদ্ধি", visible: true, x: 0.5, y: 0.78, fontFamily: "sans", fontSize: 11, fontWeight: 500, color: "#A8A8B8", align: "center", letterSpacing: 5, uppercase: true },
    ],
  },

  back: {
    background: { type: "solid", color1: "#0A0A0A" },
    elements: [
      /* Red side panel */
      { id: "side-panel", type: "shape", shape: "rect", visible: true, x: 0.02, y: 0.5, width: 0.04, height: 1, fill: "#C8102E" },
      /* Angular red shape top-right */
      { id: "tri-tr", type: "shape", shape: "triangle", visible: true, x: 0.95, y: 0.12, width: 0.15, height: 0.15, fill: "#C8102E" },
      { id: "name", type: "text", contentKey: "name", defaultValue: "Md. Ahadvi", visible: true, x: 0.1, y: 0.26, fontFamily: "sans", fontSize: 36, fontWeight: 900, color: "#FFFFFF", align: "left" },
      { id: "title", type: "text", contentKey: "title", defaultValue: "FOUNDER & DEVELOPER", visible: true, x: 0.1, y: 0.4, fontFamily: "sans", fontSize: 12, fontWeight: 500, color: "#C8102E", align: "left", letterSpacing: 4, uppercase: true },
      { id: "rule", type: "shape", shape: "line", visible: true, x: 0.1, y: 0.48, width: 0.36, height: 0, stroke: "#C8102E", strokeWidth: 1.2, direction: "l-r" },
      { id: "phone", type: "text", contentKey: "phone", defaultValue: "+880 123 456 789", visible: true, x: 0.1, y: 0.56, fontFamily: "sans", fontSize: 13, fontWeight: 400, color: "#FFFFFF", align: "left" },
      { id: "email", type: "text", contentKey: "email", defaultValue: "ahadvi@gmail.com", visible: true, x: 0.1, y: 0.65, fontFamily: "sans", fontSize: 13, fontWeight: 400, color: "#FFFFFF", align: "left" },
      { id: "website", type: "text", contentKey: "website", defaultValue: "www.ahadex.online", visible: true, x: 0.1, y: 0.74, fontFamily: "sans", fontSize: 13, fontWeight: 400, color: "#A8A8B8", align: "left" },
      { id: "location", type: "text", contentKey: "location", defaultValue: "Dhaka, Bangladesh", visible: true, x: 0.1, y: 0.83, fontFamily: "sans", fontSize: 12, fontWeight: 400, color: "#A8A8B8", align: "left" },
      { id: "qr", type: "qr", visible: true, x: 0.79, y: 0.55, size: 0.28, fgColor: "#0A0A0A", bgColor: "#FFFFFF", padding: 0.12 },
      { id: "qr-label", type: "text", contentKey: "qrLabel", defaultValue: "SCAN TO VISIT", defaultValueBn: "স্ক্যান করুন", visible: true, x: 0.79, y: 0.85, fontFamily: "sans", fontSize: 9, fontWeight: 700, color: "#C8102E", align: "center", letterSpacing: 3, uppercase: true },
    ],
  },
};

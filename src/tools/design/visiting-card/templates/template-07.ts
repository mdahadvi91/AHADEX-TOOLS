import type { Template } from "../types";

export const template07: Template = {
  id: "white-black-minimal",
  name: "White & Black Minimal",
  nameBn: "হোয়াইট ও ব্ল্যাক মিনিমাল",
  category: "minimal",
  palette: { primary: "#FFFFFF", accent: "#0A0A0A", text: "#0A0A0A", subtext: "#6B6B6B" },

  front: {
    background: { type: "solid", color1: "#FFFFFF" },
    elements: [
      /* Bold black corner block top-right */
      { id: "corner-tr", type: "shape", shape: "triangle", visible: true, x: 0.9, y: 0.15, width: 0.3, height: 0.3, fill: "#0A0A0A" },
      /* Small accent line */
      { id: "accent", type: "shape", shape: "rect", visible: true, x: 0.5, y: 0.24, width: 0.06, height: 0.008, fill: "#0A0A0A" },
      /* Logo */
      { id: "logo", type: "logo", visible: true, x: 0.5, y: 0.42, size: 0.13, align: "center" },
      /* Brand */
      { id: "brand", type: "text", contentKey: "brand", defaultValue: "AHADEX", defaultValueBn: "আহাদেক্স", visible: true, x: 0.5, y: 0.62, fontFamily: "sans", fontSize: 52, fontWeight: 900, color: "#0A0A0A", align: "center", letterSpacing: -1 },
      /* Tagline */
      { id: "tagline", type: "text", contentKey: "tagline", defaultValue: "TOOLS FOR A SMARTER TOMORROW", defaultValueBn: "আগামীর স্মার্ট টুলস", visible: true, x: 0.5, y: 0.78, fontFamily: "sans", fontSize: 11, fontWeight: 500, color: "#6B6B6B", align: "center", letterSpacing: 5, uppercase: true },
    ],
  },

  back: {
    background: { type: "solid", color1: "#FFFFFF" },
    elements: [
      /* Black diagonal bottom-right */
      { id: "diag", type: "shape", shape: "diagonal-stripe", visible: true, x: 0.5, y: 0.9, width: 1, height: 0.04, fill: "#0A0A0A", direction: "tr-bl" },
      /* Small black square corner */
      { id: "sq", type: "shape", shape: "rect", visible: true, x: 0.92, y: 0.1, width: 0.04, height: 0.04, fill: "#0A0A0A" },
      /* Name */
      { id: "name", type: "text", contentKey: "name", defaultValue: "Md. Ahadvi", visible: true, x: 0.08, y: 0.26, fontFamily: "sans", fontSize: 36, fontWeight: 900, color: "#0A0A0A", align: "left" },
      /* Title */
      { id: "title", type: "text", contentKey: "title", defaultValue: "FOUNDER & DEVELOPER", visible: true, x: 0.08, y: 0.4, fontFamily: "sans", fontSize: 12, fontWeight: 500, color: "#6B6B6B", align: "left", letterSpacing: 4, uppercase: true },
      /* Rule */
      { id: "rule", type: "shape", shape: "line", visible: true, x: 0.08, y: 0.48, width: 0.36, height: 0, stroke: "#0A0A0A", strokeWidth: 1, direction: "l-r" },
      /* Contacts */
      { id: "phone", type: "text", contentKey: "phone", defaultValue: "+880 123 456 789", visible: true, x: 0.08, y: 0.56, fontFamily: "sans", fontSize: 13, fontWeight: 400, color: "#0A0A0A", align: "left" },
      { id: "email", type: "text", contentKey: "email", defaultValue: "ahadvi@gmail.com", visible: true, x: 0.08, y: 0.65, fontFamily: "sans", fontSize: 13, fontWeight: 400, color: "#0A0A0A", align: "left" },
      { id: "website", type: "text", contentKey: "website", defaultValue: "www.ahadex.online", visible: true, x: 0.08, y: 0.74, fontFamily: "sans", fontSize: 13, fontWeight: 400, color: "#6B6B6B", align: "left" },
      { id: "location", type: "text", contentKey: "location", defaultValue: "Dhaka, Bangladesh", visible: true, x: 0.08, y: 0.83, fontFamily: "sans", fontSize: 12, fontWeight: 400, color: "#6B6B6B", align: "left" },
      /* QR */
      { id: "qr", type: "qr", visible: true, x: 0.8, y: 0.52, size: 0.26, fgColor: "#0A0A0A", bgColor: "#FFFFFF", padding: 0.12 },
      { id: "qr-label", type: "text", contentKey: "qrLabel", defaultValue: "SCAN TO VISIT", defaultValueBn: "স্ক্যান করুন", visible: true, x: 0.8, y: 0.83, fontFamily: "sans", fontSize: 9, fontWeight: 500, color: "#6B6B6B", align: "center", letterSpacing: 3, uppercase: true },
    ],
  },
};

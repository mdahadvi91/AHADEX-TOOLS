import type { Template } from "../types";

export const template02: Template = {
  id: "cyber-blue-tech",
  name: "Cyber Blue Tech",
  nameBn: "সাইবার ব্লু টেক",
  category: "technology",
  palette: {
    primary: "#0A1024",
    accent: "#00E5FF",
    text: "#FFFFFF",
    subtext: "#7AA8D8",
  },

  front: {
    background: { type: "gradient", color1: "#0A1024", color2: "#0F1F3A", angle: 135 },
    elements: [
      /* Cyan top line */
      { id: "top-line", type: "shape", shape: "rect", visible: true, x: 0.5, y: 0.1, width: 0.4, height: 0.004, fill: "#00E5FF" },
      /* Cyan bottom line */
      { id: "bottom-line", type: "shape", shape: "rect", visible: true, x: 0.5, y: 0.9, width: 0.4, height: 0.004, fill: "#00E5FF" },
      /* Circuit ornament top-left */
      { id: "circuit-tl", type: "ornament", ornament: "circuit-line", visible: true, x: 0.12, y: 0.2, size: 0.16, colors: ["#00E5FF"] },
      /* Circuit ornament bottom-right */
      { id: "circuit-br", type: "ornament", ornament: "circuit-line", visible: true, x: 0.88, y: 0.8, size: 0.16, colors: ["#00E5FF"], rotation: 180 },
      /* Hexagon frame behind logo */
      { id: "hex-frame", type: "ornament", ornament: "hexagon-frame", visible: true, x: 0.5, y: 0.42, size: 0.1, colors: ["#00E5FF"], opacity: 0.5 },
      /* Logo */
      { id: "logo", type: "logo", visible: true, x: 0.5, y: 0.42, size: 0.65, align: "center" },
      /* Brand */
      { id: "brand", type: "text", contentKey: "brand", defaultValue: "AHADEX TOOLS", defaultValueBn: "আহাদেক্স টুলস", visible: true, x: 0.5, y: 0.82, fontFamily: "sans", fontSize: 53, fontWeight: 800, color: "#FFFFFF", align: "center", letterSpacing: 6, uppercase: true },
      /* Tagline */
      { id: "tagline", type: "text", contentKey: "tagline", defaultValue: "FUTURE-PROOF TOOLS", defaultValueBn: "ভবিষ্যতের টুলস", visible: true, x: 0.5, y: 0.90, fontFamily: "mono", fontSize: 30, fontWeight: 400, color: "#00E5FF", align: "center", letterSpacing: 5, uppercase: true },
    ],
  },

  back: {
    background: { type: "gradient", color1: "#0A1024", color2: "#0F1F3A", angle: 135 },
    elements: [
      /* Corner circuit top-right */
      { id: "circuit-tr", type: "ornament", ornament: "circuit-line", visible: true, x: 0.9, y: 0.15, size: 0.12, colors: ["#00E5FF"], opacity: 0.6 },
      /* Name */
      { id: "name", type: "text", contentKey: "name", defaultValue: "Md. Ahadvi", visible: true, x: 0.08, y: 0.28, fontFamily: "sans", fontSize: 41, fontWeight: 800, color: "#FFFFFF", align: "left" },
      /* Title */
      { id: "title", type: "text", contentKey: "title", defaultValue: "FOUNDER & DEVELOPER", visible: true, x: 0.08, y: 0.42, fontFamily: "mono", fontSize: 30, fontWeight: 500, color: "#00E5FF", align: "left", letterSpacing: 4, uppercase: true },
      /* Cyan line under title */
      { id: "rule", type: "shape", shape: "line", visible: true, x: 0.24, y: 0.49, width: 0.32, height: 0, stroke: "#00E5FF", strokeWidth: 1, direction: "l-r" },
      /* Phone */
      { id: "phone", type: "text", contentKey: "phone", defaultValue: "+880 123 456 789", visible: true, x: 0.08, y: 0.58, fontFamily: "sans", fontSize: 33, fontWeight: 400, color: "#FFFFFF", align: "left" },
      /* Email */
      { id: "email", type: "text", contentKey: "email", defaultValue: "ahadvi@gmail.com", visible: true, x: 0.08, y: 0.67, fontFamily: "sans", fontSize: 33, fontWeight: 400, color: "#FFFFFF", align: "left" },
      /* Website */
      { id: "website", type: "text", contentKey: "website", defaultValue: "www.ahadex.fun", visible: true, x: 0.08, y: 0.70, fontFamily: "sans", fontSize: 33, fontWeight: 400, color: "#7AA8D8", align: "left" },
      /* Location */
      { id: "location", type: "text", contentKey: "location", defaultValue: "Dhaka, Bangladesh", visible: true, x: 0.08, y: 0.70, fontFamily: "sans", fontSize: 30, fontWeight: 400, color: "#7AA8D8", align: "left" },
      /* QR */
      { id: "qr", type: "qr", visible: true, x: 0.8, y: 0.55, size: 0.28, fgColor: "#0A1024", bgColor: "#00E5FF", padding: 0.12 },
      /* QR label */
      { id: "qr-label", type: "text", contentKey: "qrLabel", defaultValue: "SCAN TO VISIT", defaultValueBn: "স্ক্যান করুন", visible: true, x: 0.8, y: 0.70, fontFamily: "mono", fontSize: 23, fontWeight: 500, color: "#00E5FF", align: "center", letterSpacing: 3, uppercase: true },
    ],
  },
};

import type { Template } from "../types";

export const template06: Template = {
  id: "deep-green-botanical",
  name: "Deep Green Botanical",
  nameBn: "ডিপ গ্রিন বোটানিকাল",
  category: "nature",
  palette: {
    primary: "#0F2A20",
    accent: "#D4B478",
    text: "#F0E6D0",
    subtext: "#8AA898",
  },

  front: {
    background: { type: "gradient", color1: "#0F2A20", color2: "#1A4030", angle: 135 },
    elements: [
      /* Botanical leaves */
      { id: "leaf-tl", type: "ornament", ornament: "botanical-leaf", visible: true, x: 0.15, y: 0.18, size: 0.14, colors: ["#D4B478"], opacity: 0.7 },
      { id: "leaf-br", type: "ornament", ornament: "botanical-leaf", visible: true, x: 0.85, y: 0.82, size: 0.14, colors: ["#D4B478"], opacity: 0.7, rotation: 180 },
      /* Gold thin frame */
      { id: "frame", type: "shape", shape: "rect", visible: true, x: 0.5, y: 0.5, width: 0.84, height: 0.84, stroke: "#D4B478", strokeWidth: 0.6, fill: "transparent", opacity: 0.6 },
      /* Logo */
      { id: "logo", type: "logo", visible: true, x: 0.5, y: 0.38, size: 0.11, align: "center" },
      /* Brand */
      { id: "brand", type: "text", contentKey: "brand", defaultValue: "AHADEX TOOLS", defaultValueBn: "আহাদেক্স টুলস", visible: true, x: 0.5, y: 0.58, fontFamily: "serif", fontSize: 44, fontWeight: 600, color: "#F0E6D0", align: "center", letterSpacing: 6, uppercase: true },
      /* Decorative dots */
      { id: "dot-1", type: "shape", shape: "circle", visible: true, x: 0.44, y: 0.7, width: 0.012, height: 0.012, fill: "#D4B478" },
      { id: "dot-2", type: "shape", shape: "circle", visible: true, x: 0.5, y: 0.7, width: 0.018, height: 0.018, fill: "#D4B478" },
      { id: "dot-3", type: "shape", shape: "circle", visible: true, x: 0.56, y: 0.7, width: 0.012, height: 0.012, fill: "#D4B478" },
      /* Tagline */
      { id: "tagline", type: "text", contentKey: "tagline", defaultValue: "GROW · CREATE · SUCCEED", defaultValueBn: "বৃদ্ধি · সৃষ্টি · সফলতা", visible: true, x: 0.5, y: 0.79, fontFamily: "serif", fontSize: 11, fontWeight: 400, color: "#D4B478", align: "center", letterSpacing: 5, uppercase: true },
    ],
  },

  back: {
    background: { type: "gradient", color1: "#0F2A20", color2: "#1A4030", angle: 135 },
    elements: [
      /* Corner leaves */
      { id: "leaf-tr", type: "ornament", ornament: "botanical-leaf", visible: true, x: 0.88, y: 0.15, size: 0.12, colors: ["#D4B478"], opacity: 0.6, rotation: -90 },
      { id: "leaf-bl", type: "ornament", ornament: "botanical-leaf", visible: true, x: 0.12, y: 0.85, size: 0.12, colors: ["#D4B478"], opacity: 0.6, rotation: 90 },
      /* Gold frame */
      { id: "frame-back", type: "shape", shape: "rect", visible: true, x: 0.5, y: 0.5, width: 0.86, height: 0.86, stroke: "#D4B478", strokeWidth: 0.5, fill: "transparent", opacity: 0.5 },
      /* Name */
      { id: "name", type: "text", contentKey: "name", defaultValue: "Md. Ahadvi", visible: true, x: 0.1, y: 0.26, fontFamily: "serif", fontSize: 36, fontWeight: 700, color: "#F0E6D0", align: "left" },
      /* Title */
      { id: "title", type: "text", contentKey: "title", defaultValue: "FOUNDER & DEVELOPER", visible: true, x: 0.1, y: 0.4, fontFamily: "sans", fontSize: 12, fontWeight: 500, color: "#D4B478", align: "left", letterSpacing: 4, uppercase: true },
      /* Gold rule */
      { id: "rule", type: "shape", shape: "line", visible: true, x: 0.1, y: 0.48, width: 0.36, height: 0, stroke: "#D4B478", strokeWidth: 0.8, direction: "l-r" },
      /* Phone */
      { id: "phone", type: "text", contentKey: "phone", defaultValue: "+880 123 456 789", visible: true, x: 0.1, y: 0.56, fontFamily: "sans", fontSize: 13, fontWeight: 400, color: "#F0E6D0", align: "left" },
      /* Email */
      { id: "email", type: "text", contentKey: "email", defaultValue: "ahadvi@gmail.com", visible: true, x: 0.1, y: 0.65, fontFamily: "sans", fontSize: 13, fontWeight: 400, color: "#F0E6D0", align: "left" },
      /* Website */
      { id: "website", type: "text", contentKey: "website", defaultValue: "www.ahadex.fun", visible: true, x: 0.1, y: 0.74, fontFamily: "sans", fontSize: 13, fontWeight: 400, color: "#8AA898", align: "left" },
      /* Location */
      { id: "location", type: "text", contentKey: "location", defaultValue: "Dhaka, Bangladesh", visible: true, x: 0.1, y: 0.83, fontFamily: "sans", fontSize: 12, fontWeight: 400, color: "#8AA898", align: "left" },
      /* QR */
      { id: "qr", type: "qr", visible: true, x: 0.79, y: 0.55, size: 0.28, fgColor: "#0F2A20", bgColor: "#F0E6D0", padding: 0.12 },
      /* QR label */
      { id: "qr-label", type: "text", contentKey: "qrLabel", defaultValue: "SCAN TO VISIT", defaultValueBn: "স্ক্যান করুন", visible: true, x: 0.79, y: 0.85, fontFamily: "serif", fontSize: 9, fontWeight: 500, color: "#D4B478", align: "center", letterSpacing: 3, uppercase: true },
    ],
  },
};

import type { Template } from "../types";

export const template10: Template = {
  id: "cream-forest-green",
  name: "Cream & Forest Green",
  nameBn: "ক্রিম ও ফরেস্ট গ্রিন",
  category: "nature",
  palette: { primary: "#F5EDDC", accent: "#2D5A3F", text: "#1A2A1F", subtext: "#6B7A5F" },

  front: {
    background: { type: "solid", color1: "#F5EDDC" },
    elements: [
      /* Green thin frame */
      { id: "frame", type: "shape", shape: "rect", visible: true, x: 0.5, y: 0.5, width: 0.88, height: 0.84, stroke: "#2D5A3F", strokeWidth: 0.5, fill: "transparent", opacity: 0.5 },
      /* Botanical leaves in green */
      { id: "leaf-tl", type: "ornament", ornament: "botanical-leaf", visible: true, x: 0.14, y: 0.16, size: 0.12, colors: ["#2D5A3F"], opacity: 0.7 },
      { id: "leaf-br", type: "ornament", ornament: "botanical-leaf", visible: true, x: 0.86, y: 0.84, size: 0.12, colors: ["#2D5A3F"], opacity: 0.7, rotation: 180 },
      /* Logo */
      { id: "logo", type: "logo", visible: true, x: 0.5, y: 0.38, size: 0.11, align: "center" },
      /* Brand */
      { id: "brand", type: "text", contentKey: "brand", defaultValue: "AHADEX TOOLS", defaultValueBn: "আহাদেক্স টুলস", visible: true, x: 0.5, y: 0.58, fontFamily: "serif", fontSize: 44, fontWeight: 700, color: "#1A2A1F", align: "center", letterSpacing: 5, uppercase: true },
      /* Dots */
      { id: "dot-1", type: "shape", shape: "circle", visible: true, x: 0.45, y: 0.7, width: 0.012, height: 0.012, fill: "#2D5A3F" },
      { id: "dot-2", type: "shape", shape: "circle", visible: true, x: 0.5, y: 0.7, width: 0.016, height: 0.016, fill: "#2D5A3F" },
      { id: "dot-3", type: "shape", shape: "circle", visible: true, x: 0.55, y: 0.7, width: 0.012, height: 0.012, fill: "#2D5A3F" },
      /* Tagline */
      { id: "tagline", type: "text", contentKey: "tagline", defaultValue: "NATURAL · SIMPLE · SMART", defaultValueBn: "প্রাকৃতিক · সরল · স্মার্ট", visible: true, x: 0.5, y: 0.79, fontFamily: "serif", fontSize: 11, fontWeight: 400, color: "#6B7A5F", align: "center", letterSpacing: 5, uppercase: true },
    ],
  },

  back: {
    background: { type: "solid", color1: "#F5EDDC" },
    elements: [
      { id: "leaf-b-tr", type: "ornament", ornament: "botanical-leaf", visible: true, x: 0.88, y: 0.85, size: 0.14, colors: ["#2D5A3F"], opacity: 0.5 },
      { id: "frame-back", type: "shape", shape: "rect", visible: true, x: 0.5, y: 0.5, width: 0.88, height: 0.84, stroke: "#2D5A3F", strokeWidth: 0.4, fill: "transparent", opacity: 0.4 },
      { id: "name", type: "text", contentKey: "name", defaultValue: "Md. Ahadvi", visible: true, x: 0.1, y: 0.26, fontFamily: "serif", fontSize: 36, fontWeight: 700, color: "#1A2A1F", align: "left" },
      { id: "title", type: "text", contentKey: "title", defaultValue: "FOUNDER & DEVELOPER", visible: true, x: 0.1, y: 0.4, fontFamily: "sans", fontSize: 12, fontWeight: 500, color: "#2D5A3F", align: "left", letterSpacing: 4, uppercase: true },
      { id: "rule", type: "shape", shape: "line", visible: true, x: 0.1, y: 0.48, width: 0.36, height: 0, stroke: "#2D5A3F", strokeWidth: 0.8, direction: "l-r" },
      { id: "phone", type: "text", contentKey: "phone", defaultValue: "+880 123 456 789", visible: true, x: 0.1, y: 0.56, fontFamily: "sans", fontSize: 13, fontWeight: 400, color: "#1A2A1F", align: "left" },
      { id: "email", type: "text", contentKey: "email", defaultValue: "ahadvi@gmail.com", visible: true, x: 0.1, y: 0.65, fontFamily: "sans", fontSize: 13, fontWeight: 400, color: "#1A2A1F", align: "left" },
      { id: "website", type: "text", contentKey: "website", defaultValue: "www.ahadex.fun", visible: true, x: 0.1, y: 0.74, fontFamily: "sans", fontSize: 13, fontWeight: 400, color: "#6B7A5F", align: "left" },
      { id: "location", type: "text", contentKey: "location", defaultValue: "Dhaka, Bangladesh", visible: true, x: 0.1, y: 0.83, fontFamily: "sans", fontSize: 12, fontWeight: 400, color: "#6B7A5F", align: "left" },
      { id: "qr", type: "qr", visible: true, x: 0.79, y: 0.55, size: 0.28, fgColor: "#2D5A3F", bgColor: "#FFFFFF", padding: 0.12 },
      { id: "qr-label", type: "text", contentKey: "qrLabel", defaultValue: "SCAN TO VISIT", defaultValueBn: "স্ক্যান করুন", visible: true, x: 0.79, y: 0.85, fontFamily: "serif", fontSize: 9, fontWeight: 400, color: "#2D5A3F", align: "center", letterSpacing: 3, uppercase: true },
    ],
  },
};

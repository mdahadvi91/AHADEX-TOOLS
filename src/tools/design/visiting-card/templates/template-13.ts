import type { Template } from "../types";

export const template13: Template = {
  id: "sky-blue-corporate",
  name: "Sky Blue Corporate",
  nameBn: "স্কাই ব্লু কর্পোরেট",
  category: "corporate",
  palette: { primary: "#FFFFFF", accent: "#2196F3", text: "#0A2342", subtext: "#6B8AB0" },

  front: {
    background: { type: "solid", color1: "#FFFFFF" },
    elements: [
      /* Soft blue wave bottom */
      { id: "wave-b", type: "ornament", ornament: "wave", visible: true, x: 0.5, y: 0.88, size: 0.55, colors: ["#2196F3"], opacity: 0.85 },
      /* Light blue accent circle top-right */
      { id: "circle-tr", type: "shape", shape: "circle", visible: true, x: 0.9, y: 0.15, width: 0.15, height: 0.15, fill: "#2196F3", opacity: 0.15 },
      /* Logo */
      { id: "logo", type: "logo", visible: true, x: 0.5, y: 0.4, size: 0.12, align: "center" },
      /* Brand */
      { id: "brand", type: "text", contentKey: "brand", defaultValue: "AHADEX TOOLS", defaultValueBn: "আহাদেক্স টুলস", visible: true, x: 0.5, y: 0.6, fontFamily: "sans", fontSize: 46, fontWeight: 800, color: "#0A2342", align: "center", letterSpacing: 5, uppercase: true },
      /* Blue underline */
      { id: "underline", type: "shape", shape: "rect", visible: true, x: 0.5, y: 0.69, width: 0.16, height: 0.008, fill: "#2196F3" },
      /* Tagline */
      { id: "tagline", type: "text", contentKey: "tagline", defaultValue: "SIMPLE · RELIABLE · FAST", defaultValueBn: "সরল · নির্ভরযোগ্য · দ্রুত", visible: true, x: 0.5, y: 0.78, fontFamily: "sans", fontSize: 11, fontWeight: 500, color: "#6B8AB0", align: "center", letterSpacing: 4, uppercase: true },
    ],
  },

  back: {
    background: { type: "solid", color1: "#FFFFFF" },
    elements: [
      /* Wave continues bottom */
      { id: "wave-b", type: "ornament", ornament: "wave", visible: true, x: 0.5, y: 0.94, size: 0.4, colors: ["#2196F3"], opacity: 0.5 },
      { id: "name", type: "text", contentKey: "name", defaultValue: "Md. Ahadvi", visible: true, x: 0.08, y: 0.24, fontFamily: "sans", fontSize: 36, fontWeight: 800, color: "#0A2342", align: "left" },
      { id: "title", type: "text", contentKey: "title", defaultValue: "FOUNDER & DEVELOPER", visible: true, x: 0.08, y: 0.38, fontFamily: "sans", fontSize: 12, fontWeight: 500, color: "#2196F3", align: "left", letterSpacing: 4, uppercase: true },
      { id: "rule", type: "shape", shape: "line", visible: true, x: 0.08, y: 0.46, width: 0.36, height: 0, stroke: "#2196F3", strokeWidth: 1.2, direction: "l-r" },
      { id: "phone", type: "text", contentKey: "phone", defaultValue: "+880 123 456 789", visible: true, x: 0.08, y: 0.54, fontFamily: "sans", fontSize: 13, fontWeight: 400, color: "#0A2342", align: "left" },
      { id: "email", type: "text", contentKey: "email", defaultValue: "ahadvi@gmail.com", visible: true, x: 0.08, y: 0.63, fontFamily: "sans", fontSize: 13, fontWeight: 400, color: "#0A2342", align: "left" },
      { id: "website", type: "text", contentKey: "website", defaultValue: "www.ahadex.fun", visible: true, x: 0.08, y: 0.72, fontFamily: "sans", fontSize: 13, fontWeight: 400, color: "#6B8AB0", align: "left" },
      { id: "location", type: "text", contentKey: "location", defaultValue: "Dhaka, Bangladesh", visible: true, x: 0.08, y: 0.81, fontFamily: "sans", fontSize: 12, fontWeight: 400, color: "#6B8AB0", align: "left" },
      { id: "qr", type: "qr", visible: true, x: 0.79, y: 0.52, size: 0.28, fgColor: "#0A2342", bgColor: "#FFFFFF", padding: 0.12 },
      { id: "qr-label", type: "text", contentKey: "qrLabel", defaultValue: "SCAN TO VISIT", defaultValueBn: "স্ক্যান করুন", visible: true, x: 0.79, y: 0.83, fontFamily: "sans", fontSize: 9, fontWeight: 500, color: "#2196F3", align: "center", letterSpacing: 3, uppercase: true },
    ],
  },
};

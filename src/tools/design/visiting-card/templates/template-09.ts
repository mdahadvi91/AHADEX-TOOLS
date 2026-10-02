import type { Template } from "../types";

export const template09: Template = {
  id: "purple-neon-creative",
  name: "Purple Neon Creative",
  nameBn: "পার্পল নিয়ন ক্রিয়েটিভ",
  category: "creative",
  palette: { primary: "#1A0A2E", accent: "#B026FF", text: "#FFFFFF", subtext: "#B8A8D8" },

  front: {
    background: { type: "gradient", color1: "#1A0A2E", color2: "#4A1050", angle: 135 },
    elements: [
      /* Neon wave top */
      { id: "wave-t", type: "ornament", ornament: "wave", visible: true, x: 0.5, y: 0.15, size: 0.4, colors: ["#B026FF"], opacity: 0.8 },
      /* Neon wave bottom */
      { id: "wave-b", type: "ornament", ornament: "wave", visible: true, x: 0.5, y: 0.85, size: 0.4, colors: ["#E040FB"], opacity: 0.8 },
      /* Logo */
      { id: "logo", type: "logo", visible: true, x: 0.5, y: 0.4, size: 0.12, align: "center" },
      /* Brand */
      { id: "brand", type: "text", contentKey: "brand", defaultValue: "AHADEX TOOLS", defaultValueBn: "আহাদেক্স টুলস", visible: true, x: 0.5, y: 0.6, fontFamily: "sans", fontSize: 46, fontWeight: 800, color: "#FFFFFF", align: "center", letterSpacing: 4 },
      /* Neon underline */
      { id: "underline", type: "shape", shape: "rect", visible: true, x: 0.5, y: 0.69, width: 0.2, height: 0.006, fill: "#B026FF" },
      /* Tagline */
      { id: "tagline", type: "text", contentKey: "tagline", defaultValue: "CREATE THE FUTURE", defaultValueBn: "ভবিষ্যত তৈরি করুন", visible: true, x: 0.5, y: 0.78, fontFamily: "sans", fontSize: 11, fontWeight: 500, color: "#B8A8D8", align: "center", letterSpacing: 5, uppercase: true },
    ],
  },

  back: {
    background: { type: "gradient", color1: "#1A0A2E", color2: "#4A1050", angle: 135 },
    elements: [
      /* Neon wave right */
      { id: "wave-r", type: "ornament", ornament: "wave", visible: true, x: 0.85, y: 0.5, size: 0.3, colors: ["#B026FF"], opacity: 0.6, rotation: 90 },
      /* Name */
      { id: "name", type: "text", contentKey: "name", defaultValue: "Md. Ahadvi", visible: true, x: 0.08, y: 0.26, fontFamily: "sans", fontSize: 36, fontWeight: 800, color: "#FFFFFF", align: "left" },
      /* Title */
      { id: "title", type: "text", contentKey: "title", defaultValue: "FOUNDER & DEVELOPER", visible: true, x: 0.08, y: 0.4, fontFamily: "sans", fontSize: 12, fontWeight: 500, color: "#B026FF", align: "left", letterSpacing: 4, uppercase: true },
      /* Rule */
      { id: "rule", type: "shape", shape: "line", visible: true, x: 0.08, y: 0.48, width: 0.36, height: 0, stroke: "#B026FF", strokeWidth: 1, direction: "l-r" },
      /* Contacts */
      { id: "phone", type: "text", contentKey: "phone", defaultValue: "+880 123 456 789", visible: true, x: 0.08, y: 0.56, fontFamily: "sans", fontSize: 13, fontWeight: 400, color: "#FFFFFF", align: "left" },
      { id: "email", type: "text", contentKey: "email", defaultValue: "ahadvi@gmail.com", visible: true, x: 0.08, y: 0.65, fontFamily: "sans", fontSize: 13, fontWeight: 400, color: "#FFFFFF", align: "left" },
      { id: "website", type: "text", contentKey: "website", defaultValue: "www.ahadex.online", visible: true, x: 0.08, y: 0.74, fontFamily: "sans", fontSize: 13, fontWeight: 400, color: "#B8A8D8", align: "left" },
      { id: "location", type: "text", contentKey: "location", defaultValue: "Dhaka, Bangladesh", visible: true, x: 0.08, y: 0.83, fontFamily: "sans", fontSize: 12, fontWeight: 400, color: "#B8A8D8", align: "left" },
      /* QR */
      { id: "qr", type: "qr", visible: true, x: 0.79, y: 0.55, size: 0.28, fgColor: "#1A0A2E", bgColor: "#FFFFFF", padding: 0.12 },
      { id: "qr-label", type: "text", contentKey: "qrLabel", defaultValue: "SCAN TO VISIT", defaultValueBn: "স্ক্যান করুন", visible: true, x: 0.79, y: 0.85, fontFamily: "sans", fontSize: 9, fontWeight: 500, color: "#B026FF", align: "center", letterSpacing: 3, uppercase: true },
    ],
  },
};

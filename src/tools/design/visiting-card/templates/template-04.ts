import type { Template } from "../types";

export const template04: Template = {
  id: "midnight-navy-silver",
  name: "Midnight Navy & Silver",
  nameBn: "মিডনাইট নেভি ও সিলভার",
  category: "corporate",
  palette: {
    primary: "#0A1530",
    accent: "#C8D0DC",
    text: "#F0F4F8",
    subtext: "#8A9AB0",
  },

  front: {
    background: { type: "gradient", color1: "#0A1530", color2: "#122140", angle: 135 },
    elements: [
      /* Silver top border */
      { id: "top-rule", type: "shape", shape: "rect", visible: true, x: 0.5, y: 0.08, width: 0.84, height: 0.003, fill: "#C8D0DC" },
      /* Botanical line ornament */
      { id: "botanical", type: "ornament", ornament: "botanical-leaf", visible: true, x: 0.15, y: 0.5, size: 0.18, colors: ["#8A9AB0"], opacity: 0.6 },
      { id: "botanical2", type: "ornament", ornament: "botanical-leaf", visible: true, x: 0.85, y: 0.5, size: 0.18, colors: ["#8A9AB0"], opacity: 0.6, rotation: 180 },
      /* Logo */
      { id: "logo", type: "logo", visible: true, x: 0.5, y: 0.4, size: 0.11, align: "center" },
      /* Brand */
      { id: "brand", type: "text", contentKey: "brand", defaultValue: "AHADEX TOOLS", defaultValueBn: "আহাদেক্স টুলস", visible: true, x: 0.5, y: 0.6, fontFamily: "display", fontSize: 46, fontWeight: 700, color: "#F0F4F8", align: "center", letterSpacing: 8, uppercase: true },
      /* Divider diamond */
      { id: "divider", type: "shape", shape: "triangle", visible: true, x: 0.5, y: 0.7, width: 0.015, height: 0.03, fill: "#C8D0DC" },
      /* Tagline */
      { id: "tagline", type: "text", contentKey: "tagline", defaultValue: "PRECISION · QUALITY · TRUST", defaultValueBn: "নির্ভুলতা · গুণ · বিশ্বাস", visible: true, x: 0.5, y: 0.79, fontFamily: "serif", fontSize: 11, fontWeight: 400, color: "#8A9AB0", align: "center", letterSpacing: 5, uppercase: true },
      /* Bottom silver line */
      { id: "bottom-rule", type: "shape", shape: "rect", visible: true, x: 0.5, y: 0.92, width: 0.84, height: 0.003, fill: "#C8D0DC" },
    ],
  },

  back: {
    background: { type: "gradient", color1: "#0A1530", color2: "#122140", angle: 135 },
    elements: [
      /* Silver top border */
      { id: "top-rule-b", type: "shape", shape: "rect", visible: true, x: 0.5, y: 0.08, width: 0.84, height: 0.003, fill: "#C8D0DC" },
      /* Corner botanical */
      { id: "botanical-b", type: "ornament", ornament: "botanical-leaf", visible: true, x: 0.88, y: 0.85, size: 0.14, colors: ["#8A9AB0"], opacity: 0.5 },
      /* Name */
      { id: "name", type: "text", contentKey: "name", defaultValue: "Md. Ahadvi", visible: true, x: 0.08, y: 0.27, fontFamily: "display", fontSize: 36, fontWeight: 700, color: "#F0F4F8", align: "left" },
      /* Title */
      { id: "title", type: "text", contentKey: "title", defaultValue: "FOUNDER & DEVELOPER", visible: true, x: 0.08, y: 0.42, fontFamily: "serif", fontSize: 12, fontWeight: 400, color: "#C8D0DC", align: "left", letterSpacing: 5, uppercase: true },
      /* Silver rule */
      { id: "rule", type: "shape", shape: "line", visible: true, x: 0.08, y: 0.5, width: 0.36, height: 0, stroke: "#C8D0DC", strokeWidth: 0.8, direction: "l-r" },
      /* Phone */
      { id: "phone", type: "text", contentKey: "phone", defaultValue: "+880 123 456 789", visible: true, x: 0.08, y: 0.58, fontFamily: "sans", fontSize: 13, fontWeight: 400, color: "#F0F4F8", align: "left" },
      /* Email */
      { id: "email", type: "text", contentKey: "email", defaultValue: "ahadvi@gmail.com", visible: true, x: 0.08, y: 0.67, fontFamily: "sans", fontSize: 13, fontWeight: 400, color: "#F0F4F8", align: "left" },
      /* Website */
      { id: "website", type: "text", contentKey: "website", defaultValue: "www.ahadex.fun", visible: true, x: 0.08, y: 0.76, fontFamily: "sans", fontSize: 13, fontWeight: 400, color: "#8A9AB0", align: "left" },
      /* Location */
      { id: "location", type: "text", contentKey: "location", defaultValue: "Dhaka, Bangladesh", visible: true, x: 0.08, y: 0.85, fontFamily: "sans", fontSize: 12, fontWeight: 400, color: "#8A9AB0", align: "left" },
      /* QR */
      { id: "qr", type: "qr", visible: true, x: 0.8, y: 0.55, size: 0.28, fgColor: "#0A1530", bgColor: "#F0F4F8", padding: 0.12 },
      /* QR label */
      { id: "qr-label", type: "text", contentKey: "qrLabel", defaultValue: "SCAN TO CONNECT", defaultValueBn: "স্ক্যান করুন", visible: true, x: 0.8, y: 0.85, fontFamily: "sans", fontSize: 9, fontWeight: 500, color: "#C8D0DC", align: "center", letterSpacing: 3, uppercase: true },
    ],
  },
};

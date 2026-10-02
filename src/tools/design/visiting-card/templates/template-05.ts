import type { Template } from "../types";

export const template05: Template = {
  id: "black-red-executive",
  name: "Black & Red Executive",
  nameBn: "ব্ল্যাক ও রেড এক্সিকিউটিভ",
  category: "bold",
  palette: {
    primary: "#0A0A0A",
    accent: "#E63946",
    text: "#FFFFFF",
    subtext: "#A8A8B8",
  },

  front: {
    background: { type: "solid", color1: "#0A0A0A" },
    elements: [
      /* Red diagonal stripe top-right */
      { id: "diag-1", type: "shape", shape: "diagonal-stripe", visible: true, x: 0.5, y: 0.14, width: 1, height: 0.03, fill: "#E63946", direction: "tr-bl" },
      { id: "diag-2", type: "shape", shape: "diagonal-stripe", visible: true, x: 0.5, y: 0.86, width: 1, height: 0.03, fill: "#E63946", direction: "tr-bl" },
      /* Red thin bar top-left */
      { id: "top-bar", type: "shape", shape: "rect", visible: true, x: 0.5, y: 0.06, width: 0.2, height: 0.006, fill: "#E63946" },
      /* Logo */
      { id: "logo", type: "logo", visible: true, x: 0.5, y: 0.4, size: 0.11, align: "center" },
      /* Brand */
      { id: "brand", type: "text", contentKey: "brand", defaultValue: "AHADEX TOOLS", defaultValueBn: "আহাদেক্স টুলস", visible: true, x: 0.5, y: 0.6, fontFamily: "sans", fontSize: 46, fontWeight: 900, color: "#FFFFFF", align: "center", letterSpacing: 5, uppercase: true },
      /* Red underline */
      { id: "underline", type: "shape", shape: "rect", visible: true, x: 0.5, y: 0.69, width: 0.18, height: 0.006, fill: "#E63946" },
      /* Tagline */
      { id: "tagline", type: "text", contentKey: "tagline", defaultValue: "POWER · PRECISION · PERFORMANCE", defaultValueBn: "শক্তি · নির্ভুলতা · পারফরম্যান্স", visible: true, x: 0.5, y: 0.78, fontFamily: "sans", fontSize: 11, fontWeight: 500, color: "#A8A8B8", align: "center", letterSpacing: 4, uppercase: true },
    ],
  },

  back: {
    background: { type: "solid", color1: "#0A0A0A" },
    elements: [
      /* Red diagonal bottom-left */
      { id: "diag-b", type: "shape", shape: "diagonal-stripe", visible: true, x: 0.5, y: 0.9, width: 1, height: 0.04, fill: "#E63946", direction: "tr-bl" },
      /* Red side bar */
      { id: "side-bar", type: "shape", shape: "rect", visible: true, x: 0.02, y: 0.5, width: 0.008, height: 0.6, fill: "#E63946" },
      /* Name */
      { id: "name", type: "text", contentKey: "name", defaultValue: "Md. Ahadvi", visible: true, x: 0.08, y: 0.26, fontFamily: "sans", fontSize: 36, fontWeight: 900, color: "#FFFFFF", align: "left" },
      /* Title */
      { id: "title", type: "text", contentKey: "title", defaultValue: "FOUNDER & DEVELOPER", visible: true, x: 0.08, y: 0.4, fontFamily: "sans", fontSize: 12, fontWeight: 500, color: "#E63946", align: "left", letterSpacing: 4, uppercase: true },
      /* Rule */
      { id: "rule", type: "shape", shape: "line", visible: true, x: 0.08, y: 0.48, width: 0.36, height: 0, stroke: "#E63946", strokeWidth: 1.2, direction: "l-r" },
      /* Phone */
      { id: "phone", type: "text", contentKey: "phone", defaultValue: "+880 123 456 789", visible: true, x: 0.08, y: 0.56, fontFamily: "sans", fontSize: 13, fontWeight: 400, color: "#FFFFFF", align: "left" },
      /* Email */
      { id: "email", type: "text", contentKey: "email", defaultValue: "ahadvi@gmail.com", visible: true, x: 0.08, y: 0.65, fontFamily: "sans", fontSize: 13, fontWeight: 400, color: "#FFFFFF", align: "left" },
      /* Website */
      { id: "website", type: "text", contentKey: "website", defaultValue: "www.ahadex.online", visible: true, x: 0.08, y: 0.74, fontFamily: "sans", fontSize: 13, fontWeight: 400, color: "#A8A8B8", align: "left" },
      /* Location */
      { id: "location", type: "text", contentKey: "location", defaultValue: "Dhaka, Bangladesh", visible: true, x: 0.08, y: 0.83, fontFamily: "sans", fontSize: 12, fontWeight: 400, color: "#A8A8B8", align: "left" },
      /* QR */
      { id: "qr", type: "qr", visible: true, x: 0.8, y: 0.52, size: 0.28, fgColor: "#0A0A0A", bgColor: "#FFFFFF", padding: 0.12 },
      /* QR label */
      { id: "qr-label", type: "text", contentKey: "qrLabel", defaultValue: "SCAN TO VISIT", defaultValueBn: "স্ক্যান করুন", visible: true, x: 0.8, y: 0.83, fontFamily: "sans", fontSize: 9, fontWeight: 700, color: "#E63946", align: "center", letterSpacing: 3, uppercase: true },
    ],
  },
};

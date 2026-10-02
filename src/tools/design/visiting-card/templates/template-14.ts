import type { Template } from "../types";

export const template14: Template = {
  id: "gold-mandala-premium",
  name: "Gold Mandala Premium",
  nameBn: "গোল্ড মণ্ডলা প্রিমিয়াম",
  category: "luxury",
  palette: { primary: "#0A0A0A", accent: "#D4AF37", text: "#E8D8A8", subtext: "#9A8040" },

  front: {
    background: { type: "solid", color1: "#0A0A0A" },
    elements: [
      /* Big mandala ornament top-right */
      { id: "mandala", type: "ornament", ornament: "mandala", visible: true, x: 0.85, y: 0.25, size: 0.28, colors: ["#D4AF37"], opacity: 0.75 },
      /* Logo left */
      { id: "logo", type: "logo", visible: true, x: 0.22, y: 0.42, size: 0.1, align: "center" },
      /* Brand */
      { id: "brand", type: "text", contentKey: "brand", defaultValue: "AHADEX", defaultValueBn: "আহাদেক্স", visible: true, x: 0.22, y: 0.6, fontFamily: "display", fontSize: 40, fontWeight: 700, color: "#E8D8A8", align: "center", letterSpacing: 6, uppercase: true },
      /* Gold hairline */
      { id: "rule", type: "shape", shape: "line", visible: true, x: 0.22, y: 0.7, width: 0.16, height: 0, stroke: "#D4AF37", strokeWidth: 0.8, direction: "l-r" },
      /* Tagline */
      { id: "tagline", type: "text", contentKey: "tagline", defaultValue: "TOOLS FOR A SMARTER TOMORROW", defaultValueBn: "আগামীর স্মার্ট টুলস", visible: true, x: 0.22, y: 0.78, fontFamily: "serif", fontSize: 9, fontWeight: 400, color: "#9A8040", align: "center", letterSpacing: 3, uppercase: true },
    ],
  },

  back: {
    background: { type: "solid", color1: "#0A0A0A" },
    elements: [
      /* Mandala partial right edge */
      { id: "mandala-b", type: "ornament", ornament: "mandala", visible: true, x: 0.98, y: 0.5, size: 0.22, colors: ["#D4AF37"], opacity: 0.5 },
      /* Name */
      { id: "name", type: "text", contentKey: "name", defaultValue: "Md. Ahadvi", visible: true, x: 0.08, y: 0.26, fontFamily: "display", fontSize: 34, fontWeight: 700, color: "#E8D8A8", align: "left" },
      /* Title */
      { id: "title", type: "text", contentKey: "title", defaultValue: "FOUNDER & DEVELOPER", visible: true, x: 0.08, y: 0.4, fontFamily: "serif", fontSize: 11, fontWeight: 400, color: "#D4AF37", align: "left", letterSpacing: 4, uppercase: true },
      /* Gold rule */
      { id: "rule", type: "shape", shape: "line", visible: true, x: 0.08, y: 0.48, width: 0.32, height: 0, stroke: "#D4AF37", strokeWidth: 0.8, direction: "l-r" },
      /* Contacts */
      { id: "phone", type: "text", contentKey: "phone", defaultValue: "+880 123 456 789", visible: true, x: 0.08, y: 0.56, fontFamily: "sans", fontSize: 12, fontWeight: 400, color: "#E8D8A8", align: "left" },
      { id: "email", type: "text", contentKey: "email", defaultValue: "ahadvi@gmail.com", visible: true, x: 0.08, y: 0.65, fontFamily: "sans", fontSize: 12, fontWeight: 400, color: "#E8D8A8", align: "left" },
      { id: "website", type: "text", contentKey: "website", defaultValue: "www.ahadex.fun", visible: true, x: 0.08, y: 0.74, fontFamily: "sans", fontSize: 12, fontWeight: 400, color: "#9A8040", align: "left" },
      { id: "location", type: "text", contentKey: "location", defaultValue: "Dhaka, Bangladesh", visible: true, x: 0.08, y: 0.83, fontFamily: "sans", fontSize: 11, fontWeight: 400, color: "#9A8040", align: "left" },
      /* QR */
      { id: "qr", type: "qr", visible: true, x: 0.78, y: 0.55, size: 0.25, fgColor: "#0A0A0A", bgColor: "#E8D8A8", padding: 0.12 },
      { id: "qr-label", type: "text", contentKey: "qrLabel", defaultValue: "SCAN TO VISIT", defaultValueBn: "স্ক্যান করুন", visible: true, x: 0.78, y: 0.84, fontFamily: "serif", fontSize: 8, fontWeight: 400, color: "#D4AF37", align: "center", letterSpacing: 2, uppercase: true },
    ],
  },
};

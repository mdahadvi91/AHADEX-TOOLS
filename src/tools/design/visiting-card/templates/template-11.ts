import type { Template } from "../types";

export const template11: Template = {
  id: "black-crown-luxury",
  name: "Black & Crown Luxury",
  nameBn: "ব্ল্যাক ও ক্রাউন লাক্সারি",
  category: "luxury",
  palette: { primary: "#0A0A0A", accent: "#D4AF37", text: "#E8D8A8", subtext: "#9A8040" },

  front: {
    background: { type: "solid", color1: "#0A0A0A" },
    elements: [
      /* Gold crown ornament top */
      { id: "crown", type: "ornament", ornament: "crown", visible: true, x: 0.5, y: 0.22, size: 0.05, colors: ["#D4AF37"] },
      /* Gold thin border top */
      { id: "border-t", type: "shape", shape: "rect", visible: true, x: 0.5, y: 0.08, width: 0.5, height: 0.003, fill: "#D4AF37" },
      /* Gold thin border bottom */
      { id: "border-b", type: "shape", shape: "rect", visible: true, x: 0.5, y: 0.92, width: 0.5, height: 0.003, fill: "#D4AF37" },
      /* Logo */
      { id: "logo", type: "logo", visible: true, x: 0.5, y: 0.42, size: 0.11, align: "center" },
      /* Brand */
      { id: "brand", type: "text", contentKey: "brand", defaultValue: "AHADEX TOOLS", defaultValueBn: "আহাদেক্স টুলস", visible: true, x: 0.5, y: 0.6, fontFamily: "display", fontSize: 42, fontWeight: 700, color: "#E8D8A8", align: "center", letterSpacing: 8, uppercase: true },
      /* Two dots divider */
      { id: "dot-1", type: "shape", shape: "circle", visible: true, x: 0.47, y: 0.7, width: 0.008, height: 0.008, fill: "#D4AF37" },
      { id: "dot-2", type: "shape", shape: "circle", visible: true, x: 0.53, y: 0.7, width: 0.008, height: 0.008, fill: "#D4AF37" },
      /* Tagline */
      { id: "tagline", type: "text", contentKey: "tagline", defaultValue: "EXCELLENCE IN EVERY DETAIL", defaultValueBn: "প্রতিটি বিবরণে শ্রেষ্ঠত্ব", visible: true, x: 0.5, y: 0.79, fontFamily: "serif", fontSize: 10, fontWeight: 400, color: "#9A8040", align: "center", letterSpacing: 5, uppercase: true },
    ],
  },

  back: {
    background: { type: "solid", color1: "#0A0A0A" },
    elements: [
      /* Gold frame */
      { id: "frame", type: "shape", shape: "rect", visible: true, x: 0.5, y: 0.5, width: 0.88, height: 0.86, stroke: "#D4AF37", strokeWidth: 0.6, fill: "transparent", opacity: 0.6 },
      { id: "frame-inner", type: "shape", shape: "rect", visible: true, x: 0.5, y: 0.5, width: 0.84, height: 0.8, stroke: "#D4AF37", strokeWidth: 0.3, fill: "transparent", opacity: 0.3 },
      /* Small crown corner */
      { id: "crown-corner", type: "ornament", ornament: "crown", visible: true, x: 0.9, y: 0.12, size: 0.025, colors: ["#D4AF37"], opacity: 0.8 },
      { id: "name", type: "text", contentKey: "name", defaultValue: "Md. Ahadvi", visible: true, x: 0.1, y: 0.26, fontFamily: "display", fontSize: 36, fontWeight: 700, color: "#E8D8A8", align: "left" },
      { id: "title", type: "text", contentKey: "title", defaultValue: "FOUNDER & DEVELOPER", visible: true, x: 0.1, y: 0.4, fontFamily: "serif", fontSize: 12, fontWeight: 400, color: "#D4AF37", align: "left", letterSpacing: 4, uppercase: true },
      { id: "rule", type: "shape", shape: "line", visible: true, x: 0.1, y: 0.48, width: 0.36, height: 0, stroke: "#D4AF37", strokeWidth: 0.8, direction: "l-r" },
      { id: "phone", type: "text", contentKey: "phone", defaultValue: "+880 123 456 789", visible: true, x: 0.1, y: 0.56, fontFamily: "sans", fontSize: 13, fontWeight: 400, color: "#E8D8A8", align: "left" },
      { id: "email", type: "text", contentKey: "email", defaultValue: "ahadvi@gmail.com", visible: true, x: 0.1, y: 0.65, fontFamily: "sans", fontSize: 13, fontWeight: 400, color: "#E8D8A8", align: "left" },
      { id: "website", type: "text", contentKey: "website", defaultValue: "www.ahadex.online", visible: true, x: 0.1, y: 0.74, fontFamily: "sans", fontSize: 13, fontWeight: 400, color: "#9A8040", align: "left" },
      { id: "location", type: "text", contentKey: "location", defaultValue: "Dhaka, Bangladesh", visible: true, x: 0.1, y: 0.83, fontFamily: "sans", fontSize: 12, fontWeight: 400, color: "#9A8040", align: "left" },
      { id: "qr", type: "qr", visible: true, x: 0.79, y: 0.55, size: 0.26, fgColor: "#0A0A0A", bgColor: "#E8D8A8", padding: 0.12 },
      { id: "qr-label", type: "text", contentKey: "qrLabel", defaultValue: "SCAN TO VISIT", defaultValueBn: "স্ক্যান করুন", visible: true, x: 0.79, y: 0.85, fontFamily: "serif", fontSize: 9, fontWeight: 400, color: "#D4AF37", align: "center", letterSpacing: 3, uppercase: true },
    ],
  },
};

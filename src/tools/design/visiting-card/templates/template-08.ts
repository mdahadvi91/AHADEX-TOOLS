import type { Template } from "../types";

export const template08: Template = {
  id: "gold-circle-signature",
  name: "Gold Circle Signature",
  nameBn: "গোল্ড সার্কেল সিগনেচার",
  category: "luxury",
  palette: { primary: "#0A0A0A", accent: "#C99667", text: "#E5C9A4", subtext: "#8B6A45" },

  front: {
    background: { type: "solid", color1: "#0A0A0A" },
    elements: [
      /* Large gold thin circle */
      { id: "big-ring", type: "shape", shape: "circle", visible: true, x: 0.5, y: 0.5, width: 0.6, height: 0.6, stroke: "#C99667", strokeWidth: 0.4, fill: "transparent", opacity: 0.7 },
      /* Small inner ring */
      { id: "inner-ring", type: "shape", shape: "circle", visible: true, x: 0.5, y: 0.5, width: 0.36, height: 0.36, stroke: "#C99667", strokeWidth: 0.3, fill: "transparent", opacity: 0.4 },
      /* Logo */
      { id: "logo", type: "logo", visible: true, x: 0.5, y: 0.42, size: 0.12, align: "center" },
      /* Brand */
      { id: "brand", type: "text", contentKey: "brand", defaultValue: "AHADEX TOOLS", defaultValueBn: "আহাদেক্স টুলস", visible: true, x: 0.5, y: 0.62, fontFamily: "display", fontSize: 40, fontWeight: 700, color: "#E5C9A4", align: "center", letterSpacing: 8, uppercase: true },
      /* Small gold dot */
      { id: "dot", type: "shape", shape: "circle", visible: true, x: 0.5, y: 0.71, width: 0.008, height: 0.008, fill: "#C99667" },
      /* Tagline */
      { id: "tagline", type: "text", contentKey: "tagline", defaultValue: "TOOLS FOR A SMARTER TOMORROW", defaultValueBn: "আগামীর স্মার্ট টুলস", visible: true, x: 0.5, y: 0.79, fontFamily: "serif", fontSize: 10, fontWeight: 400, color: "#8B6A45", align: "center", letterSpacing: 5, uppercase: true },
    ],
  },

  back: {
    background: { type: "solid", color1: "#0A0A0A" },
    elements: [
      /* Partial gold circles top-right */
      { id: "ring-tr", type: "shape", shape: "circle", visible: true, x: 1, y: 0, width: 0.5, height: 0.5, stroke: "#C99667", strokeWidth: 0.4, fill: "transparent", opacity: 0.4 },
      { id: "ring-br", type: "shape", shape: "circle", visible: true, x: 1, y: 1, width: 0.6, height: 0.6, stroke: "#C99667", strokeWidth: 0.3, fill: "transparent", opacity: 0.3 },
      /* Name */
      { id: "name", type: "text", contentKey: "name", defaultValue: "Md. Ahadvi", visible: true, x: 0.1, y: 0.26, fontFamily: "display", fontSize: 36, fontWeight: 700, color: "#E5C9A4", align: "left" },
      /* Title */
      { id: "title", type: "text", contentKey: "title", defaultValue: "FOUNDER & DEVELOPER", visible: true, x: 0.1, y: 0.4, fontFamily: "sans", fontSize: 12, fontWeight: 500, color: "#8B6A45", align: "left", letterSpacing: 4, uppercase: true },
      /* Rule */
      { id: "rule", type: "shape", shape: "line", visible: true, x: 0.1, y: 0.48, width: 0.36, height: 0, stroke: "#C99667", strokeWidth: 1, direction: "l-r" },
      /* Contacts */
      { id: "phone", type: "text", contentKey: "phone", defaultValue: "+880 123 456 789", visible: true, x: 0.1, y: 0.56, fontFamily: "sans", fontSize: 13, fontWeight: 400, color: "#E5C9A4", align: "left" },
      { id: "email", type: "text", contentKey: "email", defaultValue: "ahadvi@gmail.com", visible: true, x: 0.1, y: 0.65, fontFamily: "sans", fontSize: 13, fontWeight: 400, color: "#E5C9A4", align: "left" },
      { id: "website", type: "text", contentKey: "website", defaultValue: "www.ahadex.online", visible: true, x: 0.1, y: 0.74, fontFamily: "sans", fontSize: 13, fontWeight: 400, color: "#8B6A45", align: "left" },
      { id: "location", type: "text", contentKey: "location", defaultValue: "Dhaka, Bangladesh", visible: true, x: 0.1, y: 0.83, fontFamily: "sans", fontSize: 12, fontWeight: 400, color: "#8B6A45", align: "left" },
      /* QR with gold frame */
      { id: "qr-frame", type: "shape", shape: "rect", visible: true, x: 0.79, y: 0.55, width: 0.32, height: 0.32, stroke: "#C99667", strokeWidth: 0.6, fill: "transparent" },
      { id: "qr", type: "qr", visible: true, x: 0.79, y: 0.55, size: 0.26, fgColor: "#0A0A0A", bgColor: "#E5C9A4", padding: 0.1 },
      { id: "qr-label", type: "text", contentKey: "qrLabel", defaultValue: "SCAN TO VISIT", defaultValueBn: "স্ক্যান করুন", visible: true, x: 0.79, y: 0.85, fontFamily: "serif", fontSize: 9, fontWeight: 400, color: "#8B6A45", align: "center", letterSpacing: 3, uppercase: true },
    ],
  },
};

import type { Template } from "../types";

/* ============================================================
 * TEMPLATE 01 — LUXURY BLACK & GOLD
 * Premium black matte + metallic gold ornamental corner
 * ============================================================ */

export const template01: Template = {
  id: "luxury-black-gold",
  name: "Luxury Black & Gold",
  nameBn: "লাক্সারি কালো ও সোনালি",
  category: "luxury",
  palette: {
    primary: "#0A0A0A",
    accent: "#C99667",
    text: "#E5C9A4",
    subtext: "#8B6A45",
  },

  /* ----------------------------------------------------------
   * FRONT — logo center, brand, tagline, ornamental frame
   * ---------------------------------------------------------- */
  front: {
    background: {
      type: "solid",
      color1: "#0A0A0A",
    },
    elements: [
      /* Thin gold frame */
      {
        id: "frame",
        type: "shape",
        shape: "rect",
        visible: true,
        x: 0.05,
        y: 0.05,
        width: 0.9,
        height: 0.9,
        stroke: "#C99667",
        strokeWidth: 0.6,
        fill: "transparent",
      },

      /* Gold corner ornament top-right */
      {
        id: "ornament-tr",
        type: "ornament",
        ornament: "gold-corner",
        visible: true,
        x: 0.88,
        y: 0.14,
        size: 0.28,
        colors: ["#C99667", "#8B6A45"],
        rotation: 0,
      },

      /* Gold corner ornament bottom-left */
      {
        id: "ornament-bl",
        type: "ornament",
        ornament: "gold-corner",
        visible: true,
        x: 0.12,
        y: 0.86,
        size: 0.28,
        colors: ["#C99667", "#8B6A45"],
        rotation: 180,
      },

      /* Logo */
      {
        id: "logo",
        type: "logo",
        visible: true,
        x: 0.5,
        y: 0.32,
        size: 0.14,
        align: "center",
      },

      /* Brand name */
      {
        id: "brand",
        type: "text",
        contentKey: "brand",
        defaultValue: "AHADEX TOOLS",
        defaultValueBn: "আহাদেক্স টুলস",
        visible: true,
        x: 0.5,
        y: 0.55,
        fontFamily: "display",
        fontSize: 48,
        fontWeight: 700,
        color: "#E5C9A4",
        align: "center",
        letterSpacing: 6,
        uppercase: true,
      },

      /* Tagline */
      {
        id: "tagline",
        type: "text",
        contentKey: "tagline",
        defaultValue: "Tools for a Smarter Tomorrow",
        defaultValueBn: "আগামীর স্মার্ট টুলস",
        visible: true,
        x: 0.5,
        y: 0.72,
        fontFamily: "serif",
        fontSize: 14,
        fontWeight: 400,
        color: "#8B6A45",
        align: "center",
        letterSpacing: 4,
        uppercase: true,
      },
    ],
  },

  /* ----------------------------------------------------------
   * BACK — name/title left, contacts, QR right, diagonal accent
   * ---------------------------------------------------------- */
  back: {
    background: {
      type: "solid",
      color1: "#0A0A0A",
    },
    elements: [
      /* Thin gold frame */
      {
        id: "frame-back",
        type: "shape",
        shape: "rect",
        visible: true,
        x: 0.05,
        y: 0.05,
        width: 0.9,
        height: 0.9,
        stroke: "#C99667",
        strokeWidth: 0.5,
        fill: "transparent",
      },

      /* Top diagonal gold stripe */
      {
        id: "diag-top",
        type: "shape",
        shape: "diagonal-stripe",
        visible: true,
        x: 0,
        y: 0.06,
        width: 1,
        height: 0.04,
        fill: "#C99667",
        direction: "tr-bl",
      },

      /* Name */
      {
        id: "name",
        type: "text",
        contentKey: "name",
        defaultValue: "Md. Ahadvi",
        visible: true,
        x: 0.1,
        y: 0.24,
        fontFamily: "display",
        fontSize: 40,
        fontWeight: 700,
        color: "#E5C9A4",
        align: "left",
      },

      /* Title */
      {
        id: "title",
        type: "text",
        contentKey: "title",
        defaultValue: "FOUNDER & DEVELOPER",
        visible: true,
        x: 0.1,
        y: 0.38,
        fontFamily: "sans",
        fontSize: 13,
        fontWeight: 500,
        color: "#8B6A45",
        align: "left",
        letterSpacing: 4,
        uppercase: true,
      },

      /* Gold hairline under title */
      {
        id: "rule-1",
        type: "shape",
        shape: "line",
        visible: true,
        x: 0.1,
        y: 0.46,
        width: 0.35,
        height: 0,
        stroke: "#C99667",
        strokeWidth: 0.8,
        direction: "l-r",
      },

      /* Phone */
      {
        id: "phone",
        type: "text",
        contentKey: "phone",
        defaultValue: "+880 123 456 789",
        visible: true,
        x: 0.1,
        y: 0.53,
        fontFamily: "sans",
        fontSize: 14,
        fontWeight: 400,
        color: "#E5C9A4",
        align: "left",
      },

      /* Email */
      {
        id: "email",
        type: "text",
        contentKey: "email",
        defaultValue: "ahadvi@gmail.com",
        visible: true,
        x: 0.1,
        y: 0.63,
        fontFamily: "sans",
        fontSize: 14,
        fontWeight: 400,
        color: "#E5C9A4",
        align: "left",
      },

      /* Location */
      {
        id: "location",
        type: "text",
        contentKey: "location",
        defaultValue: "Dhaka, Bangladesh",
        visible: true,
        x: 0.1,
        y: 0.73,
        fontFamily: "sans",
        fontSize: 14,
        fontWeight: 400,
        color: "#E5C9A4",
        align: "left",
      },

      /* Website */
      {
        id: "website",
        type: "text",
        contentKey: "website",
        defaultValue: "www.ahadex.fun",
        visible: true,
        x: 0.1,
        y: 0.83,
        fontFamily: "sans",
        fontSize: 13,
        fontWeight: 400,
        color: "#8B6A45",
        align: "left",
      },

      /* QR code */
      {
        id: "qr",
        type: "qr",
        visible: true,
        x: 0.78,
        y: 0.5,
        size: 0.28,
        fgColor: "#0A0A0A",
        bgColor: "#E5C9A4",
        padding: 0.12,
      },

      /* QR label */
      {
        id: "qr-label",
        type: "text",
        contentKey: "qrLabel",
        defaultValue: "SCAN TO VISIT",
        defaultValueBn: "স্ক্যান করুন",
        visible: true,
        x: 0.78,
        y: 0.82,
        fontFamily: "sans",
        fontSize: 10,
        fontWeight: 500,
        color: "#8B6A45",
        align: "center",
        letterSpacing: 3,
        uppercase: true,
      },
    ],
  },
};

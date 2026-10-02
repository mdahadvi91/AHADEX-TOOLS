export const photoQrData = {
  id: "photo-qr",
  slug: "photo-qr",
  name: "Photo QR Code",
  category: "qr" as const,
  path: "/tools/photo-qr",
  description:
    "Add a real, scannable QR badge to any photo — WhatsApp, Facebook, WiFi, and more.",
  popular: true,
  newTool: true,
  keywords: [
    "photo",
    "qr",
    "image",
    "badge",
    "whatsapp",
    "facebook",
    "instagram",
    "wifi",
  ],

  seo: {
    title: "Photo QR Code — Add QR to Photos Free | AHADEX Tools",
    description:
      "Add a real, scannable QR code to any photo. WhatsApp, Facebook, Instagram, WiFi, and more. Free, private, no uploads.",
    ogImage: "/images/og/tools/photo-qr-og.jpg",
  },

  relatedTools: [
    "qr-code-generator",
    "qr-code-with-logo",
    "wifi-qr-generator",
  ],
};

export type PhotoQrData = typeof photoQrData;

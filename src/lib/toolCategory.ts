/* ============================================================
 * Tool category detection
 * ------------------------------------------------------------
 * Groups tools into the six families used for privacy notes,
 * schema hints, and "related tools" grouping. Categories are
 * derived from the tool id and path so no extra field is needed
 * in the registry.
 * ============================================================ */

export type ToolCategory =
  | "image"
  | "pdf"
  | "developer"
  | "text"
  | "qr"
  | "design";

export function getToolCategory(toolId: string, path: string): ToolCategory {
  const id = toolId.toLowerCase();
  const p = path.toLowerCase();

  if (id === "cv-builder" || id === "visiting-card" || id === "favicon-generator") {
    return "design";
  }
  if (id.includes("qr") || id.includes("barcode")) return "qr";
  if (p.includes("/pdf/") || id.includes("pdf")) return "pdf";
  if (p.includes("/image/") || id.includes("image") || id.includes("jpg") || id.includes("png") || id.includes("webp") || id.includes("svg")) {
    return "image";
  }
  if (p.includes("/text/") || id.includes("word") || id.includes("case") || id.includes("character")) {
    return "text";
  }
  if (
    id.includes("json") ||
    id.includes("url") ||
    id.includes("uuid") ||
    id.includes("base64") ||
    id.includes("password")
  ) {
    return "developer";
  }
  return "image";
}

export interface CategoryPrivacy {
  /** Category-specific sentence about what stays local. */
  specific: string;
  /** Why this matters for this kind of file. */
  why: string;
}

export const CATEGORY_PRIVACY: Record<ToolCategory, CategoryPrivacy> = {
  image: {
    specific:
      "For image tools: your photo is decoded on an off-screen canvas inside your browser, processed pixel by pixel, and re-encoded locally. The original file and the output both live only in your tab's memory.",
    why: "Images often carry EXIF metadata with GPS coordinates and device details. Because nothing is uploaded, that metadata is never transmitted off your device — and does not end up in anyone else's logs.",
  },
  pdf: {
    specific:
      "For PDF tools: the document is parsed by pdf.js or pdf-lib in your browser, page objects are copied or rendered in memory, and the result is assembled as a downloadable file. No byte of the PDF ever crosses the network.",
    why: "PDFs are the format of contracts, invoices, medical records, and signed agreements. Those are exactly the files you should never hand to an unknown server — and with this tool, you do not have to.",
  },
  developer: {
    specific:
      "For developer tools: everything happens in pure JavaScript on your device. Random values come from the Web Crypto API (the same source TLS uses), and no text or data you paste ever leaves your browser tab.",
    why: "API tokens, JWTs, JSON payloads, and passwords often contain secrets. Pasting them into a server-based tool is a security incident waiting to happen. Here, they stay in memory only.",
  },
  text: {
    specific:
      "For text tools: your input is analyzed by JavaScript regexes and counters running in your browser. The text is never sent anywhere, never stored in local storage, and never echoed back to a server.",
    why: "Draft articles, private notes, unreleased copy — any text you would not paste into a public search box is exactly the kind of content this site handles in isolation.",
  },
  qr: {
    specific:
      "For QR and barcode tools: the code is generated with the qrcode and jsbarcode libraries running in your browser, drawn onto a canvas, and exported as an image. The destination URL or payload you encode is never transmitted.",
    why: "QR codes often encode private WhatsApp links, WiFi credentials, or contact information. If those were uploaded to a generator's server, the destination would be visible in that server's logs. Here it is not.",
  },
  design: {
    specific:
      "For design tools: layouts, text, logos, and photos are composed entirely on a canvas in your browser. Exported files are generated locally and downloaded directly — no intermediate server renders or stores them.",
    why: "CVs contain phone numbers and addresses. Business cards contain contact details for an entire team. Favicons are often an unreleased brand identity. All three are safer kept in the tab you are already using.",
  },
};

import type { CVPageSize } from "../types";

/* ============================================================
 * Print helpers
 * ------------------------------------------------------------
 * We use the browser's native print pipeline for the highest
 * text fidelity and correct page breaks. The browser print
 * dialog provides "Save as PDF" on all major platforms.
 * ============================================================ */

export function injectPrintSize(pageSize: CVPageSize): void {
  const id = "cv-page-size-style";
  const existing = document.getElementById(id);
  if (existing) existing.remove();

  const style = document.createElement("style");
  style.id = id;

  const size = pageSize === "Letter"
    ? "Letter portrait"
    : "A4 portrait";

  style.textContent = `@page { size: ${size}; margin: 0; }`;
  document.head.appendChild(style);
}

export function triggerPrint(pageSize: CVPageSize): void {
  injectPrintSize(pageSize);

  // Give the browser a tick to apply the @page rule
  setTimeout(() => {
    document.body.classList.add("cv-printing");
    window.print();
    // Remove after the print dialog closes
    const cleanup = () => {
      document.body.classList.remove("cv-printing");
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);
    // Fallback cleanup in case afterprint never fires
    setTimeout(cleanup, 60_000);
  }, 80);
}

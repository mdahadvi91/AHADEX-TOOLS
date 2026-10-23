import type { CVPageSize } from "../types";

export function injectPrintSize(pageSize: CVPageSize): void {
  const id = "cv-page-size-style";
  document.getElementById(id)?.remove();

  const style = document.createElement("style");
  style.id = id;

  const size =
    pageSize === "Letter" ? "Letter portrait" : "A4 portrait";

  style.textContent = `@page { size: ${size}; margin: 0; }`;
  document.head.appendChild(style);
}

export function triggerPrint(pageSize: CVPageSize): void {
  injectPrintSize(pageSize);

  window.setTimeout(() => {
    document.body.classList.add("cv-printing");

    let cleaned = false;
    let fallbackTimer = 0;

    const cleanup = () => {
      if (cleaned) return;
      cleaned = true;

      document.body.classList.remove("cv-printing");
      window.removeEventListener("afterprint", cleanup);
      window.clearTimeout(fallbackTimer);
    };

    window.addEventListener("afterprint", cleanup, { once: true });
    fallbackTimer = window.setTimeout(cleanup, 60_000);

    try {
      window.print();
    } catch (error) {
      cleanup();
      console.error("CV print failed:", error);
    }
  }, 100);
}

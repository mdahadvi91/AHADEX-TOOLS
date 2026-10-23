import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "@styles/globals.css";
import "@tools/documents/cv-builder/styles/print.css";
import "@styles/design-system.css";

const rootEl = document.getElementById("root");

if (!rootEl) {
  throw new Error("Root element #root not found");
}

/* ------------------------------------------------------------
 * SSR fallback cleanup
 * ------------------------------------------------------------
 * Cloudflare middleware injects a <div data-ssr="true">…</div>
 * inside #root with a full HTML article, so that crawlers and
 * JS-disabled visitors see real, readable content in the initial
 * response.
 *
 * Once React is about to mount, that fallback is no longer needed
 * and would only cause a brief flash / hydration mismatch. Remove
 * it synchronously before createRoot so the first paint shows the
 * interactive app cleanly.
 *
 * The selector matches the contract with functions/_middleware.ts.
 * ------------------------------------------------------------ */
const ssrFallback = rootEl.querySelector('[data-ssr="true"]');
if (ssrFallback) {
  ssrFallback.remove();
}

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

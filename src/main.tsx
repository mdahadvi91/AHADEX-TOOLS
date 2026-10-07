import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "@styles/globals.css";
import "@tools/documents/cv-builder/styles/print.css";
import "@styles/design-system.css";
import "@styles/animations.css";

const rootEl = document.getElementById("root");

if (!rootEl) {
  throw new Error("Root element #root not found");
}


// ── Remove server-injected SSR content after React hydrates ──
// The middleware injects a #ssr-content div for crawlers/no-JS users.
// Once React renders, we remove it so users see only the live app.
const ssrEl = document.getElementById("ssr-content");
if (ssrEl) {
  // Delay removal slightly to ensure hydration completed
  requestAnimationFrame(() => {
    ssrEl.remove();
  });
}

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

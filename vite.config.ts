import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    plugins: [
      react(),
      ...(process.env.ANALYZE === "1"
        ? [
            visualizer({
              filename: "bundle-stats.html",
              template: "treemap",
              gzipSize: true,
              brotliSize: true,
              open: false,
            }),
          ]
        : []),
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@tools": path.resolve(__dirname, "./src/tools"),
        "@data": path.resolve(__dirname, "./src/data"),
        "@lib": path.resolve(__dirname, "./src/lib"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@i18n": path.resolve(__dirname, "./src/i18n"),
        "@styles": path.resolve(__dirname, "./src/styles"),
        "@contexts": path.resolve(__dirname, "./src/contexts"),
        "@types": path.resolve(__dirname, "./src/types"),
        "@constants": path.resolve(__dirname, "./src/constants"),
      },
    },

    server: {
      port: 5173,
      host: true,
      open: false,
    },

    preview: {
      port: 4173,
      host: true,
    },

    build: {
      target: "es2020",
      outDir: "dist",
      sourcemap: false,
      minify: "esbuild",
      cssMinify: "esbuild",
      cssCodeSplit: true,
      chunkSizeWarningLimit: 600,
      reportCompressedSize: false,
      assetsInlineLimit: 4096,

      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) return;

            // QR Code libs (Used by Photo QR)
            if (id.includes("qrcode")) return "qr-libs";

            // React core
            if (id.includes("node_modules/react-dom")) return "react-core";
            if (id.includes("node_modules/react/")) return "react-core";
            if (id.includes("node_modules/scheduler")) return "react-core";

            // Router
            if (id.includes("react-router")) return "react-router";

            // Motion: include its separately published runtime packages
            if (
              id.includes("/node_modules/framer-motion/") ||
              id.includes("/node_modules/motion-dom/") ||
              id.includes("/node_modules/motion-utils/")
            ) return "motion";

            // Keep CV export libraries in separate on-demand chunks
            if (id.includes("/node_modules/html-to-image/")) return "html-to-image";
            if (id.includes("/node_modules/jspdf/")) return "jspdf";
            if (id.includes("/node_modules/html2canvas/")) return "html2canvas";
            if (id.includes("/node_modules/canvg/")) return "canvg";
            if (id.includes("/node_modules/dompurify/")) return "dompurify";
            if (id.includes("/node_modules/core-js/")) return "pdf-corejs";
            if (id.includes("/node_modules/fast-png/")) return "pdf-png";
            if (id.includes("/node_modules/pako/")) return "pdf-compression";
            if (id.includes("/node_modules/fflate/")) return "pdf-compression";
            if (id.includes("/node_modules/iobuffer/")) return "pdf-image-utils";
            if (id.includes("/node_modules/svg-pathdata/")) return "pdf-image-utils";
            if (id.includes("/node_modules/stackblur-canvas/")) return "pdf-image-utils";
            if (id.includes("/node_modules/rgbcolor/")) return "pdf-image-utils";
            if (id.includes("/node_modules/performance-now/")) return "pdf-image-utils";

            // Other libraries
            if (id.includes("i18next") || id.includes("react-i18next")) return "i18n";
            if (id.includes("lucide-react")) return "icons";

            return "vendor";
          },

          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: (assetInfo) => {
            const name = assetInfo.names?.[0] ?? assetInfo.name ?? "";
            const ext = name.split(".").pop()?.toLowerCase() ?? "";
            if (/png|jpe?g|gif|svg|webp|avif|ico/i.test(ext)) {
              return "assets/images/[name]-[hash][extname]";
            }
            if (/woff2?|ttf|otf|eot/i.test(ext)) {
              return "assets/fonts/[name]-[hash][extname]";
            }
            if (/css/i.test(ext)) {
              return "assets/css/[name]-[hash][extname]";
            }
            return "assets/[name]-[hash][extname]";
          },
        },
      },
    },

    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "clsx",
        "tailwind-merge",
        "qrcode",
      ],
    },

    esbuild: {
      drop: isProduction ? ["console", "debugger"] : [],
      legalComments: "none",
    },
  };
});

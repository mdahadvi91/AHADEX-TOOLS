import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    plugins: [react()],

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

            // ── Heavy tool libs (lazy-loaded per tool) ──
            if (id.includes("pdfjs-dist") || id.includes("pdf-lib") || id.includes("jspdf")) {
              return "pdf-engine";
            }
            if (id.includes("@imgly/background-removal")) {
              return "bg-removal";
            }
            if (id.includes("browser-image-compression")) {
              return "img-compress";
            }
            if (id.includes("html2canvas")) {
              return "html2canvas";
            }
            if (id.includes("exifr")) {
              return "exif";
            }
            if (id.includes("three")) {
              return "three";
            }
            if (id.includes("qrcode") || id.includes("jsbarcode") || id.includes("jsqr")) {
              return "qr-libs";
            }

            // ── React core (put react-dom + react before react-router) ──
            if (id.includes("node_modules/react-dom")) return "react-core";
            if (id.includes("node_modules/react/")) return "react-core";
            if (id.includes("node_modules/scheduler")) return "react-core";

            // ── Router ──
            if (id.includes("react-router")) return "react-router";

            // ── Other vendors ──
            if (id.includes("framer-motion")) return "motion";
            if (id.includes("gsap") || id.includes("lenis")) return "anim-extra";
            if (id.includes("i18next") || id.includes("react-i18next")) return "i18n";
            if (id.includes("lucide-react")) return "icons";
            if (id.includes("react-icons")) return "icons";
            if (id.includes("file-saver")) return "vendor";
            if (id.includes("react-dropzone")) return "vendor";
            if (id.includes("react-image-crop")) return "vendor";

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
      ],
      exclude: [
        "@imgly/background-removal",
        "pdfjs-dist",
        "pdf-lib",
        "jspdf",
        "three",
        "exifr",
      ],
    },

    esbuild: {
      drop: isProduction ? ["console", "debugger"] : [],
      legalComments: "none",
    },
  };
});

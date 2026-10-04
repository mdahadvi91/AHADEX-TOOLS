import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        silk: {
          cream: "#FDF8F3",
          ivory: "#FFFBF7",
          sand: "#F7EDE4",
          linen: "#F0E0D2",
          rose: "#D88B9A",
          "rose-deep": "#B36878",
          "rose-soft": "#E8B4B8",
          wine: "#8B3A4F",
          "wine-deep": "#6B2A3F",
          gold: "#C99667",
          "gold-soft": "#E5C9A4",
          plum: "#4A2A3A",
          blush: "#E8B4B8",
        },
        light: {
          bg: "#FDF8F3",
          surface: "#FFFBF7",
          elevated: "#F7EDE4",
          text: "#2B1810",
          textSecondary: "#7A5E52",
          border: "#E8D5C4",
        },
        dark: {
          bg: "#1A1114",
          surface: "#251820",
          elevated: "#32202A",
          text: "#F5EAE3",
          textSecondary: "#C4A89E",
          border: "#3D2833",
        },
        success: "#8AB88A",
        warning: "#D4A574",
        error: "#C75B6E",
        info: "#8B9DC7",
      },

      fontFamily: {
        display: ['"Clash Display"', '"General Sans"', 'system-ui', 'sans-serif'],
        sans: ['"General Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      script: ['"Caveat"', 'cursive'],
        mono: ['"JetBrains Mono"', 'monospace'],
        bangla: ['"Hind Siliguri"', 'sans-serif'],
      },

      fontSize: {
        hero: ["clamp(3rem, 8vw, 7rem)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        h1: ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        h2: ["clamp(1.75rem, 3.5vw, 2.75rem)", { lineHeight: "1.1" }],
        h3: ["clamp(1.25rem, 2vw, 1.5rem)", { lineHeight: "1.25" }],
        h4: ["1.125rem", { lineHeight: "1.35" }],
        body: ["1rem", { lineHeight: "1.7" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        tiny: ["0.75rem", { lineHeight: "1.4" }],
      },

      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "88": "22rem",
        "128": "32rem",
      },

      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
      },

      boxShadow: {
        "silk-soft": "0 4px 20px rgba(139, 58, 79, 0.08)",
        "silk-medium": "0 12px 40px rgba(139, 58, 79, 0.12)",
        "silk-deep": "0 24px 60px rgba(107, 42, 63, 0.20)",
        "silk-glow": "0 0 40px rgba(216, 139, 154, 0.35)",
        "silk-gold": "0 0 30px rgba(201, 150, 103, 0.30)",
        "paper-lift": "0 20px 50px -12px rgba(43, 24, 16, 0.25)",
      },

      backgroundImage: {
        "silk-gradient": "linear-gradient(135deg, #FDF8F3 0%, #F7EDE4 40%, #F0E0D2 100%)",
        "rose-gradient": "linear-gradient(135deg, #E8B4B8 0%, #D88B9A 50%, #B36878 100%)",
        "gold-shimmer": "linear-gradient(90deg, transparent 0%, rgba(201,150,103,0.25) 50%, transparent 100%)",
        "wine-gradient": "linear-gradient(135deg, #6B2A3F 0%, #4A2A3A 100%)",
      },

      keyframes: {
        silkReveal: {
          "0%": { opacity: "0", transform: "translateY(60px) scale(0.94)", filter: "blur(8px)" },
          "60%": { opacity: "1", filter: "blur(0)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        petalDrift: {
          "0%": { transform: "translateY(-10vh) translateX(0) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "0.7" },
          "90%": { opacity: "0.7" },
          "100%": { transform: "translateY(110vh) translateX(60px) rotate(360deg)", opacity: "0" },
        },
        silkShimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        softPulse: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.03)", opacity: "0.95" },
        },
        gentleFloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        slideUpFade: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.94)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        inkSpread: {
          "0%": { clipPath: "circle(0% at 50% 50%)" },
          "100%": { clipPath: "circle(150% at 50% 50%)" },
        },
        threadDraw: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        letterWave: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        weaveShimmer: {
          "0%": { backgroundPosition: "-100% 0, 0 0" },
          "100%": { backgroundPosition: "200% 0, 0 0" },
        },
        textGradientSweep: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        letterReveal: {
          "0%": { opacity: "0", transform: "translateY(100%) rotate(-8deg)", filter: "blur(4px)" },
          "100%": { opacity: "1", transform: "translateY(0) rotate(0)", filter: "blur(0)" },
        },
      },

      animation: {
        "silk-reveal": "silkReveal 1s cubic-bezier(0.16, 1, 0.3, 1) both",
        "petal-drift": "petalDrift 12s linear infinite",
        "silk-shimmer": "silkShimmer 3s linear infinite",
        "soft-pulse": "softPulse 4s ease-in-out infinite",
        "gentle-float": "gentleFloat 6s ease-in-out infinite",
        "slide-up": "slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "scale-in": "scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
        "ink-spread": "inkSpread 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        "thread-draw": "threadDraw 2s ease-out forwards",
        "letter-wave": "letterWave 0.7s ease-in-out",
        "weave-shimmer": "weaveShimmer 1.4s linear infinite",
        "text-gradient-sweep": "textGradientSweep 0.8s ease forwards",
        "letter-reveal": "letterReveal 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both",
      },

      transitionTimingFunction: {
        silk: "cubic-bezier(0.22, 1, 0.36, 1)",
        embrace: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },

      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;

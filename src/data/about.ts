export interface AboutValue {
  icon: "shield" | "zap" | "heart" | "sparkles";
  title: string;
  description: string;
}

export interface AboutContent {
  hero: { title: string; subtitle: string };
  story: { title: string; paragraphs: string[] };
  mission: { title: string; statement: string; bullets: string[] };
  values: AboutValue[];
  tech: { title: string; description: string; stack: string[] };
  future: { title: string; description: string; plans: string[] };
  cta: { title: string; subtitle: string };
}

export const about: AboutContent = {
  hero: {
    title: "One developer. One big dream.",
    subtitle: "The story behind AHADEX Tools.",
  },

  story: {
    title: "How it started",
    paragraphs: [
      "I kept running into the same problem. Every time I needed to convert an image, merge a PDF, or format some JSON, I'd land on a website that was slow, covered in ads, and often asked me to sign up before I could do anything.",
      "Worse, I had no idea what was happening to my files. Some tools uploaded them to a server, some added watermarks, and many of them felt like they existed only to serve ads — not to actually help.",
      "So I decided to build the tool site I always wanted. Everything runs locally in your browser. No accounts. No uploads. No watermarks. No annoying interstitials. Just useful tools that work — fast, on any device, for free.",
      "That's how AHADEX Tools started — a solo project built in the evenings and on weekends, with a simple goal: make everyday digital tasks one click easier.",
    ],
  },

  mission: {
    title: "Our mission",
    statement:
      "Make the most common online tasks fast, private, and genuinely free — for everyone, on any device.",
    bullets: [
      "Every tool must work fully in the browser — no uploads, no server processing.",
      "Every tool must be free, without hidden limits or watermarks.",
      "Every tool must respect accessibility and work on slow connections.",
    ],
  },

  values: [
    {
      icon: "shield",
      title: "Privacy first",
      description:
        "Your files never leave your device. We don't track them, store them, or analyse them. Ever.",
    },
    {
      icon: "zap",
      title: "Speed matters",
      description:
        "Client-side processing means instant results — no waiting for uploads or server round-trips.",
    },
    {
      icon: "heart",
      title: "Built with care",
      description:
        "Small touches matter. Every button, animation, and keyboard shortcut is designed to feel right.",
    },
    {
      icon: "sparkles",
      title: "Free forever",
      description:
        "No paywalls. No premium tiers for basic features. The tools are supported by ads only.",
    },
  ],

  tech: {
    title: "What powers it",
    description:
      "AHADEX Tools is a modern web application built with a focus on performance and privacy.",
    stack: [
      "React 18 + TypeScript",
      "Vite for fast builds",
      "Tailwind CSS for styling",
      "Framer Motion for animations",
      "pdf-lib, browser-image-compression, qrcode for tools",
      "Cloudflare Pages for global hosting",
    ],
  },

  future: {
    title: "What's next",
    description: "AHADEX Tools is growing. Here's what we're planning:",
    plans: [
      "More tools — starting with the most requested ones from users.",
      "Full Bengali and Arabic interface (currently English-first).",
      "PWA install for offline access on mobile.",
      "Better accessibility, keyboard shortcuts, and screen-reader support.",
      "Zero ads for supporters (a small one-time option, never required).",
    ],
  },

  cta: {
    title: "Got a suggestion?",
    subtitle: "We'd love to hear it. Ideas, bugs, or just a hello.",
  },
};

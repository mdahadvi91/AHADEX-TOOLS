import type { NavItem, NavSection } from "@/types/common";

export const primaryNav: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "All Tools", to: "/tools" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];


export const footerNav: NavSection[] = [
  {
    title: "Tools",
    items: [
      { label: "All Tools", to: "/tools" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
      {
        label: "GitHub",
        to: "https://github.com/mdahadvi91/AHADEX-TOOLS",
        external: true,
      },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
      { label: "Disclaimer", to: "/disclaimer" },
      { label: "Cookie Policy", to: "/cookie-policy" },
      { label: "Accessibility", to: "/accessibility" },
    ],
  },
];

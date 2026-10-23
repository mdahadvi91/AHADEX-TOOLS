import type { NavItem, NavSection } from "@/types/common";

export const primaryNav: NavItem[] = [
  { label: "Home", to: "/" },
  
  
  { label: "Guides", to: "/guides" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];


export const footerNav: NavSection[] = [
  {
    title: "Tools",
    items: [
      
    ],
  },
  {
    title: "Learn",
    items: [
      
      { label: "Guides", to: "/guides" },
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

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "mail";
  ariaLabel: string;
}

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/mdahadvi91/AHADEX-TOOLS",
    icon: "github",
    ariaLabel: "AHADEX Tools on GitHub",
  },
  {
    label: "Email",
    href: "mailto:mdahadvi91@gmail.com",
    icon: "mail",
    ariaLabel: "Email AHADEX Tools",
  },
];

export const contactEmail = "mdahadvi91@gmail.com";
export const githubUrl = "https://github.com/mdahadvi91/AHADEX-TOOLS";
export const siteUrl = "https://ahadex.fun";

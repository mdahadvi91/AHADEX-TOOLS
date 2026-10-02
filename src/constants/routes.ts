export const ROUTES = {
  home: "/",
  tools: "/tools",
  tool: (slug: string) => `/tools/${slug}`,

  about: "/about",
  contact: "/contact",

  privacy: "/privacy",
  terms: "/terms",
  disclaimer: "/disclaimer",
  accessibility: "/accessibility",
  cookiePolicy: "/cookie-policy",

  notFound: "/404",
} as const;


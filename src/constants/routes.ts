export const ROUTES = {
  home: "/",
  tools: "/tools",
  categories: "/categories",
  category: (slug: string) => `/categories/${slug}`,
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

export const CATEGORY_ROUTES = {
  image: "/categories/image",
  pdf: "/categories/pdf",
  qr: "/categories/qr",
  text: "/categories/text",
  developer: "/categories/developer",
  calculators: "/categories/calculators",
} as const;

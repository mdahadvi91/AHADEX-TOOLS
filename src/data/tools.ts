import type { Tool } from '@/src/types/tool';
import { CATEGORIES } from './categories';

export const TOOL_BASE_PATH = '/tools';

/**
 * Derives canonical route for any tool slug.
 */
export function buildToolRoute(slug: string): string {
  return `${TOOL_BASE_PATH}/${slug}`;
}

/**
 * Canonical Tool Registry for AHADEX TOOLS.
 * Scalable data architecture powering discovery, routes, search, and category aggregation.
 * All 5 initial planned tools are registered with 'coming-soon' status until their Phase implementation.
 */
export const TOOLS: Tool[] = [
  {
    id: 'jpg-to-pdf',
    slug: 'jpg-to-pdf',
    name: 'JPG to PDF',
    shortDescription: 'Convert JPG and JPEG images into clean, high-quality PDF documents directly in your browser.',
    longDescription: 'Turn single or multiple JPG images into a single organized PDF document. Reorder pages, set custom orientation, and retain maximum visual clarity client-side without uploading files.',
    category: 'pdf',
    categoryId: 'pdf',
    icon: 'FileImage',
    route: buildToolRoute('jpg-to-pdf'),
    keywords: ['jpg to pdf', 'jpeg to pdf', 'image to pdf', 'convert jpg', 'make pdf', 'photos to pdf'],
    aliases: ['jpeg-to-pdf', 'image-to-pdf', 'jpg2pdf'],
    tags: ['pdf', 'image', 'convert', 'document'],
    isFeatured: true,
    isPopular: true,
    status: 'coming-soon',
    processingMode: 'client-side',
    supportedInputs: ['image'],
    supportedOutputs: ['pdf'],
    maxFileSizeMb: 50,
  },
  {
    id: 'pdf-to-jpg',
    slug: 'pdf-to-jpg',
    name: 'PDF to JPG',
    shortDescription: 'Extract PDF pages into crisp, high-resolution JPG images client-side.',
    longDescription: 'Convert every page of a PDF document into standalone JPG images or download all rendered pages in a zip package without transferring documents to any external server.',
    category: 'pdf',
    categoryId: 'pdf',
    icon: 'FileText',
    route: buildToolRoute('pdf-to-jpg'),
    keywords: ['pdf to jpg', 'pdf to image', 'pdf to jpeg', 'extract pdf pages', 'convert pdf'],
    aliases: ['pdf-to-jpeg', 'pdf2jpg', 'pdf-to-images'],
    tags: ['pdf', 'image', 'convert', 'export'],
    isFeatured: false,
    isPopular: true,
    status: 'coming-soon',
    processingMode: 'client-side',
    supportedInputs: ['pdf'],
    supportedOutputs: ['image'],
    maxFileSizeMb: 50,
  },
  {
    id: 'image-converter',
    slug: 'image-converter',
    name: 'Image Converter',
    shortDescription: 'Convert between PNG, JPG, WEBP, AVIF, and GIF formats right inside your browser.',
    longDescription: 'Fast, client-side batch image conversion supporting modern web formats. Preserve transparency, tune output quality, and change file formats instantly.',
    category: 'image',
    categoryId: 'image',
    icon: 'RefreshCw',
    route: buildToolRoute('image-converter'),
    keywords: ['image converter', 'png to jpg', 'webp to png', 'jpg to webp', 'photo convert', 'format changer'],
    aliases: ['photo-converter', 'format-converter', 'img-convert'],
    tags: ['image', 'convert', 'png', 'webp', 'jpg'],
    isFeatured: true,
    isPopular: false,
    status: 'coming-soon',
    processingMode: 'client-side',
    supportedInputs: ['image'],
    supportedOutputs: ['image'],
    maxFileSizeMb: 30,
  },
  {
    id: 'image-compressor',
    slug: 'image-compressor',
    name: 'Image Compressor',
    shortDescription: 'Reduce image file size with smart lossy and lossless compression algorithms.',
    longDescription: 'Shrink JPG, PNG, and WEBP file sizes by up to 80% without noticeable visual degradation. Fine-tune compression levels with instant side-by-side comparison.',
    category: 'image',
    categoryId: 'image',
    icon: 'Minimize2',
    route: buildToolRoute('image-compressor'),
    keywords: ['image compressor', 'compress image', 'shrink photo', 'reduce image size', 'optimize image'],
    aliases: ['photo-compressor', 'reduce-image-size', 'image-optimizer'],
    tags: ['image', 'compress', 'optimize', 'performance'],
    isFeatured: true,
    isPopular: true,
    status: 'coming-soon',
    processingMode: 'client-side',
    supportedInputs: ['image'],
    supportedOutputs: ['image'],
    maxFileSizeMb: 30,
  },
  {
    id: 'qr-code-generator',
    slug: 'qr-code-generator',
    name: 'QR Code Generator',
    shortDescription: 'Create custom high-resolution QR codes for URLs, WiFi networks, vCards, and text.',
    longDescription: 'Generate customized, vector-quality QR codes with custom foreground/background colors, error correction settings, and immediate PNG/SVG export.',
    category: 'qr',
    categoryId: 'qr',
    icon: 'QrCode',
    route: buildToolRoute('qr-code-generator'),
    keywords: ['qr code generator', 'create qr code', 'make qr', 'custom qr code', 'wifi qr', 'vcard qr'],
    aliases: ['qr-generator', 'qrcode-maker', 'custom-qr'],
    tags: ['qr', 'generator', 'barcode', 'vector'],
    isFeatured: false,
    isPopular: true,
    status: 'coming-soon',
    processingMode: 'client-side',
    supportedInputs: ['text', 'url', 'qr-content'],
    supportedOutputs: ['image', 'qr'],
  },
];

/**
 * Retrieve all registered tools.
 */
export function getAllTools(): Tool[] {
  return TOOLS;
}

/**
 * Retrieve a tool by its unique ID.
 */
export function getToolById(id: string): Tool | undefined {
  return TOOLS.find((tool) => tool.id === id);
}

/**
 * Retrieve a tool by its URL slug.
 */
export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((tool) => tool.slug === slug);
}

/**
 * Retrieve tools belonging to a specific category.
 */
export function getToolsByCategory(categoryId: string): Tool[] {
  return TOOLS.filter((tool) => tool.categoryId === categoryId || tool.category === categoryId);
}

/**
 * Retrieve active tools.
 */
export function getActiveTools(): Tool[] {
  return TOOLS.filter((tool) => tool.status === 'active');
}

/**
 * Retrieve featured tools.
 */
export function getFeaturedTools(): Tool[] {
  return TOOLS.filter((tool) => tool.isFeatured);
}

/**
 * Retrieve popular tools.
 */
export function getPopularTools(): Tool[] {
  return TOOLS.filter((tool) => tool.isPopular);
}

/**
 * Lightweight runtime validation for tools registry integrity.
 * Guarantees unique IDs, unique slugs, unique routes, and valid category references.
 */
export function validateToolRegistry(): boolean {
  const validCategoryIds = new Set(CATEGORIES.map((c) => c.id));
  const seenIds = new Set<string>();
  const seenSlugs = new Set<string>();
  const seenRoutes = new Set<string>();

  for (const tool of TOOLS) {
    if (!tool.id || seenIds.has(tool.id)) {
      throw new Error(`[ToolRegistry] Duplicate or empty Tool ID: "${tool.id}"`);
    }
    if (!tool.slug || seenSlugs.has(tool.slug)) {
      throw new Error(`[ToolRegistry] Duplicate or empty Tool Slug: "${tool.slug}"`);
    }
    if (!tool.route || seenRoutes.has(tool.route)) {
      throw new Error(`[ToolRegistry] Duplicate or empty Tool Route: "${tool.route}"`);
    }
    if (!validCategoryIds.has(tool.categoryId)) {
      throw new Error(
        `[ToolRegistry] Tool "${tool.id}" references non-existent category: "${tool.categoryId}"`
      );
    }
    if (!tool.name.trim()) {
      throw new Error(`[ToolRegistry] Tool "${tool.id}" must have a valid name.`);
    }
    if (!tool.shortDescription.trim()) {
      throw new Error(`[ToolRegistry] Tool "${tool.id}" must have a valid short description.`);
    }

    seenIds.add(tool.id);
    seenSlugs.add(tool.slug);
    seenRoutes.add(tool.route);
  }

  return true;
}

// Automatically validate tool registry integrity on module load
validateToolRegistry();

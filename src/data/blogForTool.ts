/* ============================================================
 * Tool → Blog Post mapping
 * ------------------------------------------------------------
 * Maps each toolId to relevant blog post slugs.
 * Used by RelatedArticles component on tool pages for
 * internal linking (great for SEO and AdSense).
 * ============================================================ */

export const BLOG_FOR_TOOL: Record<string, string[]> = {
  // Image tools
  "image-compressor": [
    "how-to-compress-images-without-losing-quality",
    "jpg-vs-png-vs-webp-which-format",
    "image-sizes-social-media-2026-guide",
  ],
  "image-resizer": [
    "image-sizes-social-media-2026-guide",
    "image-cropping-guide-aspect-ratios",
    "jpg-vs-png-vs-webp-which-format",
  ],
  "image-cropper": [
    "image-cropping-guide-aspect-ratios",
    "image-sizes-social-media-2026-guide",
    "how-to-compress-images-without-losing-quality",
  ],
  "jpg-to-png": [
    "jpg-vs-png-vs-webp-which-format",
    "how-to-compress-images-without-losing-quality",
  ],
  "png-to-jpg": [
    "jpg-vs-png-vs-webp-which-format",
    "how-to-compress-images-without-losing-quality",
  ],
  "jpg-to-webp": [
    "jpg-vs-png-vs-webp-which-format",
    "image-sizes-social-media-2026-guide",
  ],
  "png-to-webp": [
    "jpg-vs-png-vs-webp-which-format",
    "image-sizes-social-media-2026-guide",
  ],
  "webp-to-jpg": [
    "jpg-vs-png-vs-webp-which-format",
    "image-sizes-social-media-2026-guide",
  ],
  "webp-to-png": [
    "jpg-vs-png-vs-webp-which-format",
    "image-sizes-social-media-2026-guide",
  ],
  "jpg-to-pdf": ["convert-jpg-to-pdf-complete-guide", "pdf-to-jpg-when-and-why"],
  "png-to-pdf": ["convert-jpg-to-pdf-complete-guide", "pdf-to-jpg-when-and-why"],
  "image-to-pdf": ["convert-jpg-to-pdf-complete-guide"],
  "image-metadata-viewer": [
    "how-to-compress-images-without-losing-quality",
    "jpg-vs-png-vs-webp-which-format",
  ],
  "favicon-generator": ["favicon-complete-guide-website-icons"],
  "svg-to-png": ["jpg-vs-png-vs-webp-which-format", "favicon-complete-guide-website-icons"],
  "image-to-cartoon": [
    "image-to-sketch-cartoon-how-it-works",
    "image-sizes-social-media-2026-guide",
  ],
  "image-to-sketch": [
    "image-to-sketch-cartoon-how-it-works",
    "image-sizes-social-media-2026-guide",
  ],

  // PDF tools
  "merge-pdf": ["merge-pdf-files-online-complete-guide", "convert-jpg-to-pdf-complete-guide"],
  "split-pdf": ["merge-pdf-files-online-complete-guide", "pdf-to-jpg-when-and-why"],
  "pdf-to-jpg": ["pdf-to-jpg-when-and-why", "convert-jpg-to-pdf-complete-guide"],
  "pdf-to-png": ["pdf-to-jpg-when-and-why", "convert-jpg-to-pdf-complete-guide"],
  "pdf-to-text": ["merge-pdf-files-online-complete-guide", "pdf-to-jpg-when-and-why"],
  "pdf-rotator": ["merge-pdf-files-online-complete-guide", "pdf-to-jpg-when-and-why"],
  "pdf-page-extractor": ["merge-pdf-files-online-complete-guide", "pdf-to-jpg-when-and-why"],

  // Developer tools
  "json-formatter": [
    "json-formatter-complete-developer-guide",
    "json-vs-xml-complete-comparison",
  ],
  "base64-encoder": [
    "base64-encoding-explained-beginner-guide",
    "json-formatter-complete-developer-guide",
  ],
  "url-encoder": [
    "url-encoding-explained-special-characters",
    "base64-encoding-explained-beginner-guide",
  ],
  "uuid-generator": [
    "uuid-v4-vs-v7-when-to-use-each",
    "json-formatter-complete-developer-guide",
  ],
  "password-generator": ["strong-password-generator-complete-guide"],

  // Text tools
  "word-counter": [
    "word-count-guide-writing-content",
    "twitter-character-limit-guide-2026",
  ],
  "character-counter": [
    "twitter-character-limit-guide-2026",
    "word-count-guide-writing-content",
  ],
  "text-case-converter": ["title-case-vs-sentence-case-writing-guide"],

  // QR tools
  "photo-qr": ["qr-codes-business-cards-marketing"],
  "barcode-generator": ["barcode-vs-qr-code-when-to-use", "qr-codes-business-cards-marketing"],

  // Design tools
  "cv-builder": ["word-count-guide-writing-content"],
  "visiting-card": ["qr-codes-business-cards-marketing"],
};

export function getBlogForTool(toolId: string, max = 3): string[] {
  return (BLOG_FOR_TOOL[toolId] ?? []).slice(0, max);
}

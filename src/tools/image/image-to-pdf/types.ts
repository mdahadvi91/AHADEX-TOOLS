export type ImageEmbedType = "jpg" | "png";

export interface ImagePage {
  id: string;
  originalName: string;
  originalSize: number;
  originalType: string;
  dataUrl: string;
  width: number;
  height: number;
  embedType: ImageEmbedType;
}

export interface PdfResult {
  blob: Blob;
  url: string;
  size: number;
  pageCount: number;
}

export interface PdfBuildOptions {
  pageSize: "auto" | "a4" | "letter";
  orientation: "auto" | "portrait" | "landscape";
  margin: number;
}

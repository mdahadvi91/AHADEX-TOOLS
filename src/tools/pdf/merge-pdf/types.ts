export interface PdfInput {
  id: string;
  name: string;
  size: number;
  pageCount: number;
  bytes: ArrayBuffer;
}

export interface MergedPdf {
  blob: Blob;
  url: string;
  size: number;
  totalPages: number;
  fileCount: number;
}

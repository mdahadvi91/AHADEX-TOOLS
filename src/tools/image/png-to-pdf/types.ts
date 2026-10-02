export interface PdfPage {
  id: string;
  originalName: string;
  originalSize: number;
  dataUrl: string;
  width: number;
  height: number;
}

export interface PdfResult {
  blob: Blob;
  url: string;
  size: number;
  pageCount: number;
}

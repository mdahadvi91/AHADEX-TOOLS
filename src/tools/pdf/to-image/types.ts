export interface LoadedPdf {
  name: string;
  size: number;
  pageCount: number;
  bytes: ArrayBuffer;
}

export interface PngPageResult {
  blob: Blob;
  url: string;
  size: number;
  filename: string;
  pageNumber: number;
  width: number;
  height: number;
}

export type DpiOption = 72 | 150 | 300;

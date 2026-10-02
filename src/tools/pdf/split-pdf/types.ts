export interface LoadedPdf {
  name: string;
  size: number;
  pageCount: number;
  bytes: ArrayBuffer;
}

export interface SplitResult {
  blob: Blob;
  url: string;
  size: number;
  filename: string;
}

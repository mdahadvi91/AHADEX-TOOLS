export interface LoadedPdf {
  name: string;
  size: number;
  pageCount: number;
  bytes: ArrayBuffer;
}

export interface ExtractedFile {
  filename: string;
  blob: Blob;
  url: string;
  size: number;
  pageNumbers: number[];
}

export type ExtractMode = "combined" | "separate";

export interface ExtractRequest {
  pageList: string;
  mode: ExtractMode;
}

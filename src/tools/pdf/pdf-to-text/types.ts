export interface LoadedPdf {
  name: string;
  size: number;
  pageCount: number;
  bytes: ArrayBuffer;
}

export interface ExtractedPage {
  pageNumber: number;
  text: string;
  charCount: number;
}

export interface ExtractResult {
  filename: string;
  blob: Blob;
  url: string;
  size: number;
  pages: ExtractedPage[];
  totalChars: number;
  totalWords: number;
}

export interface ExtractOptions {
  pageRanges: string;
  preserveLineBreaks: boolean;
  pageSeparator: boolean;
}

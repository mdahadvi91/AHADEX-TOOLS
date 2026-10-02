export interface CompressedFile {
  id: string;
  originalName: string;
  originalSize: number;
  originalUrl: string;
  compressedBlob: Blob;
  compressedUrl: string;
  compressedSize: number;
  width: number;
  height: number;
}

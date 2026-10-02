export interface ResizedFile {
  id: string;
  originalName: string;
  originalSize: number;
  originalUrl: string;
  resizedBlob: Blob;
  resizedUrl: string;
  resizedSize: number;
  originalWidth: number;
  originalHeight: number;
  newWidth: number;
  newHeight: number;
}

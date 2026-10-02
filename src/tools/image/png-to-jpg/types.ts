/* ============================================================
 * PNG → JPG — Type System
 * ============================================================ */

export interface ConvertedFile {
  id: string;
  originalName: string;
  originalSize: number;
  originalUrl: string;
  convertedBlob: Blob;
  convertedUrl: string;
  convertedSize: number;
  width: number;
  height: number;
}

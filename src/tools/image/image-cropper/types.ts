export interface CroppedFile {
  id: string;
  originalName: string;
  originalSize: number;
  originalUrl: string;
  croppedBlob: Blob;
  croppedUrl: string;
  croppedSize: number;
  originalWidth: number;
  originalHeight: number;
  cropX: number;
  cropY: number;
  cropW: number;
  cropH: number;
}

export interface CropRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

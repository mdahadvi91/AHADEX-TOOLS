export interface MetadataItem {
  label: string;
  value: string;
  href?: string;
}

export interface MetadataGroup {
  title: string;
  icon: string;
  items: MetadataItem[];
}

export interface FileInfo {
  name: string;
  size: number;
  type: string;
  width: number;
  height: number;
  previewUrl: string;
}

export interface MetadataResult {
  fileInfo: FileInfo;
  groups: MetadataGroup[];
  hasExif: boolean;
}

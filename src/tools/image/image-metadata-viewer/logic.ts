import exifr from "exifr";
import type { MetadataGroup, MetadataItem, MetadataResult, FileInfo } from "./types";

export const MAX_FILE_SIZE = 50 * 1024 * 1024;
export const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "image/tiff",
];

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
}

export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not load image"));
    img.src = url;
  });
}

export function validateFile(file: File): string | null {
  const ok = ACCEPTED_TYPES.includes(file.type) || /\.(jpe?g|png|webp|heic|heif|tiff?)$/i.test(file.name);
  if (!ok) return "Unsupported file type. Use JPG, PNG, WebP, HEIC, or TIFF.";
  if (file.size > MAX_FILE_SIZE) return "File is too large (max 50 MB).";
  return null;
}

function toStr(v: unknown): string {
  if (v == null) return "";
  if (v instanceof Date) return v.toLocaleString();
  if (typeof v === "number") return Number.isInteger(v) ? String(v) : v.toFixed(2);
  if (typeof v === "string") return v.trim();
  if (typeof v === "boolean") return v ? "Yes" : "No";
  return String(v);
}

function pick(data: Record<string, unknown>, ...keys: string[]): unknown {
  for (const k of keys) {
    if (data[k] != null && data[k] !== "") return data[k];
  }
  return undefined;
}

function buildFileInfoGroup(info: FileInfo): MetadataGroup {
  return {
    title: "File",
    icon: "📁",
    items: [
      { label: "Name", value: info.name },
      { label: "Size", value: formatBytes(info.size) },
      { label: "Type", value: info.type || "unknown" },
      { label: "Dimensions", value: `${info.width} × ${info.height} px` },
    ],
  };
}

function buildGroups(data: Record<string, unknown>): MetadataGroup[] {
  const groups: MetadataGroup[] = [];

  const make = pick(data, "Make", "make");
  const model = pick(data, "Model", "model");
  const lens = pick(data, "LensModel", "Lens", "lensModel");
  const software = pick(data, "Software", "software");
  const cameraItems: MetadataItem[] = [];
  if (make) cameraItems.push({ label: "Make", value: toStr(make) });
  if (model) cameraItems.push({ label: "Model", value: toStr(model) });
  if (lens) cameraItems.push({ label: "Lens", value: toStr(lens) });
  if (software) cameraItems.push({ label: "Software", value: toStr(software) });
  if (cameraItems.length) groups.push({ title: "Camera", icon: "📷", items: cameraItems });

  const expItems: MetadataItem[] = [];
  const exposureTime = pick(data, "ExposureTime", "exposureTime");
  if (exposureTime != null) {
    const n = Number(exposureTime);
    if (!isNaN(n) && n > 0) {
      expItems.push({ label: "Exposure", value: n < 1 ? `1/${Math.round(1 / n)} s` : `${n} s` });
    } else {
      expItems.push({ label: "Exposure", value: toStr(exposureTime) });
    }
  }
  const fnumber = pick(data, "FNumber", "fNumber", "ApertureValue");
  if (fnumber != null) expItems.push({ label: "Aperture", value: `f/${toStr(fnumber)}` });
  const iso = pick(data, "ISO", "ISOSpeedRatings", "PhotographicSensitivity");
  if (iso != null) expItems.push({ label: "ISO", value: toStr(iso) });
  const focal = pick(data, "FocalLength", "focalLength");
  if (focal != null) expItems.push({ label: "Focal length", value: `${toStr(focal)} mm` });
  const focal35 = pick(data, "FocalLengthIn35mmFormat");
  if (focal35 != null) expItems.push({ label: "35mm equiv.", value: `${toStr(focal35)} mm` });
  const flash = pick(data, "Flash", "flash");
  if (flash != null) expItems.push({ label: "Flash", value: toStr(flash) });
  const wb = pick(data, "WhiteBalance", "whiteBalance");
  if (wb != null) expItems.push({ label: "White balance", value: toStr(wb) });
  const metering = pick(data, "MeteringMode", "meteringMode");
  if (metering != null) expItems.push({ label: "Metering", value: toStr(metering) });
  if (expItems.length) groups.push({ title: "Exposure", icon: "⚡", items: expItems });

  const dateItems: MetadataItem[] = [];
  const dtOrig = pick(data, "DateTimeOriginal", "CreateDate", "dateTimeOriginal");
  if (dtOrig) dateItems.push({ label: "Taken", value: toStr(dtOrig) });
  const dtCreate = pick(data, "CreateDate", "createDate");
  if (dtCreate && dtCreate !== dtOrig) dateItems.push({ label: "Created", value: toStr(dtCreate) });
  const dtMod = pick(data, "ModifyDate", "modifyDate");
  if (dtMod) dateItems.push({ label: "Modified", value: toStr(dtMod) });
  const tz = pick(data, "OffsetTimeOriginal", "TimeZoneOffset");
  if (tz) dateItems.push({ label: "Timezone", value: toStr(tz) });
  if (dateItems.length) groups.push({ title: "Date & time", icon: "🕐", items: dateItems });

  const lat = Number(pick(data, "GPSLatitude", "latitude"));
  const lon = Number(pick(data, "GPSLongitude", "longitude"));
  const alt = pick(data, "GPSAltitude", "altitude");
  if (!isNaN(lat) && !isNaN(lon) && (lat !== 0 || lon !== 0)) {
    const gpsItems: MetadataItem[] = [
      { label: "Latitude", value: lat.toFixed(6) },
      { label: "Longitude", value: lon.toFixed(6) },
      { label: "Map", value: "Open in OpenStreetMap", href: `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=16/${lat}/${lon}` },
    ];
    if (alt != null) gpsItems.push({ label: "Altitude", value: `${toStr(alt)} m` });
    groups.push({ title: "Location", icon: "📍", items: gpsItems });
  }

  const imgItems: MetadataItem[] = [];
  const orient = pick(data, "Orientation", "orientation");
  if (orient != null) imgItems.push({ label: "Orientation", value: toStr(orient) });
  const colorSpace = pick(data, "ColorSpace", "colorSpace");
  if (colorSpace != null) imgItems.push({ label: "Color space", value: toStr(colorSpace) });
  const xres = pick(data, "XResolution", "xResolution");
  if (xres != null) imgItems.push({ label: "X resolution", value: toStr(xres) });
  const yres = pick(data, "YResolution", "yResolution");
  if (yres != null) imgItems.push({ label: "Y resolution", value: toStr(yres) });
  const resUnit = pick(data, "ResolutionUnit", "resolutionUnit");
  if (resUnit != null) imgItems.push({ label: "Resolution unit", value: toStr(resUnit) });
  if (imgItems.length) groups.push({ title: "Image", icon: "🖼️", items: imgItems });

  const authorItems: MetadataItem[] = [];
  const artist = pick(data, "Artist", "artist", "Creator");
  if (artist) authorItems.push({ label: "Artist", value: toStr(artist) });
  const copyright = pick(data, "Copyright", "copyright");
  if (copyright) authorItems.push({ label: "Copyright", value: toStr(copyright) });
  const desc = pick(data, "ImageDescription", "description");
  if (desc) authorItems.push({ label: "Description", value: toStr(desc) });
  if (authorItems.length) groups.push({ title: "Author", icon: "✍️", items: authorItems });

  return groups;
}

export async function readMetadata(file: File): Promise<MetadataResult> {
  const err = validateFile(file);
  if (err) throw new Error(err);

  const previewUrl = URL.createObjectURL(file);
  const img = await loadImage(previewUrl);

  const fileInfo: FileInfo = {
    name: file.name,
    size: file.size,
    type: file.type || "unknown",
    width: img.naturalWidth,
    height: img.naturalHeight,
    previewUrl,
  };

  let raw: Record<string, unknown> = {};
  try {
    const parsed = await exifr.parse(file, { gps: true, exif: true, tiff: true, ifd0: true });
    if (parsed && typeof parsed === "object") raw = parsed as Record<string, unknown>;
  } catch {
    raw = {};
  }

  const groups = [buildFileInfoGroup(fileInfo), ...buildGroups(raw)];
  const hasExif = groups.length > 1;

  return { fileInfo, groups, hasExif };
}

export function revokeResult(result: MetadataResult): void {
  URL.revokeObjectURL(result.fileInfo.previewUrl);
}

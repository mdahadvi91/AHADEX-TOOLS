export type QrType = "text" | "url" | "wifi" | "email" | "phone" | "sms" | "vcard" | "location";

export type ErrorLevel = "L" | "M" | "Q" | "H";

export type SizeOption = 128 | 256 | 512 | 1024;

export interface WifiData {
  ssid: string;
  password: string;
  encryption: "WPA" | "WEP" | "nopass";
  hidden: boolean;
}

export interface VCardData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  organization: string;
  title: string;
  website: string;
}

export interface LocationData {
  latitude: string;
  longitude: string;
}

export interface QrOptions {
  errorLevel: ErrorLevel;
  size: SizeOption;
  foreground: string;
  background: string;
  margin: number;
}

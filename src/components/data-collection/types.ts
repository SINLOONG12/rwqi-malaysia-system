
export interface UserUpload {
  id: string;
  type: string;
  location: string;
  coordinates: string;
  description: string;
  date: string;
  status: 'verified' | 'pending' | 'rejected';
  user: string;
}

export interface ReportItem {
  id: string;
  title: string;
  type: string;
  date: string;
  size: string;
  author: string;
}

export type UploadType = "media" | "document";

export interface RiverCoordinate {
  x: number;
  y: number;
  status: "critical" | "warning" | "good";
}

export interface AlertSettings {
  email: boolean;
  sms: boolean;
  app: boolean;
  critical: boolean;
  sensor: boolean;
  cleanup: boolean;
}

export interface AlertItem {
  id: string;
  type: "pollution" | "sensor" | "cleanup";
  severity: "high" | "medium" | "low";
  location: string;
  timestamp: string;
  message: string;
  status: "read" | "unread";
  rwqi: number;
}

export interface ReportTemplate {
  id: string;
  title: string;
  description: string;
  type: "government" | "cleanup" | "public";
  format: "pdf" | "word" | "excel" | "csv";
}

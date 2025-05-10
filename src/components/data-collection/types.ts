
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

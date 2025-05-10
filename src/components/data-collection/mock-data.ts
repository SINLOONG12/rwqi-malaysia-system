
import { ReportItem, UserUpload } from "./types";

// Simulated user uploads
export const recentUploads: UserUpload[] = [
  { 
    id: 'upload-001', 
    type: 'image',
    location: 'Sungai Klang, Kuala Lumpur', 
    coordinates: '3.1390° N, 101.6869° E',
    description: 'Oil spill near riverbank',
    date: '2025-05-07',
    status: 'verified',
    user: 'citizen-573'
  },
  { 
    id: 'upload-002', 
    type: 'video',
    location: 'Sungai Gombak, Kuala Lumpur', 
    coordinates: '3.1831° N, 101.7166° E',
    description: 'Plastic waste accumulation near bridge',
    date: '2025-05-06',
    status: 'pending',
    user: 'citizen-298'
  },
  { 
    id: 'upload-003', 
    type: 'image',
    location: 'Sungai Pinang, Penang', 
    coordinates: '5.4065° N, 100.3081° E',
    description: 'Discharge from nearby factory',
    date: '2025-05-05',
    status: 'verified',
    user: 'citizen-105'
  },
  { 
    id: 'upload-004', 
    type: 'video',
    location: 'Sungai Kelantan, Kelantan', 
    coordinates: '6.1248° N, 102.2537° E',
    description: 'Floating trash after heavy rain',
    date: '2025-05-04',
    status: 'rejected',
    user: 'citizen-421'
  },
  { 
    id: 'upload-005', 
    type: 'pdf',
    location: 'Sungai Pahang, Pahang', 
    coordinates: '3.8126° N, 103.3256° E',
    description: 'Monthly water quality analysis report',
    date: '2025-05-03',
    status: 'verified',
    user: 'gov-official-12'
  },
];

// Simulated reports
export const availableReports: ReportItem[] = [
  {
    id: 'report-001',
    title: 'Water Quality Analysis Q1 2025',
    type: 'pdf',
    date: '2025-04-01',
    size: '3.2 MB',
    author: 'Department of Environment'
  },
  {
    id: 'report-002',
    title: 'Pollution Trend Analysis',
    type: 'excel',
    date: '2025-03-15',
    size: '1.8 MB',
    author: 'River Monitoring Unit'
  },
  {
    id: 'report-003',
    title: 'Cleanup Operation Recommendations',
    type: 'word',
    date: '2025-03-10',
    size: '2.4 MB',
    author: 'AI Analysis Team'
  },
  {
    id: 'report-004',
    title: 'Predictive Model Results - Sungai Klang',
    type: 'pdf',
    date: '2025-02-28',
    size: '5.1 MB',
    author: 'Environmental Research Division'
  }
];

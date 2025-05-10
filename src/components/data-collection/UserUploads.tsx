
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, MapPin, Camera, CheckCircle, AlertTriangle, Download, FileVideo, FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Simulated user uploads
const recentUploads = [
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
const availableReports = [
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

const UserUploads: React.FC = () => {
  const { toast } = useToast();
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>('');
  const [coordinates, setCoordinates] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("uploads");
  const [uploadType, setUploadType] = useState<"media" | "document">("media");
  
  // Create refs for file inputs
  const mediaInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
    }
  };

  const handleGetLocation = () => {
    toast({
      title: "Getting Location",
      description: "Accessing your device's location...",
    });
    
    // Simulate geolocation
    setTimeout(() => {
      setCoordinates('3.1390° N, 101.6869° E');
      setLocation('Near Sungai Klang, Kuala Lumpur');
      toast({
        title: "Location Retrieved",
        description: "Your current location has been added to the report.",
      });
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadFile || !description || !location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and upload a file.",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      setUploadFile(null);
      setDescription('');
      setCoordinates('');
      setLocation('');
      
      toast({
        title: "Upload Successful",
        description: "Thank you for your contribution to river monitoring!",
      });
    }, 2000);
  };

  const handleDownloadReport = (reportId: string) => {
    const report = availableReports.find(r => r.id === reportId);
    
    if (!report) return;
    
    toast({
      title: "Downloading Report",
      description: `${report.title} (${report.type.toUpperCase()}) is being downloaded.`,
    });
    
    // In a real app, this would be a fetch request to download the file
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `${report.title} has been downloaded successfully.`,
      });
    }, 1500);
  };

  const triggerFileInput = (inputType: "media" | "document") => {
    setUploadType(inputType);
    if (inputType === "media" && mediaInputRef.current) {
      mediaInputRef.current.click();
    } else if (inputType === "document" && documentInputRef.current) {
      documentInputRef.current.click();
    }
  };

  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <FileVideo className="h-8 w-8 text-slate-400" />;
      case 'pdf':
      case 'word':
      case 'excel':
        return <FileText className="h-8 w-8 text-slate-400" />;
      default:
        return <Camera className="h-8 w-8 text-slate-400" />;
    }
  };

  const getFileTypeName = (type: string) => {
    switch (type) {
      case 'video':
        return 'Video';
      case 'pdf':
        return 'PDF Document';
      case 'word':
        return 'Word Document';
      case 'excel':
        return 'Excel Spreadsheet';
      default:
        return 'Image';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Community Contributions</CardTitle>
            <CardDescription>
              User-submitted data and official reports
            </CardDescription>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="uploads">User Uploads</TabsTrigger>
              <TabsTrigger value="reports">Available Reports</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <TabsContent value="uploads" className="m-0">
            <div className="space-y-4">
              {recentUploads.map(upload => (
                <div 
                  key={upload.id} 
                  className="flex flex-col sm:flex-row gap-4 border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex-shrink-0 w-full sm:w-32 h-24 bg-slate-200 dark:bg-slate-800 rounded-md flex items-center justify-center">
                    {getFileTypeIcon(upload.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{upload.location}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded flex items-center gap-1 ${
                        upload.status === 'verified' ? 'bg-green-100 text-green-800' :
                        upload.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {upload.status === 'verified' ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : upload.status === 'rejected' ? (
                          <AlertTriangle className="h-3 w-3" />
                        ) : null}
                        {upload.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      <span>{upload.coordinates}</span>
                    </div>
                    
                    <p className="mt-2 text-sm">{upload.description}</p>
                    
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-muted-foreground">
                        Uploaded on {upload.date} by {upload.user}
                      </span>
                      <div className="flex gap-2">
                        <Button variant="link" size="sm" className="text-xs h-auto p-0">
                          View Details
                        </Button>
                        {upload.type === 'pdf' && (
                          <Button variant="link" size="sm" className="text-xs h-auto p-0 flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="reports" className="m-0">
            <div className="space-y-4">
              {availableReports.map(report => (
                <div 
                  key={report.id} 
                  className="flex flex-col sm:flex-row gap-4 border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex-shrink-0 w-full sm:w-32 h-24 bg-slate-200 dark:bg-slate-800 rounded-md flex items-center justify-center">
                    {getFileTypeIcon(report.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{report.title}</h4>
                      <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded">
                        {getFileTypeName(report.type)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span>Created on {report.date}</span>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                      <span>{report.size}</span>
                    </div>
                    
                    <p className="mt-2 text-sm">By {report.author}</p>
                    
                    <div className="flex justify-end items-center mt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-2"
                        onClick={() => handleDownloadReport(report.id)}
                      >
                        <Download className="h-4 w-4" />
                        Download Report
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contribute</CardTitle>
          <CardDescription>
            Upload geo-tagged photos, videos, or documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="upload-type">Upload Type</Label>
              <div className="grid grid-cols-2 gap-4 mt-1">
                <Button 
                  type="button" 
                  variant={uploadType === "media" ? "default" : "outline"} 
                  onClick={() => triggerFileInput("media")}
                  className="flex items-center gap-2"
                >
                  <Camera className="h-4 w-4" />
                  Photo/Video
                </Button>
                <Button 
                  type="button" 
                  variant={uploadType === "document" ? "default" : "outline"}
                  onClick={() => triggerFileInput("document")}
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Document
                </Button>
              </div>
              
              <div className="mt-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center">
                {uploadFile ? (
                  <div className="text-center">
                    <CheckCircle className="mx-auto h-8 w-8 text-green-500 mb-2" />
                    <p className="text-sm font-medium">{uploadFile.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {(uploadFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => setUploadFile(null)}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-10 w-10 text-slate-400 mb-2" />
                    <p className="text-sm font-medium">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {uploadType === "media" 
                        ? "Support for JPG, PNG, MP4 up to 20MB" 
                        : "Support for PDF, DOC, XLSX up to 10MB"}
                    </p>
                  </>
                )}
                <Input 
                  id="media-upload"
                  ref={mediaInputRef}
                  type="file" 
                  className="hidden"
                  accept="image/jpeg,image/png,video/mp4"
                  onChange={handleFileChange}
                />
                <Input 
                  id="document-upload"
                  ref={documentInputRef}
                  type="file" 
                  className="hidden"
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <div className="flex gap-2 mt-1">
                  <Input 
                    id="location"
                    placeholder="River name and area"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    onClick={handleGetLocation}
                  >
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {coordinates && (
                <div className="text-xs bg-slate-100 dark:bg-slate-800 p-2 rounded flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{coordinates}</span>
                </div>
              )}
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe what you observed..."
                  className="mt-1"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full" disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Submit Report'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserUploads;

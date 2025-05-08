
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, MapPin, Camera, CheckCircle, AlertTriangle } from 'lucide-react';

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
];

const UserUploads: React.FC = () => {
  const { toast } = useToast();
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>('');
  const [coordinates, setCoordinates] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Recent User Uploads</CardTitle>
          <CardDescription>
            Community-contributed river pollution reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentUploads.map(upload => (
              <div 
                key={upload.id} 
                className="flex flex-col sm:flex-row gap-4 border-b border-border pb-4 last:border-0 last:pb-0"
              >
                <div className="flex-shrink-0 w-full sm:w-32 h-24 bg-slate-200 dark:bg-slate-800 rounded-md flex items-center justify-center">
                  {upload.type === 'image' ? (
                    <Camera className="h-8 w-8 text-slate-400" />
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <Camera className="h-6 w-6 text-slate-400" />
                      <span className="text-xs text-slate-400">Video</span>
                    </div>
                  )}
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
                    <Button variant="link" size="sm" className="text-xs h-auto p-0">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contribute</CardTitle>
          <CardDescription>
            Upload geo-tagged photos or videos of river pollution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="file-upload">Upload Photo/Video</Label>
              <div className="mt-1 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center">
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
                      Support for JPG, PNG, MP4 up to 20MB
                    </p>
                  </>
                )}
                <Input 
                  id="file-upload"
                  type="file" 
                  className="hidden"
                  accept="image/jpeg,image/png,video/mp4"
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

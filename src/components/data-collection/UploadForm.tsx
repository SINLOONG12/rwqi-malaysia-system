
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, MapPin, Camera, CheckCircle, FileText } from 'lucide-react';
import { UploadType } from './types';
import FileTypeIcon from './FileTypeIcon';

const UploadForm: React.FC = () => {
  const { toast } = useToast();
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>('');
  const [coordinates, setCoordinates] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadType, setUploadType] = useState<UploadType>("media");
  
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

  const triggerFileInput = (inputType: UploadType) => {
    setUploadType(inputType);
    if (inputType === "media" && mediaInputRef.current) {
      mediaInputRef.current.click();
    } else if (inputType === "document" && documentInputRef.current) {
      documentInputRef.current.click();
    }
  };

  return (
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
  );
};

export default UploadForm;

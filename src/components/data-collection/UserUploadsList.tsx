
import React from 'react';
import { AlertTriangle, CheckCircle, Download, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { UserUpload } from './types';
import FileTypeIcon from './FileTypeIcon';
import { useToast } from "@/hooks/use-toast";

interface UserUploadsListProps {
  uploads: UserUpload[];
}

const UserUploadsList: React.FC<UserUploadsListProps> = ({ uploads }) => {
  const { toast } = useToast();
  
  const handleDownload = (upload: UserUpload) => {
    // Similar to ReportsList, create a download link
    const link = document.createElement('a');
    
    // Create a demo URL based on upload type
    let demoUrl = '';
    let fileExt = '';
    
    switch(upload.type) {
      case 'pdf':
        demoUrl = `data:application/pdf,${encodeURIComponent(`This is a demo upload from ${upload.user} at ${upload.location}`)}`;
        fileExt = 'pdf';
        break;
      case 'image':
        demoUrl = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJ5+EGHCAAAAABJRU5ErkJggg==`;
        fileExt = 'png';
        break;
      case 'video':
        demoUrl = `data:video/mp4,${encodeURIComponent('Demo video content')}`;
        fileExt = 'mp4';
        break;
      default:
        demoUrl = `data:text/plain,${encodeURIComponent(`Upload content for ${upload.location}`)}`;
        fileExt = 'txt';
    }
    
    toast({
      title: "Downloading File",
      description: `File from ${upload.location} is being downloaded.`,
    });
    
    link.href = demoUrl;
    link.download = `upload_${upload.id}.${fileExt}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download Complete",
      description: "File has been downloaded successfully.",
    });
  };

  return (
    <div className="space-y-4">
      {uploads.map(upload => (
        <div 
          key={upload.id} 
          className="flex flex-col sm:flex-row gap-4 border-b border-border pb-4 last:border-0 last:pb-0"
        >
          <div className="flex-shrink-0 w-full sm:w-32 h-24 bg-slate-200 dark:bg-slate-800 rounded-md flex items-center justify-center">
            <FileTypeIcon type={upload.type} size="lg" />
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
                <Button 
                  variant="link" 
                  size="sm" 
                  className="text-xs h-auto p-0 flex items-center gap-1"
                  onClick={() => handleDownload(upload)}
                >
                  <Download className="h-3 w-3" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserUploadsList;

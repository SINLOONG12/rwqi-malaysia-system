
import React, { useState } from 'react';
import { Download, Edit, Trash, Users, Send, Link } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ReportItem } from './types';
import FileTypeIcon from './FileTypeIcon';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ReportsListProps {
  reports: ReportItem[];
  publisherMode?: boolean;
}

const ReportsList: React.FC<ReportsListProps> = ({ reports, publisherMode = false }) => {
  const { toast } = useToast();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);
  const [shareEmail, setShareEmail] = useState('');
  const [shareTeam, setShareTeam] = useState('cleanup');

  const handleDownloadReport = (reportId: string) => {
    const report = reports.find(r => r.id === reportId);
    
    if (!report) return;
    
    // Create a link element to trigger download
    const link = document.createElement('a');
    
    // For demonstration purposes, we'll simulate different file types
    // In a real application, these would be actual URLs to files
    let demoUrl = '';
    
    // In a real app, these would be actual API endpoints that serve the files
    switch(report.type) {
      case 'pdf':
        demoUrl = `data:application/pdf,${encodeURIComponent(`This is a demo ${report.title} PDF content`)}`;
        break;
      case 'excel':
        demoUrl = `data:application/vnd.ms-excel,${encodeURIComponent(`This is a demo ${report.title} Excel content`)}`;
        break;
      case 'word':
        demoUrl = `data:application/msword,${encodeURIComponent(`This is a demo ${report.title} Word content`)}`;
        break;
      default:
        demoUrl = `data:text/plain,${encodeURIComponent(`This is a demo ${report.title} text content`)}`;
    }
    
    // Show toast notification
    toast({
      title: "Downloading Report",
      description: `${report.title} (${report.type.toUpperCase()}) is being downloaded.`,
    });
    
    // Set up the download link
    link.href = demoUrl;
    link.download = `${report.title.replace(/\s+/g, '_')}.${report.type}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download Complete",
      description: `${report.title} has been downloaded successfully.`,
    });
  };

  const handleEditReport = (reportId: string) => {
    toast({
      title: "Edit Report",
      description: "Opening report editor...",
    });
  };

  const handleDeleteReport = (reportId: string) => {
    toast({
      title: "Delete Report",
      description: "Report has been deleted.",
    });
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

  const handleShareClick = (report: ReportItem) => {
    setSelectedReport(report);
    setShareDialogOpen(true);
  };

  const handleShareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedReport) return;
    
    toast({
      title: "Report Shared",
      description: `${selectedReport.title} has been shared with ${shareEmail || shareTeam + ' team'}.`,
    });
    
    setShareDialogOpen(false);
    setShareEmail('');
  };

  const shareOptions = [
    { value: 'cleanup', label: 'Cleanup Teams' },
    { value: 'government', label: 'Government Agencies' },
    { value: 'public', label: 'Public Access' }
  ];

  return (
    <div className="space-y-4">
      {reports.map(report => (
        <div 
          key={report.id} 
          className="flex flex-col sm:flex-row gap-4 border-b border-border pb-4 last:border-0 last:pb-0"
        >
          <div className="flex-shrink-0 w-full sm:w-32 h-24 bg-slate-200 dark:bg-slate-800 rounded-md flex items-center justify-center">
            <FileTypeIcon type={report.type} size="lg" />
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
            
            <div className="flex justify-end items-center mt-2 flex-wrap gap-2">
              {publisherMode && (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2 text-amber-600"
                    onClick={() => handleEditReport(report.id)}
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2 text-red-600"
                    onClick={() => handleDeleteReport(report.id)}
                  >
                    <Trash className="h-4 w-4" />
                    Delete
                  </Button>
                </>
              )}
              {(publisherMode || report.title.includes("Schedule") || report.title.includes("Plan")) && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={() => handleShareClick(report)}
                >
                  <Send className="h-4 w-4" />
                  Share
                </Button>
              )}
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

      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Report</DialogTitle>
            <DialogDescription>
              Share this report with team members or external contacts.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleShareSubmit} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="share-type">Share with</Label>
              <Select value={shareTeam} onValueChange={setShareTeam}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {shareOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Or share with specific email</Label>
              <Input 
                id="email"
                type="email"
                placeholder="Enter email address"
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShareDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Share Report
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReportsList;

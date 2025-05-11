
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download, FileText, Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GovernmentReportProps {
  riverName: string;
}

const GovernmentReport: React.FC<GovernmentReportProps> = ({ riverName = "All Rivers" }) => {
  const { toast } = useToast();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [reportToShare, setReportToShare] = useState('');
  const [teamToShare, setTeamToShare] = useState('cleanup');
  const [emailToShare, setEmailToShare] = useState('');

  const handleDownload = (reportType: string) => {
    toast({
      title: `Downloading ${reportType} Report`,
      description: `The ${reportType} report for ${riverName} is being generated and downloaded.`,
    });
  };
  
  const handleShareClick = (reportType: string) => {
    setReportToShare(reportType);
    setShareDialogOpen(true);
  };
  
  const handleShareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Report Shared",
      description: `The ${reportToShare} for ${riverName} has been shared with ${emailToShare || teamToShare + ' team'}.`,
    });
    
    setShareDialogOpen(false);
    setEmailToShare('');
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
        <h3 className="text-lg font-medium mb-2">Government Full Compliance Report</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Comprehensive analysis of water quality, policy effectiveness, and compliance metrics for {riverName}.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 bg-white dark:bg-background rounded-md border">
            <h4 className="font-medium text-sm">Water Quality Analysis</h4>
            <p className="text-xs text-muted-foreground mb-2">Detailed RWQI scores, trends and forecasts</p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 flex items-center justify-center"
                onClick={() => handleDownload("Water Quality Analysis")}
              >
                <FileText className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleShareClick("Water Quality Analysis")}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="p-3 bg-white dark:bg-background rounded-md border">
            <h4 className="font-medium text-sm">Environmental Compliance</h4>
            <p className="text-xs text-muted-foreground mb-2">Industrial discharge and regulation adherence</p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 flex items-center justify-center"
                onClick={() => handleDownload("Environmental Compliance")}
              >
                <FileText className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleShareClick("Environmental Compliance")}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="p-3 bg-white dark:bg-background rounded-md border">
            <h4 className="font-medium text-sm">Weather Impact Analysis</h4>
            <p className="text-xs text-muted-foreground mb-2">Correlation between weather patterns and water quality</p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 flex items-center justify-center"
                onClick={() => handleDownload("Weather Impact Analysis")}
              >
                <FileText className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleShareClick("Weather Impact Analysis")}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="p-3 bg-white dark:bg-background rounded-md border">
            <h4 className="font-medium text-sm">Full Compliance Summary</h4>
            <p className="text-xs text-muted-foreground mb-2">Executive summary with all key metrics</p>
            <div className="flex gap-2">
              <Button 
                variant="default" 
                size="sm" 
                className="flex-1 flex items-center justify-center"
                onClick={() => handleDownload("Full Compliance Summary")}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleShareClick("Full Compliance Summary")}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800">
        <h3 className="text-lg font-medium mb-2">Cleanup Planning and Coordination</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Manage and distribute cleanup schedules and resource allocation plans for {riverName}.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 bg-white dark:bg-background rounded-md border">
            <h4 className="font-medium text-sm">Monthly Cleanup Schedule</h4>
            <p className="text-xs text-muted-foreground mb-2">Schedule for upcoming cleanup operations</p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 flex items-center justify-center"
                onClick={() => handleDownload("Monthly Cleanup Schedule")}
              >
                <FileText className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleShareClick("Monthly Cleanup Schedule")}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="p-3 bg-white dark:bg-background rounded-md border">
            <h4 className="font-medium text-sm">Resource Allocation Plan</h4>
            <p className="text-xs text-muted-foreground mb-2">Equipment and personnel distribution</p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 flex items-center justify-center"
                onClick={() => handleDownload("Resource Allocation Plan")}
              >
                <FileText className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button 
                variant="default" 
                size="sm"
                onClick={() => handleShareClick("Resource Allocation Plan")}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium mb-2">Data Export Options</h3>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleDownload("Excel Data")}
          >
            Export to Excel
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleDownload("CSV Data")}
          >
            Export to CSV
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleDownload("API Data")}
          >
            API Documentation
          </Button>
        </div>
      </div>
      
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Report</DialogTitle>
            <DialogDescription>
              Share {reportToShare} for {riverName} with teams or specific contacts.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleShareSubmit} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="share-team">Share with team</Label>
              <Select value={teamToShare} onValueChange={setTeamToShare}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cleanup">Cleanup Teams</SelectItem>
                  <SelectItem value="government">Government Agencies</SelectItem>
                  <SelectItem value="public">Public Access</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Or share with specific email</Label>
              <Input 
                id="email"
                type="email"
                placeholder="Enter email address"
                value={emailToShare}
                onChange={(e) => setEmailToShare(e.target.value)}
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

export default GovernmentReport;

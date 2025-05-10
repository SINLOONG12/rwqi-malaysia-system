
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, FileText, Calendar } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface CleanupReportProps {
  riverName?: string;
}

const CleanupReport: React.FC<CleanupReportProps> = ({ riverName = "All Rivers" }) => {
  const { toast } = useToast();

  const handleDownload = (reportType: string) => {
    toast({
      title: `Downloading ${reportType}`,
      description: `The ${reportType} for ${riverName} is being generated and downloaded.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800">
        <h3 className="text-lg font-medium mb-2">Cleanup Schedule Report</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Operational planning, resource allocation, and timeline for cleanup activities at {riverName}.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 bg-white dark:bg-background rounded-md border">
            <h4 className="font-medium text-sm">Weekly Schedule</h4>
            <p className="text-xs text-muted-foreground mb-2">7-day operational plan with crew assignments</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-center"
              onClick={() => handleDownload("Weekly Schedule")}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Download Schedule
            </Button>
          </div>
          
          <div className="p-3 bg-white dark:bg-background rounded-md border">
            <h4 className="font-medium text-sm">Resource Allocation</h4>
            <p className="text-xs text-muted-foreground mb-2">Equipment and personnel distribution</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-center"
              onClick={() => handleDownload("Resource Allocation")}
            >
              <FileText className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
          
          <div className="p-3 bg-white dark:bg-background rounded-md border">
            <h4 className="font-medium text-sm">Site Analysis</h4>
            <p className="text-xs text-muted-foreground mb-2">Detailed pollution hotspots and access points</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-center"
              onClick={() => handleDownload("Site Analysis")}
            >
              <FileText className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
          
          <div className="p-3 bg-white dark:bg-background rounded-md border">
            <h4 className="font-medium text-sm">Comprehensive Plan</h4>
            <p className="text-xs text-muted-foreground mb-2">Complete operational document</p>
            <Button 
              variant="default" 
              size="sm" 
              className="w-full flex items-center justify-center"
              onClick={() => handleDownload("Comprehensive Plan")}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Full Report
            </Button>
          </div>
        </div>
      </div>
      
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium mb-2">Previous Operations</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center py-2 border-b">
            <div>
              <p className="font-medium">May 2025 Operation</p>
              <p className="text-sm text-muted-foreground">42 tons of waste removed</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleDownload("May 2025 Report")}
            >
              View Report
            </Button>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <div>
              <p className="font-medium">April 2025 Operation</p>
              <p className="text-sm text-muted-foreground">38 tons of waste removed</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleDownload("April 2025 Report")}
            >
              View Report
            </Button>
          </div>
          <div className="flex justify-between items-center py-2">
            <div>
              <p className="font-medium">March 2025 Operation</p>
              <p className="text-sm text-muted-foreground">45 tons of waste removed</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleDownload("March 2025 Report")}
            >
              View Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CleanupReport;

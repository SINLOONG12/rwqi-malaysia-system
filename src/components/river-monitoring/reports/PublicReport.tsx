import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, FileText, Info } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface PublicReportProps {
  riverName: string;
}

const PublicReport: React.FC<PublicReportProps> = ({ riverName }) => {
  const { toast } = useToast();

  const handleDownload = (reportType: string) => {
    toast({
      title: `Downloading ${reportType}`,
      description: `The ${reportType} for ${riverName} is being generated and downloaded.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800">
        <h3 className="text-lg font-medium mb-2">Public Water Quality Report</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Simplified water quality information and safety guidelines for {riverName}.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 bg-white dark:bg-background rounded-md border">
            <h4 className="font-medium text-sm">Water Quality Summary</h4>
            <p className="text-xs text-muted-foreground mb-2">Safe recreational usage assessment</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-center"
              onClick={() => handleDownload("Water Quality Summary")}
            >
              <FileText className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
          
          <div className="p-3 bg-white dark:bg-background rounded-md border">
            <h4 className="font-medium text-sm">Safety Guidelines</h4>
            <p className="text-xs text-muted-foreground mb-2">Recommendations for riverside activities</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-center"
              onClick={() => handleDownload("Safety Guidelines")}
            >
              <Info className="h-4 w-4 mr-2" />
              Download Guidelines
            </Button>
          </div>
          
          <div className="p-3 bg-white dark:bg-background rounded-md border">
            <h4 className="font-medium text-sm">Monthly Trends</h4>
            <p className="text-xs text-muted-foreground mb-2">Simplified water quality trends</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-center"
              onClick={() => handleDownload("Monthly Trends")}
            >
              <FileText className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </div>
          
          <div className="p-3 bg-white dark:bg-background rounded-md border">
            <h4 className="font-medium text-sm">Complete Public Report</h4>
            <p className="text-xs text-muted-foreground mb-2">All public water quality information</p>
            <Button 
              variant="default" 
              size="sm" 
              className="w-full flex items-center justify-center"
              onClick={() => handleDownload("Complete Public Report")}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Full Report
            </Button>
          </div>
        </div>
      </div>
      
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium mb-2">Get Involved</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Learn how you can contribute to keeping our rivers clean and healthy.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleDownload("Volunteer Guide")}
          >
            Volunteer Guide
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleDownload("Educational Materials")}
          >
            Educational Materials
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleDownload("Reporting Guide")}
          >
            How to Report Pollution
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PublicReport;

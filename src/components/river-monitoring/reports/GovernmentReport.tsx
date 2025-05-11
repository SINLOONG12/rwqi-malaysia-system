
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, FileText } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface GovernmentReportProps {
  riverName: string;
}

const GovernmentReport: React.FC<GovernmentReportProps> = ({ riverName = "All Rivers" }) => {
  const { toast } = useToast();

  const handleDownload = (reportType: string) => {
    toast({
      title: `Downloading ${reportType} Report`,
      description: `The ${reportType} report for ${riverName} is being generated and downloaded.`,
    });
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
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-center"
              onClick={() => handleDownload("Water Quality Analysis")}
            >
              <FileText className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
          
          <div className="p-3 bg-white dark:bg-background rounded-md border">
            <h4 className="font-medium text-sm">Environmental Compliance</h4>
            <p className="text-xs text-muted-foreground mb-2">Industrial discharge and regulation adherence</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-center"
              onClick={() => handleDownload("Environmental Compliance")}
            >
              <FileText className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
          
          <div className="p-3 bg-white dark:bg-background rounded-md border">
            <h4 className="font-medium text-sm">Weather Impact Analysis</h4>
            <p className="text-xs text-muted-foreground mb-2">Correlation between weather patterns and water quality</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-center"
              onClick={() => handleDownload("Weather Impact Analysis")}
            >
              <FileText className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
          
          <div className="p-3 bg-white dark:bg-background rounded-md border">
            <h4 className="font-medium text-sm">Full Compliance Summary</h4>
            <p className="text-xs text-muted-foreground mb-2">Executive summary with all key metrics</p>
            <Button 
              variant="default" 
              size="sm" 
              className="w-full flex items-center justify-center"
              onClick={() => handleDownload("Full Compliance Summary")}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Full Report
            </Button>
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
    </div>
  );
};

export default GovernmentReport;


import React from 'react';
import { History } from 'lucide-react';
import RiverQualityTrendChart from '@/components/river-monitoring/RiverQualityTrendChart';
import RiverQualityDataTable from '@/components/river-monitoring/RiverQualityDataTable';

interface HistoricalDataTabProps {
  onDownloadReport: () => void;
}

const HistoricalDataTab: React.FC<HistoricalDataTabProps> = ({ onDownloadReport }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center text-2xl font-semibold">
          <History className="h-5 w-5 mr-2 text-blue-600" />
          Historical River Quality Trends
        </h3>
      </div>
      
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
        <h3 className="font-medium mb-3">Data Access Options</h3>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-sm" 
            onClick={onDownloadReport}>
            Download CSV
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-sm" 
            onClick={onDownloadReport}>
            Download PDF Report
          </button>
          <button className="px-4 py-2 bg-background border rounded-lg text-sm font-medium hover:bg-muted/50 transition-colors flex items-center gap-2">
            API Access
          </button>
          <button className="px-4 py-2 bg-background border rounded-lg text-sm font-medium hover:bg-muted/50 transition-colors flex items-center gap-2">
            Raw Sensor Data
          </button>
        </div>
      </div>
      
      <div className="bg-card rounded-xl border p-6 shadow-sm">
        <RiverQualityTrendChart />
      </div>
      
      <div className="bg-card rounded-xl border p-6 shadow-sm">
        <RiverQualityDataTable />
      </div>
    </div>
  );
};

export default HistoricalDataTab;

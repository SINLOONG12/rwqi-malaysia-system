import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChartBar,
  Map,
  Bell,
  Database,
  History,
} from 'lucide-react';
import { riverQualityData } from '@/utils/riverData';
import { useToast } from "@/hooks/use-toast";
import RoleSelector from '@/components/river-monitoring/RoleSelector';
import OverviewTab from '@/components/river-monitoring/OverviewTab';
import RiverMonitoringMap from '@/components/river-monitoring/RiverMonitoringMap';
import AlertsNotifications from '@/components/river-monitoring/AlertsNotifications';
import PredictiveAnalytics from '@/components/river-monitoring/PredictiveAnalytics';
import RiverQualityTrendChart from '@/components/river-monitoring/RiverQualityTrendChart';
import RiverQualityDataTable from '@/components/river-monitoring/RiverQualityDataTable';

const RiverMonitoringPage: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [userRole, setUserRole] = useState<"government" | "cleanup" | "public">("government");
  
  // Get today's data (using the latest date available)
  const latestDate = riverQualityData.reduce((latest, current) => {
    return new Date(current.date) > new Date(latest.date) ? current : latest;
  }, riverQualityData[0]);

  // Get worst location data from latest date
  const lowestRwqiLocation = riverQualityData
    .filter(data => data.date === latestDate.date)
    .reduce((lowest, current) => {
      return current.rwqiScore < lowest.rwqiScore ? current : lowest;
    });

  // Simulate downloading a report
  const handleDownloadReport = () => {
    toast({
      title: "Report Downloaded",
      description: "The river quality report has been downloaded successfully.",
    });
  };

  // Simulate submitting feedback
  const handleSubmitFeedback = () => {
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback! It helps improve our AI models.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Malaysian River Water Quality Index</h1>
          <p className="text-muted-foreground">Real-time monitoring of river conditions and pollution detection across Malaysia.</p>
        </div>
        
        <RoleSelector userRole={userRole} setUserRole={setUserRole} />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="overview">
            <ChartBar className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="map">
            <Map className="h-4 w-4 mr-2" />
            Interactive Map
          </TabsTrigger>
          <TabsTrigger value="alerts">
            <Bell className="h-4 w-4 mr-2" />
            Alerts & Notifications
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <Database className="h-4 w-4 mr-2" />
            Advanced Analytics
          </TabsTrigger>
          <TabsTrigger value="historical">
            <History className="h-4 w-4 mr-2" />
            Historical Data
          </TabsTrigger>
        </TabsList>
        
        {/* Overview Tab Content */}
        <TabsContent value="overview">
          <OverviewTab 
            userRole={userRole}
            lowestRwqiLocation={lowestRwqiLocation}
            latestDate={latestDate}
            onDownloadReport={handleDownloadReport}
            onSubmitFeedback={handleSubmitFeedback}
          />
        </TabsContent>
        
        {/* Map Tab Content */}
        <TabsContent value="map">
          <RiverMonitoringMap userRole={userRole} />
        </TabsContent>
        
        {/* Alerts Tab Content */}
        <TabsContent value="alerts">
          <AlertsNotifications userRole={userRole} />
        </TabsContent>
        
        {/* Analytics Tab Content */}
        <TabsContent value="analytics">
          <PredictiveAnalytics userRole={userRole} />
        </TabsContent>
        
        {/* Historical Data Tab Content */}
        <TabsContent value="historical">
          <HistoricalDataTab onDownloadReport={handleDownloadReport} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// We'll keep the HistoricalDataTab component inline since it's relatively simple
const HistoricalDataTab: React.FC<{ onDownloadReport: () => void }> = ({ onDownloadReport }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="flex items-center text-2xl font-semibold leading-none tracking-tight">
          <History className="h-5 w-5 mr-2" />
          Historical River Quality Trends
        </h3>
      </div>
      <div className="card-content p-6 space-y-6">
        <div className="p-4 bg-muted rounded-md">
          <h3 className="font-medium mb-2">Data Access Options</h3>
          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm" onClick={onDownloadReport}>Download CSV</button>
            <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm" onClick={onDownloadReport}>Download PDF Report</button>
            <button className="px-3 py-1 border rounded text-sm">API Access</button>
            <button className="px-3 py-1 border rounded text-sm">Raw Sensor Data</button>
          </div>
        </div>
        <RiverQualityTrendChart />
        <RiverQualityDataTable />
      </div>
    </div>
  );
};

export default RiverMonitoringPage;

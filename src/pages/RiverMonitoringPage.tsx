
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChartBar,
  Map,
  Bell,
  Database,
  History,
  FileText
} from 'lucide-react';
import { riverQualityData } from '@/utils/riverData';
import { useToast } from "@/hooks/use-toast";
import RoleSelector from '@/components/river-monitoring/RoleSelector';
import OverviewTab from '@/components/river-monitoring/OverviewTab';
import RiverMonitoringMap from '@/components/river-monitoring/RiverMonitoringMap';
import MalaysiaRiversMap from '@/components/river-monitoring/MalaysiaRiversMap';
import AlertsNotifications from '@/components/river-monitoring/AlertsNotifications';
import PredictiveAnalytics from '@/components/river-monitoring/PredictiveAnalytics';
import RiverQualityTrendChart from '@/components/river-monitoring/RiverQualityTrendChart';
import RiverQualityDataTable from '@/components/river-monitoring/RiverQualityDataTable';
import ReportGenerator from '@/components/river-monitoring/ReportGenerator';

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

  // Handle quick action navigation
  const handleQuickAction = (tabId: string) => {
    setActiveTab(tabId);
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

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2">
        <button 
          className="bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 p-3 rounded-md flex flex-col items-center text-xs font-medium hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors"
          onClick={() => handleQuickAction("map")}
        >
          <Map className="h-5 w-5 mb-1" />
          View Map
        </button>
        <button 
          className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-3 rounded-md flex flex-col items-center text-xs font-medium hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors"
          onClick={() => handleQuickAction("alerts")}
        >
          <Bell className="h-5 w-5 mb-1" />
          Alerts
        </button>
        <button 
          className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 p-3 rounded-md flex flex-col items-center text-xs font-medium hover:bg-green-200 dark:hover:bg-green-900/40 transition-colors"
          onClick={() => handleQuickAction("historical")}
        >
          <History className="h-5 w-5 mb-1" />
          Historical Data
        </button>
        <button 
          className="bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 p-3 rounded-md flex flex-col items-center text-xs font-medium hover:bg-purple-200 dark:hover:bg-purple-900/40 transition-colors"
          onClick={() => handleQuickAction("analytics")}
        >
          <Database className="h-5 w-5 mb-1" />
          Analytics
        </button>
        <button 
          className="bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 p-3 rounded-md flex flex-col items-center text-xs font-medium hover:bg-amber-200 dark:hover:bg-amber-900/40 transition-colors"
          onClick={() => handleQuickAction("reports")}
        >
          <FileText className="h-5 w-5 mb-1" />
          Reports
        </button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-6 mb-8">
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
            Alerts
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <Database className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="historical">
            <History className="h-4 w-4 mr-2" />
            Historical Data
          </TabsTrigger>
          <TabsTrigger value="reports">
            <FileText className="h-4 w-4 mr-2" />
            Reports
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
          <div className="space-y-6">
            <MalaysiaRiversMap userRole={userRole} />
            <RiverMonitoringMap userRole={userRole} />
          </div>
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

        {/* Reports Tab Content */}
        <TabsContent value="reports">
          <ReportGenerator userRole={userRole} />
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

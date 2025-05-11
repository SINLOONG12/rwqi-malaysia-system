
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

// Define a type for all possible user roles
type UserRole = "government" | "cleanup" | "public" | "publisher";

const RiverMonitoringPage: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [userRole, setUserRole] = useState<UserRole>("government");
  
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
    <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
            Malaysian River Water Quality Index
          </h1>
          <p className="text-muted-foreground mt-2">
            Real-time monitoring of river conditions and pollution detection across Malaysia
          </p>
        </div>
        
        <RoleSelector userRole={userRole} setUserRole={setUserRole} />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
        <button 
          className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 text-blue-700 dark:text-blue-300 p-4 rounded-xl flex flex-col items-center text-xs font-medium hover:shadow-md transition-all"
          onClick={() => handleQuickAction("map")}
        >
          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mb-2">
            <Map className="h-5 w-5" />
          </div>
          View Map
        </button>
        <button 
          className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 text-red-700 dark:text-red-300 p-4 rounded-xl flex flex-col items-center text-xs font-medium hover:shadow-md transition-all"
          onClick={() => handleQuickAction("alerts")}
        >
          <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg mb-2">
            <Bell className="h-5 w-5" />
          </div>
          Alerts
        </button>
        <button 
          className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 text-green-700 dark:text-green-300 p-4 rounded-xl flex flex-col items-center text-xs font-medium hover:shadow-md transition-all"
          onClick={() => handleQuickAction("historical")}
        >
          <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg mb-2">
            <History className="h-5 w-5" />
          </div>
          Historical Data
        </button>
        <button 
          className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 text-purple-700 dark:text-purple-300 p-4 rounded-xl flex flex-col items-center text-xs font-medium hover:shadow-md transition-all"
          onClick={() => handleQuickAction("analytics")}
        >
          <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg mb-2">
            <Database className="h-5 w-5" />
          </div>
          Analytics
        </button>
        <button 
          className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 text-amber-700 dark:text-amber-300 p-4 rounded-xl flex flex-col items-center text-xs font-medium hover:shadow-md transition-all"
          onClick={() => handleQuickAction("reports")}
        >
          <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg mb-2">
            <FileText className="h-5 w-5" />
          </div>
          Reports
        </button>
      </div>

      <div className="bg-card rounded-xl shadow-sm border">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-muted/50 p-1 rounded-t-xl grid grid-cols-6 h-auto">
            <TabsTrigger value="overview" className="flex items-center gap-2 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <ChartBar className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Map className="h-4 w-4" />
              <span>Interactive Map</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Bell className="h-4 w-4" />
              <span>Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Database className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="historical" className="flex items-center gap-2 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <History className="h-4 w-4" />
              <span>Historical Data</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <FileText className="h-4 w-4" />
              <span>Reports</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="p-6">
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
              <div className="space-y-8">
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
          </div>
        </Tabs>
      </div>
    </div>
  );
};

// We'll keep the HistoricalDataTab component inline since it's relatively simple
const HistoricalDataTab: React.FC<{ onDownloadReport: () => void }> = ({ onDownloadReport }) => {
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

export default RiverMonitoringPage;

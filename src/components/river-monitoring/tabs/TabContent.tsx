
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartBar, Map, Bell, Database, History, FileText } from 'lucide-react';
import OverviewTab from '@/components/river-monitoring/OverviewTab';
import AlertsNotifications from '@/components/river-monitoring/AlertsNotifications';
import PredictiveAnalytics from '@/components/river-monitoring/PredictiveAnalytics';
import ReportGenerator from '@/components/river-monitoring/ReportGenerator';
import MalaysiaRiversMap from '@/components/river-monitoring/MalaysiaRiversMap';
import RiverMonitoringMap from '@/components/river-monitoring/RiverMonitoringMap';
import HistoricalDataTab from '@/components/river-monitoring/tabs/HistoricalDataTab';

interface TabContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: "government" | "cleanup" | "public" | "publisher";
  lowestRwqiLocation: any;
  latestDate: any;
  onDownloadReport: () => void;
  onSubmitFeedback: () => void;
}

const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  lowestRwqiLocation,
  latestDate,
  onDownloadReport,
  onSubmitFeedback
}) => {
  return (
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
          <TabsContent value="overview" data-tab="overview">
            <OverviewTab 
              userRole={userRole}
              lowestRwqiLocation={lowestRwqiLocation}
              latestDate={latestDate}
              onDownloadReport={onDownloadReport}
              onSubmitFeedback={onSubmitFeedback}
            />
          </TabsContent>
          
          {/* Map Tab Content */}
          <TabsContent value="map" data-tab="map">
            <div className="space-y-8">
              <MalaysiaRiversMap userRole={userRole} />
              <RiverMonitoringMap userRole={userRole} />
            </div>
          </TabsContent>
          
          {/* Alerts Tab Content */}
          <TabsContent value="alerts" data-tab="alerts">
            <AlertsNotifications userRole={userRole} />
          </TabsContent>
          
          {/* Analytics Tab Content */}
          <TabsContent value="analytics" data-tab="analytics">
            <PredictiveAnalytics userRole={userRole} />
          </TabsContent>
          
          {/* Historical Data Tab Content */}
          <TabsContent value="historical" data-tab="historical">
            <HistoricalDataTab onDownloadReport={onDownloadReport} />
          </TabsContent>

          {/* Reports Tab Content */}
          <TabsContent value="reports" data-tab="reports">
            <ReportGenerator userRole={userRole} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default TabContent;


import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from 'react-router-dom';
import LiveCameraFeeds from "@/components/data-collection/LiveCameraFeeds";
import SensorDataInputs from "@/components/data-collection/SensorDataInputs";
import UserUploads from "@/components/data-collection/UserUploads";
import WeatherDataIntegration from "@/components/data-collection/WeatherDataIntegration";
import PublisherDashboard from "@/components/data-collection/PublisherDashboard";
import ContactsManagement from "@/components/data-collection/ContactsManagement";
import { useToast } from "@/hooks/use-toast";
import RoleSelector from "@/components/river-monitoring/RoleSelector";
import NotificationCenter from '@/components/notifications/NotificationCenter';
import LiveCameraFeedAnalysis from '@/components/data-collection/LiveCameraFeedAnalysis';

// Define user role type
type UserRole = "government" | "cleanup" | "public" | "publisher";

const DataCollectionPage: React.FC = () => {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || "camera-feeds";
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const [userRole, setUserRole] = useState<UserRole>("public");
  
  // If camera-id param is provided, automatically show camera analysis
  const [selectedCameraId, setSelectedCameraId] = useState<string | null>(
    searchParams.get('camera-id')
  );
  
  useEffect(() => {
    // Update URL when tab changes
    setSearchParams({ tab: activeTab });
  }, [activeTab, setSearchParams]);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  // Handle notification click - direct to appropriate section
  const handleNotificationClick = (notification: any) => {
    if (notification.type === "camera" && notification.cameraId) {
      setActiveTab("camera-feeds");
      setSelectedCameraId(notification.cameraId);
      
      toast({
        title: "Camera Alert",
        description: `Viewing camera ${notification.cameraId} at ${notification.riverName}`
      });
    } 
    else if (notification.type === "report") {
      setActiveTab("user-uploads");
      
      toast({
        title: "Report Update",
        description: `View details for report ${notification.reportId}`
      });
    }
  };
  
  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-500">
              Data Collection Integration
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage and integrate various data sources for comprehensive river monitoring
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <NotificationCenter 
              userRole={userRole} 
              onNotificationClick={handleNotificationClick}
            />
            <RoleSelector userRole={userRole} setUserRole={setUserRole} />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-sm border p-1">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-6 mb-6 bg-muted/50 p-1 rounded-lg">
            <TabsTrigger value="camera-feeds" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
              Live Camera Feeds
            </TabsTrigger>
            <TabsTrigger value="sensor-data" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
              Sensor Data
            </TabsTrigger>
            <TabsTrigger value="user-uploads" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
              Community Contributions
            </TabsTrigger>
            <TabsTrigger value="weather-data" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
              Weather Data
            </TabsTrigger>
            <TabsTrigger value="contacts" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
              Contacts
            </TabsTrigger>
            {userRole === "publisher" && (
              <TabsTrigger value="publisher-dashboard" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
                Publisher Dashboard
              </TabsTrigger>
            )}
          </TabsList>
          
          <div className="p-4">
            <TabsContent value="camera-feeds">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main camera feeds section */}
                <div className={selectedCameraId ? "lg:col-span-2" : "lg:col-span-3"}>
                  <LiveCameraFeeds publisherMode={userRole === "publisher"} />
                </div>
                
                {/* Camera analysis section - only show when a camera is selected */}
                {selectedCameraId && (
                  <div className="lg:col-span-1">
                    <LiveCameraFeedAnalysis 
                      cameraId={selectedCameraId}
                      location={selectedCameraId === "cam-001" ? "Sungai Klang" : 
                                selectedCameraId === "cam-002" ? "Sungai Pinang" : 
                                "Sungai Langat"}
                      flowData={[]}
                    />
                    <div className="mt-4">
                      <button 
                        className="w-full px-4 py-2 text-sm text-muted-foreground border rounded-md hover:bg-muted"
                        onClick={() => setSelectedCameraId(null)}
                      >
                        Close Analysis
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="sensor-data">
              <SensorDataInputs />
            </TabsContent>
            
            <TabsContent value="user-uploads">
              <UserUploads publisherMode={userRole === "publisher"} />
            </TabsContent>
            
            <TabsContent value="weather-data">
              <WeatherDataIntegration />
            </TabsContent>
            
            <TabsContent value="contacts">
              <ContactsManagement />
            </TabsContent>
            
            {userRole === "publisher" && (
              <TabsContent value="publisher-dashboard">
                <PublisherDashboard />
              </TabsContent>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default DataCollectionPage;

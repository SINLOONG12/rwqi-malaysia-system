
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from 'react-router-dom';
import LiveCameraFeeds from "@/components/data-collection/LiveCameraFeeds";
import SensorDataInputs from "@/components/data-collection/SensorDataInputs";
import UserUploads from "@/components/data-collection/UserUploads";
import WeatherDataIntegration from "@/components/data-collection/WeatherDataIntegration";
import { useToast } from "@/hooks/use-toast";

const DataCollectionPage: React.FC = () => {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || "camera-feeds";
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  
  useEffect(() => {
    // Update URL when tab changes
    setSearchParams({ tab: activeTab });
  }, [activeTab, setSearchParams]);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-500">
          Data Collection Integration
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage and integrate various data sources for comprehensive river monitoring
        </p>
      </div>

      <div className="bg-card rounded-xl shadow-sm border p-1">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6 bg-muted/50 p-1 rounded-lg">
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
          </TabsList>
          
          <div className="p-4">
            <TabsContent value="camera-feeds">
              <LiveCameraFeeds />
            </TabsContent>
            
            <TabsContent value="sensor-data">
              <SensorDataInputs />
            </TabsContent>
            
            <TabsContent value="user-uploads">
              <UserUploads />
            </TabsContent>
            
            <TabsContent value="weather-data">
              <WeatherDataIntegration />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default DataCollectionPage;

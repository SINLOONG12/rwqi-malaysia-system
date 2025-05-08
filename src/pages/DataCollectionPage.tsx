
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LiveCameraFeeds from "@/components/data-collection/LiveCameraFeeds";
import SensorDataInputs from "@/components/data-collection/SensorDataInputs";
import UserUploads from "@/components/data-collection/UserUploads";
import WeatherDataIntegration from "@/components/data-collection/WeatherDataIntegration";
import { useToast } from "@/hooks/use-toast";

const DataCollectionPage: React.FC = () => {
  const { toast } = useToast();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Data Collection Integration</h1>
        <p className="text-muted-foreground">Manage and integrate various data sources for river monitoring.</p>
      </div>

      <Tabs defaultValue="camera-feeds" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="camera-feeds">Live Camera Feeds</TabsTrigger>
          <TabsTrigger value="sensor-data">Sensor Data</TabsTrigger>
          <TabsTrigger value="user-uploads">User Uploads</TabsTrigger>
          <TabsTrigger value="weather-data">Weather Data</TabsTrigger>
        </TabsList>
        
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
      </Tabs>
    </div>
  );
};

export default DataCollectionPage;

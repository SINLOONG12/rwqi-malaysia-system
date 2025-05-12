
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FlowData {
  timestamp: string;
  flowRate: number; // cubic meters per second
  waterHeight: number; // meters
  magnitude: string; // "low", "medium", "high", "critical"
  longitude: number;
  latitude: number;
}

interface LiveCameraFeedAnalysisProps {
  cameraId: string;
  location: string;
  flowData: FlowData[];
}

const mockFlowData: Record<string, FlowData[]> = {
  "cam-001": [
    { 
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), 
      flowRate: 12.3,
      waterHeight: 1.2,
      magnitude: "medium",
      longitude: 101.693207,
      latitude: 3.140853
    },
    { 
      timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(), 
      flowRate: 12.1,
      waterHeight: 1.1,
      magnitude: "medium",
      longitude: 101.693207,
      latitude: 3.140853
    },
    { 
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), 
      flowRate: 11.8,
      waterHeight: 1.0,
      magnitude: "medium",
      longitude: 101.693207,
      latitude: 3.140853
    },
  ],
  "cam-002": [
    { 
      timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(), 
      flowRate: 7.2,
      waterHeight: 0.8,
      magnitude: "low",
      longitude: 100.3292,
      latitude: 5.4164
    },
    { 
      timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(), 
      flowRate: 7.0,
      waterHeight: 0.8,
      magnitude: "low",
      longitude: 100.3292,
      latitude: 5.4164
    },
    { 
      timestamp: new Date(Date.now() - 1000 * 60 * 13).toISOString(), 
      flowRate: 6.8,
      waterHeight: 0.7,
      magnitude: "low",
      longitude: 100.3292,
      latitude: 5.4164
    },
  ],
  "cam-003": [
    { 
      timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(), 
      flowRate: 24.5,
      waterHeight: 2.3,
      magnitude: "high",
      longitude: 102.2655,
      latitude: 2.2047
    },
    { 
      timestamp: new Date(Date.now() - 1000 * 60 * 7).toISOString(), 
      flowRate: 23.8,
      waterHeight: 2.2,
      magnitude: "high",
      longitude: 102.2655,
      latitude: 2.2047
    },
    { 
      timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(), 
      flowRate: 22.9,
      waterHeight: 2.1,
      magnitude: "high",
      longitude: 102.2655,
      latitude: 2.2047
    },
  ],
};

const getMagnitudeColor = (magnitude: string): string => {
  switch (magnitude) {
    case "low": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "high": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
    case "critical": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default: return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
  }
};

const LiveCameraFeedAnalysis: React.FC<LiveCameraFeedAnalysisProps> = ({
  cameraId,
  location,
  flowData: providedFlowData
}) => {
  // Use provided flow data or mock data
  const flowData = providedFlowData || mockFlowData[cameraId] || [];
  
  // Get latest data
  const latestData = flowData.length > 0 ? flowData[0] : null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-md font-semibold">{location} Analytics</CardTitle>
            <CardDescription>Real-time water flow data analysis</CardDescription>
          </div>
          {latestData && (
            <Badge className={getMagnitudeColor(latestData.magnitude)}>
              {latestData.magnitude.charAt(0).toUpperCase() + latestData.magnitude.slice(1)} Flow
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="flow" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="flow">Flow Data</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="flow" className="space-y-4">
            {latestData ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Flow Rate</p>
                  <p className="text-xl font-semibold">
                    {latestData.flowRate} <span className="text-sm font-normal text-muted-foreground">m³/s</span>
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Water Height</p>
                  <p className="text-xl font-semibold">
                    {latestData.waterHeight} <span className="text-sm font-normal text-muted-foreground">m</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">No flow data available</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="location">
            {latestData ? (
              <div className="space-y-2">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Coordinates</p>
                  <p className="text-md">
                    {latestData.latitude.toFixed(4)}°N, {latestData.longitude.toFixed(4)}°E
                  </p>
                </div>
                <div className="h-36 bg-muted/50 rounded-md flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Map View</p>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">Location data unavailable</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="history">
            {flowData.length > 0 ? (
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground mb-2">Recent measurements</div>
                <div className="space-y-2">
                  {flowData.map((data, index) => (
                    <div key={index} className="flex justify-between items-center py-1 border-b border-muted last:border-0">
                      <div>
                        <p className="text-sm">{new Date(data.timestamp).toLocaleTimeString()}</p>
                        <p className="text-xs text-muted-foreground">
                          Flow: {data.flowRate} m³/s, Height: {data.waterHeight} m
                        </p>
                      </div>
                      <Badge className={getMagnitudeColor(data.magnitude)}>
                        {data.magnitude}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">No historical data available</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LiveCameraFeedAnalysis;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Map, 
  MapPin, 
  Layers, 
  AlertTriangle,
  Trash2,  
  Droplet
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { riverQualityData, getRwqiColor } from '@/utils/riverData';

interface RiverMonitoringMapProps {
  userRole: "government" | "cleanup" | "public";
}

const RiverMonitoringMap: React.FC<RiverMonitoringMapProps> = ({ userRole }) => {
  const [mapLayer, setMapLayer] = useState<"pollution" | "cleanup" | "sensors">("pollution");
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
          <CardTitle className="flex items-center">
            <Map className="h-5 w-5 mr-2" />
            River Quality Geolocation Map
          </CardTitle>
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant={mapLayer === "pollution" ? "default" : "outline"} 
              onClick={() => setMapLayer("pollution")}
              className="flex items-center"
            >
              <Droplet className="h-4 w-4 mr-1" />
              <span>Pollution</span>
            </Button>
            <Button 
              size="sm" 
              variant={mapLayer === "cleanup" ? "default" : "outline"} 
              onClick={() => setMapLayer("cleanup")}
              className="flex items-center"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              <span>Cleanup</span>
            </Button>
            <Button 
              size="sm" 
              variant={mapLayer === "sensors" ? "default" : "outline"} 
              onClick={() => setMapLayer("sensors")}
              className="flex items-center"
            >
              <Layers className="h-4 w-4 mr-1" />
              <span>Sensors</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Map placeholder - in a real app, this would be an interactive map */}
        <div className="relative overflow-hidden rounded-lg border border-muted bg-muted/50 h-[500px] w-full">
          {/* Placeholder for interactive map */}
          <div className="flex h-full flex-col items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <Map className="h-16 w-16 text-muted-foreground/50" />
              <div className="text-center space-y-1">
                <p className="font-medium text-muted-foreground">Interactive Malaysian River Monitoring Map</p>
                <p className="text-sm text-muted-foreground">Currently showing: {mapLayer === "pollution" ? "Pollution Hotspots" : mapLayer === "cleanup" ? "Cleanup Activities" : "Sensor Locations"}</p>
              </div>
            </div>
            
            {/* Sample map markers */}
            <div className="absolute left-1/4 top-1/3">
              <div className="relative">
                <MapPin className={`h-8 w-8 ${mapLayer === "pollution" ? "text-red-500" : mapLayer === "cleanup" ? "text-green-500" : "text-blue-500"}`} />
                <div className="absolute -bottom-12 -left-24 w-48">
                  <div className="bg-background p-2 rounded shadow-lg text-xs border">
                    <p className="font-bold">Sungai Juru (Penang)</p>
                    <p>RWQI Score: 0.35</p>
                    {mapLayer === "pollution" && (
                      <Badge variant="destructive" className="mt-1">Critical Alert</Badge>
                    )}
                    {mapLayer === "cleanup" && (
                      <Badge variant="outline" className="mt-1 border-green-500 text-green-500">Cleanup in progress</Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute right-1/3 bottom-1/4">
              <div className="relative">
                <MapPin className={`h-8 w-8 ${mapLayer === "pollution" ? "text-orange-500" : mapLayer === "cleanup" ? "text-green-500" : "text-blue-500"}`} />
                <div className="absolute -top-12 -left-24 w-48">
                  <div className="bg-background p-2 rounded shadow-lg text-xs border">
                    <p className="font-bold">Sungai Klang (KL)</p>
                    <p>RWQI Score: 0.43</p>
                    {mapLayer === "pollution" && (
                      <Badge variant="outline" className="mt-1 border-orange-500 text-orange-500">Warning</Badge>
                    )}
                    {mapLayer === "cleanup" && (
                      <Badge variant="outline" className="mt-1">Scheduled</Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map information panel - customized for user role */}
        <div className="mt-4">
          {userRole === "cleanup" && (
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-dashboard-orange" />
                Cleanup Priority Areas
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Sungai Juru (Penang)</p>
                    <p className="text-sm text-muted-foreground">Trash detected: High, Oil slicks observed</p>
                  </div>
                  <div>
                    <Badge variant="destructive" className="ml-2">High Priority</Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Sungai Klang (KL)</p>
                    <p className="text-sm text-muted-foreground">Plastic waste accumulation, fluctuating pH</p>
                  </div>
                  <div>
                    <Badge variant="outline" className="border-orange-500 text-orange-500">Medium Priority</Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <div>
                    <p className="font-medium">Sungai Langat (Selangor)</p>
                    <p className="text-sm text-muted-foreground">Industrial discharge detected</p>
                  </div>
                  <div>
                    <Badge variant="outline" className="border-orange-500 text-orange-500">Medium Priority</Badge>
                  </div>
                </div>
              </div>
            </div>
          )}

          {userRole === "government" && (
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">Regional Compliance Overview</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3 bg-red-50 rounded-lg">
                  <p className="text-red-700 font-medium">Critical Regions</p>
                  <p className="text-2xl font-bold text-red-700">3</p>
                  <p className="text-sm text-red-600">Immediate intervention required</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-orange-700 font-medium">Warning Regions</p>
                  <p className="text-2xl font-bold text-orange-700">7</p>
                  <p className="text-sm text-orange-600">Close monitoring needed</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-green-700 font-medium">Compliant Regions</p>
                  <p className="text-2xl font-bold text-green-700">24</p>
                  <p className="text-sm text-green-600">Meeting quality standards</p>
                </div>
              </div>
            </div>
          )}

          {userRole === "public" && (
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">River Health Near You</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Learn about the water quality in rivers near your location and how you can help protect them.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button variant="outline" className="flex items-center justify-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Find Rivers Near Me
                </Button>
                <Button variant="outline" className="flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Report Pollution
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RiverMonitoringMap;

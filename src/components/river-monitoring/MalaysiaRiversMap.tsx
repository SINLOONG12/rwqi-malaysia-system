
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "@/components/ui/dropdown-menu";
import { MapPin, Filter } from 'lucide-react';
import { getRwqiColor, getUniqueLocations } from '@/utils/riverData';

interface MalaysiaRiversMapProps {
  userRole: "government" | "cleanup" | "public";
  onRiverSelect?: (riverName: string) => void;
}

const MalaysiaRiversMap: React.FC<MalaysiaRiversMapProps> = ({ userRole, onRiverSelect }) => {
  const [filterType, setFilterType] = useState<"all" | "critical" | "warning" | "good">("all");
  const allRivers = getUniqueLocations();

  // These coordinates are approximate for demonstration
  // In a real app, you would have exact GPS coordinates for each river
  const riverCoordinates: Record<string, { x: number, y: number, status: "critical" | "warning" | "good" }> = {
    "Sungai Klang (Kuala Lumpur)": { x: 50, y: 45, status: "warning" },
    "Sungai Gombak (Kuala Lumpur)": { x: 52, y: 42, status: "critical" },
    "Sungai Pinang (Penang)": { x: 38, y: 22, status: "warning" },
    "Sungai Kelantan (Kelantan)": { x: 75, y: 25, status: "warning" },
    "Sungai Perak (Perak)": { x: 45, y: 35, status: "good" },
    "Sungai Selangor (Selangor)": { x: 48, y: 48, status: "good" },
    "Sungai Pahang (Pahang)": { x: 65, y: 45, status: "good" },
    "Sungai Johor (Johor)": { x: 58, y: 75, status: "warning" },
    "Sungai Muar (Johor)": { x: 55, y: 70, status: "warning" },
    "Sungai Linggi (N. Sembilan)": { x: 53, y: 60, status: "warning" },
    "Sungai Langat (Selangor)": { x: 51, y: 50, status: "warning" },
    "Sungai Kedah (Kedah)": { x: 38, y: 18, status: "good" },
    "Sungai Melaka (Melaka)": { x: 48, y: 65, status: "warning" },
    "Sungai Perlis (Perlis)": { x: 35, y: 12, status: "good" },
    "Sungai Terengganu (Terengganu)": { x: 80, y: 35, status: "good" },
    "Sungai Sarawak (Sarawak)": { x: 23, y: 55, status: "good" },
    "Sungai Rajang (Sarawak)": { x: 20, y: 50, status: "good" },
    "Sungai Padas (Sabah)": { x: 15, y: 30, status: "good" },
    "Sungai Kinabatangan (Sabah)": { x: 18, y: 25, status: "good" },
    "Sungai Perai (Penang)": { x: 36, y: 25, status: "warning" },
    "Sungai Dungun (Terengganu)": { x: 78, y: 38, status: "good" },
    "Sungai Segamat (Johor)": { x: 60, y: 68, status: "warning" },
    "Sungai Endau (Johor)": { x: 65, y: 72, status: "warning" },
    "Sungai Juru (Penang)": { x: 37, y: 23, status: "critical" },
    "Sungai Batu Pahat (Johor)": { x: 57, y: 73, status: "warning" },
    "Sungai Merbok (Kedah)": { x: 40, y: 20, status: "warning" },
    "Sungai Kerian (Perak)": { x: 42, y: 25, status: "warning" },
    "Sungai Kuantan (Pahang)": { x: 70, y: 43, status: "warning" },
    "Sungai Kemaman (Terengganu)": { x: 75, y: 40, status: "good" },
    "Sungai Besut (Terengganu)": { x: 77, y: 32, status: "good" },
    "Sungai Sedili (Johor)": { x: 62, y: 74, status: "warning" },
    "Sungai Setiu (Terengganu)": { x: 82, y: 34, status: "good" },
    "Sungai Sugut (Sabah)": { x: 10, y: 22, status: "good" },
    "Sungai Temburong (Sabah)": { x: 12, y: 20, status: "good" }
  };

  // Filter rivers by status
  const filteredRivers = filterType === "all" ? 
    Object.keys(riverCoordinates) : 
    Object.keys(riverCoordinates).filter(river => riverCoordinates[river]?.status === filterType);

  const handleRiverSelect = (riverName: string) => {
    if (onRiverSelect) {
      onRiverSelect(riverName);
    }
  };

  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "text-red-500";
      case "warning": return "text-orange-500";
      case "good": return "text-green-500";
      default: return "";
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "critical": return "bg-red-500";
      case "warning": return "bg-orange-500";
      case "good": return "bg-green-500";
      default: return "";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          Malaysian Rivers Interactive Map
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Button 
            size="sm" 
            variant={filterType === "all" ? "default" : "outline"} 
            onClick={() => setFilterType("all")}
          >
            All Rivers
          </Button>
          <Button 
            size="sm" 
            variant={filterType === "critical" ? "default" : "outline"} 
            className={filterType === "critical" ? "bg-red-600 hover:bg-red-700" : ""}
            onClick={() => setFilterType("critical")}
          >
            Critical
          </Button>
          <Button 
            size="sm" 
            variant={filterType === "warning" ? "default" : "outline"} 
            className={filterType === "warning" ? "bg-orange-500 hover:bg-orange-600" : ""}
            onClick={() => setFilterType("warning")}
          >
            Warning
          </Button>
          <Button 
            size="sm" 
            variant={filterType === "good" ? "default" : "outline"} 
            className={filterType === "good" ? "bg-green-600 hover:bg-green-700" : ""}
            onClick={() => setFilterType("good")}
          >
            Good
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[500px] border border-border rounded-md bg-muted/20 overflow-hidden">
          {/* Malaysia map outline - simplified shape */}
          <div className="absolute inset-0 p-4">
            {/* Peninsula Malaysia outline */}
            <div className="absolute w-[45%] h-[75%] border-2 border-muted-foreground/20 rounded-br-[100px] rounded-bl-[30px] rounded-tr-[30px] left-[35%] top-[10%]"></div>
            
            {/* East Malaysia outline (Sabah & Sarawak) */}
            <div className="absolute w-[30%] h-[40%] border-2 border-muted-foreground/20 rounded-[30px] left-[5%] top-[30%]"></div>
            
            {/* River points */}
            {filteredRivers.map((riverName) => {
              const coords = riverCoordinates[riverName];
              if (!coords) return null;
              
              return (
                <div 
                  key={riverName}
                  className="absolute cursor-pointer transition-transform hover:scale-125 z-10"
                  style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                  onClick={() => handleRiverSelect(riverName)}
                  title={riverName}
                >
                  <div className="relative">
                    <MapPin className={`h-6 w-6 ${getStatusColor(coords.status)}`} />
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-background animate-pulse ${getStatusBgColor(coords.status)}"></span>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-background/90 p-3 rounded-md border border-border shadow-sm">
            <p className="text-sm font-medium mb-2">River Status Legend:</p>
            <div className="flex flex-col gap-1">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                <span className="text-xs">Critical</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-orange-500 mr-2"></span>
                <span className="text-xs">Warning</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                <span className="text-xs">Good</span>
              </div>
            </div>
          </div>
        </div>

        {/* River list for mobile */}
        <div className="mt-4 md:hidden">
          <h3 className="text-sm font-medium mb-2">Rivers List:</h3>
          <div className="grid grid-cols-2 gap-2">
            {filteredRivers.slice(0, 8).map((riverName) => {
              const coords = riverCoordinates[riverName];
              return (
                <Button 
                  key={riverName} 
                  variant="outline" 
                  size="sm" 
                  className="flex justify-start items-center"
                  onClick={() => handleRiverSelect(riverName)}
                >
                  <MapPin className={`h-3 w-3 mr-1 ${getStatusColor(coords.status)}`} />
                  <span className="text-xs truncate">{riverName.split(' ')[0]}</span>
                </Button>
              );
            })}
            {filteredRivers.length > 8 && (
              <Button variant="outline" size="sm">
                +{filteredRivers.length - 8} more
              </Button>
            )}
          </div>
        </div>

        {/* Role-specific information */}
        {userRole === "government" && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
            <h3 className="text-sm font-medium mb-1">Policy Impact Analysis</h3>
            <p className="text-xs text-muted-foreground">
              View detailed compliance reports and policy effectiveness for all mapped river systems.
            </p>
          </div>
        )}

        {userRole === "cleanup" && (
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
            <h3 className="text-sm font-medium mb-1">Cleanup Scheduling Status</h3>
            <p className="text-xs text-muted-foreground">
              {filteredRivers.length} rivers currently displayed. {filterType === "critical" ? "High" : "Normal"} priority for cleanup operations.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MalaysiaRiversMap;

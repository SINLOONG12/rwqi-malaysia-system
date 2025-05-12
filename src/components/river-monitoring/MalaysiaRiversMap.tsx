
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, HelpCircle } from 'lucide-react';
import { getUniqueLocations } from '@/utils/riverData';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Import refactored components and utilities
import { riverCoordinates, RiverStatus } from './map-utils/riverCoordinates';
import RiverFilterButtons from './map-components/RiverFilterButtons';
import MapLegend from './map-components/MapLegend';
import MapInfoBox from './map-components/MapInfoBox';
import RiverPoint from './map-components/RiverPoint';
import MobileRiversList from './map-components/MobileRiversList';
import RoleSpecificInfo from './map-components/RoleSpecificInfo';

interface MalaysiaRiversMapProps {
  userRole: "government" | "cleanup" | "public" | "publisher";
  onRiverSelect?: (riverName: string) => void;
}

const MalaysiaRiversMap: React.FC<MalaysiaRiversMapProps> = ({ userRole, onRiverSelect }) => {
  const [filterType, setFilterType] = useState<"all" | RiverStatus>("all");
  const allRivers = getUniqueLocations();

  // Filter rivers by status
  const filteredRivers = filterType === "all" ? 
    Object.keys(riverCoordinates) : 
    Object.keys(riverCoordinates).filter(river => riverCoordinates[river]?.status === filterType);

  const handleRiverSelect = (riverName: string) => {
    if (onRiverSelect) {
      onRiverSelect(riverName);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center">
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Malaysian Rivers Interactive Map
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="h-8 w-8 p-0 ml-2 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted">
                  <HelpCircle className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  "Sungai" means "river" in Malay. The map shows major rivers across Malaysia with their pollution status.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <RiverFilterButtons filterType={filterType} setFilterType={setFilterType} />
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
                <RiverPoint 
                  key={riverName}
                  riverName={riverName}
                  coords={coords}
                  onClick={handleRiverSelect}
                />
              );
            })}
          </div>
          
          <MapLegend />
          <MapInfoBox />
        </div>

        <MobileRiversList 
          filteredRivers={filteredRivers} 
          riverCoordinates={riverCoordinates}
          onRiverSelect={handleRiverSelect}
        />

        <RoleSpecificInfo 
          userRole={userRole} 
          filteredRivers={filteredRivers}
          filterType={filterType}
        />
      </CardContent>
    </Card>
  );
};

export default MalaysiaRiversMap;

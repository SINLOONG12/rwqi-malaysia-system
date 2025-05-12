
import React from 'react';
import { Button } from "@/components/ui/button";
import { RiverStatus } from '../map-utils/riverCoordinates';

interface RiverFilterButtonsProps {
  filterType: "all" | RiverStatus;
  setFilterType: (type: "all" | RiverStatus) => void;
}

const RiverFilterButtons: React.FC<RiverFilterButtonsProps> = ({ 
  filterType, 
  setFilterType 
}) => {
  return (
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
  );
};

export default RiverFilterButtons;

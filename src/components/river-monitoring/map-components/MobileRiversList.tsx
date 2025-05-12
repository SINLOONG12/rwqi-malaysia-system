
import React from 'react';
import { Button } from "@/components/ui/button";
import { MapPin } from 'lucide-react';
import { RiverCoordinate, getStatusColor } from '../map-utils/riverCoordinates';

interface MobileRiversListProps {
  filteredRivers: string[];
  riverCoordinates: Record<string, RiverCoordinate>;
  onRiverSelect: (riverName: string) => void;
}

const MobileRiversList: React.FC<MobileRiversListProps> = ({ 
  filteredRivers, 
  riverCoordinates, 
  onRiverSelect 
}) => {
  if (filteredRivers.length === 0) return null;
  
  return (
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
              onClick={() => onRiverSelect(riverName)}
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
  );
};

export default MobileRiversList;

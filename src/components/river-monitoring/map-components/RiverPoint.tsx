
import React from 'react';
import { MapPin } from 'lucide-react';
import { RiverCoordinate, getStatusColor, getStatusBgColor } from '../map-utils/riverCoordinates';

interface RiverPointProps {
  riverName: string;
  coords: RiverCoordinate;
  onClick: (riverName: string) => void;
}

const RiverPoint: React.FC<RiverPointProps> = ({ riverName, coords, onClick }) => {
  return (
    <div 
      className="absolute cursor-pointer transition-transform hover:scale-125 z-10"
      style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
      onClick={() => onClick(riverName)}
      title={riverName}
    >
      <div className="relative">
        <MapPin className={`h-6 w-6 ${getStatusColor(coords.status)}`} />
        <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-background animate-pulse ${getStatusBgColor(coords.status)}`}></span>
      </div>
    </div>
  );
};

export default RiverPoint;

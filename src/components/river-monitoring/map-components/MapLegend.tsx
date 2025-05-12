
import React from 'react';

const MapLegend: React.FC = () => {
  return (
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
  );
};

export default MapLegend;

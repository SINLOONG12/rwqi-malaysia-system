
import React from 'react';

const MapInfoBox: React.FC = () => {
  return (
    <div className="absolute top-4 left-4 bg-background/90 p-3 rounded-md border border-border shadow-sm max-w-xs">
      <p className="text-sm font-medium mb-1">About Malaysian Rivers</p>
      <p className="text-xs text-muted-foreground">
        "Sungai" is the Malay word for "river". Malaysia has over 150 river systems, with 100 in Peninsular Malaysia and 50 in East Malaysia (Sabah and Sarawak).
      </p>
    </div>
  );
};

export default MapInfoBox;

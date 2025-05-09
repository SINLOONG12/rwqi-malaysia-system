
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Droplet, 
  Filter, 
  Trash2, 
  ThermometerSnowflake
} from 'lucide-react';

interface KeyMetricsGridProps {
  data: {
    rwqiScore: number;
    pH: number;
    trashDetected: number;
    dissolvedOxygen: number;
  };
}

const KeyMetricsGrid: React.FC<KeyMetricsGridProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Water Quality Index</p>
              <h3 className="text-2xl font-bold">{data.rwqiScore.toFixed(2)}/1.0</h3>
              <p className="text-xs font-medium mt-1 flex items-center text-dashboard-orange">
                ↓ Low RWQI - Action Required
              </p>
            </div>
            <div className="p-2 rounded-full bg-dashboard-blue">
              <Droplet className="h-5 w-5 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">pH Level</p>
              <h3 className="text-2xl font-bold">{data.pH.toFixed(1)}</h3>
              <p className="text-xs font-medium mt-1 flex items-center text-dashboard-green">
                ↑ Normal range
              </p>
            </div>
            <div className="p-2 rounded-full bg-dashboard-green">
              <Filter className="h-5 w-5 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Trash Detected</p>
              <h3 className="text-2xl font-bold">{data.trashDetected}/10</h3>
              <p className="text-xs font-medium mt-1 flex items-center text-dashboard-red">
                ↑ High level - Cleanup needed
              </p>
            </div>
            <div className="p-2 rounded-full bg-dashboard-red">
              <Trash2 className="h-5 w-5 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Dissolved Oxygen</p>
              <h3 className="text-2xl font-bold">{data.dissolvedOxygen.toFixed(1)} mg/L</h3>
              <p className="text-xs font-medium mt-1 flex items-center text-dashboard-red">
                ↓ Low level - Critical for aquatic life
              </p>
            </div>
            <div className="p-2 rounded-full bg-dashboard-purple">
              <ThermometerSnowflake className="h-5 w-5 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KeyMetricsGrid;

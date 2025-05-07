
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Activity, Droplet, Filter, Trash2, ThermometerSnowflake } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import RiverFlowChart from '@/components/river-monitoring/RiverFlowChart';
import RiverQualityGauge from '@/components/river-monitoring/RiverQualityGauge';
import RiverQualityDataTable from '@/components/river-monitoring/RiverQualityDataTable';
import RiverQualityTrendChart from '@/components/river-monitoring/RiverQualityTrendChart';
import { riverQualityData } from '@/utils/riverData';

const RiverMonitoringPage: React.FC = () => {
  // Get today's data (using the latest date available)
  const latestDate = riverQualityData.reduce((latest, current) => {
    return new Date(current.date) > new Date(latest.date) ? current : latest;
  }, riverQualityData[0]);

  // Get worst location data from latest date
  const lowestRwqiLocation = riverQualityData
    .filter(data => data.date === latestDate.date)
    .reduce((lowest, current) => {
      return current.rwqiScore < lowest.rwqiScore ? current : lowest;
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI River Flow System</h1>
        <p className="text-muted-foreground">Real-time monitoring of river conditions and pollution detection.</p>
      </div>

      {/* Alert for critical conditions */}
      <Alert variant="destructive" className="border-dashboard-red">
        <Activity className="h-4 w-4" />
        <AlertTitle>Pollution Alert</AlertTitle>
        <AlertDescription>
          High pollution levels detected at River Location ID: {lowestRwqiLocation.location}. 
          RWQI Score: {lowestRwqiLocation.rwqiScore.toFixed(2)} - Very Poor Quality.
        </AlertDescription>
      </Alert>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Water Quality Index</p>
                <h3 className="text-2xl font-bold">{latestDate.rwqiScore.toFixed(2)}/1.0</h3>
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
                <h3 className="text-2xl font-bold">{latestDate.pH.toFixed(1)}</h3>
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
                <h3 className="text-2xl font-bold">{latestDate.trashDetected}/10</h3>
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
                <h3 className="text-2xl font-bold">{latestDate.dissolvedOxygen.toFixed(1)} mg/L</h3>
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RiverFlowChart />
        <RiverQualityGauge />
      </div>
      
      {/* Trend Chart */}
      <RiverQualityTrendChart />

      {/* Data Table */}
      <RiverQualityDataTable />

      {/* Monitoring Stations Table */}
      <Card>
        <CardHeader>
          <CardTitle>River Monitoring Stations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Station ID</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>RWQI Score</TableHead>
                <TableHead>Flow Rate</TableHead>
                <TableHead>Trash Level</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>KL-001</TableCell>
                <TableCell>Klang River - North</TableCell>
                <TableCell>0.43</TableCell>
                <TableCell>1.8 m³/s</TableCell>
                <TableCell>High</TableCell>
                <TableCell><span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs">Warning</span></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>KL-002</TableCell>
                <TableCell>Klang River - Central</TableCell>
                <TableCell>0.39</TableCell>
                <TableCell>2.2 m³/s</TableCell>
                <TableCell>High</TableCell>
                <TableCell><span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs">Alert</span></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>KL-003</TableCell>
                <TableCell>Klang River - South</TableCell>
                <TableCell>0.35</TableCell>
                <TableCell>1.3 m³/s</TableCell>
                <TableCell>High</TableCell>
                <TableCell><span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs">Alert</span></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>GC-001</TableCell>
                <TableCell>Gombak River</TableCell>
                <TableCell>0.41</TableCell>
                <TableCell>0.9 m³/s</TableCell>
                <TableCell>Medium</TableCell>
                <TableCell><span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs">Warning</span></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>BT-001</TableCell>
                <TableCell>Batu River</TableCell>
                <TableCell>0.38</TableCell>
                <TableCell>1.1 m³/s</TableCell>
                <TableCell>Medium</TableCell>
                <TableCell><span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs">Warning</span></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiverMonitoringPage;

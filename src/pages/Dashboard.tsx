
import React from 'react';
import StatCard from '@/components/dashboard/StatCard';
import RecentActivityCard from '@/components/dashboard/RecentActivityCard';
import { 
  Droplet, 
  AlertTriangle, 
  ThermometerSnowflake, 
  Trash2, 
  CloudRain 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RiverQualityGauge from '@/components/river-monitoring/RiverQualityGauge';
import RiverQualityTrendChart from '@/components/river-monitoring/RiverQualityTrendChart';
import { riverQualityData } from '@/utils/riverData';

const Dashboard: React.FC = () => {
  // Get the latest date's data
  const latestDate = riverQualityData.reduce((latest, current) => {
    return new Date(current.date) > new Date(latest.date) ? current : latest;
  }, riverQualityData[0]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Malaysian River Quality Dashboard</h1>
        <p className="text-muted-foreground">Real-time overview of river health and monitoring activities.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="River Quality Index" 
          value={latestDate.rwqiScore.toFixed(2) + "/1.0"} 
          change={{ value: "3% improvement", positive: true }} 
          icon={<Droplet className="h-5 w-5 text-white" />}
          iconColor="bg-dashboard-blue"
        />
        <StatCard 
          title="Active Alerts" 
          value="12" 
          change={{ value: "5 new today", positive: false }} 
          icon={<AlertTriangle className="h-5 w-5 text-white" />}
          iconColor="bg-dashboard-orange"
        />
        <StatCard 
          title="Water Temperature" 
          value={`${latestDate.temperature}°C`} 
          change={{ value: "Normal range", positive: true }} 
          icon={<ThermometerSnowflake className="h-5 w-5 text-white" />}
          iconColor="bg-dashboard-green"
        />
        <StatCard 
          title="Pollution Incidents" 
          value={latestDate.trashDetected.toString()} 
          change={{ value: "2 resolved today", positive: true }} 
          icon={<Trash2 className="h-5 w-5 text-white" />}
          iconColor="bg-dashboard-red"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Droplet className="mr-2 h-5 w-5 text-dashboard-blue" />
              National River Quality Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <RiverQualityGauge />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CloudRain className="mr-2 h-5 w-5 text-dashboard-purple" />
              River Quality Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <RiverQualityTrendChart />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivityCard />
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                <AlertTriangle className="h-5 w-5 mb-2" />
                <div className="text-sm font-medium">View Critical Alerts</div>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                <Droplet className="h-5 w-5 mb-2" />
                <div className="text-sm font-medium">Water Quality Report</div>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                <Trash2 className="h-5 w-5 mb-2" />
                <div className="text-sm font-medium">Schedule Cleanup</div>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                <CloudRain className="h-5 w-5 mb-2" />
                <div className="text-sm font-medium">Weather Forecast</div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

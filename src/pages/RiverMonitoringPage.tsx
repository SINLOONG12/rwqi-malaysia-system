
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  Droplet, 
  Filter, 
  Trash2, 
  ThermometerSnowflake,
  Map,
  Bell,
  AlertTriangle,
  Users,
  ChartBar,
  History,
  Database
} from 'lucide-react';
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
import RiverMonitoringMap from '@/components/river-monitoring/RiverMonitoringMap';
import PredictiveAnalytics from '@/components/river-monitoring/PredictiveAnalytics';
import AlertsNotifications from '@/components/river-monitoring/AlertsNotifications';
import { riverQualityData } from '@/utils/riverData';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const RiverMonitoringPage: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [userRole, setUserRole] = useState<"government" | "cleanup" | "public">("government");
  
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

  // Simulate downloading a report
  const handleDownloadReport = () => {
    toast({
      title: "Report Downloaded",
      description: "The river quality report has been downloaded successfully.",
    });
  };

  // Simulate submitting feedback
  const handleSubmitFeedback = () => {
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback! It helps improve our AI models.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Malaysian River Water Quality Index</h1>
          <p className="text-muted-foreground">Real-time monitoring of river conditions and pollution detection across Malaysia.</p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <div className="text-sm text-muted-foreground mr-2">View as:</div>
          <div className="flex border rounded-lg overflow-hidden">
            <Button 
              variant={userRole === "government" ? "default" : "outline"} 
              className="rounded-none border-0"
              onClick={() => setUserRole("government")}
            >
              Government
            </Button>
            <Button 
              variant={userRole === "cleanup" ? "default" : "outline"} 
              className="rounded-none border-0 border-x"
              onClick={() => setUserRole("cleanup")}
            >
              Cleanup Team
            </Button>
            <Button 
              variant={userRole === "public" ? "default" : "outline"} 
              className="rounded-none border-0"
              onClick={() => setUserRole("public")}
            >
              Public
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="overview">
            <ChartBar className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="map">
            <Map className="h-4 w-4 mr-2" />
            Interactive Map
          </TabsTrigger>
          <TabsTrigger value="alerts">
            <Bell className="h-4 w-4 mr-2" />
            Alerts & Notifications
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <Database className="h-4 w-4 mr-2" />
            Advanced Analytics
          </TabsTrigger>
          <TabsTrigger value="historical">
            <History className="h-4 w-4 mr-2" />
            Historical Data
          </TabsTrigger>
        </TabsList>
        
        {/* Overview Tab Content */}
        <TabsContent value="overview" className="space-y-6">
          {/* Alert for critical conditions */}
          <Alert variant="destructive" className="border-dashboard-red">
            <Activity className="h-4 w-4" />
            <AlertTitle>Pollution Alert</AlertTitle>
            <AlertDescription>
              High pollution levels detected at {lowestRwqiLocation.location}. 
              RWQI Score: {lowestRwqiLocation.rwqiScore.toFixed(2)} - Very Poor Quality.
              {userRole === "cleanup" && (
                <div className="mt-2">
                  <Badge className="bg-destructive mr-2">Priority: High</Badge>
                  <Badge variant="outline" className="border-destructive text-destructive">Immediate Action Required</Badge>
                </div>
              )}
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

          {/* Role-specific content */}
          {userRole === "government" && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-dashboard-orange" />
                  Policy Compliance Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">National Water Quality Standards</span>
                    <Badge variant="destructive">4 Rivers Non-Compliant</Badge>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Clean Rivers Program Target</span>
                    <Badge variant="outline" className="text-dashboard-orange border-dashboard-orange">62% Achieved</Badge>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Annual Improvement Rate</span>
                    <Badge variant="outline" className="text-dashboard-green border-dashboard-green">+5.3% YoY</Badge>
                  </div>
                  <Button onClick={handleDownloadReport} className="mt-2">Download Full Compliance Report</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {userRole === "cleanup" && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-dashboard-blue" />
                  Today's Cleanup Priorities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <div>
                      <span className="font-medium block">Sungai Juru (Penang)</span>
                      <span className="text-sm text-muted-foreground">Heavy plastic pollution, oil traces</span>
                    </div>
                    <Badge variant="destructive">High Priority</Badge>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <div>
                      <span className="font-medium block">Sungai Gombak (KL)</span>
                      <span className="text-sm text-muted-foreground">Urban waste accumulation, rising ammonia</span>
                    </div>
                    <Badge variant="outline" className="text-dashboard-orange border-dashboard-orange">Medium Priority</Badge>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <div>
                      <span className="font-medium block">Sungai Langat (Selangor)</span>
                      <span className="text-sm text-muted-foreground">Industrial discharge, degrading pH</span>
                    </div>
                    <Badge variant="outline" className="text-dashboard-orange border-dashboard-orange">Medium Priority</Badge>
                  </div>
                  <Button className="mt-2 bg-dashboard-blue hover:bg-dashboard-blue/90">View Detailed Cleanup Plan</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {userRole === "public" && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Citizen Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>Help keep our rivers clean by reporting pollution incidents and participating in community cleanup events.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="flex items-center justify-center">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Report River Pollution
                    </Button>
                    <Button variant="outline" className="flex items-center justify-center">
                      <Users className="h-4 w-4 mr-2" />
                      Join Cleanup Events
                    </Button>
                  </div>
                  <div className="mt-4 p-4 bg-muted rounded-md">
                    <h4 className="font-medium mb-2">Improve Our System</h4>
                    <p className="text-sm mb-2">How accurate was the water quality data for your area?</p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={handleSubmitFeedback}>Very Accurate</Button>
                      <Button size="sm" variant="outline" onClick={handleSubmitFeedback}>Somewhat Accurate</Button>
                      <Button size="sm" variant="outline" onClick={handleSubmitFeedback}>Not Accurate</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Monitoring Stations Table */}
          <RiverQualityDataTable />
        </TabsContent>
        
        {/* Map Tab Content */}
        <TabsContent value="map">
          <RiverMonitoringMap userRole={userRole} />
        </TabsContent>
        
        {/* Alerts Tab Content */}
        <TabsContent value="alerts">
          <AlertsNotifications userRole={userRole} />
        </TabsContent>
        
        {/* Analytics Tab Content */}
        <TabsContent value="analytics">
          <PredictiveAnalytics userRole={userRole} />
        </TabsContent>
        
        {/* Historical Data Tab Content */}
        <TabsContent value="historical">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <History className="h-5 w-5 mr-2" />
                Historical River Quality Trends
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-muted rounded-md">
                <h3 className="font-medium mb-2">Data Access Options</h3>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" onClick={handleDownloadReport}>Download CSV</Button>
                  <Button size="sm" onClick={handleDownloadReport}>Download PDF Report</Button>
                  <Button size="sm" variant="outline">API Access</Button>
                  <Button size="sm" variant="outline">Raw Sensor Data</Button>
                </div>
              </div>
              <RiverQualityTrendChart />
              <RiverQualityDataTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RiverMonitoringPage;

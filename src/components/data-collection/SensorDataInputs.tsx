import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Database, RefreshCw, AlertCircle, BarChart2, ThermometerSnowflake, Droplet, CloudRain } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { detectAnomalies } from '@/utils/aiDetection';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Simulated sensor data
const sensorLocations = [
  { id: 'sensor-001', name: 'Sungai Klang - Water Quality Station', location: 'Kuala Lumpur', status: 'active' },
  { id: 'sensor-002', name: 'Sungai Gombak - Monitoring Station', location: 'Kuala Lumpur', status: 'active' },
  { id: 'sensor-003', name: 'Sungai Pinang - River Mouth', location: 'Penang', status: 'inactive' },
  { id: 'sensor-004', name: 'Sungai Kelantan - Northern Point', location: 'Kelantan', status: 'active' },
];

const sensorTypes = [
  { id: 'ph', name: 'pH Level', unit: 'pH', icon: <Droplet className="h-4 w-4" /> },
  { id: 'do', name: 'Dissolved Oxygen', unit: 'mg/L', icon: <CloudRain className="h-4 w-4" /> },
  { id: 'temp', name: 'Temperature', unit: '°C', icon: <ThermometerSnowflake className="h-4 w-4" /> },
  { id: 'turbidity', name: 'Turbidity', unit: 'NTU', icon: <BarChart2 className="h-4 w-4" /> },
  { id: 'conductivity', name: 'Conductivity', unit: 'µS/cm', icon: <AlertCircle className="h-4 w-4" /> },
];

// Generated mock data for charts with more realistic fluctuations for water data
const generateRealisticMockData = () => {
  // Start values
  let ph = 7.2 + (Math.random() * 0.3 - 0.15);  // Normal pH is around 7.2
  let dissolvedOxygen = 7 + (Math.random() * 0.8 - 0.4);  // Healthy DO is 6-8 mg/L
  let temp = 28 + (Math.random() * 1 - 0.5);  // Typical Malaysian river temp
  let turbidity = 30 + (Math.random() * 5);  // Moderate turbidity
  let conductivity = 250 + (Math.random() * 20);  // Typical conductivity
  
  // Create array with 24 hourly readings
  return Array(24).fill(null).map((_, i) => {
    // Create small fluctuations between readings with occasional spikes
    ph += Math.random() * 0.2 - 0.1;
    // Occasional pH issue (acid rain or pollution event)
    if (i === 8 || i === 16) ph -= Math.random() * 1.5;  
    ph = Math.max(4.5, Math.min(9.5, ph));  // Constrain to realistic range
    
    dissolvedOxygen += Math.random() * 0.3 - 0.15;
    // DO drops at night or with pollution
    if (i >= 20 || i <= 5) dissolvedOxygen -= 0.8;  
    dissolvedOxygen = Math.max(2, Math.min(10, dissolvedOxygen));
    
    temp += Math.random() * 0.3 - 0.15;
    // Temperature rises during the day
    if (i >= 10 && i <= 16) temp += 0.7;  
    temp = Math.max(26, Math.min(33, temp));
    
    turbidity += Math.random() * 6 - 3;
    // Turbidity spike (could be from rain event or dumping)
    if (i === 12) turbidity += Math.random() * 80;  
    turbidity = Math.max(10, Math.min(150, turbidity));
    
    conductivity += Math.random() * 15 - 7.5;
    // Conductivity increase (could indicate pollution)
    if (i === 12 || i === 13) conductivity += Math.random() * 120;  
    conductivity = Math.max(100, Math.min(500, conductivity));
    
    const hour = i.toString().padStart(2, '0') + ':00';
    return {
      time: hour,
      ph: parseFloat(ph.toFixed(2)),
      do: parseFloat(dissolvedOxygen.toFixed(2)),
      temp: parseFloat(temp.toFixed(1)),
      turbidity: parseFloat(turbidity.toFixed(1)),
      conductivity: parseFloat(conductivity.toFixed(1)),
    };
  });
};

const SensorDataInputs: React.FC = () => {
  const { toast } = useToast();
  const [selectedLocation, setSelectedLocation] = useState<string>('sensor-001');
  const [selectedSensorType, setSelectedSensorType] = useState<string>('ph');
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false);
  const [sensorData, setSensorData] = useState<any[]>(generateRealisticMockData());
  const [realTimeEnabled, setRealTimeEnabled] = useState<boolean>(false);
  const [anomaly, setAnomaly] = useState<{isAnomaly: boolean; parameter?: string; message?: string; severity?: string} | null>(null);
  
  // Effect for auto-refreshing data
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (autoRefresh) {
      intervalId = setInterval(() => {
        handleRefresh();
      }, 5000); // Refresh every 5 seconds
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoRefresh]);
  
  // Effect for real-time data streaming simulation
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (realTimeEnabled) {
      intervalId = setInterval(() => {
        // Add a new data point to the existing sensor data
        setSensorData(currentData => {
          // Get last data point as a base
          const lastPoint = currentData[currentData.length - 1];
          
          // Generate new values with small fluctuations
          const newPoint = {
            time: new Date().toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute: '2-digit'}),
            ph: Math.max(4, Math.min(9.5, lastPoint.ph + (Math.random() * 0.4 - 0.2))),
            do: Math.max(2, Math.min(10, lastPoint.do + (Math.random() * 0.6 - 0.3))),
            temp: Math.max(26, Math.min(33, lastPoint.temp + (Math.random() * 0.4 - 0.2))),
            turbidity: Math.max(10, Math.min(150, lastPoint.turbidity + (Math.random() * 8 - 4))),
            conductivity: Math.max(100, Math.min(500, lastPoint.conductivity + (Math.random() * 20 - 10))),
          };
          
          // Keep last 24 data points
          const newData = [...currentData.slice(1), newPoint];
          
          // Check for anomalies in the new data
          const anomalyResult = detectAnomalies(newData);
          setAnomaly(anomalyResult.isAnomaly ? anomalyResult : null);
          
          if (anomalyResult.isAnomaly && anomalyResult.severity === 'high') {
            toast({
              title: `Critical Water Quality Alert`,
              description: anomalyResult.message,
              variant: "destructive",
            });
          }
          
          return newData;
        });
      }, 2000); // Add a new data point every 2 seconds
      
      toast({
        title: "Real-time Data Enabled",
        description: "Live sensor data streaming has been activated.",
      });
    } else {
      setAnomaly(null);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [realTimeEnabled, toast]);

  const handleRefresh = () => {
    setSensorData(generateRealisticMockData());
    
    // Check for anomalies in the new data
    const newData = generateRealisticMockData();
    const anomalyResult = detectAnomalies(newData);
    setAnomaly(anomalyResult.isAnomaly ? anomalyResult : null);
    
    toast({
      title: "Data Refreshed",
      description: "Latest sensor data has been loaded.",
    });
  };

  const handleConnect = () => {
    toast({
      title: "API Connection Initiated",
      description: "Attempting to connect to remote sensor API...",
    });
    
    // Simulate API connection delay
    setTimeout(() => {
      toast({
        title: "API Connected",
        description: "Successfully connected to sensor data stream.",
        variant: "default",
      });
      
      // Automatically enable real-time data
      setRealTimeEnabled(true);
    }, 2000);
  };
  
  const handleAutoRefreshToggle = (checked: boolean) => {
    setAutoRefresh(checked);
    if (checked) {
      toast({
        title: "Auto Refresh Enabled",
        description: "Data will refresh every 5 minutes.",
      });
    }
  };
  
  const handleRealTimeToggle = (checked: boolean) => {
    setRealTimeEnabled(checked);
    if (!checked) {
      toast({
        title: "Real-time Data Disabled",
        description: "Live sensor data streaming has been deactivated.",
      });
    }
  };

  const selectedUnit = sensorTypes.find(sensor => sensor.id === selectedSensorType)?.unit;
  const selectedIcon = sensorTypes.find(sensor => sensor.id === selectedSensorType)?.icon;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {selectedIcon}
              <span>{sensorTypes.find(type => type.id === selectedSensorType)?.name} Readings</span>
            </CardTitle>
            <CardDescription>
              {sensorLocations.find(loc => loc.id === selectedLocation)?.name}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 mr-2">
              <span className="text-xs">Real-time</span>
              <Switch 
                checked={realTimeEnabled}
                onCheckedChange={handleRealTimeToggle}
                className="data-[state=checked]:bg-green-500"
              />
            </div>
            <Button variant="outline" size="icon" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {anomaly?.isAnomaly && (
            <Alert 
              variant={anomaly.severity === 'high' ? "destructive" : "default"} 
              className={`mb-4 ${anomaly.severity !== 'high' ? 'border-yellow-500 text-yellow-800 dark:text-yellow-300' : ''}`}
            >
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Water Quality Alert</AlertTitle>
              <AlertDescription>{anomaly.message}</AlertDescription>
            </Alert>
          )}
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sensorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis 
                  label={{ value: selectedUnit, position: 'insideLeft', angle: -90, dy: 10 }}
                  domain={
                    selectedSensorType === 'ph' ? [4, 10] :
                    selectedSensorType === 'do' ? [0, 10] :
                    selectedSensorType === 'temp' ? [25, 35] :
                    selectedSensorType === 'turbidity' ? [0, 150] :
                    [0, 500]
                  }
                />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={selectedSensorType}
                  stroke="#3b82f6"
                  activeDot={{ r: 8 }}
                  name={sensorTypes.find(type => type.id === selectedSensorType)?.name}
                  isAnimationActive={!realTimeEnabled} // Disable animation for real-time data to reduce flicker
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="location-select">Sensor Location</Label>
              <Select 
                value={selectedLocation}
                onValueChange={setSelectedLocation}
              >
                <SelectTrigger id="location-select" className="w-full">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {sensorLocations.map(location => (
                    <SelectItem key={location.id} value={location.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{location.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          location.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {location.status}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <Label htmlFor="sensor-select">Parameter</Label>
              <Select 
                value={selectedSensorType}
                onValueChange={setSelectedSensorType}
              >
                <SelectTrigger id="sensor-select" className="w-full">
                  <SelectValue placeholder="Select parameter" />
                </SelectTrigger>
                <SelectContent>
                  {sensorTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>
                      <div className="flex items-center gap-2">
                        {type.icon}
                        <span>{type.name} ({type.unit})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Parameter statistics */}
          <div className="mt-4 grid grid-cols-5 gap-4">
            {sensorTypes.map(type => {
              // Calculate statistics
              const values = sensorData.map(d => d[type.id]);
              const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
              const min = Math.min(...values);
              const max = Math.max(...values);
              const current = values[values.length - 1];
              
              // Determine status based on parameter
              let status = 'normal';
              if (type.id === 'ph' && (current < 6.5 || current > 8.5)) status = 'alert';
              if (type.id === 'do' && current < 5) status = 'alert';
              if (type.id === 'turbidity' && current > 50) status = 'alert';
              
              return (
                <div 
                  key={type.id} 
                  className={`p-2 rounded-md ${
                    status === 'alert' ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800' : 
                    'bg-slate-50 dark:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    {type.icon}
                  </div>
                  <div className="text-center mt-1">
                    <p className="text-xs text-muted-foreground">{type.name}</p>
                    <p className={`text-sm font-medium ${status === 'alert' ? 'text-red-600 dark:text-red-400' : ''}`}>
                      {current.toFixed(1)} {type.unit}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Avg: {avg.toFixed(1)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Auto Refresh</h3>
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-refresh">Refresh every 5 minutes</Label>
                <Switch 
                  id="auto-refresh"
                  checked={autoRefresh}
                  onCheckedChange={handleAutoRefreshToggle}
                  disabled={realTimeEnabled} // Disable when real-time is enabled
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Real-time Streaming</h3>
              <div className="flex items-center justify-between">
                <Label htmlFor="real-time">Live data feed</Label>
                <Switch 
                  id="real-time"
                  checked={realTimeEnabled}
                  onCheckedChange={handleRealTimeToggle}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Enables continuous data streaming from sensors
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">API Connection</h3>
              <div className="space-y-2">
                <div className="flex flex-col gap-2">
                  <Input placeholder="API Endpoint URL" defaultValue="https://api.myriversensors.my/data" />
                  <Input placeholder="API Key" type="password" defaultValue="••••••••••••••••" />
                  <Button onClick={handleConnect} className="w-full">Connect to API</Button>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Connected Data Loggers</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {sensorLocations.map(sensor => (
                  <div key={sensor.id} className="flex justify-between items-center p-2 bg-slate-100 dark:bg-slate-800 rounded">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">{sensor.name}</p>
                        <p className="text-xs text-muted-foreground">{sensor.location}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      sensor.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {sensor.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-yellow-800 dark:text-yellow-500">
              <AlertCircle className="h-4 w-4" />
              <p className="text-xs">
                Data logger calibration recommended for Sungai Pinang station
              </p>
            </div>
            
            <Button variant="outline" className="w-full">
              Download All Sensor Data (CSV)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SensorDataInputs;

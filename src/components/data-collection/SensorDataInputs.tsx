
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Database, RefreshCw, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Simulated sensor data
const sensorLocations = [
  { id: 'sensor-001', name: 'Sungai Klang - Water Quality Station', location: 'Kuala Lumpur', status: 'active' },
  { id: 'sensor-002', name: 'Sungai Gombak - Monitoring Station', location: 'Kuala Lumpur', status: 'active' },
  { id: 'sensor-003', name: 'Sungai Pinang - River Mouth', location: 'Penang', status: 'inactive' },
  { id: 'sensor-004', name: 'Sungai Kelantan - Northern Point', location: 'Kelantan', status: 'active' },
];

const sensorTypes = [
  { id: 'ph', name: 'pH Level', unit: 'pH' },
  { id: 'do', name: 'Dissolved Oxygen', unit: 'mg/L' },
  { id: 'temp', name: 'Temperature', unit: '°C' },
  { id: 'turbidity', name: 'Turbidity', unit: 'NTU' },
  { id: 'conductivity', name: 'Conductivity', unit: 'µS/cm' },
];

// Generated mock data for charts
const generateMockData = () => {
  return Array(24).fill(null).map((_, i) => {
    const hour = i.toString().padStart(2, '0') + ':00';
    return {
      time: hour,
      ph: 6 + Math.random() * 2,
      do: 4 + Math.random() * 3,
      temp: 27 + Math.random() * 5,
      turbidity: 20 + Math.random() * 30,
      conductivity: 200 + Math.random() * 100,
    };
  });
};

const SensorDataInputs: React.FC = () => {
  const { toast } = useToast();
  const [selectedLocation, setSelectedLocation] = useState<string>('sensor-001');
  const [selectedSensorType, setSelectedSensorType] = useState<string>('ph');
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false);
  const [sensorData, setSensorData] = useState<any[]>(generateMockData());
  
  const handleRefresh = () => {
    setSensorData(generateMockData());
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
    }, 2000);
  };

  const selectedUnit = sensorTypes.find(sensor => sensor.id === selectedSensorType)?.unit;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Sensor Readings</CardTitle>
            <CardDescription>
              {sensorLocations.find(loc => loc.id === selectedLocation)?.name} - {sensorTypes.find(type => type.id === selectedSensorType)?.name}
            </CardDescription>
          </div>
          <Button variant="outline" size="icon" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sensorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis label={{ value: selectedUnit, position: 'insideLeft', angle: -90, dy: 10 }} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={selectedSensorType}
                  stroke="#3b82f6"
                  activeDot={{ r: 8 }}
                  name={sensorTypes.find(type => type.id === selectedSensorType)?.name}
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
                      {type.name} ({type.unit})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
                  onCheckedChange={setAutoRefresh}
                />
              </div>
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SensorDataInputs;

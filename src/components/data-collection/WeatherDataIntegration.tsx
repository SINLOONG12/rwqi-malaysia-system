
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CloudRain, Wind, Thermometer, Droplets, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Simulated weather data for different regions
const weatherRegions = [
  { id: 'kl', name: 'Kuala Lumpur', active: true },
  { id: 'penang', name: 'Penang', active: true },
  { id: 'kelantan', name: 'Kelantan', active: true },
  { id: 'johor', name: 'Johor', active: false },
  { id: 'sabah', name: 'Sabah', active: false },
  { id: 'sarawak', name: 'Sarawak', active: true },
];

const weatherAPIs = [
  { id: 'met-malaysia', name: 'Malaysian Meteorological Department', connected: true },
  { id: 'weather-api', name: 'WeatherAPI.com', connected: true },
  { id: 'open-weather', name: 'OpenWeather', connected: false },
];

// Generate mock rainfall data
const generateRainfallData = () => {
  return Array(14).fill(null).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - 13 + i);
    const day = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return {
      day,
      rainfall: Math.random() * 30,
    };
  });
};

// Generate mock temperature data
const generateTemperatureData = () => {
  return Array(24).fill(null).map((_, i) => {
    const hour = i.toString().padStart(2, '0') + ':00';
    return {
      time: hour,
      temperature: 25 + Math.random() * 8,
      humidity: 65 + Math.random() * 25,
    };
  });
};

const WeatherDataIntegration: React.FC = () => {
  const { toast } = useToast();
  const [selectedRegion, setSelectedRegion] = useState<string>('kl');
  const [rainfallData, setRainfallData] = useState<any[]>(generateRainfallData());
  const [temperatureData, setTemperatureData] = useState<any[]>(generateTemperatureData());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleConnect = (apiId: string) => {
    setIsLoading(true);
    
    toast({
      title: "Connecting to API",
      description: `Establishing connection to ${weatherAPIs.find(api => api.id === apiId)?.name}...`,
    });
    
    // Simulate API connection delay
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "API Connected",
        description: `Successfully connected to ${weatherAPIs.find(api => api.id === apiId)?.name}.`,
      });
    }, 1500);
  };

  const handleRefreshData = () => {
    setIsLoading(true);
    
    toast({
      title: "Refreshing Weather Data",
      description: "Fetching latest weather information...",
    });
    
    // Simulate data fetching delay
    setTimeout(() => {
      setRainfallData(generateRainfallData());
      setTemperatureData(generateTemperatureData());
      setIsLoading(false);
      
      toast({
        title: "Data Refreshed",
        description: "Latest weather data has been loaded for all regions.",
      });
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Weather Trends</CardTitle>
              <CardDescription>
                {weatherRegions.find(region => region.id === selectedRegion)?.name} Region
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={handleRefreshData}
              disabled={isLoading}
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Refresh</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
                <CloudRain className="h-4 w-4" />
                <span>14-Day Rainfall</span>
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rainfallData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis label={{ value: 'mm', position: 'insideLeft', angle: -90, dy: 10 }} />
                    <Tooltip />
                    <Bar dataKey="rainfall" fill="#3b82f6" name="Rainfall (mm)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
                <Thermometer className="h-4 w-4" />
                <span>24-Hour Temperature & Humidity</span>
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={temperatureData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" label={{ value: '°C', position: 'insideLeft', angle: -90, dy: 10 }} />
                    <YAxis yAxisId="right" orientation="right" label={{ value: '%', position: 'insideRight', angle: -90, dx: 10 }} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="temperature" 
                      stroke="#ef4444" 
                      name="Temperature (°C)" 
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="humidity" 
                      stroke="#3b82f6" 
                      name="Humidity (%)" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Label htmlFor="region-select">Select Region</Label>
            <Select 
              value={selectedRegion}
              onValueChange={setSelectedRegion}
            >
              <SelectTrigger id="region-select" className="w-full max-w-xs">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {weatherRegions.map(region => (
                  <SelectItem key={region.id} value={region.id} disabled={!region.active}>
                    <div className="flex items-center justify-between w-full">
                      <span>{region.name}</span>
                      {!region.active && (
                        <span className="text-xs text-muted-foreground">(Coming soon)</span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weather Data Sources</CardTitle>
          <CardDescription>
            Configure external weather APIs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {weatherAPIs.map(api => (
              <div key={api.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">{api.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    api.connected ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'
                  }`}>
                    {api.connected ? 'Connected' : 'Not Connected'}
                  </span>
                </div>
                
                {api.connected ? (
                  <div className="text-xs space-y-1">
                    <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 p-2 rounded">
                      <span>API Key</span>
                      <span className="font-mono">••••••••••••••••</span>
                    </div>
                    <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 p-2 rounded">
                      <span>Endpoint</span>
                      <span className="font-mono text-[10px]">api.{api.id}.com/v1</span>
                    </div>
                    <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 p-2 rounded">
                      <span>Last Sync</span>
                      <span>10 minutes ago</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Input placeholder="API Key" size={10} />
                    <Input placeholder="API Endpoint URL" />
                    <Button 
                      onClick={() => handleConnect(api.id)}
                      className="w-full"
                      variant="outline"
                      size="sm"
                    >
                      Connect
                    </Button>
                  </div>
                )}
              </div>
            ))}
            
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
              <h4 className="text-sm font-medium text-blue-800 dark:text-blue-400 flex items-center gap-2 mb-1">
                <Droplets className="h-4 w-4" />
                <span>Data Integration Impact</span>
              </h4>
              <p className="text-xs text-blue-800 dark:text-blue-400">
                Weather data improves RWQI prediction accuracy by up to 28% when combined with sensor readings.
              </p>
            </div>
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Data update frequency:</span>
              <span>Every 30 minutes</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherDataIntegration;

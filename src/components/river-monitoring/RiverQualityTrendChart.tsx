
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { getUniqueLocations, getLocationData, getRwqiCategory, getRwqiColor } from '@/utils/riverData';

const RiverQualityTrendChart: React.FC = () => {
  const locations = getUniqueLocations();
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [selectedMetric, setSelectedMetric] = useState('rwqiScore');
  const [timeframe, setTimeframe] = useState('weekly');
  
  const metrics = [
    { value: 'rwqiScore', label: 'RWQI Score', color: '#3b82f6' },
    { value: 'dissolvedOxygen', label: 'Dissolved Oxygen', color: '#10b981' },
    { value: 'biochemicalOxygenDemand', label: 'BOD', color: '#f97316' },
    { value: 'chemicalOxygenDemand', label: 'COD', color: '#8b5cf6' },
    { value: 'ammoniacalNitrogen', label: 'NH₃-N', color: '#ef4444' },
    { value: 'pH', label: 'pH Level', color: '#06b6d4' },
    { value: 'trashDetected', label: 'Trash Level', color: '#64748b' },
  ];

  const selectedMetricObj = metrics.find(m => m.value === selectedMetric);
  const locationData = getLocationData(selectedLocation);
  
  // Sort data by date for proper trend visualization
  const chartData = [...locationData].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Weekly thresholds for RWQI score
  const getThresholdValue = () => {
    if (selectedMetric === 'rwqiScore') {
      return 0.6; // Threshold between Poor and Moderate
    }
    return null;
  };

  // Get current week's average RWQI score
  const getCurrentWeekRWQI = () => {
    if (!chartData.length) return { score: 0, change: 0 };
    
    // Get last data point's RWQI score
    const latestRWQI = chartData[chartData.length - 1].rwqiScore;
    
    // Get previous week's score (if available)
    const previousWeekIndex = Math.max(0, chartData.length - 8);
    const previousWeekRWQI = chartData[previousWeekIndex]?.rwqiScore || latestRWQI;
    
    // Calculate change
    const change = latestRWQI - previousWeekRWQI;
    
    return {
      score: latestRWQI,
      change: change
    };
  };

  const weeklyData = getCurrentWeekRWQI();

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-col space-y-2">
        <div className="flex flex-row items-center justify-between">
          <CardTitle>River Quality Trends</CardTitle>
          <div className="flex items-center space-x-2">
            <Select
              value={selectedLocation}
              onValueChange={setSelectedLocation}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select
              value={selectedMetric}
              onValueChange={setSelectedMetric}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select metric" />
              </SelectTrigger>
              <SelectContent>
                {metrics.map(metric => (
                  <SelectItem key={metric.value} value={metric.value}>
                    {metric.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Weekly RWQI summary */}
        {selectedMetric === 'rwqiScore' && (
          <div className="flex items-center justify-between bg-muted/30 p-2 rounded-md">
            <div className="flex items-center">
              <Badge className="mr-2" style={{ backgroundColor: getRwqiColor(weeklyData.score) }}>
                {getRwqiCategory(weeklyData.score)}
              </Badge>
              <span className="text-sm font-medium">Weekly RWQI: {weeklyData.score.toFixed(2)}</span>
            </div>
            <div className="text-sm">
              {weeklyData.change > 0 ? (
                <span className="text-green-500">↑ {weeklyData.change.toFixed(2)}</span>
              ) : weeklyData.change < 0 ? (
                <span className="text-red-500">↓ {Math.abs(weeklyData.change).toFixed(2)}</span>
              ) : (
                <span className="text-muted-foreground">No change</span>
              )}
            </div>
          </div>
        )}
        
        {/* Timeframe selector */}
        <div className="flex justify-end">
          <div className="flex space-x-1 bg-muted/50 p-1 rounded-md">
            <button 
              className={`px-2 py-1 text-xs rounded ${timeframe === 'weekly' ? 'bg-primary text-primary-foreground' : ''}`}
              onClick={() => setTimeframe('weekly')}
            >
              Weekly
            </button>
            <button 
              className={`px-2 py-1 text-xs rounded ${timeframe === 'monthly' ? 'bg-primary text-primary-foreground' : ''}`}
              onClick={() => setTimeframe('monthly')}
            >
              Monthly
            </button>
            <button 
              className={`px-2 py-1 text-xs rounded ${timeframe === 'yearly' ? 'bg-primary text-primary-foreground' : ''}`}
              onClick={() => setTimeframe('yearly')}
            >
              Yearly
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            [selectedMetric]: { color: selectedMetricObj?.color || '#3b82f6' }
          }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => value.substring(5)} // Show only month-day
              />
              <YAxis />
              <ChartTooltip
                content={<ChartTooltipContent />}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey={selectedMetric}
                name={selectedMetricObj?.label}
                stroke={selectedMetricObj?.color}
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              
              {/* Threshold line for RWQI score */}
              {getThresholdValue() && (
                <ReferenceLine 
                  y={getThresholdValue()} 
                  stroke="#f97316" 
                  strokeDasharray="3 3" 
                  label={{ 
                    value: 'Threshold',
                    position: 'insideBottomRight',
                    fill: '#f97316',
                    fontSize: 12
                  }} 
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RiverQualityTrendChart;

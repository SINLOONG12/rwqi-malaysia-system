
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getUniqueLocations, getLocationData } from '@/utils/riverData';

const RiverQualityTrendChart: React.FC = () => {
  const locations = getUniqueLocations();
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [selectedMetric, setSelectedMetric] = useState('rwqiScore');
  
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

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between">
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
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RiverQualityTrendChart;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { time: '00:00', flow: 1.2, depth: 0.8, trash: 5 },
  { time: '03:00', flow: 1.3, depth: 0.9, trash: 7 },
  { time: '06:00', flow: 1.5, depth: 1.0, trash: 8 },
  { time: '09:00', flow: 1.8, depth: 1.2, trash: 12 },
  { time: '12:00', flow: 2.0, depth: 1.3, trash: 15 },
  { time: '15:00', flow: 1.7, depth: 1.1, trash: 18 },
  { time: '18:00', flow: 1.5, depth: 1.0, trash: 22 },
  { time: '21:00', flow: 1.3, depth: 0.9, trash: 25 },
  { time: 'Now', flow: 1.2, depth: 0.8, trash: 27 },
];

const RiverFlowChart: React.FC = () => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>River Flow Analysis (24 hours)</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            flow: { color: '#3b82f6' },
            depth: { color: '#8b5cf6' },
            trash: { color: '#ef4444' },
          }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <ChartTooltip
                content={<ChartTooltipContent />}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="flow"
                name="Flow Rate (m³/s)"
                stroke="#3b82f6"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="depth"
                name="Depth (m)"
                stroke="#8b5cf6"
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="trash"
                name="Trash Detected (items)"
                stroke="#ef4444"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RiverFlowChart;

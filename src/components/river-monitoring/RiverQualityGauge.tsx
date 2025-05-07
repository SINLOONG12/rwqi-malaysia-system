
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer
} from "@/components/ui/chart";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend,
  Sector 
} from 'recharts';

const data = [
  { name: 'Dissolved Oxygen', value: 85, color: '#3b82f6' },
  { name: 'BOD', value: 70, color: '#8b5cf6' },
  { name: 'COD', value: 65, color: '#f97316' },
  { name: 'Nitrogen', value: 80, color: '#10b981' },
  { name: 'Suspended Solids', value: 75, color: '#64748b' },
  { name: 'pH Level', value: 90, color: '#06b6d4' },
];

const rwqiScore = data.reduce((acc, item) => acc + item.value, 0) / data.length;
const rwqiColor = rwqiScore >= 80 ? '#10b981' : 
                 rwqiScore >= 60 ? '#f97316' : '#ef4444';

const RiverQualityGauge: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { 
      cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, percent, value
    } = props;
    
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" className="text-xs">
          {`${payload.name}: ${value}/100`}
        </text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999" className="text-xs">
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>River Water Quality Index (RWQI)</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="text-center mb-4">
          <div className="text-4xl font-bold" style={{ color: rwqiColor }}>
            {Math.round(rwqiScore)}/100
          </div>
          <div className="text-sm text-muted-foreground">
            {rwqiScore >= 80 ? 'Good' : rwqiScore >= 60 ? 'Moderate' : 'Poor'} Quality
          </div>
        </div>
        
        <ChartContainer
          config={Object.fromEntries(data.map(item => [item.name, { color: item.color }]))}
        >
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                onMouseEnter={onPieEnter}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RiverQualityGauge;

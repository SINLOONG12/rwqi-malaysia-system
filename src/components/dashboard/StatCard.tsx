
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    positive: boolean;
  };
  icon?: React.ReactNode;
  iconColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  iconColor = 'bg-dashboard-blue',
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
            {change && (
              <p className={cn(
                'text-xs font-medium mt-1 flex items-center',
                change.positive ? 'text-dashboard-green' : 'text-dashboard-red'
              )}>
                {change.positive ? '↑' : '↓'} {change.value}
              </p>
            )}
          </div>
          {icon && (
            <div className={cn('p-2 rounded-full', iconColor)}>
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;

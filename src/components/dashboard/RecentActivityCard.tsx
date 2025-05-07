
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const activities = [
  {
    id: 1,
    action: 'New customer signed up',
    name: 'Acme Corp',
    time: '35 minutes ago',
    status: 'success',
  },
  {
    id: 2,
    action: 'Invoice paid',
    name: 'TechGrow Inc',
    time: '2 hours ago',
    status: 'success',
  },
  {
    id: 3,
    action: 'New support ticket',
    name: 'Jane Smith - Feature Request',
    time: '5 hours ago',
    status: 'warning',
  },
  {
    id: 4,
    action: 'Payment failed',
    name: 'Digital Solutions LLC',
    time: '1 day ago',
    status: 'error',
  },
];

const statusColors = {
  success: 'bg-dashboard-green',
  warning: 'bg-dashboard-orange',
  error: 'bg-dashboard-red',
};

const RecentActivityCard: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors"
            >
              <div className={`w-2 h-2 rounded-full mt-2 ${statusColors[activity.status as keyof typeof statusColors]}`} />
              <div>
                <p className="text-sm font-medium">{activity.action}</p>
                <p className="text-sm text-muted-foreground">{activity.name}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;

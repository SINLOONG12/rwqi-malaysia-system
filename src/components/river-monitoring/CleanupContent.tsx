
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CleanupContent: React.FC = () => {
  return (
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
  );
};

export default CleanupContent;

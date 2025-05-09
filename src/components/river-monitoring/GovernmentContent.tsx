
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertTriangle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface GovernmentContentProps {
  onDownloadReport: () => void;
}

const GovernmentContent: React.FC<GovernmentContentProps> = ({ onDownloadReport }) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-dashboard-orange" />
          Policy Compliance Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-2 border-b">
            <span className="font-medium">National Water Quality Standards</span>
            <Badge variant="destructive">4 Rivers Non-Compliant</Badge>
          </div>
          <div className="flex justify-between items-center pb-2 border-b">
            <span className="font-medium">Clean Rivers Program Target</span>
            <Badge variant="outline" className="text-dashboard-orange border-dashboard-orange">62% Achieved</Badge>
          </div>
          <div className="flex justify-between items-center pb-2 border-b">
            <span className="font-medium">Annual Improvement Rate</span>
            <Badge variant="outline" className="text-dashboard-green border-dashboard-green">+5.3% YoY</Badge>
          </div>
          <Button onClick={onDownloadReport} className="mt-2">Download Full Compliance Report</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GovernmentContent;

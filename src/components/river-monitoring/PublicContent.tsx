
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertTriangle, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface PublicContentProps {
  onSubmitFeedback: () => void;
}

const PublicContent: React.FC<PublicContentProps> = ({ onSubmitFeedback }) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Citizen Engagement</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>Help keep our rivers clean by reporting pollution incidents and participating in community cleanup events.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Report River Pollution
            </Button>
            <Button variant="outline" className="flex items-center justify-center">
              <Users className="h-4 w-4 mr-2" />
              Join Cleanup Events
            </Button>
          </div>
          <div className="mt-4 p-4 bg-muted rounded-md">
            <h4 className="font-medium mb-2">Improve Our System</h4>
            <p className="text-sm mb-2">How accurate was the water quality data for your area?</p>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={onSubmitFeedback}>Very Accurate</Button>
              <Button size="sm" variant="outline" onClick={onSubmitFeedback}>Somewhat Accurate</Button>
              <Button size="sm" variant="outline" onClick={onSubmitFeedback}>Not Accurate</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PublicContent;

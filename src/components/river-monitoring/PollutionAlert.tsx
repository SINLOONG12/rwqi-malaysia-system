
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Activity } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface PollutionAlertProps {
  location: string;
  score: number;
  userRole: "government" | "cleanup" | "public" | "publisher";
}

const PollutionAlert: React.FC<PollutionAlertProps> = ({ location, score, userRole }) => {
  // Determine the effective role for UI rendering
  // Publishers should see the same UI as government officials
  const effectiveRole = userRole === "publisher" ? "government" : userRole;
  
  return (
    <Alert variant="destructive" className="border-dashboard-red">
      <Activity className="h-4 w-4" />
      <AlertTitle>Pollution Alert</AlertTitle>
      <AlertDescription>
        High pollution levels detected at {location}. 
        RWQI Score: {score.toFixed(2)} - Very Poor Quality.
        {effectiveRole === "cleanup" && (
          <div className="mt-2">
            <Badge className="bg-destructive mr-2">Priority: High</Badge>
            <Badge variant="outline" className="border-destructive text-destructive">Immediate Action Required</Badge>
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default PollutionAlert;

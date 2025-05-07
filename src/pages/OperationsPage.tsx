
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OperationsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Operations</h1>
        <p className="text-muted-foreground">Monitor and improve your operational efficiency.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Operations Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the operations page. More detailed content will be added in future iterations.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OperationsPage;

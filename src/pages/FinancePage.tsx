
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FinancePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Finance</h1>
        <p className="text-muted-foreground">Monitor your financial health and metrics.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Finance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the finance page. More detailed content will be added in future iterations.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancePage;

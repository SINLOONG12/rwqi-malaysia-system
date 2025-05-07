
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SalesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Sales</h1>
        <p className="text-muted-foreground">Monitor your sales performance and pipeline.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the sales page. More detailed content will be added in future iterations.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesPage;

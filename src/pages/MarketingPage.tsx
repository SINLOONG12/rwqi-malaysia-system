
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MarketingPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Marketing</h1>
        <p className="text-muted-foreground">Track your marketing campaigns and performance.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Marketing Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the marketing page. More detailed content will be added in future iterations.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingPage;

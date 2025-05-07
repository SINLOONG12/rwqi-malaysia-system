
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CustomersPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Customers</h1>
        <p className="text-muted-foreground">Manage and analyze your customer data.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Customer Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the customers page. More detailed content will be added in future iterations.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomersPage;

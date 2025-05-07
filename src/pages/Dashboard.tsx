
import React from 'react';
import StatCard from '@/components/dashboard/StatCard';
import RevenueChart from '@/components/dashboard/RevenueChart';
import CustomerChart from '@/components/dashboard/CustomerChart';
import RecentActivityCard from '@/components/dashboard/RecentActivityCard';
import { ChartBar } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to your startup operations dashboard.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Monthly Revenue" 
          value="$24,230" 
          change={{ value: "12% from last month", positive: true }} 
          icon={<ChartBar className="h-5 w-5 text-white" />}
          iconColor="bg-dashboard-indigo"
        />
        <StatCard 
          title="New Customers" 
          value="34" 
          change={{ value: "7% from last month", positive: true }} 
          icon={<ChartBar className="h-5 w-5 text-white" />}
          iconColor="bg-dashboard-blue"
        />
        <StatCard 
          title="Active Users" 
          value="573" 
          change={{ value: "16% from last month", positive: true }} 
          icon={<ChartBar className="h-5 w-5 text-white" />}
          iconColor="bg-dashboard-purple"
        />
        <StatCard 
          title="Churn Rate" 
          value="2.3%" 
          change={{ value: "0.5% from last month", positive: false }} 
          icon={<ChartBar className="h-5 w-5 text-white" />}
          iconColor="bg-dashboard-red"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueChart />
        <CustomerChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentActivityCard />
        <div className="lg:col-span-2">
          {/* Placeholder for future expansion */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

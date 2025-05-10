
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserUploadsList from './UserUploadsList';
import ReportsList from './ReportsList';
import UploadForm from './UploadForm';
import { recentUploads, availableReports } from './mock-data';

const UserUploads: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("uploads");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 border-blue-100 dark:border-blue-900/50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-xl font-bold text-blue-700 dark:text-blue-400">Community Contributions</CardTitle>
            <CardDescription className="text-muted-foreground">
              User-submitted data and official reports
            </CardDescription>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
            <TabsList className="grid grid-cols-2 bg-muted/50 p-1 rounded-lg">
              <TabsTrigger 
                value="uploads" 
                className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground"
              >
                User Uploads
              </TabsTrigger>
              <TabsTrigger 
                value="reports" 
                className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground"
              >
                Available Reports
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <TabsContent value="uploads" className="m-0 mt-2">
            <UserUploadsList uploads={recentUploads} />
          </TabsContent>
          
          <TabsContent value="reports" className="m-0 mt-2">
            <ReportsList reports={availableReports} />
          </TabsContent>
        </CardContent>
      </Card>

      <Card className="border-blue-100 dark:border-blue-900/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold text-blue-700 dark:text-blue-400">Contribute</CardTitle>
          <CardDescription className="text-muted-foreground">
            Upload geo-tagged photos, videos, or documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UploadForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default UserUploads;

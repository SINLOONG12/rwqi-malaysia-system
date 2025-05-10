
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
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Community Contributions</CardTitle>
            <CardDescription>
              User-submitted data and official reports
            </CardDescription>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="uploads">User Uploads</TabsTrigger>
              <TabsTrigger value="reports">Available Reports</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <TabsContent value="uploads" className="m-0">
            <UserUploadsList uploads={recentUploads} />
          </TabsContent>
          
          <TabsContent value="reports" className="m-0">
            <ReportsList reports={availableReports} />
          </TabsContent>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contribute</CardTitle>
          <CardDescription>
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

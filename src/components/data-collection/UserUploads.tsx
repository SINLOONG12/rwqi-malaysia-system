
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import UserUploadsList from './UserUploadsList';
import ReportsList from './ReportsList';
import UploadForm from './UploadForm';
import { recentUploads, availableReports } from './mock-data';

interface UserUploadsProps {
  publisherMode?: boolean;
}

const UserUploads: React.FC<UserUploadsProps> = ({ publisherMode = false }) => {
  const [activeTab, setActiveTab] = useState<string>("uploads");
  const [filteredUploads, setFilteredUploads] = useState(recentUploads);
  
  const handleFilterUploads = (status: string) => {
    if (status === "all") {
      setFilteredUploads(recentUploads);
    } else {
      setFilteredUploads(recentUploads.filter(upload => upload.status === status));
    }
  };

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
            {publisherMode && (
              <div className="mb-4 flex flex-wrap gap-2">
                <Button 
                  variant={filteredUploads === recentUploads ? "default" : "outline"} 
                  size="sm"
                  onClick={() => handleFilterUploads("all")}
                >
                  All Uploads
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleFilterUploads("pending")}
                >
                  Pending Review
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleFilterUploads("verified")}
                >
                  Verified
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleFilterUploads("rejected")}
                >
                  Rejected
                </Button>
              </div>
            )}
            <UserUploadsList uploads={filteredUploads} publisherMode={publisherMode} />
          </TabsContent>
          
          <TabsContent value="reports" className="m-0 mt-2">
            <ReportsList reports={availableReports} publisherMode={publisherMode} />
          </TabsContent>
        </CardContent>
      </Card>

      <Card className="border-blue-100 dark:border-blue-900/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold text-blue-700 dark:text-blue-400">
            {publisherMode ? "Publisher Upload" : "Contribute"}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {publisherMode 
              ? "Upload official reports and data" 
              : "Upload geo-tagged photos, videos, or documents"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UploadForm publisherMode={publisherMode} />
        </CardContent>
      </Card>
    </div>
  );
};

export default UserUploads;

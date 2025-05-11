
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Camera, Upload, File, Users, CheckCircle, XCircle } from 'lucide-react';
import { recentUploads, availableReports } from './mock-data';

const PublisherDashboard: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("submissions");
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  const [reportType, setReportType] = useState<string>("pdf");

  const handleApproveSubmission = (id: string) => {
    toast({
      title: "Submission Approved",
      description: `Submission #${id} has been approved and published.`,
    });
  };

  const handleRejectSubmission = (id: string) => {
    toast({
      title: "Submission Rejected",
      description: `Submission #${id} has been rejected.`,
    });
  };

  const handlePublishReport = () => {
    toast({
      title: "Report Published",
      description: "Your report has been published successfully.",
    });
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your report draft has been saved.",
    });
  };

  const simulatedPendingSubmissions = recentUploads.slice(0, 4).map(upload => ({
    ...upload,
    status: 'pending'
  }));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Publisher Dashboard</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Manage Contributors
          </Button>
          <Button className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            Configure Camera Feeds
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="submissions">Pending Submissions</TabsTrigger>
          <TabsTrigger value="publish">Publish Report</TabsTrigger>
          <TabsTrigger value="analytics">Content Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="submissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Community Submissions Awaiting Review</CardTitle>
              <CardDescription>
                Review and moderate user-submitted content before publishing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {simulatedPendingSubmissions.map(submission => (
                  <div key={submission.id} className="border rounded-lg p-4 flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-32 h-24 bg-slate-200 dark:bg-slate-800 rounded-md flex items-center justify-center">
                      <File className="h-10 w-10 text-slate-500" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <h4 className="font-medium">{submission.location}</h4>
                        <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 px-2 py-0.5 rounded">
                          Pending Review
                        </span>
                      </div>
                      
                      <p className="mt-2 text-sm">{submission.description}</p>
                      
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <span>Submitted on {submission.date} by {submission.user}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 justify-end mt-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          View Details
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center gap-2 text-red-600"
                          onClick={() => handleRejectSubmission(submission.id)}
                        >
                          <XCircle className="h-4 w-4" />
                          Reject
                        </Button>
                        <Button 
                          size="sm"
                          className="flex items-center gap-2"
                          onClick={() => handleApproveSubmission(submission.id)}
                        >
                          <CheckCircle className="h-4 w-4" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="publish">
          <Card>
            <CardHeader>
              <CardTitle>Publish New Report</CardTitle>
              <CardDescription>
                Create and publish official reports for public access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="report-title">Report Title</Label>
                  <Input id="report-title" placeholder="Enter report title" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Rivers</SelectItem>
                        <SelectItem value="Klang">Sungai Klang</SelectItem>
                        <SelectItem value="Gombak">Sungai Gombak</SelectItem>
                        <SelectItem value="Damansara">Sungai Damansara</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Report Type</Label>
                    <Select value={reportType} onValueChange={setReportType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF Document</SelectItem>
                        <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                        <SelectItem value="word">Word Document</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Access Level</Label>
                    <Select defaultValue="public">
                      <SelectTrigger>
                        <SelectValue placeholder="Select access level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="government">Government Only</SelectItem>
                        <SelectItem value="cleanup">Cleanup Teams Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="report-description">Description</Label>
                  <Textarea id="report-description" placeholder="Enter report description" />
                </div>
                
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center">
                  <Upload className="h-10 w-10 text-slate-400 mb-2" />
                  <p className="text-sm font-medium">Upload Report File</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Support for PDF, DOC, XLSX up to 20MB
                  </p>
                  <Input type="file" className="hidden" id="report-file" />
                  <Button variant="outline" className="mt-4" onClick={() => document.getElementById('report-file')?.click()}>
                    Select File
                  </Button>
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button variant="outline" type="button" onClick={handleSaveDraft}>
                    Save as Draft
                  </Button>
                  <Button type="button" onClick={handlePublishReport}>
                    Publish Report
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Content Analytics</CardTitle>
              <CardDescription>
                Track usage and engagement with your published content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Report Downloads</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {['Total Downloads', 'Unique Users', 'Government Access', 'Public Access'].map((stat, i) => (
                      <div key={i} className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                        <div className="text-sm text-muted-foreground">{stat}</div>
                        <div className="text-2xl font-bold mt-1">{(i + 1) * 128}</div>
                        <div className="text-xs text-green-600 mt-1">↑ {(i + 1) * 5}% from last month</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Most Accessed Reports</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-100 dark:bg-slate-800">
                        <tr>
                          <th className="text-left p-3">Report Title</th>
                          <th className="text-left p-3">Published</th>
                          <th className="text-left p-3">Downloads</th>
                          <th className="text-left p-3">Type</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {availableReports.slice(0, 5).map((report, i) => (
                          <tr key={report.id}>
                            <td className="p-3">{report.title}</td>
                            <td className="p-3">{report.date}</td>
                            <td className="p-3">{(5 - i) * 42}</td>
                            <td className="p-3 uppercase text-xs">{report.type}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PublisherDashboard;

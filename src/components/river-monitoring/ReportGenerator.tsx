
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText } from 'lucide-react';
import { getUniqueLocations } from '@/utils/riverData';
import GovernmentReport from './reports/GovernmentReport';
import CleanupReport from './reports/CleanupReport';
import PublicReport from './reports/PublicReport';

interface ReportGeneratorProps {
  userRole: "government" | "cleanup" | "public";
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({ userRole }) => {
  const locations = getUniqueLocations();
  const [selectedLocation, setSelectedLocation] = useState<string>("All Rivers");
  const [selectedFormat, setSelectedFormat] = useState<string>("pdf");
  
  const reportFormats = [
    { value: "pdf", label: "PDF Document" },
    { value: "excel", label: "Excel Spreadsheet" },
    { value: "word", label: "Word Document" },
    { value: "csv", label: "CSV Data" }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Report Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="w-full md:w-1/2">
            <label className="text-sm font-medium mb-1 block">Select River</label>
            <Select
              value={selectedLocation}
              onValueChange={setSelectedLocation}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Rivers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Rivers">All Rivers</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-1/2">
            <label className="text-sm font-medium mb-1 block">Report Format</label>
            <Select
              value={selectedFormat}
              onValueChange={setSelectedFormat}
            >
              <SelectTrigger>
                <SelectValue placeholder="PDF Document" />
              </SelectTrigger>
              <SelectContent>
                {reportFormats.map(format => (
                  <SelectItem key={format.value} value={format.value}>
                    {format.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {userRole === "government" && (
          <GovernmentReport riverName={selectedLocation} />
        )}

        {userRole === "cleanup" && (
          <CleanupReport riverName={selectedLocation} />
        )}

        {userRole === "public" && (
          <PublicReport riverName={selectedLocation} />
        )}
      </CardContent>
    </Card>
  );
};

export default ReportGenerator;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { riverQualityData, getRwqiCategory, getRwqiColor } from '@/utils/riverData';

const RiverQualityDataTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  // Filter data based on search term
  const filteredData = riverQualityData.filter(item => 
    item.date.includes(searchTerm) || 
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayData = filteredData.slice(startIndex, startIndex + itemsPerPage);
  
  // Handle pagination
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>River Quality Historical Data</CardTitle>
        <Input
          placeholder="Search by date or location..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
        />
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>DO (mg/L)</TableHead>
                <TableHead>BOD (mg/L)</TableHead>
                <TableHead>COD (mg/L)</TableHead>
                <TableHead>NH₃-N (mg/L)</TableHead>
                <TableHead>pH</TableHead>
                <TableHead>Trash (0-10)</TableHead>
                <TableHead>RWQI Score</TableHead>
                <TableHead>Quality</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayData.length > 0 ? (
                displayData.map((item, index) => (
                  <TableRow key={`${item.date}-${item.location}-${index}`}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.dissolvedOxygen}</TableCell>
                    <TableCell>{item.biochemicalOxygenDemand}</TableCell>
                    <TableCell>{item.chemicalOxygenDemand}</TableCell>
                    <TableCell>{item.ammoniacalNitrogen}</TableCell>
                    <TableCell>{item.pH}</TableCell>
                    <TableCell>{item.trashDetected}</TableCell>
                    <TableCell>{item.rwqiScore.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div 
                          className="h-3 w-3 rounded-full mr-2"
                          style={{ backgroundColor: getRwqiColor(item.rwqiScore) }}
                        ></div>
                        <span>{getRwqiCategory(item.rwqiScore)}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-4">
                    No data found matching your search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-3 py-1">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RiverQualityDataTable;

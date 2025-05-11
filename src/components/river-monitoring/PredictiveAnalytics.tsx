import React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  ChartBar, 
  TrendingUp, 
  Filter, 
  AlertTriangle, 
  Calendar, 
  Download,
  ThermometerSnowflake,
  CloudRain
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useToast } from "@/hooks/use-toast";
import { riverQualityData, getUniqueLocations } from '@/utils/riverData';

interface PredictiveAnalyticsProps {
  userRole: "government" | "cleanup" | "public" | "publisher";
}

const PredictiveAnalytics: React.FC<PredictiveAnalyticsProps> = ({ userRole }) => {
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState<number>(7);
  const [selectedLocation, setSelectedLocation] = useState<string>("All Locations");
  const [analysisType, setAnalysisType] = useState<"predictive" | "correlation" | "impact">("predictive");
  
  const locations = ["All Locations", ...getUniqueLocations()];

  // Simple handler for generating reports
  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: `Your ${analysisType} analysis report has been generated for ${selectedLocation === "All Locations" ? "all rivers" : selectedLocation}.`,
    });
  };

  // Sample forecast data
  const forecastData = [
    { day: 'Today', rwqi: 0.45, predicted: 0.44 },
    { day: 'Tomorrow', rwqi: null, predicted: 0.43 },
    { day: 'Day 3', rwqi: null, predicted: 0.41 },
    { day: 'Day 4', rwqi: null, predicted: 0.39 },
    { day: 'Day 5', rwqi: null, predicted: 0.38 },
    { day: 'Day 6', rwqi: null, predicted: 0.40 },
    { day: 'Day 7', rwqi: null, predicted: 0.42 }
  ];

  // Sample correlation data
  const correlationData = [
    { factor: 'Rainfall', correlation: 0.78, impact: 'High negative' },
    { factor: 'Temperature', correlation: 0.35, impact: 'Medium negative' },
    { factor: 'Industrial Activity', correlation: 0.82, impact: 'High negative' },
    { factor: 'Cleanup Operations', correlation: 0.65, impact: 'Medium positive' },
    { factor: 'Urban Runoff', correlation: 0.70, impact: 'High negative' }
  ];

  return (
    <div className="space-y-6">
      {/* Analysis Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ChartBar className="h-5 w-5 mr-2" />
            Advanced River Quality Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium block mb-2">Analysis Type</label>
              <Select value={analysisType} onValueChange={(value: "predictive" | "correlation" | "impact") => setAnalysisType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select analysis type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="predictive">Predictive Forecasting</SelectItem>
                  <SelectItem value="correlation">Correlation Analysis</SelectItem>
                  <SelectItem value="impact">Environmental Impact</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium block mb-2">Location</label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium block mb-2">Time Range (Days): {timeRange}</label>
              <Slider
                value={[timeRange]}
                min={1}
                max={30}
                step={1}
                onValueChange={(value) => setTimeRange(value[0])}
                className="mb-6"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleGenerateReport}>
              Generate Analysis Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Predictive Analytics Content */}
      {analysisType === "predictive" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              RWQI Prediction for {selectedLocation === "All Locations" ? "Malaysian Rivers" : selectedLocation}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3">
                <h3 className="font-medium">7-Day Water Quality Forecast</h3>
                <Badge variant="outline" className="border-dashboard-red text-dashboard-red mt-2 sm:mt-0">
                  <AlertTriangle className="h-3 w-3 mr-1" /> 
                  Declining Trend Detected
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Our AI model predicts a gradual decline in water quality over the next 5 days, followed by slight improvement.
                This forecast is based on recent water quality parameters, weather predictions, and historical patterns.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="flex items-center text-xs text-muted-foreground">
                  <CloudRain className="h-3 w-3 mr-1" /> 
                  <span>Rainfall forecast: Moderate</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <ThermometerSnowflake className="h-3 w-3 mr-1" /> 
                  <span>Temperature trend: Stable</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" /> 
                  <span>Data confidence: 87%</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Filter className="h-3 w-3 mr-1" /> 
                  <span>Sensor quality: Good</span>
                </div>
              </div>
            </div>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={forecastData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[0, 1]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="rwqi" 
                    name="Actual RWQI" 
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                    dot={{ r: 4 }}
                    activeDot={{ r: 8 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    name="Predicted RWQI" 
                    stroke="#ef4444" 
                    strokeWidth={2} 
                    strokeDasharray="3 3"
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {userRole === "government" && (
              <div className="mt-4 border-t pt-4">
                <h3 className="font-medium mb-2">Recommended Actions</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Increase monitoring frequency in potentially affected areas</li>
                  <li>Prepare cleanup resources for potential pollution event</li>
                  <li>Alert industrial facilities upstream about compliance monitoring</li>
                  <li>Notify water treatment facilities of potential quality changes</li>
                </ul>
                <div className="flex justify-end mt-4">
                  <Button variant="outline" className="flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Export Forecast Data
                  </Button>
                </div>
              </div>
            )}

            {userRole === "cleanup" && (
              <div className="mt-4 border-t pt-4">
                <h3 className="font-medium mb-2">Resource Planning Recommendations</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Deploy additional teams to Sungai Juru by day 3</li>
                  <li>Prepare oil containment equipment for potential industrial discharge</li>
                  <li>Schedule additional shifts for Days 4-5 when quality is predicted to be lowest</li>
                  <li>Coordinate with water treatment facilities for increased filtration</li>
                </ul>
                <div className="flex justify-end mt-4">
                  <Button variant="outline" className="flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Download Cleanup Schedule
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Correlation Analysis Content */}
      {analysisType === "correlation" && (
        <Card>
          <CardHeader>
            <CardTitle>Environmental Factor Correlation Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium mb-2">Key Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Our analysis shows strong correlations between river quality and several environmental and human factors.
                  Industrial activity has the strongest negative correlation with water quality, followed by rainfall and urban runoff.
                </p>
              </div>

              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Environmental Factor</th>
                    <th className="text-center py-2">Correlation Coefficient</th>
                    <th className="text-right py-2">Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {correlationData.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3">{item.factor}</td>
                      <td className="text-center py-3">{item.correlation.toFixed(2)}</td>
                      <td className="text-right py-3">
                        <Badge 
                          variant="outline" 
                          className={item.impact.includes('negative') ? 'border-red-500 text-red-500' : 'border-green-500 text-green-500'}
                        >
                          {item.impact}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {userRole === "government" && (
                <div className="mt-4 border-t pt-4">
                  <h3 className="font-medium mb-2">Policy Recommendations</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Strengthen industrial discharge regulations based on correlation data</li>
                    <li>Implement urban runoff management requirements in highly correlated areas</li>
                    <li>Increase frequency of inspections during high rainfall periods</li>
                    <li>Allocate additional resources for cleanup operations at strategic timing</li>
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Environmental Impact Content */}
      {analysisType === "impact" && (
        <Card>
          <CardHeader>
            <CardTitle>Environmental Impact Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="ecosystem">
              <TabsList className="mb-4">
                <TabsTrigger value="ecosystem">Ecosystem Health</TabsTrigger>
                <TabsTrigger value="biodiversity">Biodiversity</TabsTrigger>
                <TabsTrigger value="compliance">Regulatory Compliance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="ecosystem">
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h3 className="font-medium text-red-700 mb-2">Critical Ecosystem Impact</h3>
                    <p className="text-sm text-red-600">
                      Current pollution levels in {selectedLocation === "All Locations" ? "several rivers" : selectedLocation} are causing significant stress on aquatic ecosystems.
                      Dissolved oxygen levels are below sustainable thresholds for many native fish species.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Fish Population</h4>
                      <div className="text-2xl font-bold text-red-500 mb-1">-32%</div>
                      <p className="text-xs text-muted-foreground">Decline over 6 months</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Plant Species</h4>
                      <div className="text-2xl font-bold text-orange-500 mb-1">-18%</div>
                      <p className="text-xs text-muted-foreground">Reduction in diversity</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Microorganism Activity</h4>
                      <div className="text-2xl font-bold text-red-500 mb-1">-45%</div>
                      <p className="text-xs text-muted-foreground">Below healthy levels</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="biodiversity">
                <div className="space-y-4">
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h3 className="font-medium text-orange-700 mb-2">Biodiversity Warning</h3>
                    <p className="text-sm text-orange-600">
                      Ongoing monitoring shows reduced biodiversity in affected river sections.
                      3 native fish species are now rarely observed in previously common habitats.
                    </p>
                  </div>
                  
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Species</th>
                        <th className="text-center py-2">Historic Presence</th>
                        <th className="text-center py-2">Current Status</th>
                        <th className="text-right py-2">Risk Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">Malaysian Mahseer (Ikan Kelah)</td>
                        <td className="text-center py-2">Common</td>
                        <td className="text-center py-2">Rare</td>
                        <td className="text-right py-2">
                          <Badge variant="destructive">High</Badge>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Tapah</td>
                        <td className="text-center py-2">Common</td>
                        <td className="text-center py-2">Uncommon</td>
                        <td className="text-right py-2">
                          <Badge variant="outline" className="border-orange-500 text-orange-500">Medium</Badge>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Freshwater Prawn (Udang Galah)</td>
                        <td className="text-center py-2">Abundant</td>
                        <td className="text-center py-2">Declining</td>
                        <td className="text-right py-2">
                          <Badge variant="outline" className="border-orange-500 text-orange-500">Medium</Badge>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="compliance">
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h3 className="font-medium text-red-700 mb-2">Compliance Status</h3>
                    <p className="text-sm text-red-600">
                      Multiple river sections are not meeting national environmental quality standards.
                      Current levels may trigger regulatory intervention if not addressed.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-4">Regulatory Standards Compliance</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Malaysian Water Quality Index</span>
                          <span className="text-sm font-medium">36% compliant</span>
                        </div>
                        <div className="h-2 rounded bg-gray-200">
                          <div className="h-2 rounded bg-red-500" style={{ width: '36%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">ASEAN Water Quality Criteria</span>
                          <span className="text-sm font-medium">42% compliant</span>
                        </div>
                        <div className="h-2 rounded bg-gray-200">
                          <div className="h-2 rounded bg-red-500" style={{ width: '42%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">National Water Quality Standards</span>
                          <span className="text-sm font-medium">51% compliant</span>
                        </div>
                        <div className="h-2 rounded bg-gray-200">
                          <div className="h-2 rounded bg-orange-500" style={{ width: '51%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Role-specific insights section */}
      {userRole === "government" && (
        <Card>
          <CardHeader>
            <CardTitle>Policy Impact Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Based on our predictive and correlation analysis, we recommend the following policy actions to improve river water quality:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Strengthen industrial discharge regulations for chemical facilities near Sungai Juru and Sungai Klang</li>
                <li>Implement stricter urban runoff management in metropolitan areas</li>
                <li>Increase monitoring frequency during monsoon seasons when correlation is highest</li>
                <li>Invest in early warning systems at key upstream locations</li>
              </ul>
              <Button className="mt-2">Generate Policy Brief</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {userRole === "cleanup" && (
        <Card>
          <CardHeader>
            <CardTitle>Recommended Resource Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Equipment Needs</h4>
                <ul className="text-sm space-y-1">
                  <li>• Oil containment booms (3 units)</li>
                  <li>• Heavy debris collectors (5 units)</li>
                  <li>• Plastic waste extractors (8 units)</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Personnel Requirements</h4>
                <ul className="text-sm space-y-1">
                  <li>• Field operators (12)</li>
                  <li>• Environmental specialists (3)</li>
                  <li>• Logistics coordinators (2)</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Schedule Optimization</h4>
                <ul className="text-sm space-y-1">
                  <li>• Priority locations: Sungai Juru, Klang</li>
                  <li>• Peak hours: 8am-11am, 2pm-5pm</li>
                  <li>• Duration: 5-day operation</li>
                </ul>
              </div>
            </div>
            <Button className="mt-4">Download Resource Plan</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PredictiveAnalytics;

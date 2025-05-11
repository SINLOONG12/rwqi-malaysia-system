import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Play, Pause, AlertTriangle, CheckCircle, BarChartHorizontal } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { detectPollutionInFrame, DetectionResult } from '@/utils/aiDetection';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Simulated camera data
const cameraSources = [
  { id: 'cam-001', name: 'Sungai Klang - Station 1', location: 'Kuala Lumpur', status: 'online' },
  { id: 'cam-002', name: 'Sungai Gombak - Station 1', location: 'Kuala Lumpur', status: 'online' },
  { id: 'cam-003', name: 'Sungai Pinang - Station 1', location: 'Penang', status: 'offline' },
  { id: 'cam-004', name: 'Sungai Kelantan - Station 1', location: 'Kelantan', status: 'online' },
  { id: 'cam-005', name: 'Sungai Perak - Station 1', location: 'Perak', status: 'maintenance' }
];

interface LiveCameraFeedsProps {
  publisherMode?: boolean;
}

const LiveCameraFeeds: React.FC<LiveCameraFeedsProps> = ({ publisherMode }) => {
  const { toast } = useToast();
  const [selectedCamera, setSelectedCamera] = useState<string>('cam-001');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [archiveDate, setArchiveDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [aiEnabled, setAiEnabled] = useState<boolean>(true);
  const [detectionMode, setDetectionMode] = useState<'all' | 'plastic' | 'oil' | 'chemical'>('all');
  const [detections, setDetections] = useState<DetectionResult[]>([]);
  const [activeTab, setActiveTab] = useState<string>('live');

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const detectionCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Setup AI detection loop when video is playing
  useEffect(() => {
    if (!isPlaying || !aiEnabled) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }
    
    let lastDetectionTime = 0;
    
    const detectLoop = async (timestamp: number) => {
      // Only run detection every 500ms to improve performance
      if (timestamp - lastDetectionTime > 500) {
        const results = await detectPollutionInFrame(videoRef.current, canvasRef.current);
        
        // Filter results based on selected detection mode
        let filteredResults = results;
        if (detectionMode !== 'all') {
          filteredResults = results.filter(result => result.type === detectionMode);
        }
        
        setDetections(filteredResults);
        lastDetectionTime = timestamp;
      }
      
      animationRef.current = requestAnimationFrame(detectLoop);
    };
    
    animationRef.current = requestAnimationFrame(detectLoop);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, aiEnabled, detectionMode]);

  const handlePlayPause = () => {
    const newPlayState = !isPlaying;
    setIsPlaying(newPlayState);
    
    if (newPlayState && videoRef.current) {
      videoRef.current.play();
      toast({
        title: "Stream Started",
        description: `Camera feed streaming for ${cameraSources.find(cam => cam.id === selectedCamera)?.name}`,
      });
    } else if (videoRef.current) {
      videoRef.current.pause();
      toast({
        title: "Stream Paused",
        description: `Camera feed paused for ${cameraSources.find(cam => cam.id === selectedCamera)?.name}`,
      });
    }
  };

  const handleArchiveSearch = () => {
    toast({
      title: "Archive Search",
      description: `Searching archived footage for ${cameraSources.find(cam => cam.id === selectedCamera)?.name} on ${archiveDate}`,
    });
    
    // In a real implementation, this would fetch archived video data
    setActiveTab('archived');
  };

  const handleAddCamera = () => {
    toast({
      title: "Feature Not Available",
      description: "Camera addition functionality is under development.",
      variant: "destructive"
    });
  };
  
  const handleAiToggle = (enabled: boolean) => {
    setAiEnabled(enabled);
    toast({
      title: enabled ? "AI Detection Enabled" : "AI Detection Disabled",
      description: enabled ? 
        "Real-time pollution detection is now active." : 
        "Real-time pollution detection has been turned off.",
    });
  };
  
  const pollutionTypeCounts = {
    plastic: detections.filter(d => d.type === 'plastic').length,
    oil: detections.filter(d => d.type === 'oil').length,
    chemical: detections.filter(d => d.type === 'chemical').length,
    debris: detections.filter(d => d.type === 'debris').length,
    unknown: detections.filter(d => d.type === 'unknown').length,
  };
  
  const totalDetections = Object.values(pollutionTypeCounts).reduce((sum, count) => sum + count, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {activeTab === 'live' ? 'Live Feed with AI Analysis' : 'Archived Footage Analysis'}
          </CardTitle>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList>
              <TabsTrigger value="live">Live</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-video bg-slate-950 rounded-md overflow-hidden flex items-center justify-center">
            {/* Hidden canvas for AI detection processing */}
            <canvas ref={canvasRef} className="hidden"></canvas>
            
            {/* Video display */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="h-20 w-20 text-white/30" strokeWidth={1} />
              </div>
            )}
            
            <TabsContent value="live" className="m-0 h-full w-full">
              {isPlaying ? (
                <video 
                  ref={videoRef}
                  className="w-full h-full object-cover" 
                  loop 
                  muted 
                  autoPlay 
                  src="https://assets.mixkit.co/videos/preview/mixkit-river-flowing-in-the-rocks-33762-large.mp4"
                />
              ) : (
                <img 
                  src="https://images.unsplash.com/photo-1520877880798-5ee004e3f11e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80" 
                  alt="River camera snapshot" 
                  className="w-full h-full object-cover opacity-60"
                />
              )}
            </TabsContent>
            
            <TabsContent value="archived" className="m-0 h-full w-full">
              <div className="h-full w-full flex items-center justify-center bg-slate-900 text-white">
                <div className="text-center">
                  <BarChartHorizontal className="h-16 w-16 mx-auto mb-4 text-white/30" />
                  <p className="text-lg font-medium">Archived Analysis Data</p>
                  <p className="text-sm text-white/70">Select a date and search to view archived footage analysis</p>
                </div>
              </div>
            </TabsContent>
            
            {/* AI Detection Overlay */}
            {isPlaying && aiEnabled && detections.length > 0 && (
              <div className="absolute top-4 right-4 left-auto max-w-[50%] bg-black/70 p-3 rounded-md">
                <h4 className="text-white text-sm font-semibold flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  Pollution Detected
                </h4>
                <div className="flex flex-wrap gap-2">
                  {pollutionTypeCounts.plastic > 0 && (
                    <Badge variant="outline" className="bg-amber-500/20 text-amber-300 border-amber-500">
                      {pollutionTypeCounts.plastic} Plastic
                    </Badge>
                  )}
                  {pollutionTypeCounts.oil > 0 && (
                    <Badge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-500">
                      {pollutionTypeCounts.oil} Oil
                    </Badge>
                  )}
                  {pollutionTypeCounts.chemical > 0 && (
                    <Badge variant="outline" className="bg-red-500/20 text-red-300 border-red-500">
                      {pollutionTypeCounts.chemical} Chemical
                    </Badge>
                  )}
                  {pollutionTypeCounts.debris > 0 && (
                    <Badge variant="outline" className="bg-lime-500/20 text-lime-300 border-lime-500">
                      {pollutionTypeCounts.debris} Debris
                    </Badge>
                  )}
                </div>
              </div>
            )}
            
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 p-3 rounded-md flex justify-between items-center">
              <div className="text-white">
                <span className="font-semibold">
                  {cameraSources.find(cam => cam.id === selectedCamera)?.name}
                </span>
                <div className="text-xs text-white/70 flex items-center gap-2">
                  <span>
                    {cameraSources.find(cam => cam.id === selectedCamera)?.location}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-white/70"></span>
                  <span>{activeTab === 'live' ? 'Live' : 'Archived'}</span>
                  {activeTab === 'live' && (
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {activeTab === 'live' && (
                  <div className="flex items-center mr-2">
                    <span className="text-xs text-white mr-2">AI</span>
                    <Switch 
                      checked={aiEnabled}
                      onCheckedChange={handleAiToggle}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </div>
                )}
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="bg-white/10 border-white/20 hover:bg-white/20"
                  onClick={handlePlayPause}
                  disabled={activeTab === 'archived'}
                >
                  {isPlaying ? <Pause className="h-4 w-4 text-white" /> : <Play className="h-4 w-4 text-white" />}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="camera-select">Select Camera</Label>
              <Select 
                value={selectedCamera}
                onValueChange={setSelectedCamera}
              >
                <SelectTrigger id="camera-select" className="w-full">
                  <SelectValue placeholder="Select camera" />
                </SelectTrigger>
                <SelectContent>
                  {cameraSources.map(camera => (
                    <SelectItem key={camera.id} value={camera.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{camera.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          camera.status === 'online' ? 'bg-green-100 text-green-800' :
                          camera.status === 'offline' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {camera.status}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <Label htmlFor="archive-date">Archive Date</Label>
              <div className="flex gap-2">
                <Input
                  id="archive-date"
                  type="date"
                  value={archiveDate}
                  onChange={(e) => setArchiveDate(e.target.value)}
                />
                <Button variant="secondary" onClick={handleArchiveSearch}>Search</Button>
              </div>
            </div>
          </div>
          
          {/* AI Detection Controls */}
          {aiEnabled && (
            <div className="mt-4 p-3 border border-border rounded-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">AI Detection Settings</h3>
                {totalDetections > 0 && (
                  <Badge variant={totalDetections > 5 ? "destructive" : "secondary"}>
                    {totalDetections} Detection{totalDetections !== 1 ? 's' : ''}
                  </Badge>
                )}
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                <Button 
                  variant={detectionMode === 'all' ? "default" : "outline"} 
                  size="sm"
                  className="text-xs"
                  onClick={() => setDetectionMode('all')}
                >
                  All Types
                </Button>
                <Button 
                  variant={detectionMode === 'plastic' ? "default" : "outline"} 
                  size="sm"
                  className="text-xs"
                  onClick={() => setDetectionMode('plastic')}
                >
                  Plastic
                </Button>
                <Button 
                  variant={detectionMode === 'oil' ? "default" : "outline"} 
                  size="sm"
                  className="text-xs"
                  onClick={() => setDetectionMode('oil')}
                >
                  Oil
                </Button>
                <Button 
                  variant={detectionMode === 'chemical' ? "default" : "outline"} 
                  size="sm"
                  className="text-xs"
                  onClick={() => setDetectionMode('chemical')}
                >
                  Chemical
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Analysis Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isPlaying && aiEnabled ? (
              <>
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md">
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    AI System Status
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Detection Status:</div>
                    <div className="font-medium text-green-600 dark:text-green-400">Active</div>
                    <div>Model:</div>
                    <div className="font-medium">RiverPollutionDetect v2.1</div>
                    <div>Frame Rate:</div>
                    <div className="font-medium">2 FPS</div>
                    <div>Confidence Threshold:</div>
                    <div className="font-medium">70%</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Detection Results</h3>
                  {detections.length > 0 ? (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {detections.map((detection, index) => (
                        <div 
                          key={`${detection.type}-${detection.timestamp}-${index}`}
                          className="flex justify-between items-center p-2 bg-slate-100 dark:bg-slate-800 rounded"
                        >
                          <div>
                            <p className="font-medium text-sm capitalize">{detection.type}</p>
                            <p className="text-xs text-muted-foreground">
                              Confidence: {(detection.confidence * 100).toFixed(1)}%
                            </p>
                          </div>
                          <Badge 
                            variant={
                              detection.confidence > 0.85 ? "destructive" : 
                              detection.confidence > 0.7 ? "default" : 
                              "outline"
                            }
                          >
                            {detection.confidence > 0.85 ? 'High' : detection.confidence > 0.7 ? 'Medium' : 'Low'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-4 bg-slate-100 dark:bg-slate-800 rounded">
                      <p className="text-sm text-muted-foreground">No pollution detected in current frame.</p>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Detection Summary</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between p-2 bg-amber-50 dark:bg-amber-900/20 rounded">
                      <span>Plastic</span>
                      <span className="font-medium">{pollutionTypeCounts.plastic}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                      <span>Oil</span>
                      <span className="font-medium">{pollutionTypeCounts.oil}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-red-50 dark:bg-red-900/20 rounded">
                      <span>Chemical</span>
                      <span className="font-medium">{pollutionTypeCounts.chemical}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-lime-50 dark:bg-lime-900/20 rounded">
                      <span>Debris</span>
                      <span className="font-medium">{pollutionTypeCounts.debris}</span>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full" disabled>
                  Generate Detailed Report
                </Button>
              </>
            ) : (
              <div className="text-center p-8">
                <AlertTriangle className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-lg font-medium">AI Analysis Inactive</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Start the video stream and enable AI detection to analyze river conditions
                </p>
                <Button onClick={() => {setIsPlaying(true); setAiEnabled(true);}}>
                  Start Analysis
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveCameraFeeds;

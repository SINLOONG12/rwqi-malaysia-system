
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Play, Pause } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Simulated camera data
const cameraSources = [
  { id: 'cam-001', name: 'Sungai Klang - Station 1', location: 'Kuala Lumpur', status: 'online' },
  { id: 'cam-002', name: 'Sungai Gombak - Station 1', location: 'Kuala Lumpur', status: 'online' },
  { id: 'cam-003', name: 'Sungai Pinang - Station 1', location: 'Penang', status: 'offline' },
  { id: 'cam-004', name: 'Sungai Kelantan - Station 1', location: 'Kelantan', status: 'online' },
  { id: 'cam-005', name: 'Sungai Perak - Station 1', location: 'Perak', status: 'maintenance' }
];

const LiveCameraFeeds: React.FC = () => {
  const { toast } = useToast();
  const [selectedCamera, setSelectedCamera] = useState<string>('cam-001');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [archiveDate, setArchiveDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    toast({
      title: isPlaying ? "Stream Paused" : "Stream Started",
      description: `Camera feed ${isPlaying ? 'paused' : 'streaming'} for ${cameraSources.find(cam => cam.id === selectedCamera)?.name}`,
    });
  };

  const handleArchiveSearch = () => {
    toast({
      title: "Archive Search",
      description: `Searching archived footage for ${cameraSources.find(cam => cam.id === selectedCamera)?.name} on ${archiveDate}`,
    });
  };

  const handleAddCamera = () => {
    toast({
      title: "Feature Not Available",
      description: "Camera addition functionality is under development.",
      variant: "destructive"
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Live Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-video bg-slate-950 rounded-md overflow-hidden flex items-center justify-center">
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="h-20 w-20 text-white/30" strokeWidth={1} />
              </div>
            )}
            {isPlaying ? (
              <video 
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
                  <span>Live</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-white/10 border-white/20 hover:bg-white/20"
                onClick={handlePlayPause}
              >
                {isPlaying ? <Pause className="h-4 w-4 text-white" /> : <Play className="h-4 w-4 text-white" />}
              </Button>
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Camera Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Camera Status</h3>
              <div className="space-y-2">
                {cameraSources.map(camera => (
                  <div key={camera.id} className="flex justify-between items-center p-2 bg-slate-100 dark:bg-slate-800 rounded">
                    <div>
                      <p className="font-medium">{camera.name}</p>
                      <p className="text-xs text-muted-foreground">{camera.location}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      camera.status === 'online' ? 'bg-green-100 text-green-800' :
                      camera.status === 'offline' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {camera.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Add New Camera</h3>
              <div className="flex gap-2">
                <Input placeholder="Camera ID or RTSP URL" />
                <Button variant="outline" onClick={handleAddCamera}>Add</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveCameraFeeds;

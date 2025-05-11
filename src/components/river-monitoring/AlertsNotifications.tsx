import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Bell, BellOff, AlertTriangle, Check, Clock, Filter, Download, FileText } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface AlertsNotificationsProps {
  userRole: "government" | "cleanup" | "public" | "publisher";
}

const AlertsNotifications: React.FC<AlertsNotificationsProps> = ({ userRole }) => {
  const { toast } = useToast();
  const [alertFilter, setAlertFilter] = useState<"all" | "high" | "medium" | "low">("all");
  const [subscribedAlerts, setSubscribedAlerts] = useState(() => {
    // Try to load saved settings from localStorage
    const savedSettings = localStorage.getItem('alertSettings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
    return {
      email: true,
      sms: false,
      app: true,
      critical: true,
      sensor: false,
      cleanup: true
    };
  });

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('alertSettings', JSON.stringify(subscribedAlerts));
  }, [subscribedAlerts]);

  const handleSettingsSave = () => {
    // Settings are already saved via the useEffect, this is just for user feedback
    localStorage.setItem('alertSettings', JSON.stringify(subscribedAlerts));
    
    toast({
      title: "Alert preferences saved",
      description: "Your notification settings have been updated successfully."
    });
  };

  const handleClearAll = () => {
    toast({
      title: "Alerts cleared",
      description: "All notifications have been marked as read."
    });
  };

  const handleAcknowledge = (alertId: string) => {
    toast({
      title: "Alert acknowledged",
      description: `Alert #${alertId} has been marked as acknowledged.`
    });
  };

  const handleGenerateReport = (alertId: string) => {
    toast({
      title: "Report Generated",
      description: `A detailed report for alert #${alertId} has been generated and is ready for download.`
    });
  };

  // Sample alerts data
  const alerts = [
    {
      id: "ALT-1023",
      type: "pollution",
      severity: "high",
      location: "Sungai Juru (Penang)",
      timestamp: "Today, 08:15 AM",
      message: "Critical pollution level detected. High concentrations of industrial waste and floating trash.",
      status: "unread",
      rwqi: 0.35
    },
    {
      id: "ALT-1022",
      type: "sensor",
      severity: "medium",
      location: "Sungai Klang (KL)",
      timestamp: "Yesterday, 10:42 PM",
      message: "pH sensor showing irregular readings. Possible calibration issue or actual pH fluctuation.",
      status: "unread",
      rwqi: 0.43
    },
    {
      id: "ALT-1021",
      type: "pollution",
      severity: "medium",
      location: "Sungai Langat (Selangor)",
      timestamp: "Yesterday, 03:20 PM",
      message: "Elevated levels of biochemical oxygen demand (BOD). Potential organic pollution source.",
      status: "read",
      rwqi: 0.44
    },
    {
      id: "ALT-1020",
      type: "cleanup",
      severity: "low",
      location: "Sungai Pahang (Pahang)",
      timestamp: "May 7, 09:30 AM",
      message: "Cleanup operation completed. Pre and post cleanup data shows 72% reduction in floating debris.",
      status: "read",
      rwqi: 0.69
    },
    {
      id: "ALT-1019",
      type: "sensor",
      severity: "high",
      location: "Sungai Gombak (KL)",
      timestamp: "May 6, 11:15 PM",
      message: "Multiple sensors offline in the Gombak area. Possible power or connectivity issue.",
      status: "read",
      rwqi: 0.39
    }
  ];

  // Filter alerts based on severity
  const filteredAlerts = alertFilter === "all" 
    ? alerts 
    : alerts.filter(alert => alert.severity === alertFilter);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Alerts & Notifications
          </CardTitle>
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant={alertFilter === "all" ? "default" : "outline"} 
              onClick={() => setAlertFilter("all")}
            >
              All
            </Button>
            <Button 
              size="sm" 
              variant={alertFilter === "high" ? "default" : "outline"} 
              className={alertFilter === "high" ? "bg-red-600 hover:bg-red-700" : ""}
              onClick={() => setAlertFilter("high")}
            >
              High
            </Button>
            <Button 
              size="sm" 
              variant={alertFilter === "medium" ? "default" : "outline"} 
              className={alertFilter === "medium" ? "bg-orange-500 hover:bg-orange-600" : ""}
              onClick={() => setAlertFilter("medium")}
            >
              Medium
            </Button>
            <Button 
              size="sm" 
              variant={alertFilter === "low" ? "default" : "outline"} 
              className={alertFilter === "low" ? "bg-green-600 hover:bg-green-700" : ""}
              onClick={() => setAlertFilter("low")}
            >
              Low
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-muted-foreground">
              Showing {filteredAlerts.length} of {alerts.length} alerts
            </div>
            <Button variant="outline" size="sm" onClick={handleClearAll}>
              <Check className="h-4 w-4 mr-2" />
              Mark all as read
            </Button>
          </div>

          {/* Alerts list */}
          <div className="space-y-4">
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map(alert => (
                <div 
                  key={alert.id}
                  className={`border rounded-lg p-4 transition-colors ${
                    alert.status === "unread" ? "bg-muted/50" : ""
                  } ${
                    alert.severity === "high" 
                      ? "border-l-4 border-l-red-500" 
                      : alert.severity === "medium" 
                        ? "border-l-4 border-l-orange-500" 
                        : "border-l-4 border-l-green-500"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                    <div className="flex items-center">
                      <Badge 
                        className={
                          alert.severity === "high" 
                            ? "bg-red-500" 
                            : alert.severity === "medium" 
                              ? "bg-orange-500" 
                              : "bg-green-500"
                        }
                      >
                        {alert.severity === "high" 
                          ? "High Priority" 
                          : alert.severity === "medium" 
                            ? "Medium Priority" 
                            : "Low Priority"}
                      </Badge>
                      <span className="ml-2 text-sm text-muted-foreground">{alert.timestamp}</span>
                    </div>
                    <div className="text-sm font-medium mt-2 sm:mt-0">
                      Alert #{alert.id} • RWQI: {alert.rwqi.toFixed(2)}
                    </div>
                  </div>
                  <h4 className="font-medium mb-1">{alert.location}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{alert.message}</p>
                  
                  {/* Action buttons - different for different user roles */}
                  <div className="flex flex-wrap justify-end gap-2">
                    {/* Report generation button for all user types */}
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleGenerateReport(alert.id)}
                      className="flex items-center"
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      Generate Report
                    </Button>
                    
                    {userRole === "cleanup" && alert.type === "pollution" && (
                      <Button size="sm" variant="default" className="flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        View Cleanup Plan
                      </Button>
                    )}
                    
                    {userRole === "government" && (
                      <Button size="sm" variant="default" className="flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        Download Full Report
                      </Button>
                    )}
                    
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleAcknowledge(alert.id)}
                    >
                      Acknowledge
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <BellOff className="mx-auto h-8 w-8 text-muted-foreground/50 mb-2" />
                <p className="text-muted-foreground">No alerts matching your filter</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notification settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Notification Methods</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="email" 
                    checked={subscribedAlerts.email}
                    onCheckedChange={(checked) => 
                      setSubscribedAlerts({...subscribedAlerts, email: checked === true})
                    }
                  />
                  <label htmlFor="email" className="text-sm">Email notifications</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="sms"
                    checked={subscribedAlerts.sms}
                    onCheckedChange={(checked) => 
                      setSubscribedAlerts({...subscribedAlerts, sms: checked === true})
                    }
                  />
                  <label htmlFor="sms" className="text-sm">SMS notifications</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="app" 
                    checked={subscribedAlerts.app}
                    onCheckedChange={(checked) => 
                      setSubscribedAlerts({...subscribedAlerts, app: checked === true})
                    }
                  />
                  <label htmlFor="app" className="text-sm">In-app notifications</label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Alert Types</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="critical" 
                    checked={subscribedAlerts.critical}
                    onCheckedChange={(checked) => 
                      setSubscribedAlerts({...subscribedAlerts, critical: checked === true})
                    }
                  />
                  <label htmlFor="critical" className="text-sm">Critical pollution events</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="sensor"
                    checked={subscribedAlerts.sensor}
                    onCheckedChange={(checked) => 
                      setSubscribedAlerts({...subscribedAlerts, sensor: checked === true})
                    }
                  />
                  <label htmlFor="sensor" className="text-sm">Sensor malfunctions or offline events</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="cleanup" 
                    checked={subscribedAlerts.cleanup}
                    onCheckedChange={(checked) => 
                      setSubscribedAlerts({...subscribedAlerts, cleanup: checked === true})
                    }
                  />
                  <label htmlFor="cleanup" className="text-sm">Cleanup operation updates</label>
                </div>
              </div>
            </div>

            <Button onClick={handleSettingsSave}>Save Notification Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertsNotifications;

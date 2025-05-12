
import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Check, 
  X, 
  AlertTriangle, 
  Info, 
  FileText, 
  MapPin,
  Camera
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Define notification types
export type NotificationType = "alert" | "report" | "update" | "camera" | "system";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: "high" | "medium" | "low";
  riverName?: string;
  reportId?: string;
  cameraId?: string;
  link?: string;
}

interface NotificationCenterProps {
  userRole: "government" | "cleanup" | "public" | "publisher";
  onNotificationClick?: (notification: Notification) => void;
}

// Mock notifications based on user role
const generateMockNotifications = (userRole: string): Notification[] => {
  const baseNotifications: Notification[] = [
    {
      id: "notif-1",
      type: "alert",
      title: "Critical pollution level",
      message: "Sungai Klang pollution levels have reached critical levels.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      priority: "high",
      riverName: "Sungai Klang"
    },
    {
      id: "notif-2",
      type: "system",
      title: "System maintenance",
      message: "System maintenance scheduled for tonight at 2:00 AM.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: true,
      priority: "low"
    }
  ];

  // Role-specific notifications
  if (userRole === "government" || userRole === "publisher") {
    baseNotifications.push(
      {
        id: "notif-3",
        type: "report",
        title: "New public report submitted",
        message: "A citizen reported oil spill in Sungai Gombak.",
        timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
        read: false,
        priority: "medium",
        riverName: "Sungai Gombak",
        reportId: "REP-2023-05-12"
      },
      {
        id: "notif-4",
        type: "camera",
        title: "Camera feed offline",
        message: "Camera ID CAM-003 at Sungai Selangor is offline.",
        timestamp: new Date(Date.now() - 1000 * 60 * 90), // 90 minutes ago
        read: false,
        priority: "medium",
        cameraId: "CAM-003",
        riverName: "Sungai Selangor"
      }
    );
  }

  if (userRole === "cleanup") {
    baseNotifications.push(
      {
        id: "notif-5",
        type: "update",
        title: "Cleanup scheduled",
        message: "New cleanup operation scheduled at Sungai Juru for tomorrow.",
        timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
        read: false,
        priority: "medium",
        riverName: "Sungai Juru"
      }
    );
  }

  if (userRole === "public") {
    baseNotifications.push(
      {
        id: "notif-6",
        type: "report",
        title: "Report status update",
        message: "Your report REP-2023-05-10 has been reviewed and action is being taken.",
        timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
        read: false,
        priority: "medium",
        reportId: "REP-2023-05-10"
      }
    );
  }

  return baseNotifications;
};

const NotificationCenter: React.FC<NotificationCenterProps> = ({ 
  userRole,
  onNotificationClick 
}) => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  
  useEffect(() => {
    // Load notifications based on user role
    setNotifications(generateMockNotifications(userRole));
  }, [userRole]);

  // Filter notifications by tab
  const getFilteredNotifications = () => {
    if (activeTab === "all") {
      return notifications;
    } else if (activeTab === "unread") {
      return notifications.filter(n => !n.read);
    } else {
      return notifications.filter(n => n.type === activeTab);
    }
  };

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
    toast({
      title: "All notifications marked as read",
      description: "You've marked all notifications as read."
    });
  };

  // Handle notification click
  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    markAsRead(notification.id);
    
    // Close popover
    setOpen(false);
    
    // Execute callback if provided
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
    
    // For this demo, we'll show a toast
    toast({
      title: notification.title,
      description: notification.message
    });
  };

  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  // Get icon for notification type
  const getNotificationIcon = (type: NotificationType) => {
    switch(type) {
      case "alert": return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "report": return <FileText className="h-5 w-5 text-blue-500" />;
      case "update": return <Info className="h-5 w-5 text-green-500" />;
      case "camera": return <Camera className="h-5 w-5 text-purple-500" />;
      case "system": return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="relative h-9 w-9 p-0">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 sm:w-96 p-0" 
        align="end" 
        alignOffset={-10} 
        sideOffset={10}
      >
        <div className="flex items-center justify-between border-b px-3 py-2">
          <h3 className="font-medium">Notifications</h3>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 text-xs" 
                onClick={markAllAsRead}
              >
                Mark all read
              </Button>
            )}
          </div>
        </div>
        
        <Tabs 
          defaultValue="all" 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="px-1 pt-1"
        >
          <TabsList className="grid grid-cols-5 h-8">
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            <TabsTrigger value="alert" className="text-xs">Alerts</TabsTrigger>
            <TabsTrigger value="report" className="text-xs">Reports</TabsTrigger>
            <TabsTrigger value="camera" className="text-xs">Cameras</TabsTrigger>
            <TabsTrigger value="unread" className="text-xs">Unread</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0">
            <ScrollArea className="h-64 py-1">
              {getFilteredNotifications().length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-8">
                  <Bell className="h-10 w-10 text-muted-foreground/50 mb-2" />
                  <p className="text-sm text-muted-foreground">No notifications to display</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {getFilteredNotifications().map((notification) => (
                    <button
                      key={notification.id}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-md transition-colors",
                        notification.read 
                          ? "hover:bg-muted/60" 
                          : "bg-muted/40 hover:bg-muted"
                      )}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="pt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="font-medium text-sm line-clamp-1">{notification.title}</div>
                            <div className="text-[10px] text-muted-foreground">
                              {new Date(notification.timestamp).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{notification.message}</p>
                          {notification.riverName && (
                            <div className="flex items-center mt-1">
                              <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span className="text-[10px] text-muted-foreground">{notification.riverName}</span>
                            </div>
                          )}
                          {notification.priority === "high" && (
                            <Badge variant="destructive" className="mt-1 text-[10px] h-4">High Priority</Badge>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
        
        <div className="bg-muted/50 px-3 py-2 text-center">
          <Button 
            variant="link" 
            className="text-xs h-auto p-0 text-muted-foreground"
          >
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;

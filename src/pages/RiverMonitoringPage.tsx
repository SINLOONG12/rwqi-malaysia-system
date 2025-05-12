
import React, { useState } from 'react';
import { riverQualityData } from '@/utils/riverData';
import { useToast } from "@/hooks/use-toast";
import { Notification } from '@/components/notifications/NotificationCenter';
import PageHeader from '@/components/river-monitoring/page-components/PageHeader';
import QuickActions from '@/components/river-monitoring/page-components/QuickActions';
import TabContent from '@/components/river-monitoring/tabs/TabContent';

// Define a type for all possible user roles
type UserRole = "government" | "cleanup" | "public" | "publisher";

const RiverMonitoringPage: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [userRole, setUserRole] = useState<UserRole>("government");
  const [quickActionIsVisible, setQuickActionIsVisible] = useState<boolean>(true);
  
  // Get today's data (using the latest date available)
  const latestDate = riverQualityData.reduce((latest, current) => {
    return new Date(current.date) > new Date(latest.date) ? current : latest;
  }, riverQualityData[0]);

  // Get worst location data from latest date
  const lowestRwqiLocation = riverQualityData
    .filter(data => data.date === latestDate.date)
    .reduce((lowest, current) => {
      return current.rwqiScore < lowest.rwqiScore ? current : lowest;
    });

  // Simulate downloading a report
  const handleDownloadReport = () => {
    toast({
      title: "Report Downloaded",
      description: "The river quality report has been downloaded successfully.",
    });
  };

  // Simulate submitting feedback
  const handleSubmitFeedback = () => {
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback! It helps improve our AI models.",
    });
  };

  // Handle quick action navigation with improved functionality
  const handleQuickAction = (tabId: string) => {
    setActiveTab(tabId);
    
    // Scroll to the tab content
    setTimeout(() => {
      const tabElement = document.querySelector(`[data-tab="${tabId}"]`);
      if (tabElement) {
        tabElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    
    toast({
      title: `${tabId.charAt(0).toUpperCase() + tabId.slice(1)} View`,
      description: `Switched to ${tabId} view successfully.`,
    });
  };

  // Handle notification click
  const handleNotificationClick = (notification: Notification) => {
    // For report notifications, navigate to reports tab
    if (notification.type === "report" && notification.reportId) {
      setActiveTab("reports");
      toast({
        title: "Report Detail",
        description: `Viewing details for report ${notification.reportId}`
      });
    } 
    // For alert notifications, navigate to alerts tab
    else if (notification.type === "alert" && notification.riverName) {
      setActiveTab("alerts");
      toast({
        title: "Alert Detail",
        description: `Viewing alert for ${notification.riverName}`
      });
    }
    // For camera notifications, we would navigate to camera feed
    else if (notification.type === "camera" && notification.cameraId) {
      // In a real app, this would navigate to the camera feed page or section
      window.open("/data-collection?tab=camera-feeds", "_blank");
    }
  };

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6">
      <PageHeader 
        userRole={userRole} 
        setUserRole={setUserRole}
        onNotificationClick={handleNotificationClick} 
      />
      
      <QuickActions 
        visible={quickActionIsVisible}
        setVisible={setQuickActionIsVisible}
        onQuickAction={handleQuickAction}
      />

      <TabContent 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        lowestRwqiLocation={lowestRwqiLocation}
        latestDate={latestDate}
        onDownloadReport={handleDownloadReport}
        onSubmitFeedback={handleSubmitFeedback}
      />
    </div>
  );
};

export default RiverMonitoringPage;

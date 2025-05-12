
import React from 'react';
import NotificationCenter from '@/components/notifications/NotificationCenter';
import RoleSelector from '@/components/river-monitoring/RoleSelector';
import { Notification } from '@/components/notifications/NotificationCenter';

interface PageHeaderProps {
  userRole: "government" | "cleanup" | "public" | "publisher";
  setUserRole: (role: "government" | "cleanup" | "public" | "publisher") => void;
  onNotificationClick: (notification: Notification) => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  userRole, 
  setUserRole,
  onNotificationClick
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
          Malaysian River Water Quality Index
        </h1>
        <p className="text-muted-foreground mt-2">
          Real-time monitoring of river conditions and pollution detection across Malaysia
        </p>
      </div>
      
      <div className="mt-4 md:mt-0 flex items-center gap-3">
        <NotificationCenter 
          userRole={userRole} 
          onNotificationClick={onNotificationClick}
        />
        <RoleSelector userRole={userRole} setUserRole={setUserRole} />
      </div>
    </div>
  );
};

export default PageHeader;

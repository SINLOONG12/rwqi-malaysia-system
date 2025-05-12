
import React from 'react';

interface RoleSpecificInfoProps {
  userRole: "government" | "cleanup" | "public" | "publisher";
  filteredRivers: string[];
  filterType: string;
}

const RoleSpecificInfo: React.FC<RoleSpecificInfoProps> = ({ 
  userRole, 
  filteredRivers,
  filterType 
}) => {
  if (userRole === "government") {
    return (
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
        <h3 className="text-sm font-medium mb-1">Policy Impact Analysis</h3>
        <p className="text-xs text-muted-foreground">
          View detailed compliance reports and policy effectiveness for all mapped river systems.
        </p>
      </div>
    );
  }

  if (userRole === "cleanup") {
    return (
      <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
        <h3 className="text-sm font-medium mb-1">Cleanup Scheduling Status</h3>
        <p className="text-xs text-muted-foreground">
          {filteredRivers.length} rivers currently displayed. {filterType === "critical" ? "High" : "Normal"} priority for cleanup operations.
        </p>
      </div>
    );
  }

  return null;
};

export default RoleSpecificInfo;

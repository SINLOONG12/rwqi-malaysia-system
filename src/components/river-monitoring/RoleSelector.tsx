
import React from 'react';
import { Button } from "@/components/ui/button";

interface RoleSelectorProps {
  userRole: "government" | "cleanup" | "public" | "publisher";
  setUserRole: (role: "government" | "cleanup" | "public" | "publisher") => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ userRole, setUserRole }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="text-sm text-muted-foreground mr-2">View as:</div>
      <div className="flex border rounded-lg overflow-hidden">
        <Button 
          variant={userRole === "government" ? "default" : "outline"} 
          className="rounded-none border-0"
          onClick={() => setUserRole("government")}
        >
          Government
        </Button>
        <Button 
          variant={userRole === "cleanup" ? "default" : "outline"} 
          className="rounded-none border-0 border-x"
          onClick={() => setUserRole("cleanup")}
        >
          Cleanup Team
        </Button>
        <Button 
          variant={userRole === "publisher" ? "default" : "outline"} 
          className="rounded-none border-0 border-x"
          onClick={() => setUserRole("publisher")}
        >
          Publisher
        </Button>
        <Button 
          variant={userRole === "public" ? "default" : "outline"} 
          className="rounded-none border-0"
          onClick={() => setUserRole("public")}
        >
          Public
        </Button>
      </div>
    </div>
  );
};

export default RoleSelector;

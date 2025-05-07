
import React from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

const Navbar: React.FC = () => {
  return (
    <header className="border-b bg-background px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div className="hidden md:flex">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search..." 
                className="w-64 pl-8 bg-background" 
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative rounded-full p-1.5 hover:bg-accent">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-dashboard-red"></span>
          </button>
          
          <div className="border-l h-6 mx-2"></div>
          
          <div className="flex items-center gap-2">
            <div className="hidden md:block text-sm text-right">
              <div className="font-medium">Founder</div>
              <div className="text-xs text-muted-foreground">admin@startup.com</div>
            </div>
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback>FS</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

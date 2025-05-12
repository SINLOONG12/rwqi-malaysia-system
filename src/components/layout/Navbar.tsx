
import React from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search, LogOut, Google } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
          <div className="hidden md:flex">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search rivers, locations..." 
                className="w-64 pl-8 bg-background/50 focus-visible:bg-background" 
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative rounded-full">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-destructive"></span>
          </Button>
          
          <Button variant="ghost" size="icon" className="rounded-full" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
          
          <div className="border-l h-6 mx-2 border-border"></div>
          
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-sm text-right">
              <div className="font-medium">{user?.name || 'User'}</div>
              <div className="text-xs text-muted-foreground">{user?.email || 'user@gmail.com'}</div>
            </div>
            <Avatar className="h-9 w-9 border-2 border-primary/20">
              <AvatarImage src={user?.photoURL || ""} />
              <AvatarFallback className={`${user?.photoURL ? "" : "bg-gradient-to-br from-blue-500 to-cyan-500"} text-primary-foreground`}>
                {user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

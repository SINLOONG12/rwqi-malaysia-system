
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Droplet, 
  Database,
  Map,
  AlertTriangle,
  Users,
  CloudRain
} from 'lucide-react';

const menuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
    path: '/',
  },
  {
    id: 'river-monitoring',
    label: 'River Monitoring',
    icon: <Droplet className="h-5 w-5" />,
    path: '/river-monitoring',
  },
  {
    id: 'data-collection',
    label: 'Data Collection',
    icon: <Database className="h-5 w-5" />,
    path: '/data-collection',
  },
  {
    id: 'map-view',
    label: 'Map View',
    icon: <Map className="h-5 w-5" />,
    path: '/river-monitoring?tab=map',
  },
  {
    id: 'alerts',
    label: 'Alerts & Notifications',
    icon: <AlertTriangle className="h-5 w-5" />,
    path: '/river-monitoring?tab=alerts',
  },
  {
    id: 'analytics',
    label: 'Advanced Analytics',
    icon: <CloudRain className="h-5 w-5" />,
    path: '/river-monitoring?tab=analytics',
  },
];

const Sidebar: React.FC = () => {
  return (
    <SidebarComponent>
      <div className="p-4 flex items-center">
        <span className="text-xl font-bold text-dashboard-indigo">Malaysian River Quality</span>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        isActive ? 'text-dashboard-indigo' : ''
                      }
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComponent>
  );
};

export default Sidebar;

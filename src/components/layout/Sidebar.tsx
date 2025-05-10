
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
  Users,
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
    id: 'community',
    label: 'Community',
    icon: <Users className="h-5 w-5" />,
    path: '/data-collection?tab=user-uploads',
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

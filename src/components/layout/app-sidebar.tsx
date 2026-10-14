import * as React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import ElementDetail from '../periodic-table/element-detail';
import HeaderLogo from './header-logo';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-12 border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <HeaderLogo />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <ElementDetail />
      </SidebarContent>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}

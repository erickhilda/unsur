import * as React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import Image from 'next/image';
import ElementDetail from '../periodic-table/element-detail';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-12 border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center">
            <Image
              src="/logo.svg"
              height={72}
              width={72}
              className="h-8 w-8"
              alt="a logo image with a text of P t"
            />
            <h2 className="ml-2">
              <b className="text-lg">P</b>eriodic <b className="text-lg">T</b>
              able
            </h2>
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

<script setup lang="ts">
// Port of app-sidebar.tsx.
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '~/components/ui/sidebar'
import ElementDetail from '~/components/periodic-table/element-detail.vue'
import HeaderLogo from './header-logo.vue'
</script>

<template>
  <Sidebar collapsible="offcanvas">
    <SidebarHeader class="h-12 border-b border-sidebar-border">
      <SidebarMenu>
        <SidebarMenuItem>
          <HeaderLogo />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <ElementDetail />
    </SidebarContent>
  </Sidebar>
</template>

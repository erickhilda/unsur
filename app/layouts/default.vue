<script setup lang="ts">
import AppHeader from '~/components/layout/app-header.vue'
import AppSidebar from '~/components/layout/app-sidebar.vue'
import { SidebarProvider, SidebarInset } from '~/components/ui/sidebar'
import { useElementStore } from '~/stores/element-store'

// Router-level data is static; nothing to fetch. Store is instantiated here so
// components can resolve it via useElementStore() (provide/inject under the hood).
useElementStore()
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <AppHeader />
      <slot />
    </SidebarInset>
  </SidebarProvider>
</template>

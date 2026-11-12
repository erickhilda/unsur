// Module surface wrapper (shadcn-vue style): lets consumers import
// { Sidebar, SidebarProvider, SidebarContent, SidebarHeader, SidebarMenu,
//   SidebarMenuItem, SidebarInset, useSidebar, ... } from
// '~/components/ui/sidebar' (extensionless) — TS moduleResolution=bundler
// doesn't append .vue to paths.
export { default as Sidebar } from './sidebar.vue'
export { default as SidebarProvider } from './sidebar-provider.vue'
export { default as SidebarContent } from './sidebar-content.vue'
export { default as SidebarHeader } from './sidebar-header.vue'
export { default as SidebarFooter } from './sidebar-footer.vue'
export { default as SidebarGroup } from './sidebar-group.vue'
export { default as SidebarGroupAction } from './sidebar-group-action.vue'
export { default as SidebarGroupContent } from './sidebar-group-content.vue'
export { default as SidebarGroupLabel } from './sidebar-group-label.vue'
export { default as SidebarInset } from './sidebar-inset.vue'
export { default as SidebarMenu } from './sidebar-menu.vue'
export { default as SidebarMenuItem } from './sidebar-menu-item.vue'
export { default as SidebarMenuAction } from './sidebar-menu-action.vue'
export { default as SidebarMenuButton } from './sidebar-menu-button.vue'
export { default as SidebarMenuBadge } from './sidebar-menu-badge.vue'
export { default as SidebarMenuSkeleton } from './sidebar-menu-skeleton.vue'
export { default as SidebarMenuSub } from './sidebar-menu-sub.vue'
export { default as SidebarMenuSubItem } from './sidebar-menu-sub-item.vue'
export { default as SidebarMenuSubButton } from './sidebar-menu-sub-button.vue'
export { default as SidebarTrigger } from './sidebar-trigger.vue'
export { default as SidebarRail } from './sidebar-rail.vue'
export { default as SidebarSeparator } from './sidebar-separator.vue'
export { default as SidebarInput } from './sidebar-input.vue'

export {
  useSidebar,
  SIDEBAR_COOKIE_NAME,
  SIDEBAR_COOKIE_MAX_AGE,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_MOBILE,
  SIDEBAR_WIDTH_ICON,
  SIDEBAR_KEYBOARD_SHORTCUT,
  setSidebarCookie,
  setSidebarIsMobile,
} from './sidebar-context'
export type { SidebarContextProps, SidebarStateState } from './sidebar-context'

export { sidebarMenuButtonVariants } from './sidebar-menu-button.vue'

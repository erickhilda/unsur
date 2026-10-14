<script lang="ts">
/**
 * SidebarMenuBadge — Vue port of the React SidebarMenuBadge
 * (sidebar.tsx 650–669).
 */
import { defineComponent, h } from 'vue'
import { cn } from '~/lib/utils'
import type { HTMLAttributes } from 'vue'

export default defineComponent({
  name: 'SidebarMenuBadge',
  props: {
    class: { type: Object as () => HTMLAttributes['class'], default: undefined },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        'div',
        {
          'data-sidebar': 'menu-badge',
          class: cn(
            'pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground',
            'peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
            'peer-data-[size=sm]/menu-button:top-1',
            'peer-data-[size=default]/menu-button:top-1.5',
            'peer-data-[size=lg]/menu-button:top-2.5',
            'group-data-[collapsible=icon]:hidden',
            props.class,
            (attrs.class as HTMLAttributes['class']) || undefined
          ),
        },
        slots.default?.()
      )
  },
})
</script>

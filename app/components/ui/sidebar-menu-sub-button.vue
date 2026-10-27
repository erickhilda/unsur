<script lang="ts">
/**
 * SidebarMenuSubButton — Vue port of the React SidebarMenuSubButton
 * (sidebar.tsx 732–761). size sm/md + isActive + asChild (Radix Slot shape).
 */
import { defineComponent, h } from 'vue'
import { cn } from '~/lib/utils'
import type { HTMLAttributes } from 'vue'

export default defineComponent({
  name: 'SidebarMenuSubButton',
  props: {
    asChild: { type: Boolean, default: false },
    size: { type: String as () => 'sm' | 'md', default: 'md' },
    isActive: { type: Boolean, default: false },
    class: { type: Object as () => HTMLAttributes['class'], default: undefined },
  },
  setup(props, { slots, attrs }) {
    const classes = () =>
      cn(
        'flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground',
        'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground',
        props.size === 'sm' && 'text-xs',
        props.size === 'md' && 'text-sm',
        'group-data-[collapsible=icon]:hidden',
        props.class,
        (attrs.class as HTMLAttributes['class']) || undefined
      )

    return () => {
      if (props.asChild) {
        const first = slots.default?.()[0]
        if (first) {
          return h(first, {
            'data-sidebar': 'menu-sub-button',
            'data-size': props.size,
            'data-active': props.isActive,
            class: classes(),
          })
        }
      }
      return h(
        'a',
        {
          'data-sidebar': 'menu-sub-button',
          'data-size': props.size,
          'data-active': props.isActive,
          class: classes(),
        },
        slots.default?.()
      )
    }
  },
})
</script>

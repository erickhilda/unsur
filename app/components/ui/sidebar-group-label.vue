<script lang="ts">
/**
 * SidebarGroupLabel — Vue port of the React SidebarGroupLabel
 * (sidebar.tsx 451–471). `asChild` renders the slot child as the element
 * (Radix Slot behavior) via a simple passthrough of attrs.
 */
import { defineComponent, h } from 'vue'
import { cn } from '~/lib/utils'
import type { HTMLAttributes } from 'vue'

export default defineComponent({
  name: 'SidebarGroupLabel',
  props: {
    asChild: { type: Boolean, default: false },
    class: { type: Object as () => HTMLAttributes['class'], default: undefined },
  },
  setup(props, { slots }) {
    return () => {
      // asChild: unwrap slot's first vnode so the label classes land on it.
      // Vue equivalent of Radix Slot — no dangerouslySetInnerHTML needed, the
      // schema differs from React (Vue slot vnodes carry their own props).
      if (props.asChild) {
        const first = slots.default?.()[0]
        if (first) {
          return h(first, {
            'data-sidebar': 'group-label',
            class: cn(
              'flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
              'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
              props.class
            ),
          })
        }
      }
      return h(
        'div',
        {
          'data-sidebar': 'group-label',
          class: cn(
            'flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
            'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
            props.class
          ),
        },
        slots.default?.()
      )
    }
  },
})
</script>

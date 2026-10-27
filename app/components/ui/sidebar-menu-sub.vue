<script lang="ts">
/**
 * SidebarMenuSub — Vue port of the React SidebarMenuSub (sidebar.tsx 709–724).
 */
import { defineComponent, h } from 'vue'
import { cn } from '~/lib/utils'
import type { HTMLAttributes } from 'vue'

export default defineComponent({
  name: 'SidebarMenuSub',
  props: {
    class: { type: Object as () => HTMLAttributes['class'], default: undefined },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        'ul',
        {
          'data-sidebar': 'menu-sub',
          class: cn(
            'mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5',
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

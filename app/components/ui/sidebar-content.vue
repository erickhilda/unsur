<script lang="ts">
/**
 * SidebarContent — Vue port of the React SidebarContent (sidebar.tsx 418–434).
 * The icon-collapsed overflow-hidden group rule keeps scroll areas sane.
 */
import { defineComponent, h } from 'vue'
import { cn } from '~/lib/utils'
import type { HTMLAttributes } from 'vue'

export default defineComponent({
  name: 'SidebarContent',
  props: {
    class: { type: Object as () => HTMLAttributes['class'], default: undefined },
  },
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        {
          'data-sidebar': 'content',
          class: cn(
            'flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overflow-x-hidden group-data-[collapsible=icon]:overflow-hidden',
            props.class
          ),
        },
        slots.default?.()
      )
  },
})
</script>

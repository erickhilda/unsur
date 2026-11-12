<script lang="ts">
/**
 * SidebarMenu — Vue port of the React SidebarMenu (sidebar.tsx 510–521).
 */
import { defineComponent, h } from 'vue'
import { cn } from '~/lib/utils'
import type { HTMLAttributes } from 'vue'

export default defineComponent({
  name: 'SidebarMenu',
  props: {
    class: { type: Object as () => HTMLAttributes['class'], default: undefined },
  },
  setup(props, { slots }) {
    return () =>
      h(
        'ul',
        {
          'data-sidebar': 'menu',
          'data-slot': 'sidebar-menu',
          class: cn('flex w-full min-w-0 flex-col gap-1', props.class),
        },
        slots.default?.()
      )
  },
})
</script>

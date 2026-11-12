<script lang="ts">
/**
 * SidebarGroup — Vue port of the React SidebarGroup (sidebar.tsx 436–449).
 */
import { defineComponent, h } from 'vue'
import { cn } from '~/lib/utils'
import type { HTMLAttributes } from 'vue'

export default defineComponent({
  name: 'SidebarGroup',
  props: {
    class: { type: Object as () => HTMLAttributes['class'], default: undefined },
  },
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        {
          'data-sidebar': 'group',
          class: cn('relative flex w-full min-w-0 flex-col p-2', props.class),
        },
        slots.default?.()
      )
  },
})
</script>

<script lang="ts">
/**
 * SidebarMenuSubItem — Vue port of the React SidebarMenuSubItem
 * (sidebar.tsx 726–730). Bare <li> passthrough.
 */
import { defineComponent, h } from 'vue'
import { cn } from '~/lib/utils'
import type { HTMLAttributes } from 'vue'

export default defineComponent({
  name: 'SidebarMenuSubItem',
  props: {
    class: { type: Object as () => HTMLAttributes['class'], default: undefined },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        'li',
        {
          class: props.class,
          ...(attrs as Record<string, unknown>),
        },
        slots.default?.()
      )
  },
})
</script>

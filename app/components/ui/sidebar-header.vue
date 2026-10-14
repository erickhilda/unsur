<script lang="ts">
/**
 * SidebarHeader — Vue port of the React SidebarHeader (sidebar.tsx 373–386).
 */
import { defineComponent, h } from 'vue'
import { cn } from '~/lib/utils'
import type { HTMLAttributes } from 'vue'

export default defineComponent({
  name: 'SidebarHeader',
  props: {
    class: { type: Object as () => HTMLAttributes['class'], default: undefined },
  },
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        {
          'data-sidebar': 'header',
          class: cn('flex flex-col gap-2 p-2', props.class),
        },
        slots.default?.()
      )
  },
})
</script>

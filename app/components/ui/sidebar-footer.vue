<script lang="ts">
/**
 * SidebarFooter — Vue port of the React SidebarFooter (sidebar.tsx 388–401).
 */
import { defineComponent, h } from 'vue'
import { cn } from '~/lib/utils'
import type { HTMLAttributes } from 'vue'

export default defineComponent({
  name: 'SidebarFooter',
  props: {
    class: { type: Object as () => HTMLAttributes['class'], default: undefined },
  },
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        {
          'data-sidebar': 'footer',
          class: cn('flex flex-col gap-2 p-2', props.class),
        },
        slots.default?.()
      )
  },
})
</script>

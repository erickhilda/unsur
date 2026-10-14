<script lang="ts">
/**
 * SidebarGroupContent — Vue port of the React SidebarGroupContent
 * (sidebar.tsx 497–508).
 */
import { defineComponent, h } from 'vue'
import { cn } from '~/lib/utils'
import type { HTMLAttributes } from 'vue'

export default defineComponent({
  name: 'SidebarGroupContent',
  props: {
    class: { type: Object as () => HTMLAttributes['class'], default: undefined },
  },
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        {
          'data-sidebar': 'group-content',
          class: cn('w-full text-sm', props.class),
        },
        slots.default?.()
      )
  },
})
</script>

<script lang="ts">
/**
 * SidebarMenuItem — Vue port of the React SidebarMenuItem (sidebar.tsx 523–534).
 */
import { defineComponent, h } from 'vue'
import { cn } from '~/lib/utils'
import type { HTMLAttributes } from 'vue'

export default defineComponent({
  name: 'SidebarMenuItem',
  props: {
    class: { type: Object as () => HTMLAttributes['class'], default: undefined },
  },
  setup(props, { slots }) {
    return () =>
      h(
        'li',
        {
          'data-sidebar': 'menu-item',
          class: cn('group/menu-item relative', props.class),
        },
        slots.default?.()
      )
  },
})
</script>

<script lang="ts">
/**
 * SidebarGroupAction — Vue port of the React SidebarGroupAction
 * (sidebar.tsx 473–495). `asChild` renders the slot child as the action.
 */
import { defineComponent, h } from 'vue'
import { cn } from '~/lib/utils'
import type { HTMLAttributes } from 'vue'

export default defineComponent({
  name: 'SidebarGroupAction',
  props: {
    asChild: { type: Boolean, default: false },
    class: { type: Object as () => HTMLAttributes['class'], default: undefined },
  },
  setup(props, { slots, attrs }) {
    const classes = () =>
      cn(
        'absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        // Increases the hit area of the button on mobile.
        'after:absolute after:-inset-2 after:md:hidden',
        'group-data-[collapsible=icon]:hidden',
        props.class,
        (attrs.class as HTMLAttributes['class']) || undefined
      )

    return () => {
      if (props.asChild) {
        const first = slots.default?.()[0]
        if (first) {
          return h(first, { 'data-sidebar': 'group-action', class: classes() })
        }
      }
      return h(
        'button',
        {
          'data-sidebar': 'group-action',
          class: classes(),
        },
        slots.default?.()
      )
    }
  },
})
</script>

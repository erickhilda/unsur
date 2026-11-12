<script lang="ts">
/**
 * SidebarMenuAction — Vue port of the React SidebarMenuAction
 * (sidebar.tsx 618–648). showOnHover toggles the opacity rule classes.
 */
import { defineComponent, h } from 'vue'
import { cn } from '~/lib/utils'
import type { HTMLAttributes } from 'vue'

export default defineComponent({
  name: 'SidebarMenuAction',
  props: {
    asChild: { type: Boolean, default: false },
    showOnHover: { type: Boolean, default: false },
    class: { type: Object as () => HTMLAttributes['class'], default: undefined },
  },
  setup(props, { slots, attrs }) {
    const classes = () =>
      cn(
        'absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0',
        // Increases the hit area of the button on mobile.
        'after:absolute after:-inset-2 after:md:hidden',
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',
        'group-data-[collapsible=icon]:hidden',
        props.showOnHover &&
          'group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0',
        props.class,
        (attrs.class as HTMLAttributes['class']) || undefined
      )

    return () => {
      if (props.asChild) {
        const first = slots.default?.()[0]
        if (first) {
          return h(first, { 'data-sidebar': 'menu-action', class: classes() })
        }
      }
      return h(
        'button',
        {
          'data-sidebar': 'menu-action',
          class: classes(),
        },
        slots.default?.()
      )
    }
  },
})
</script>

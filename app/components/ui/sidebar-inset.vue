<script lang="ts">
/**
 * SidebarInset — Vue port of the React SidebarInset (sidebar.tsx 337–353).
 * `<main>` counters sibiling of the desktop sidebar; peer-data-* classes key
 * off the sidebar's data-variant/state via the `peer` on Sidebar root.
 */
import { defineComponent, h } from 'vue'
import { cn } from '~/lib/utils'
import type { HTMLAttributes } from 'vue'

export default defineComponent({
  name: 'SidebarInset',
  props: {
    class: {
      type: Object as () => HTMLAttributes['class'],
      default: undefined,
    },
  },
  setup(props, { slots }) {
    return () =>
      h(
        'main',
        {
          class: cn(
            'relative flex w-full flex-1 flex-col bg-background',
            'md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow',
            props.class
          ),
        },
        slots.default?.()
      )
  },
})
</script>

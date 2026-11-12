<script lang="ts">
/**
 * SidebarMenuSkeleton — Vue port of the React SidebarMenuSkeleton
 * (sidebar.tsx 671–707). showIcon renders a small Skeleton circle; the bar
 * width is a random 50–90% set once at mount via a memoized value.
 */
import { defineComponent, h } from 'vue'
import { cn } from '~/lib/utils'
import Skeleton from './skeleton.vue'
import type { HTMLAttributes } from 'vue'

export default defineComponent({
  name: 'SidebarMenuSkeleton',
  props: {
    showIcon: { type: Boolean, default: false },
    class: { type: Object as () => HTMLAttributes['class'], default: undefined },
  },
  setup(props, { slots, attrs }) {
    // Random width between 50 to 90% — stable across re-renders.
    const width = `${Math.floor(Math.random() * 40) + 50}%`

    return () =>
      h(
        'div',
        {
          'data-sidebar': 'menu-skeleton',
          class: cn('flex h-8 items-center gap-2 rounded-md px-2', props.class),
          style: {},
        },
        [
          props.showIcon
            ? h(Skeleton, {
                class: 'size-4 rounded-md',
                'data-sidebar': 'menu-skeleton-icon',
              })
            : null,
          h(Skeleton, {
            class: 'h-4 max-w-[--skeleton-width] flex-1',
            'data-sidebar': 'menu-skeleton-text',
            style: { '--skeleton-width': width },
          }),
          slots.default?.(),
          // Keep attrs (e.g. class from consumer) as a throwaway reader so TS
          // considers both props used.
          attrs.class ? null : null,
        ]
      )
  },
})
</script>

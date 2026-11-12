<script lang="ts">
/**
 * Sidebar — Vue port of the React shadcn/ui Sidebar component
 * (source: src/components/ui/sidebar.tsx lines 175–280).
 *
 * Three render paths matched one-to-one:
 *  - collapsible="none"  → plain full-height div (React lines 196–209)
 *  - isMobile            → Sheet portal w/ SheetContent side={side},
 *                          sr-only header (React lines 211–233)
 *  - desktop             → gap spacer + fixed slide-in container + inner
 *                          flex column (React lines 235–276), styled via
 *                          group/data-* Tailwind selectors identical to the
 *                          React implementation.
 */
import { computed, defineComponent, h, type PropType } from 'vue'
import { cn } from '~/lib/utils'
import { useSidebar, SIDEBAR_WIDTH, SIDEBAR_WIDTH_MOBILE } from './sidebar-context'
import Sheet, {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from './sheet.vue'
import type { HTMLAttributes } from 'vue'

const sidebarProps = {
  side: {
    type: String as PropType<'left' | 'right'>,
    default: 'left' as const,
  },
  variant: {
    type: String as PropType<'sidebar' | 'floating' | 'inset'>,
    default: 'sidebar' as const,
  },
  collapsible: {
    type: String as PropType<'offcanvas' | 'icon' | 'none'>,
    default: 'offcanvas' as const,
  },
  class: {
    type: Object as () => HTMLAttributes['class'],
    default: undefined,
  },
}

export default defineComponent({
  name: 'Sidebar',
  props: sidebarProps,
  setup(props, { attrs, slots }) {
    const ctxSidebar = useSidebar()

    // -------------------------------------------------- collapsible=none --
    if (props.collapsible === 'none') {
      return () =>
        h(
          'div',
          {
            class: cn(
              'flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground',
              props.class,
              (attrs.class as HTMLAttributes['class']) || undefined
            ),
            'data-sidebar': 'sidebar',
          },
          slots.default?.()
        )
    }

    // ---------------------------------------------------------- isMobile --
    if (ctxSidebar.isMobile.value) {
      return () =>
        h(
          Sheet,
          {
            open: ctxSidebar.openMobile.value,
            'onUpdate:open': (value: boolean) => ctxSidebar.setOpenMobile(value),
          },
          {
            default: () =>
              h(
                SheetContent,
                {
                  'data-sidebar': 'sidebar',
                  'data-mobile': 'true',
                  class: cn(
                    'w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden',
                    props.class,
                    (attrs.class as HTMLAttributes['class']) || undefined
                  ),
                  style: { '--sidebar-width': SIDEBAR_WIDTH_MOBILE },
                  side: props.side,
                },
                {
                  default: () => [
                    h(
                      SheetHeader,
                      { class: 'sr-only' },
                      {
                        default: () => [
                          h(SheetTitle, null, { default: () => 'Sidebar' }),
                          h(SheetDescription, null, {
                            default: () => 'Displays the mobile sidebar.',
                          }),
                        ],
                      }
                    ),
                    h('div', { class: 'flex h-full w-full flex-col' }, slots.default?.()),
                  ],
                }
              ),
          }
        )
    }

    // ------------------------------------------------------------ desktop --

    // data-collapsible only set when collapsed — matches the React source
    // (yields '' when expanded; group selectors key off it).
    const dataState = computed(() => ctxSidebar.state.value)
    const dataCollapsible = computed(() =>
      ctxSidebar.state.value === 'collapsed' ? props.collapsible : ''
    )

    return () =>
      h(
        'div',
        {
          class: 'group peer hidden text-sidebar-foreground md:block',
          'data-state': dataState.value,
          'data-collapsible': dataCollapsible.value,
          'data-variant': props.variant,
          'data-side': props.side,
        },
        [
          // Gap on desktop — React: "This is what handles the sidebar gap" div.
          h('div', {
            class: cn(
              'relative w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear',
              'group-data-[collapsible=offcanvas]:w-0',
              'group-data-[side=right]:rotate-180',
              props.variant === 'floating' || props.variant === 'inset'
                ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]'
                : 'group-data-[collapsible=icon]:w-[--sidebar-width-icon]'
            ),
          }),
          h(
            'div',
            {
              class: cn(
                'fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear md:flex',
                props.side === 'left'
                  ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
                  : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
                props.variant === 'floating' || props.variant === 'inset'
                  ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]'
                  : 'group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l',
                props.class,
                (attrs.class as HTMLAttributes['class']) || undefined
              ),
            },
            [
              h(
                'div',
                {
                  'data-sidebar': 'sidebar',
                  class:
                    'flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow',
                },
                slots.default?.()
              ),
            ]
          ),
        ]
      )
  },
})
</script>

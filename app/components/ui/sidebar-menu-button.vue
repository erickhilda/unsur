<script lang="ts">
/**
 * SidebarMenuButton — Vue port of the React SidebarMenuButton
 * (sidebar.tsx 536–616):
 *  - cva variants default/outline × sizes default/sm/lg (identical classes)
 *  - isActive → data-active=true
 *  - `tooltip` string/object → wraps a Tooltip, right/center, hidden unless
 *    collapsed & not mobile (React lines 603–614)
 *  - `asChild` → merges props onto the slot's first vnode (Radix Slot shape).
 */
import { computed, defineComponent, h, type PropType } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'
import { useSidebar } from './sidebar-context'
import Tooltip, { TooltipTrigger, TooltipContent } from './tooltip.vue'
import type { HTMLAttributes } from 'vue'

export const sidebarMenuButtonVariants = cva(
  'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        outline:
          'bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]',
      },
      size: {
        default: 'h-8 text-sm',
        sm: 'h-7 text-xs',
        lg: 'h-12 text-sm group-data-[collapsible=icon]:!p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

type MenuButtonVariants = NonNullable<VariantProps<typeof sidebarMenuButtonVariants>>

const menuButtonProps = {
  asChild: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
  variant: { type: String as PropType<NonNullable<MenuButtonVariants['variant']>>, default: 'default' },
  size: { type: String as PropType<NonNullable<MenuButtonVariants['size']>>, default: 'default' },
  tooltip: { type: [String, Object] as PropType<string | Record<string, unknown>>, default: undefined },
  class: { type: Object as () => HTMLAttributes['class'], default: undefined },
}

export default defineComponent({
  name: 'SidebarMenuButton',
  props: menuButtonProps,
  setup(props, { slots, attrs }) {
    const { isMobile, state } = useSidebar()

    const classes = () =>
      cn(
        sidebarMenuButtonVariants({ variant: props.variant, size: props.size }),
        props.class,
        (attrs.class as HTMLAttributes['class']) || undefined
      )

    const renderButton = (key?: string) =>
      props.asChild
        ? h((slots.default?.()[0] ?? h('button')), {
            'data-sidebar': 'menu-button',
            'data-size': props.size,
            'data-active': props.isActive,
            class: classes(),
            key,
          })
        : h(
            'button',
            {
              'data-sidebar': 'menu-button',
              'data-size': props.size,
              'data-active': props.isActive,
              class: classes(),
              key,
            },
            slots.default?.()
          )

    const hasTooltip = computed(
      () => props.tooltip !== undefined && props.tooltip !== ''
    )

    return () => {
      if (!hasTooltip.value) return renderButton()

      const tooltipContent =
        typeof props.tooltip === 'string' ? { children: props.tooltip } : props.tooltip

      return h(
        Tooltip,
        null,
        {
          default: () => [
            h(
              TooltipTrigger,
              { asChild: true },
              { default: () => [renderButton('trigger')] }
            ),
            h(
              TooltipContent,
              {
                side: 'right',
                align: 'center',
                hidden: state.value !== 'collapsed' || isMobile.value,
                ...(tooltipContent as Record<string, unknown>),
              },
              {
                default: () =>
                  typeof tooltipContent?.children === 'string'
                    ? tooltipContent.children
                    : undefined,
              }
            ),
          ],
        }
      )
    }
  },
})
</script>

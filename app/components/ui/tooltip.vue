<script lang="ts">
import { defineComponent, h, type PropType } from 'vue'
import {
  TooltipRoot as RekaTooltipRoot,
  TooltipTrigger as RekaTooltipTrigger,
  TooltipPortal as RekaTooltipPortal,
  TooltipContent as RekaTooltipContent,
  TooltipProvider as RekaTooltipProvider,
} from 'reka-ui'
import { cn } from '~/lib/utils'
import type { HTMLAttributes } from 'vue'

// Port of the React shadcn tooltip module surface (built on reka-ui Tooltip*):
// `import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '~/components/ui/tooltip'`

export const Tooltip = defineComponent({
  name: 'Tooltip',
  props: {
    defaultOpen: { type: Boolean, default: undefined },
    open: { type: Boolean, default: undefined },
    delayDuration: { type: Number, default: undefined },
    disableHoverableContent: { type: Boolean, default: undefined },
    disableClosingTrigger: { type: Boolean, default: undefined },
  },
  emits: ['update:open'],
  setup(props, { slots, emit }) {
    const rootProps: Record<string, unknown> = {
      defaultOpen: props.defaultOpen,
      delayDuration: props.delayDuration,
      disableHoverableContent: props.disableHoverableContent,
      disableClosingTrigger: props.disableClosingTrigger,
      'onUpdate:open': (v: boolean) => emit('update:open', v),
    }
    if (props.open !== undefined) rootProps.open = props.open
    return () => h(RekaTooltipRoot, rootProps as never, slots.default?.())
  },
})

export const TooltipTrigger = RekaTooltipTrigger

export const TooltipProvider = RekaTooltipProvider

export const TooltipContent = defineComponent({
  name: 'TooltipContent',
  props: {
    sideOffset: { type: Number, default: 4 },
    side: { type: String as PropType<'top' | 'right' | 'bottom' | 'left'>, default: undefined },
    align: { type: String as PropType<'start' | 'center' | 'end'>, default: undefined },
    forceMount: { type: Boolean, default: undefined },
    class: { type: Object as () => HTMLAttributes['class'], default: undefined },
  },
  setup(props, { slots }) {
    return () =>
      h(RekaTooltipPortal, null, {
        default: () =>
          h(RekaTooltipContent, {
            sideOffset: props.sideOffset,
            side: props.side,
            align: props.align,
            forceMount: props.forceMount,
            class: cn(
              'z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]',
              props.class
            ),
          }, slots.default?.()),
      })
  },
})

export default Tooltip
</script>

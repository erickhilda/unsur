<script lang="ts">
import { defineComponent, h, type PropType } from 'vue'
import {
  SelectRoot as RekaSelectRoot,
  SelectTrigger as RekaSelectTrigger,
  SelectIcon as RekaSelectIcon,
  SelectPortal as RekaSelectPortal,
  SelectContent as RekaSelectContent,
  SelectViewport as RekaSelectViewport,
  SelectGroup as RekaSelectGroup,
  SelectValue as RekaSelectValue,
  SelectLabel as RekaSelectLabel,
  SelectItem as RekaSelectItem,
  SelectItemIndicator as RekaSelectItemIndicator,
  SelectItemText as RekaSelectItemText,
  SelectSeparator as RekaSelectSeparator,
  SelectScrollUpButton as RekaSelectScrollUpButton,
  SelectScrollDownButton as RekaSelectScrollDownButton,
} from 'reka-ui'
import { Check, ChevronDown, ChevronUp } from 'lucide-vue-next'
import { cn } from '~/lib/utils'
import type { HTMLAttributes } from 'vue'

// Port of the React shadcn select module surface (built on reka-ui Select*):
// `import { Select, SelectGroup, ... } from '~/components/ui/select'`

export const Select = defineComponent({
  name: 'Select',
  props: {
    defaultValue: { type: [String, Number] as PropType<string | number>, default: undefined },
    open: { type: Boolean, default: undefined },
    defaultOpen: { type: Boolean, default: undefined },
    name: { type: String, default: undefined },
    disabled: { type: Boolean, default: undefined },
    required: { type: Boolean, default: undefined },
    dir: { type: String as PropType<'ltr' | 'rtl'>, default: undefined },
  },
  emits: ['update:modelValue', 'update:open'],
  setup(props, { slots, emit }) {
    const rootProps: Record<string, unknown> = {
      defaultValue: props.defaultValue,
      defaultOpen: props.defaultOpen,
      name: props.name,
      disabled: props.disabled,
      required: props.required,
      dir: props.dir,
      'onUpdate:modelValue': (v: string | number) => emit('update:modelValue', v),
      'onUpdate:open': (v: boolean) => emit('update:open', v),
    }
    if (props.open !== undefined) rootProps.open = props.open
    return () => h(RekaSelectRoot, rootProps as never, slots.default?.())
  },
})

export const SelectGroup = RekaSelectGroup

export const SelectValue = RekaSelectValue

export const SelectScrollUpButton = defineComponent({
  name: 'SelectScrollUpButton',
  props: {
    class: { type: Object as () => HTMLAttributes['class'], default: undefined },
  },
  setup(props, { slots }) {
    return () =>
      h(RekaSelectScrollUpButton, {
        class: cn('flex cursor-default items-center justify-center py-1', props.class),
      }, { default: () => [h(ChevronUp, { class: 'h-4 w-4' }), slots.default?.()] })
  },
})

export const SelectScrollDownButton = defineComponent({
  name: 'SelectScrollDownButton',
  props: {
    class: { type: Object as () => HTMLAttributes['class'], default: undefined },
  },
  setup(props, { slots }) {
    return () =>
      h(RekaSelectScrollDownButton, {
        class: cn('flex cursor-default items-center justify-center py-1', props.class),
      }, { default: () => [h(ChevronDown, { class: 'h-4 w-4' }), slots.default?.()] })
  },
})

export const SelectTrigger = defineComponent({
  name: 'SelectTrigger',
  props: {
    class: { type: Object as () => HTMLAttributes['class'], default: undefined },
  },
  setup(props, { slots }) {
    return () =>
      h(RekaSelectTrigger, {
        class: cn(
          'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
          props.class
        ),
      }, {
        default: () => [
          slots.default?.(),
          h(RekaSelectIcon, { asChild: true }, () =>
            h(ChevronDown, { class: 'h-4 w-4 opacity-50' })),
        ],
      })
  },
})

export const SelectContent = defineComponent({
  name: 'SelectContent',
  props: {
    position: { type: String as PropType<'popper' | 'item-aligned'>, default: 'popper' },
    side: { type: String as PropType<'top' | 'right' | 'bottom' | 'left'>, default: undefined },
    sideOffset: { type: Number, default: undefined },
    align: { type: String as PropType<'start' | 'center' | 'end'>, default: undefined },
    class: { type: Object as () => HTMLAttributes['class'], default: undefined },
  },
  setup(props, { slots }) {
    return () =>
      h(RekaSelectPortal, null, {
        default: () =>
          h(RekaSelectContent, {
            position: props.position,
            side: props.side,
            sideOffset: props.sideOffset,
            align: props.align,
            class: cn(
              'relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]',
              props.position === 'popper' &&
                'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
              props.class
            ),
          }, {
            default: () => [
              h(SelectScrollUpButton),
              h(RekaSelectViewport, {
                class: cn(
                  'p-1',
                  props.position === 'popper' &&
                    'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
                ),
              }, slots.default?.()),
              h(SelectScrollDownButton),
            ],
          }),
      })
  },
})

export const SelectLabel = defineComponent({
  name: 'SelectLabel',
  props: {
    class: { type: Object as () => HTMLAttributes['class'], default: undefined },
  },
  setup(props, { slots }) {
    return () =>
      h(RekaSelectLabel, {
        class: cn('px-2 py-1.5 text-sm font-semibold', props.class),
      }, slots.default?.())
  },
})

export const SelectItem = defineComponent({
  name: 'SelectItem',
  props: {
    value: { type: [String, Number] as PropType<string | number>, required: true },
    disabled: { type: Boolean, default: false },
    class: { type: Object as () => HTMLAttributes['class'], default: undefined },
  },
  setup(props, { slots }) {
    return () =>
      h(RekaSelectItem, {
        value: props.value,
        disabled: props.disabled,
        class: cn(
          'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          props.class
        ),
      }, {
        default: () => [
          h('span', { class: 'absolute right-2 flex h-3.5 w-3.5 items-center justify-center' }, () =>
            h(RekaSelectItemIndicator, null, () => h(Check, { class: 'h-4 w-4' }))),
          h(RekaSelectItemText, null, slots.default?.()),
        ],
      })
  },
})

export const SelectSeparator = defineComponent({
  name: 'SelectSeparator',
  props: {
    class: { type: Object as () => HTMLAttributes['class'], default: undefined },
  },
  setup(props) {
    return () =>
      h(RekaSelectSeparator, {
        class: cn('-mx-1 my-1 h-px bg-muted', props.class),
      })
  },
})

export default Select
</script>

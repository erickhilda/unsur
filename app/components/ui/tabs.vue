<script lang="ts">
import { defineComponent, h, type PropType } from 'vue'
import {
  TabsRoot as RekaTabsRoot,
  TabsList as RekaTabsList,
  TabsTrigger as RekaTabsTrigger,
  TabsContent as RekaTabsContent,
} from 'reka-ui'
import { cn } from '~/lib/utils'
import type { HTMLAttributes } from 'vue'

// Port of React shadcn tabs (built on reka-ui Tabs*).
// `Tabs` is the reka-ui TabsRoot wrapper; sub-components are named exports so
// consumers can `import { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/ui/tabs'`.

export const Tabs = defineComponent({
  name: 'Tabs',
  props: {
    modelValue: { type: String, default: undefined },
    defaultValue: { type: String, default: undefined },
    orientation: { type: String as PropType<'horizontal' | 'vertical'>, default: 'horizontal' },
    dir: { type: String as PropType<'ltr' | 'rtl'>, default: undefined },
    activationMode: { type: String as PropType<'automatic' | 'manual'>, default: undefined },
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit }) {
    const rootProps: Record<string, unknown> = {
      defaultValue: props.defaultValue,
      orientation: props.orientation,
      dir: props.dir,
      activationMode: props.activationMode,
      'onUpdate:modelValue': (v: string) => emit('update:modelValue', v),
    }
    if (props.modelValue !== undefined) rootProps.modelValue = props.modelValue
    return () => h(RekaTabsRoot, rootProps, slots.default?.())
  },
})

export const TabsList = defineComponent({
  name: 'TabsList',
  props: {
    class: { type: Object as () => HTMLAttributes['class'], default: undefined },
  },
  setup(props, { slots }) {
    return () =>
      h(RekaTabsList, {
        class: cn(
          'inline-flex h-9 items-center justify-center bg-muted text-muted-foreground w-full border-b border-border',
          props.class
        ),
      }, slots.default?.())
  },
})

export const TabsTrigger = defineComponent({
  name: 'TabsTrigger',
  props: {
    value: { type: String, required: true },
    disabled: { type: Boolean, default: false },
    class: { type: Object as () => HTMLAttributes['class'], default: undefined },
  },
  setup(props, { slots }) {
    return () =>
      h(RekaTabsTrigger, {
        value: props.value,
        disabled: props.disabled,
        class: cn(
          'inline-flex items-center justify-center whitespace-nowrap px-3 w-full h-full text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow',
          props.class
        ),
      }, slots.default?.())
  },
})

export const TabsContent = defineComponent({
  name: 'TabsContent',
  props: {
    value: { type: String, required: true },
    forceMount: { type: Boolean, default: undefined },
    class: { type: Object as () => HTMLAttributes['class'], default: undefined },
  },
  setup(props, { slots }) {
    return () =>
      h(RekaTabsContent, {
        value: props.value,
        forceMount: props.forceMount,
        class: cn(
          'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          props.class
        ),
      }, slots.default?.())
  },
})

export default Tabs
</script>

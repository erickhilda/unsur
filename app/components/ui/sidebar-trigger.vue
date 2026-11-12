<script setup lang="ts">
/**
 * SidebarTrigger — Vue port of the React SidebarTrigger (sidebar.tsx 282–306).
 * Ghost icon Button carrying lucide:panel-left + sr-only label.
 */
import { computed, useAttrs } from 'vue'
import { cn } from '~/lib/utils'
import Button from './button.vue'
import Icon from '../ui/icon.vue'
import { useSidebar } from './sidebar-context'
import type { HTMLAttributes } from 'vue'

defineOptions({ name: 'SidebarTrigger' })

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const attrs = useAttrs()

const { toggleSidebar } = useSidebar()

const classes = computed(() =>
  cn('inline-flex h-7 w-7 items-center justify-center', props.class)
)

function onClick(event: MouseEvent) {
  // React called onClick?.(event) then toggleSidebar() — same order here.
  const consumer = attrs.onClick as unknown as ((e: MouseEvent) => void) | undefined
  consumer?.(event)
  toggleSidebar()
}
</script>

<template>
  <Button
    data-sidebar="trigger"
    variant="ghost"
    size="icon"
    :class="classes"
    @click="onClick"
  >
    <Icon icon="lucide:panel-left" :height="28" :width="28" />
    <span class="sr-only">Toggle Sidebar</span>
  </Button>
</template>

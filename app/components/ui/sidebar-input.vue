<script setup lang="ts">
/**
 * SidebarInput — Vue port of the React SidebarInput (sidebar.tsx 355–371).
 * Input with h-8 + sidebar ring classes, passthrough v-model.
 */
import { computed } from 'vue'
import { cn } from '~/lib/utils'
import Input from './input.vue'
import type { HTMLAttributes } from 'vue'

defineOptions({ name: 'SidebarInput' })

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const model = defineModel<string | number>()

const classes = computed(() =>
  cn(
    'h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
    props.class
  )
)
</script>

<template>
  <Input v-model="model" data-sidebar="input" :class="classes" />
</template>

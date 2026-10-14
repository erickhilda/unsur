<script setup lang="ts">
/**
 * SidebarSeparator — Vue port of the React SidebarSeparator
 * (sidebar.tsx 403–416). Separator with sidebar-border colorway.
 */
import { computed } from 'vue'
import { cn } from '~/lib/utils'
import Separator from './separator.vue'
import type { HTMLAttributes } from 'vue'

defineOptions({ name: 'SidebarSeparator' })

const props = defineProps<{
  class?: HTMLAttributes['class']
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
}>()

const classes = computed(() =>
  cn('mx-2 w-auto bg-sidebar-border', props.class)
)
</script>

<template>
  <Separator
    data-sidebar="separator"
    :orientation="orientation ?? 'horizontal'"
    :decorative="decorative ?? true"
    :class="classes"
  />
</template>

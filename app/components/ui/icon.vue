<script setup lang="ts">
import { Icon as Iconify } from '@iconify/vue'

// Port of React icon.tsx (thin wrapper around Iconify) — not ported from
// lucide-vue-next because the codebase uses name-based `icon="lucide:*"` props.

withDefaults(
  defineProps<{
    icon: string
    width?: number
    height?: number
  }>(),
  { width: 24, height: 24 }
)
</script>

<template>
  <Iconify :icon="icon" :width="width" :height="height" />
</template>

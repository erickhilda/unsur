<script setup lang="ts">
import { cn } from '~/lib/utils'
import type { ChemicalElement } from '~/types/global'

const props = defineProps<{
  label: string
  value: string | ChemicalElement['image']
  className?: string
}>()

const rowClass = () =>
  cn(
    'flex items-center justify-between py-2 px-4 border-t border-border',
    props.className
  )
</script>

<template>
  <div :class="rowClass()">
    <span class="text-sm">{{ label }}</span>
    <span class="text-zinc-400 text-xs font-medium">
      {{ typeof value === 'string' ? value : null }}
    </span>
  </div>
</template>

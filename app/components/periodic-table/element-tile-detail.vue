<script setup lang="ts">
import { computed } from 'vue'
import { generateColorBasedOnCategory } from '~/lib/color-helpers'
import { cn } from '~/lib/utils'
import type { Category } from '~/types/global'
import Icon from '../ui/icon.vue'

const props = defineProps<{
  symbol: string
  name: string
  atomicNumber: number
  atomicMass: number
  className?: string
  category: Category
  source: string
}>()

const cardClass = computed(() =>
  cn(
    'relative aspect-square w-52 h-52 p-2 mx-auto mt-2',
    generateColorBasedOnCategory(props.category),
    props.className
  )
)
</script>

<template>
  <div :class="cardClass">
    <div class="flex flex-col items-start justify-center h-full">
      <div class="text-xl font-light">{{ atomicNumber }}</div>
      <div class="text-6xl font-bold">{{ symbol }}</div>

      <NuxtLink
        :href="source"
        target="_blank"
        class="text-2xl font-light flex items-center gap-1 hover:underline"
      >
        {{ name }}
        <Icon icon="lucide:external-link" :width="18" :height="18" />
      </NuxtLink>
      <div class="text-lg font-light">{{ category }}</div>
      <div class="text-lg font-light">{{ atomicMass }} u</div>
    </div>
  </div>
</template>

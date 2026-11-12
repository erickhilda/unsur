<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import type { ChemicalElement } from '~/types/global'
import { generateColorBasedOnCategory } from '~/lib/color-helpers'

const props = defineProps<{
  element: Partial<ChemicalElement>
  style?: CSSProperties
  className?: string
}>()

const emit = defineEmits<{
  hover: []
  click: []
}>()

const tileClass = computed(
  () =>
    `rounded-md aspect-w-1 aspect-h-1 relative hover:shadow-sm hover:opacity-80 ${generateColorBasedOnCategory(
      props.element.category || ''
    )} ${props.className ?? ''}`
)
</script>

<template>
  <div
    :class="tileClass"
    :style="style"
    @mouseenter="emit('hover')"
    @click="emit('click')"
  >
    <span
      class="text-xxxxs lg:text-xxxs absolute lg:left-1 lg:top-1 left-[2px] top-[2px]"
    >
      {{ element.number }}
    </span>

    <span class="flex flex-col justify-center items-center text-center">
      <h2 class="lg:text-lg text-xs font-semibold">{{ element.symbol }}</h2>
      <p class="text-xxxxs lg:text-xxxs lg:font-bold lg:block">
        {{ element.name }}
      </p>
      <p class="lg:text-xxxs hidden lg:block">{{ element.category }}</p>
    </span>
  </div>
</template>

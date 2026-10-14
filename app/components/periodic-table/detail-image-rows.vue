<script setup lang="ts">
import type { ChemicalElement } from '~/types/global'

defineProps<{
  image: ChemicalElement['image']
}>()
</script>

<template>
  <div>
    <figure
      class="relative rounded-md overflow-hidden w-52 h-52 self-baseline mx-auto"
    >
      <!-- next/image fill → plain img (keputusan migrasi: tanpa @nuxt/image di fase awal) -->
      <img
        :src="image.url"
        :alt="image.attribution"
        class="object-cover object-center absolute inset-0 h-full w-full"
      />
      <figcaption
        class="absolute bottom-0 left-0 w-full bg-gray-900/50 text-white text-center text-sm p-2"
      >
        {{ image.title }}
      </figcaption>
    </figure>
  </div>
</template>

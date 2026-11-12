<script setup lang="ts">
// Port of periodic-table.tsx (pure presentational grid wrapper).
</script>

<template>
  <div class="periodic-table-grid lg:grid lg:grid-cols-18 lg:gap-1 gap-[0.125rem]">
    <slot />
  </div>
</template>

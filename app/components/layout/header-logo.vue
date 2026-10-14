<script setup lang="ts">
// Port of header-logo.tsx.
// next/image → <img> (ukuran sesuai: sudah di-deadly via width/height attrs)
</script>

<template>
  <NuxtLink to="/" class="flex items-center">
    <img
      src="/logo.svg"
      width="72"
      height="72"
      class="h-8 w-8"
      alt="a logo image with a text of P t"
    />
    <h2 class="ml-2">
      <b class="text-lg">P</b>eriodic <b class="text-lg">T</b>able
    </h2>
  </NuxtLink>
</template>

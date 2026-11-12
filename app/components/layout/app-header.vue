<script setup lang="ts">
import { computed } from 'vue'
import NuxtLink from '#app/components/nuxt-link'
import Button from '../ui/button.vue'
import Icon from '../ui/icon.vue'
import HeaderLogo from './header-logo.vue'
import { useIsMobile } from '~/composables/use-mobile'

const route = useRoute()
const isMobile = useIsMobile()

const showLogo = computed(
  () => route.path.includes('acknowledgment') || isMobile.value
)
</script>

<template>
  <header
    class="top-0 flex h-12 shrink-0 items-center justify-between gap-2 px-4 z-10 border-b backdrop-filter backdrop-blur-sm shadow-md shadow-border"
    :class="isMobile ? 'max-w-[100vw]' : 'max-w-[calc(100vw - 16rem)]'"
  >
    <div class="flex gap-2 items-center justify-between w-full">
      <HeaderLogo v-if="showLogo" />
      <div class="flex gap-2 ml-auto">
        <NuxtLink to="/acknowledgment">
          <Button
            data-sidebar="trigger"
            variant="secondary"
            size="icon"
            class="h-7 w-7"
          >
            <Icon icon="lucide:link" :height="28" :width="28" />
            <span class="sr-only">Acknowledment</span>
          </Button>
        </NuxtLink>
        <a href="https://github.com/erickhilda/unsur">
          <Button
            data-sidebar="trigger"
            variant="secondary"
            size="icon"
            class="h-7 w-7"
          >
            <Icon icon="lucide:github" :height="28" :width="28" />
            <span class="sr-only">Github Repository Link</span>
          </Button>
        </a>
      </div>
    </div>
  </header>
</template>

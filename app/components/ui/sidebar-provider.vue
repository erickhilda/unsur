<script setup lang="ts">
/**
 * SidebarProvider — Vue port of the React SidebarProvider.
 *
 * Ported responsibilities (React sidebar.tsx lines 57–173):
 *  - open / openMobile state (defaultOpen=true; controlled `open` +
 *    `onOpenChange` supported)
 *  - persists open into the `sidebar_state` cookie (path=/, max-age 7 days)
 *  - isMobile via useIsMobile()
 *  - Cmd/Ctrl+B keyboard toggle
 *  - route effect: path containing 'acknowledgment' → setOpen(false);
 *    otherwise expands on desktop (React lines 122–129)
 *  - wraps children in TooltipProvider (delayDuration=0) and the
 *    group/sidebar-wrapper div with --sidebar-width CSS vars
 */
import { computed, watch, onBeforeUnmount, provide } from 'vue'
import { cn } from '~/lib/utils'
import { useIsMobile } from '~/composables/use-mobile'
import { TooltipProvider } from './tooltip.vue'
import {
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_ICON,
  SIDEBAR_KEYBOARD_SHORTCUT,
  SIDEBAR_KEY,
} from './sidebar-context'
import {
  ensureSidebarContext,
  createSidebarContextHolder,
  setSidebarIsMobile,
} from './sidebar-context'
import type { SidebarContextProps } from './sidebar-context'
import type { HTMLAttributes } from 'vue'

const props = withDefaults(
  defineProps<{
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
    class?: HTMLAttributes['class']
    style?: HTMLAttributes['style']
  }>(),
  {
    defaultOpen: true,
    open: undefined,
    onOpenChange: undefined,
    class: undefined,
    style: undefined,
  }
)

// ------------------------------------------------------------- seed state --

const ctx: SidebarContextProps = ensureSidebarContext({
  defaultOpen: props.defaultOpen,
})

// Sync isMobile readouts into the module state (every useSidebar() consumer).
const isMobileRef = useIsMobile()
watch(isMobileRef, (m) => setSidebarIsMobile(m), { immediate: true })

provide(SIDEBAR_KEY, createSidebarContextHolder())

// Controlled/uncontrolled `open` — same contract as React.
// `open` prop (when passed) wins over internal state on render.

function setOpen(next: boolean | ((open: boolean) => boolean)) {
  const value = typeof next === 'function' ? next(ctx.open.value) : next
  if (props.onOpenChange) {
    props.onOpenChange(value)
  } else {
    ctx.setOpen(value)
  }
}

function toggleSidebar() {
  if (ctx.isMobile.value) {
    ctx.setOpenMobile(!ctx.openMobile.value)
  } else {
    setOpen(!ctx.open.value)
  }
}

// -------------------------------------------------------- Cmd/Ctrl+B hook --

function onKeydown(event: KeyboardEvent) {
  if (
    event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
    (event.metaKey || event.ctrlKey)
  ) {
    event.preventDefault()
    toggleSidebar()
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('keydown', onKeydown)
}

// Clean up when the provider unmounts (React used effect cleanup).
onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', onKeydown)
  }
})

// ------------------------------------------------------------- route sync --

// React line 122-129: collapse on /acknowledgment, expand otherwise (desktop).
const route = useRoute()

watch(
  () => route.path,
  (path) => {
    if (path.includes('acknowledgment')) {
      setOpen(false)
    } else if (!ctx.isMobile) {
      setOpen(true)
    }
  },
  { immediate: true }
)

// The style binding spreads consumer CSS vars ahead of sidebar constants
// (same precedence as React's `...style` AFTER ours — here we mirror React:
// consumer style wins on duplicate keys).
</script>

<template>
  <div
    :class="
      cn(
        'group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar',
        props.class
      )
    "
    :style="[
      {
        '--sidebar-width': SIDEBAR_WIDTH,
        '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
      },
      props.style,
    ]"
  >
    <TooltipProvider :delay-duration="0">
      <slot />
    </TooltipProvider>
  </div>
</template>

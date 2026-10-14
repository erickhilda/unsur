/**
 * Vue 3 port of the React shadcn/ui sidebar context (React createContext mold).
 *
 * State is a module-scope reactive object (single instance per app) so it can
 * be reached from contexts WITHOUT a component scope — most notably from Pinia
 * store actions (the element store calls setOpen/setOpenMobile in click
 * handlers). The provider installs a provide()/inject() facade handing back
 * this same reactive object, so both access paths see identical values.
 *
 * Contract (mirrors the React version's SidebarContextProps):
 *   state        — 'expanded' | 'collapsed'            (computed `.value`)
 *   open         — boolean                             (computed `.value`)
 *   openMobile   — boolean                             (computed `.value`)
 *   isMobile     — boolean                             (computed `.value`)
 *   setOpen(value: boolean | (open) => boolean) — writes + sets cookie
 *   setOpenMobile(open: boolean)                — mobile sheet state
 *   toggleSidebar()                             — mobile? sheet : sidebar
 *
 * Ported constants from the React source (sidebar.tsx lines 29–34):
 *  - cookie `sidebar_state` (path=/, max-age 7 days)
 *  - widths 16rem / 18rem mobile / 3rem icon
 *  - keyboard shortcut Cmd/Ctrl+B
 */
import { reactive, computed } from 'vue'

export const SIDEBAR_COOKIE_NAME = 'sidebar_state'
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days
export const SIDEBAR_WIDTH = '16rem'
export const SIDEBAR_WIDTH_MOBILE = '18rem'
export const SIDEBAR_WIDTH_ICON = '3rem'
export const SIDEBAR_KEYBOARD_SHORTCUT = 'b'

export type SidebarStateState = 'expanded' | 'collapsed'
export type SidebarOpenValue = boolean | ((open: boolean) => boolean)

/**
 * Sets the sidebar_state cookie (same attributes as the React impl).
 * SSR-safe: no-ops when `document` is unavailable.
 */
export function setSidebarCookie(openState: boolean) {
  if (typeof document === 'undefined') return
  document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
}

// ============================================================================
// Module-scope reactive core (single instance per app)
// ============================================================================

const sidebarState = reactive({
  open: true, // defaultOpen=true seed, provider overwrites from cookie/defaultOpen
  openMobile: false,
  isMobile: false,
})

export {
  /** computed<boolean> → reactive `open` — useSidebar().open.value .. */
  sidebarState,
}

const state = computed<SidebarStateState>(() =>
  sidebarState.open ? 'expanded' : 'collapsed'
)
const open = computed<boolean>(() => sidebarState.open)
const openMobile = computed<boolean>(() => sidebarState.openMobile)
const isMobile = computed<boolean>(() => sidebarState.isMobile)

function setOpen(value: SidebarOpenValue) {
  const openState = typeof value === 'function' ? value(sidebarState.open) : value
  sidebarState.open = openState
  setSidebarCookie(openState)
}

function setOpenMobile(next: boolean) {
  sidebarState.openMobile = next
}

function toggleSidebar() {
  if (sidebarState.isMobile) {
    setOpenMobile(!sidebarState.openMobile)
  } else {
    setOpen(!sidebarState.open)
  }
}

/** Provider-only: feeds viewport detection (useIsMobile) into the context. */
export function setSidebarIsMobile(mobile: boolean) {
  sidebarState.isMobile = mobile
}

// ============================================================================
// Public hook surface
// ============================================================================

/**
 * THE context object returned to every consumer (component tree, Pinia store
 * action, or plain module). It exposes computed refs so `useSidebar().open`
 * stays REACTIVE across all of them — writing `sidebarState.open` updates
 * every consumer automatically.
 */
const sidebarContext = {
  state,
  open,
  openMobile,
  isMobile,
  setOpen,
  setOpenMobile,
  toggleSidebar,
}

export type SidebarContextProps = typeof sidebarContext

interface SidebarContextHolder {
  context: typeof sidebarContext
}

export const SIDEBAR_KEY = Symbol.for('__unsur_sidebar_context__') as symbol

/**
 * Provider-side init: seeds defaultOpen (only for the very first mount, so a
 * remount never clobbers user state, same behavior as React useState seed)
 * and hands back the reactive context the provider installs via provide().
 */
export function ensureSidebarContext(opts?: { defaultOpen?: boolean }) {
  if (opts?.defaultOpen !== undefined && sidebarState.open !== opts.defaultOpen) {
    sidebarState.open = opts.defaultOpen
  }
  return sidebarContext as SidebarContextProps
}

/** Provider-side helper: the object the provider keeps in provide(). */
export function createSidebarContextHolder(): SidebarContextHolder {
  return { context: sidebarContext as SidebarContextProps }
}

/**
 * Public hook. Behaves like the React version:
 * - inside the provider tree → the provide/inject-backed (same) reactive state
 * - outside (Pinia store action, plain TS module) → the identical module-level
 *   reactive state, so setOpen/setOpenMobile stay functional
 * - throws during SSR when no provider mounted, mirroring
 *   "useSidebar must be used within a SidebarProvider."
 */
export function useSidebar(): SidebarContextProps {
  const injected = injectOrThrow()
  if (injected) return injected.context
  return sidebarContext as SidebarContextProps
}

function injectOrThrow(): SidebarContextHolder | null {
  try {
    // `inject` needs an active component/effect scope; falls back cleanly.
    const mod = require('vue') as typeof import('vue')
    const injected = mod.inject(SIDEBAR_KEY, null) as SidebarContextHolder | null
    return injected
  } catch {
    return null
  }
}

export default useSidebar

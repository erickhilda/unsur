import * as Vue from 'vue'

const MOBILE_BREAKPOINT = 768

/**
 * Vue port of React use-mobile. SSR-safe: returns false during SSR,
 * updates once mounted and reacts to viewport changes.
 */
export function useIsMobile() {
  const isMobile = Vue.ref<boolean | undefined>(undefined)

  if (Vue.isRef(isMobile)) {
    // Set up on client only
    if (import.meta.client) {
      Vue.onMounted(() => {
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
        const onChange = () => {
          isMobile.value = window.innerWidth < MOBILE_BREAKPOINT
        }
        mql.addEventListener('change', onChange)
        isMobile.value = window.innerWidth < MOBILE_BREAKPOINT

        Vue.onUnmounted(() => {
          mql.removeEventListener('change', onChange)
        })
      })
    }
  }

  return Vue.computed(() => !!isMobile.value)
}

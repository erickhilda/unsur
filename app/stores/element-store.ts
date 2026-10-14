import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ChemicalElement } from '~/types/global'
import elementData from '~/data/elemens-data-v2'
import { useIsMobile } from '~/composables/use-mobile'
import { useSidebar } from '~/components/ui/sidebar'

const defaultElement = elementData[0]

/**
 * Vue/Pinia port of React use-element-store.
 * Holds currently selected element; on selection opens the sidebar
 * (mobile sheet or desktop sidebar) via useSidebar().
 */
export const useElementStore = defineStore('elementStore', () => {
  const selectedElement = ref<ChemicalElement>(
    defaultElement ?? (elementData[0] as ChemicalElement)
  )

  const element = computed(() => selectedElement.value)

  function setElementOnSidebar(el: ChemicalElement) {
    selectedElement.value = el
    const { setOpen, setOpenMobile } = useSidebar()
    const isMobile = useIsMobile()
    if (isMobile.value) {
      setOpenMobile(true)
    } else {
      setOpen(true)
    }
  }

  return { element, setElementOnSidebar }
})

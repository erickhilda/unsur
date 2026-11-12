import { onMounted, onUnmounted, ref, watch, type Ref } from 'vue'

/**
 * Vue port of React useInterval.
 * Calls callback every `delay` ms; re-arms when delay changes.
 */
export function useInterval(callback: () => void, delay: number | Ref<number> | null | Ref<number | null>) {
  let id: ReturnType<typeof setInterval> | undefined

  function tick() {
    callback()
  }

  function start(d: number) {
    stop()
    id = setInterval(tick, d)
  }

  function stop() {
    if (id !== undefined) {
      clearInterval(id)
      id = undefined
    }
  }

  onMounted(() => {
    const d = (typeof delay === 'object' && delay !== null && 'value' in delay) ? delay.value : delay
    if (d !== null) start(d)
  })

  watch(
    () => (typeof delay === 'object' && delay !== null && 'value' in delay) ? delay.value : delay,
    (d) => {
      if (d === null) stop()
      else start(d)
    }
  )

  onUnmounted(stop)
}

export default useInterval

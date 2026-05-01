import { useLocalStorage } from '@vueuse/core'
import useGameStore from '@/stores/game'

export default function addLocalStorageHooks() {
  const game = useGameStore()
  const stored = useLocalStorage('gameStore', game.$state, { mergeDefaults: true })

  game.$patch(stored.value)

  game.$subscribe((_, state) => {
    stored.value = state
  })
}

import useGameStore from '@/stores/game'

export default function addLocalStorageHooks() {
  const game = useGameStore()

  const savedState = localStorage.getItem('gameStore')
  if (savedState) game.$patch(JSON.parse(savedState))

  game.$subscribe((_, state) => localStorage.setItem('gameStore', JSON.stringify(state)))
}

import type { Game } from '@/stores/game'
import useGameStore from '@/stores/game'
import { sample } from 'lodash-es'

export async function startRandomGame() {
  const game = useGameStore()
  game.resetGame()
  setTimeout(async () => {
    const games = (await import('@/data/games.json')).default as Game[]
    const chosenGame = sample(games)
    if (chosenGame) game.startGame(chosenGame)
  }, 200)
  // short delay so even if the file loads instantly, it's obvious that a new game has started
}

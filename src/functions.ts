import type { Game } from '@/stores/game'
import useGameStore from '@/stores/game'
import { random, sample } from 'lodash-es'
import confetti from 'canvas-confetti'

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

export function fireworks(duration: number) {
  const animationEnd = Date.now() + duration
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    const timeLeft = animationEnd - Date.now()
    if (timeLeft <= 0) return clearInterval(interval)

    const particleCount = 50 * (timeLeft / duration)
    // since particles fall down, start a bit higher than random
    confetti({
      ...defaults,
      particleCount,
      origin: { x: random(0.1, 0.3), y: random() - 0.2 }
    })
    confetti({
      ...defaults,
      particleCount,
      origin: { x: random(0.7, 0.9), y: random() - 0.2 }
    })
  }, 250)
}

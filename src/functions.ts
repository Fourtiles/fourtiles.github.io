import type { Game } from '@/stores/game'
import useGameStore from '@/stores/game'
import { random } from 'lodash-es'
import confetti from 'canvas-confetti'
import { useIntervalFn } from '@vueuse/core'
import { gameCount, shardSize } from 'virtual:game-shards'

/**
 * Picks a game at random and starts it.
 *
 * The dataset is split across shard files, so only the shard holding the chosen
 * game is fetched rather than all {@link gameCount} records.
 */
export function startRandomGame() {
  const game = useGameStore()
  game.resetGame()
  void fetchGame(random(gameCount - 1)).then((chosenGame) => {
    if (chosenGame) game.startGame(chosenGame)
  })
}

export async function fetchGame(index: number): Promise<Game | undefined> {
  const shardURL = `${import.meta.env.BASE_URL}games/${String(Math.floor(index / shardSize))}.json`
  const response = await fetch(shardURL)
  if (!response.ok) throw new Error(`Game shard request failed with ${String(response.status)}`)

  const shard = (await response.json()) as Game[]
  return shard.at(index % shardSize)
}

export function fireworks(duration: number) {
  const animationEnd = Date.now() + duration
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

  const { pause } = useIntervalFn(() => {
    const timeLeft = animationEnd - Date.now()
    if (timeLeft <= 0) {
      pause()
      return
    }

    const particleCount = 50 * (timeLeft / duration)
    // since particles fall down, start a bit higher than random
    void confetti({
      ...defaults,
      particleCount,
      origin: { x: random(0.1, 0.3), y: random() - 0.2 },
    })
    void confetti({
      ...defaults,
      particleCount,
      origin: { x: random(0.7, 0.9), y: random() - 0.2 },
    })
  }, 250)
}

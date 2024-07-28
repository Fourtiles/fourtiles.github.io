<template>
  <Spinner v-if="game.isLoading" />

  <div v-else id="container">
    <HeaderSection />
    <GameSection />
    <FooterSection />
  </div>
  <div v-if="showUnicorn" id="unicorn">
    <Unicorn />
  </div>
</template>

<script setup lang="ts">
import HeaderSection from '@/components/HeaderSection.vue'
import FooterSection from '@/components/FooterSection.vue'
import GameSection from '@/components/GameSection.vue'
import useGameStore, { type Game } from '@/stores/game'
import { random, sample } from 'lodash-es'
import { onMounted, ref } from 'vue'
import confetti from 'canvas-confetti'
import gameBus from '@/emitters/gameBus'
import Spinner from '@/components/Spinner.vue'
import Unicorn from '@/components/Unicorn.vue'

const game = useGameStore()

const showUnicorn = ref(false)

function fireworks(duration: number) {
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

async function randomGame(): Promise<Game | undefined> {
  const games = (await import('@/data/games.json')).default as Game[]
  return sample(games)
}

onMounted(async () => {
  gameBus.on('allFourtilesFound', () => fireworks(5000))
  gameBus.on('allWordsFound', () => {
    fireworks(10000)
    showUnicorn.value = true
    setTimeout(() => (showUnicorn.value = false), 10000)
  })

  const newGame = await randomGame()
  if (newGame) game.startGame(newGame)
})
</script>

<style scoped>
@keyframes unicorn-path {
  0% {
    transform: translate(150vw, -50%) rotateX(0deg);
  }
  50% {
    transform: translate(-150vw, -50%) rotateX(0deg);
  }
  51% {
    transform: translate(-150vw, -50%) rotate(180deg);
  }
  100% {
    transform: translate(150vw, -50%) rotate(180deg);
  }
}

#unicorn {
  position: fixed;
  top: 50%;
  left: 50%;
  animation: unicorn-path 10s linear;
  transform: translate(100vw, -50%);
  z-index: 1;
  pointer-events: none;
}
</style>

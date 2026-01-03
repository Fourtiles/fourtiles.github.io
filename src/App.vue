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
import useGameStore from '@/stores/game'
import { onMounted, ref } from 'vue'
import gameBus from '@/emitters/gameBus'
import Spinner from '@/components/Spinner.vue'
import Unicorn from '@/components/Unicorn.vue'
import { fireworks, startRandomGame } from '@/functions'
import addLocalStorageHooks from '@/stores/addLocalStorageHooks'
import * as Sentry from '@sentry/vue'

const game = useGameStore()

const showUnicorn = ref(false)

onMounted(async () => {
  gameBus.on('allFourtilesFound', () => {
    Sentry.metrics.count('game.fourtiles_complete', 1)
    fireworks(5000)
  })
  gameBus.on('allWordsFound', () => {
    Sentry.metrics.count('game.completed', 1)
    fireworks(10000)
    showUnicorn.value = true
    setTimeout(() => (showUnicorn.value = false), 10000)
  })

  addLocalStorageHooks()
  if (!game.game) await startRandomGame()
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
  z-index: 1;
  pointer-events: none;
  transform: translate(100vw, -50%);
  animation: unicorn-path 10s linear;
}
</style>

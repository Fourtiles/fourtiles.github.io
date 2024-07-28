<template>
  <Sparkles :color="SPARKLE_COLORS" :active="validWord">
    <div
      id="current-word-container"
      :class="{
        'word-already-found': wordAlreadyFound,
        'unknown-word': unknownWord,
        'valid-word': validWord
      }"
    >
      <Tile
        v-for="tile in game.currentWord"
        :key="tile"
        :tile="tile"
        force-display
        force-solid
        :invalid="unknownWord"
      />

      <button
        v-if="game.currentWord.length > 0"
        id="reset-word-button"
        :disabled="animationInProgress"
        :class="{ hidden: animationInProgress }"
        @click="game.resetCurrentWord"
      >
        <IconCircleXFilled stroke="3" />
      </button>
    </div>
  </Sparkles>
</template>

<script setup lang="ts">
import { IconCircleXFilled } from '@tabler/icons-vue'
import useGameStore from '@/stores/game'
import Tile from '@/components/game/Tile.vue'
import gameBus from '@/emitters/gameBus'
import { computed, onMounted, ref } from 'vue'
import Sparkles from '@/components/sparkles/Sparkles.vue'

const SPARKLE_COLORS = ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff']

const game = useGameStore()

const wordAlreadyFound = ref(false)
const unknownWord = ref(false)
const validWord = ref(false)

const animationInProgress = computed(
  () => wordAlreadyFound.value || unknownWord.value || validWord.value
)

onMounted(() => {
  gameBus.on('wordAlreadyFound', () => {
    wordAlreadyFound.value = true
    setTimeout(() => {
      wordAlreadyFound.value = false
      game.resetCurrentWord()
    }, 1000)
  })

  gameBus.on('wordNotRecognized', () => {
    unknownWord.value = true
    setTimeout(() => {
      unknownWord.value = false
      game.resetCurrentWord()
    }, 1000)
  })

  gameBus.on('validWordFound', (word) => {
    validWord.value = true
    setTimeout(() => {
      validWord.value = false
      game.resetCurrentWord()
      if (game.fourtileWords.includes(word)) game.shuffleTiles()
    }, 500)
  })
})
</script>

<style scoped>
@keyframes headshake {
  0%,
  100% {
    transform: translateX(0);
  }
  25%,
  75% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
}

#current-word-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-sm);
  transition: gap 0.5s;
}

.unknown-word {
  animation: headshake 0.5s ease-in-out;
}

.word-already-found {
  animation: headshake 0.5s ease-in-out;
}

#current-word-container.valid-word {
  gap: 0;
}

#reset-word-button {
  transition: opacity 0.25s;
}

#reset-word-button.hidden {
  opacity: 0;
}

#reset-word-button > svg {
  color: var(--color-brat);
  height: var(--space-lg);
}
</style>

<style>
#current-word-container .tile {
  transition: border-radius 0.5s;
}

#current-word-container.valid-word .tile:not(:first-of-type) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

#current-word-container.valid-word .tile:not(:last-of-type) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
</style>

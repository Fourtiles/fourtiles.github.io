<template>
  <div v-if="game.numFourtilesFound > 0" id="star-list">
    <div v-for="(word_, i) in game.fourtileWords" :key="i">
      <IconStarFilled
        v-if="game.numFourtilesFound > i"
        size="var(--font-size-xl)"
        color="var(--color-brat)"
        class="animate-star"
      />
      <IconStar v-else size="var(--font-size-xl)" color="var(--color-brat)" />
    </div>
  </div>
  <p v-else id="instructions">
    Make words by combining 2 or more tiles. Find words using 4 tiles to win
    <IconStarFilled size="var(--font-size-lg)" color="var(--color-brat)" />s!
  </p>
</template>

<script setup lang="ts">
import { IconStar, IconStarFilled } from '@tabler/icons-vue'
import useGameStore from '@/stores/game'

const game = useGameStore()
</script>

<style scoped>
@keyframes grow-rotate {
  0% {
    transform: scale(1) rotate(300deg);
  }

  50% {
    transform: scale(1.5) rotate(390deg);
  }

  100% {
    transform: scale(1) rotate(360deg);
  }
}

.animate-star {
  animation: grow-rotate 1s ease-in-out;
}

#star-list {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-md);
}

#instructions {
  font-size: var(--font-size-lg);
  padding: 0;
  margin: 0;
}

#instructions > svg {
  vertical-align: middle;
}
</style>

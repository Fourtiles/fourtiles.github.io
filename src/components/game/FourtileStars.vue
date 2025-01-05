<template>
  <div v-if="game.numFourtilesFound > 0" id="star-list">
    <div v-for="(word_, i) in game.fourtileWords" :key="i">
      <IconStarFilled
        v-if="game.numFourtilesFound > i"
        class="animate-star"
        data-testid="star-filled"
      />
      <IconStar v-else data-testid="star-open" />
    </div>
  </div>
  <p v-else id="instructions">
    Make words by combining 2 or more tiles. Find words using 4 tiles to win
    <span class="nobr"><IconStarFilled />s!</span>
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
  gap: var(--space-md);
  align-items: center;
  justify-content: center;
}

#star-list svg {
  height: var(--font-size-xl);
  color: var(--color-brat);
}

#instructions {
  padding: 0;
  margin: 0;
  font-size: var(--font-size-lg);
  text-align: center;
}

#instructions svg {
  height: var(--font-size-lg);
  vertical-align: middle;
  color: var(--color-brat);
}

.nobr {
  white-space: nowrap;
}
</style>

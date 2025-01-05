<template>
  <div id="actions">
    <button class="round" aria-label="Shuffle" @click="game.shuffleTiles()">
      <IconArrowsShuffle size="24" color="white" />
    </button>

    <button
      id="add-found-word"
      :disabled="game.currentWord.length === 0"
      aria-label="Add"
      @click="game.addFoundWord"
    >
      <IconCircleCheck size="96" :color="addFoundWordColor" />
    </button>

    <button
      class="round"
      :disabled="!game.allFourtilesFound"
      aria-label="Sort"
      @click="game.sortTiles()"
    >
      <IconSortDescending2Filled size="24" color="white" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { IconArrowsShuffle, IconCircleCheck, IconSortDescending2Filled } from '@tabler/icons-vue'
import useGameStore from '@/stores/game'
import { computed } from 'vue'

const game = useGameStore()

const addFoundWordColor = computed(() =>
  game.currentWord.length === 0 ? 'var(--color-border)' : 'var(--color-brat)'
)
</script>

<style scoped>
#actions {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-evenly;
  margin-top: var(--space-lg);
}

button.round {
  padding: 5px 5px 1px; /* hacky way to get it centered in the button */
  background-color: var(--color-brat);
  border-radius: 50%;
}

button:active:not(:disabled) {
  transform: translate(2px, 2px);
}

button:not(#add-found-word):disabled {
  cursor: inherit;
  background-color: var(--color-disabled);
}
</style>

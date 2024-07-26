<template>
  <TransitionGroup id="tile-grid" name="tiles" tag="div">
    <Tile v-for="tile in game.tiles" :key="tile" :tile="tile" />
  </TransitionGroup>

  <div id="actions">
    <button class="round" @click="game.shuffleTiles()">
      <IconArrowsShuffle size="24" color="white" />
    </button>

    <button id="add-found-word" :disabled="game.currentWord.length === 0" @click="addFoundWord">
      <IconCircleCheck size="96" :color="addFoundWordColor" />
    </button>

    <button class="round" :disabled="!game.allFourtilesFound" @click="game.sortTiles()">
      <IconSortDescending2Filled size="24" color="white" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { IconCircleCheck, IconArrowsShuffle, IconSortDescending2Filled } from '@tabler/icons-vue'
import Tile from '@/components/game/Tile.vue'
import useGameStore from '@/stores/game'
import { computed } from 'vue'

const game = useGameStore()

const addFoundWordColor = computed(() =>
  game.currentWord.length === 0 ? 'var(--color-border)' : 'var(--color-brat)'
)

function addFoundWord() {
  if (game.addFoundWord()) {
    // some animation
  } else {
    // some other animation
  }
}
</script>

<style scoped>
#tile-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: var(--space-md);
  grid-row-gap: var(--space-md);
  justify-items: stretch;
  align-items: stretch;
}

#actions {
  margin-top: var(--space-lg);
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-items: center;
}

button.round {
  background-color: var(--color-brat);
  border-radius: 50%;
  padding: 5px 5px 1px 5px; /* hacky way to get it centered in the button */
}

button:active:not(:disabled) {
  transform: translate(2px, 2px);
}

button:not(#add-found-word):disabled {
  background-color: var(--color-disabled);
  cursor: inherit;
}

.tiles-move, /* apply transition to moving elements */
.tiles-enter-active,
.tiles-leave-active {
  transition: all 0.5s ease;
}

.tiles-enter-from,
.tiles-leave-to {
  opacity: 0;
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.tiles-leave-active {
  position: absolute;
}
</style>

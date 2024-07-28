<template>
  <TransitionGroup id="tile-grid" name="tiles" tag="div">
    <div id="current-word" key="current-word">
      <CurrentWord />
    </div>
    <div key="spacer" class="spacer" />
    <Tile v-for="tile in game.tiles" :key="tile" :tile="tile" />
  </TransitionGroup>
</template>

<script setup lang="ts">
import Tile from '@/components/game/Tile.vue'
import useGameStore from '@/stores/game'
import CurrentWord from '@/components/game/CurrentWord.vue'

const game = useGameStore()
</script>

<style scoped>
#tile-grid {
  display: grid;
  grid-template-areas:
    'current-word current-word current-word current-word'
    'spacer       spacer       spacer       spacer'
    'tile         tile         tile         tile'
    'tile         tile         tile         tile'
    'tile         tile         tile         tile'
    'tile         tile         tile         tile';
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr 0 repeat(4, 1fr);
  grid-column-gap: var(--space-md);
  grid-row-gap: var(--space-md);
  justify-items: stretch;
  align-items: stretch;
}

#current-word {
  grid-area: current-word;
  justify-self: center;
  align-self: center;
}

.spacer {
  grid-area: spacer;
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

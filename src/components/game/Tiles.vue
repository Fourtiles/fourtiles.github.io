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
  grid-template:
    'current-word current-word current-word current-word' 1fr
    'spacer       spacer       spacer       spacer' 0
    'tile         tile         tile         tile' 1fr
    'tile         tile         tile         tile' 1fr
    'tile         tile         tile         tile' 1fr
    'tile         tile         tile         tile' 1fr
    / 1fr 1fr 1fr 1fr;
  gap: var(--space-md) var(--space-md);
  place-items: stretch stretch;
}

#current-word {
  grid-area: current-word;
  place-self: center center;
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

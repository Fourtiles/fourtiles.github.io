<template>
  <main
    :data-tiles="game.tiles.join(',')"
    :data-words="game.allPossibleWords.join(',')"
    :data-fourtiles="game.fourtileWords.join(',')"
    :data-found-words="game.foundWords.join(',')"
  >
    <div class="fourtile-stars"><FourtileStars /></div>
    <div class="word-list"><FoundWords /></div>
    <div class="tiles"><Tiles /><ActionButtons /></div>
  </main>
</template>

<script setup lang="ts">
import Tiles from './game/Tiles.vue'
import FoundWords from './game/FoundWords.vue'
import FourtileStars from '@/components/game/FourtileStars.vue'
import ActionButtons from '@/components/game/ActionButtons.vue'
import useGameStore from '@/stores/game'

const game = useGameStore()
</script>

<style scoped>
main {
  display: grid;
  gap: var(--space-md) var(--space-md);
}

@media (aspect-ratio >= 1/1) {
  main {
    grid-template:
      'fourtile-stars fourtile-stars' min-content
      'word-list      tiles' 1fr
      / 1fr 2fr;
    grid-auto-columns: 1fr;
    width: 100%;
    height: 100%;
  }
}

@media (aspect-ratio < 1/1) {
  main {
    grid-template:
      'fourtile-stars' min-content
      'tiles' min-content
      'word-list' min-content
      / 1fr;
    grid-auto-columns: 1fr;
  }
}

main > div {
  padding: 0 var(--space-md);
}

.word-list {
  grid-area: word-list;
  align-self: center;
}

.tiles {
  grid-area: tiles;
  place-self: center center;
}

.fourtile-stars {
  grid-area: fourtile-stars;
  place-self: center center;
}
</style>

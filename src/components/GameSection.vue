<template>
  <main>
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
</script>

<style scoped>
main {
  display: grid;
  gap: var(--space-md) var(--space-md);
}

@media (min-aspect-ratio: 1/1) {
  main {
    width: 100%;
    height: 100%;
    grid-auto-columns: 1fr;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: min-content 1fr;
    grid-template-areas:
      'fourtile-stars fourtile-stars'
      'word-list      tiles';
  }
}

@media (max-aspect-ratio: 1/1) {
  main {
    grid-auto-columns: 1fr;
    grid-template-columns: 1fr;
    grid-template-rows: min-content min-content min-content min-content;
    grid-template-areas:
      'fourtile-stars'
      'tiles'
      'word-list';
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
  align-self: center;
  justify-self: center;
}

.fourtile-stars {
  grid-area: fourtile-stars;
  justify-self: center;
  align-self: center;
}
</style>

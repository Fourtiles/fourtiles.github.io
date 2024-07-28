<template>
  <main>
    <div id="tiles"><Tiles /></div>
    <div id="found-words"><FoundWords /></div>
  </main>
</template>

<script setup lang="ts">
import Tiles from './game/Tiles.vue'
import FoundWords from './game/FoundWords.vue'
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
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
    grid-auto-columns: 1fr;
    grid-auto-flow: row;
    grid-template-areas: 'found-words tiles';
  }
}

@media (max-aspect-ratio: 1/1) {
  main {
    grid-auto-columns: 1fr;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr min-content;
    grid-template-areas:
      'tiles'
      'found-words';
  }
}

main > div {
  padding: 0 var(--space-md);
}

#tiles {
  grid-area: tiles;
  justify-self: center;
  align-self: center;
}

#found-words {
  grid-area: found-words;
}
</style>

<template>
  <main>
    <div id="current-word"><CurrentWord /></div>
    <div id="tiles"><Tiles /></div>
    <div id="found-words"><FoundWords /></div>
  </main>
</template>

<script setup lang="ts">
import CurrentWord from './game/CurrentWord.vue'
import Tiles from './game/Tiles.vue'
import FoundWords from './game/FoundWords.vue'
</script>

<style scoped>
main {
  margin: 0 var(--space-md);
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: min-content 1fr;
  grid-auto-columns: 1fr;
  gap: var(--space-md) var(--space-md);
  grid-auto-flow: row;
  grid-template-areas:
    'found-words current-word'
    'found-words tiles';
}

#current-word {
  grid-area: current-word;
  justify-self: center;
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

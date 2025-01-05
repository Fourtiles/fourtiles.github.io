<template>
  <li :class="{ found: didFindWord, fourtile: isFourtile }">
    {{ props.word }}
  </li>
</template>

<script setup lang="ts">
import useGameStore from '@/stores/game'
import { computed } from 'vue'

const props = defineProps<{
  word: string
}>()

const game = useGameStore()

const didFindWord = computed(() => game.foundWords.includes(props.word))
const isFourtile = computed(() => game.fourtileWords.includes(props.word))
</script>

<style scoped>
li {
  padding: var(--space-xs) 0;
  margin: 0 var(--space-md);
  list-style-type: none;
}

li:not(.found) {
  color: var(--color-text-muted);
}

li.fourtile {
  font-weight: bold;
}
</style>

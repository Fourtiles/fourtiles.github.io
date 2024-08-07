<template>
  <div id="found-words-container" data-testid="found-words">
    <div id="words-remaining" role="heading">
      <span data-testid="words-remaining">{{ numWordsRemaining }}</span>
      {{ game.numWordsRemaining === 1 ? 'word' : 'words' }}
      remaining
    </div>

    <p v-if="noFoundWords && !showAllWords" id="no-found-words" class="muted">
      No words found yet.
    </p>

    <ul>
      <FoundWord v-for="word in wordsToShow" :key="word" :word="word" />
    </ul>

    <div id="show-all-words">
      <div>
        <a v-if="!showAllWords" @click.prevent="showAllWords = true">Show all words</a>
        <p v-else id="showing-all-words" class="muted">Showing all words.</p>
      </div>
      <div><a @click="startRandomGame">Start a new game</a></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useGameStore from '@/stores/game'
import { computed, ref } from 'vue'
import FoundWord from '@/components/game/FoundWord.vue'
import { identity, sortBy } from 'lodash-es'
import { startRandomGame } from '@/functions'

const game = useGameStore()

const showAllWords = ref(false)

const numWordsRemaining = computed(() => Intl.NumberFormat().format(game.numWordsRemaining))
const wordsToShow = computed(() =>
  sortBy(showAllWords.value ? game.allPossibleWords : game.foundWords, identity)
)
const noFoundWords = computed(() => game.foundWords.length === 0)
</script>

<style scoped>
#found-words-container {
  padding: 0;
  border: 3px solid var(--color-brat);
  border-radius: var(--border-radius-md);
}

#words-remaining {
  background-color: var(--color-brat);
  color: white;
  text-align: center;
  padding: var(--space-sm);
  font-weight: bold;
  border-top-left-radius: var(--border-radius-sm);
  border-top-right-radius: var(--border-radius-sm);
}

#show-all-words {
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  padding: var(--space-sm);
  text-align: center;
  gap: var(--space-md);
}

ul {
  padding: 0;
  column-count: 2;
}

#no-found-words {
  text-align: center;
}

#showing-all-words {
  font-size: var(--font-size-sm);
}
</style>

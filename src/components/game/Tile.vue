<template>
  <div
    v-if="shouldDisplay"
    class="tile"
    :class="{ used: usedInFourtile, invalid: props.invalid }"
    role="button"
    data-testid="tile"
    @click="toggleWord"
  >
    {{ props.tile }}
  </div>
  <div v-else class="disabled" role="button" data-testid="tile" @click="toggleWord">
    {{ props.tile }}
  </div>
</template>

<script setup lang="ts">
import useGameStore from '@/stores/game'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    tile: string
    forceDisplay?: boolean
    forceSolid?: boolean
    invalid?: boolean
  }>(),
  { forceDisplay: false, invalid: false, forceSolid: false }
)

const game = useGameStore()

const inUse = computed(() => game.currentWord.includes(props.tile))
const shouldDisplay = computed(() => props.forceDisplay || !inUse.value)
const usedInFourtile = computed(
  () => !props.forceSolid && game.tilesUsedInFourtiles.includes(props.tile)
)

function toggleWord() {
  if (inUse.value) game.removeTile(props.tile)
  else game.addTile(props.tile)
}
</script>

<style scoped>
div {
  padding: var(--space-md);
  text-align: center;
  cursor: pointer;
  user-select: none;
  background-color: var(--color-brat);
  border-radius: var(--border-radius-sm);
  box-shadow: 4px 4px 10px 0 rgb(0 0 0 / 25%);
}

.disabled {
  padding: calc(var(--space-md) - 2px);
  color: transparent;
  background-color: white;
  border: 2px solid var(--color-disabled);
  box-shadow: none;
}

.used {
  background-color: transparent;
  border: 2px solid var(--color-brat);
}

.invalid {
  background-color: var(--color-invalid);
  transition: background-color 0.5s;
}
</style>

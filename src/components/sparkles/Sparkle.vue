<template>
  <div
    v-if="isAlive"
    :key="props.appliedKey"
    class="sparkle-wrapper"
    :style="props.appliedStyle"
    :data-created-at="props.createdAt"
  >
    <svg :width="props.size" :height="props.size" viewBox="0 0 160 160" fill="none" class="sparkle">
      <path :d="props.path" :fill="props.color" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { SparkleProps } from '@/components/sparkles/types'

const props = defineProps<SparkleProps>()

const isAlive = ref(true)

onMounted(() => {
  setTimeout(() => {
    isAlive.value = false
  }, 600)
})
</script>

<style scoped>
@keyframes grow-and-shrink {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(180deg);
  }
}

.sparkle-wrapper {
  position: absolute;
  z-index: 2;
  pointer-events: none;
  animation: grow-and-shrink 600ms ease-in-out forwards;
}

.sparkle-wrapper > svg.sparkle {
  animation: spin 600ms linear forwards;
}
</style>

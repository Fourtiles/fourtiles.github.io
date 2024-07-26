<template>
  <div id="sparkle-wrapper" ref="wrapper" class="vue-sparkles">
    <div class="sparkle-child-wrapper">
      <slot />
    </div>
    <template v-if="active">
      <Sparkle v-for="instance in instances" v-bind="instance" :key="instance.appliedKey" />
    </template>
  </div>
</template>

<script setup lang="ts">
import Sparkle from './Sparkle.vue'
import { onMounted, ref } from 'vue'
import { isArray, random, sample, uniqueId } from 'lodash-es'
import type { SparkleProps } from '@/components/sparkles/types'

/**
 * This code and Sparkle.vue are adapted for Vue 3 from
 * https://github.com/ericwaetke/Vue-Sparkles
 */

const props = withDefaults(
  defineProps<{
    path?: string | string[]
    color?: string | string[]
    active?: boolean
  }>(),
  {
    path: 'M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z',
    color: 'hsl(50deg, 100%, 50%)',
    active: true
  }
)

const instances = ref<SparkleProps[]>([])
const wrapper = ref<HTMLElement | null>(null)

onMounted(() => tick())

function generateSparkle() {
  return {
    id: uniqueId(),
    createdAt: Date.now(),
    color: props.color,
    size: random(10, 20),
    style: {
      // Pick a random spot in the available space
      top: random(0, 100) + '%',
      left: random(0, 100) + '%',
      // Float sparkles above sibling content
      zIndex: random(1, 3).toString()
    }
  }
}

function addSparkle() {
  const sparklePath = isArray(props.path) ? sample(props.path) : props.path
  const sparkleColor = isArray(props.color) ? sample(props.color) : props.color

  const sparkle = generateSparkle()
  instances.value.push({
    color: sparkleColor,
    size: sparkle.size,
    appliedStyle: sparkle.style,
    appliedKey: sparkle.id,
    createdAt: sparkle.createdAt,
    path: sparklePath
  })
}

function tick() {
  if (props.active) addSparkle()
  else instances.value = []
  setTimeout(tick, random(1, 50))
}
</script>

<style scoped>
#sparkle-wrapper {
  position: relative;
  display: inline-block;
}

.sparkle-child-wrapper {
  position: relative;
  z-index: 2;
  font-weight: bold;
}
</style>

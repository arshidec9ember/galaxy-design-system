<markdown>
  # Offset
</markdown>

<template>
  <z-space align="center" item-style="display: flex;">
    <z-badge :value="value" :max="15" :offset="offset">
      <z-avatar />
    </z-badge>
    {{ offset }}
    <z-button-group>
      <z-button @click="move('up')">
        <template #icon>
          <z-icon><arrow-up16-filled /></z-icon>
        </template>
      </z-button>
      <z-button @click="move('right')">
        <template #icon>
          <z-icon><arrow-right16-filled /></z-icon>
        </template>
      </z-button>
      <z-button @click="move('down')">
        <template #icon>
          <z-icon><arrow-down16-filled /></z-icon>
        </template>
      </z-button>
      <z-button @click="move('left')">
        <template #icon>
          <z-icon><arrow-left16-filled /></z-icon>
        </template>
      </z-button>
    </z-button-group>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import {
  ArrowUp16Filled,
  ArrowDown16Filled,
  ArrowLeft16Filled,
  ArrowRight16Filled
} from '@vicons/fluent'

export default defineComponent({
  components: {
    ArrowUp16Filled,
    ArrowDown16Filled,
    ArrowLeft16Filled,
    ArrowRight16Filled
  },
  setup () {
    const value = ref(5)
    const offsetX = ref(-17)
    const offsetY = ref(17)

    const move = (direction) => {
      switch (direction) {
        case 'up':
          offsetY.value -= 5
          break
        case 'down':
          offsetY.value += 5
          break
        case 'left':
          offsetX.value -= 5
          break
        case 'right':
          offsetX.value += 5
          break
        default:
          break
      }
    }

    const offset = computed(() => [offsetX.value, offsetY.value])

    return {
      value,
      offset,
      move
    }
  }
})
</script>

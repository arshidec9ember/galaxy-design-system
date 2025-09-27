<markdown>
# Multiple circle

You can customize `multiple circle`.
</markdown>

<template>
  <z-space vertical>
    <z-space>
      <z-progress
        variant="multiple-circle"
        :stroke-width="6"
        :circle-gap="0.5"
        :percentage="[
          percentage,
          (percentage + 10) % 100,
          (percentage + 20) % 100,
          (percentage + 30) % 100
        ]"
        :color="{ color: ['#2A4FF0', '#49CF55', '#F09948', '#F04F6D'] }"
        :rail-style="[
          { stroke: '#2A4FF0', opacity: 0.3 },
          { stroke: '#49CF55', opacity: 0.3 },
          { stroke: '#F09948', opacity: 0.3 },
          { stroke: '#F04F6D', opacity: 0.3 }
        ]"
      >
        <div style="text-align: center">
          Circle racing!
        </div>
      </z-progress>
    </z-space>
    <z-space>
      <z-button @click="minus">
        Minus 10%
      </z-button>
      <z-button @click="add">
        Add 10%
      </z-button>
    </z-space>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const percentageRef = ref(0)

    const add = () => {
      percentageRef.value += 10
      if (percentageRef.value > 100) {
        percentageRef.value = 0
      }
    }

    const minus = () => {
      percentageRef.value -= 10
      if (percentageRef.value < 0) {
        percentageRef.value = 100
      }
    }

    return {
      percentage: percentageRef,
      add,
      minus
    }
  }
})
</script>

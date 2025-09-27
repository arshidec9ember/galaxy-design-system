<markdown>
# Basic

It support all 4 different status `info`, `success`, `warning` or `error`.
</markdown>

<template>
  <z-space vertical>
    <z-progress
      variant="line"
      status="info"
      :percentage="percentage"
      :show-indicator="false"
    />
    <z-progress
      variant="line"
      status="success"
      :percentage="percentage"
      :show-indicator="false"
    />
    <z-progress
      variant="line"
      status="warning"
      :percentage="percentage"
      :show-indicator="false"
    />
    <z-progress
      variant="line"
      status="error"
      :percentage="percentage"
      :show-indicator="false"
    />
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
    const percentageRef = ref(40)

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

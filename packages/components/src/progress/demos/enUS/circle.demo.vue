<markdown>
# Circle

Progress can be a circle. It can be `primary`, `info`, `success`, `warning` or `error` status.
</markdown>

<template>
  <z-space vertical>
    <z-space>
      <z-progress variant="circle" :percentage="percentage" />
      <z-progress variant="circle" status="info" :percentage="percentage" />
      <z-progress variant="circle" status="success" :percentage="percentage" />
      <z-progress variant="circle" status="warning" :percentage="percentage" />
      <z-progress variant="circle" status="error" :percentage="percentage" />
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

<markdown>
# Large data
</markdown>

<template>
  <z-transfer
    ref="transfer"
    v-model="value"
    :options="options"
    virtual-scroll
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

function createOptions () {
  return Array.from({ length: 42000 }).map((v, i) => ({
    label: 'Option' + i,
    value: i,
    disabled: i % 5 === 0
  }))
}

function createValues () {
  return Array.from({ length: 50 }).map((v, i) => i)
}

export default defineComponent({
  setup () {
    return {
      options: createOptions(),
      value: ref(createValues())
    }
  }
})
</script>

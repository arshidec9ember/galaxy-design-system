<markdown>
# Size

Mixing sizes does not look harmonious.
</markdown>

<template>
  <z-space vertical>
    <z-legacy-transfer
      ref="transfer"
      v-model="value"
      :options="options"
      size="small"
    />
    <z-legacy-transfer
      ref="transfer"
      v-model="value"
      :options="options"
      size="large"
    />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

function createOptions () {
  return Array.from({ length: 100 }).map((v, i) => ({
    label: 'Option ' + i,
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

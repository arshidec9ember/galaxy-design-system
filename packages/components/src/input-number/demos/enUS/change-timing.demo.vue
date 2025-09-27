<markdown>
# Timing to change

Set `update-value-on-input` to `false`, the value won't be changed on input.
</markdown>

<template>
  <z-space vertical>
    <z-input-number
      v-model="value"
      :update-value-on-input="false"
      placeholder=""
      :min="20"
      :max="50"
    />
    <z-input-number v-model="value" placeholder="" :min="20" :max="50" />
    {{ value }}
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(35)
    }
  }
})
</script>

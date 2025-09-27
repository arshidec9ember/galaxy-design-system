<markdown>
# Min and max

You can set minimum and maximum values too.
</markdown>

<template>
  <z-space vertical>
    <z-input-number v-model="value" placeholder="Min" :min="-3" :max="5" />
    <z-input-number v-model="value" placeholder="Max" :min="-5" :max="3" />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(null)
    }
  }
})
</script>

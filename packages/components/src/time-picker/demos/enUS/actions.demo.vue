<markdown>
# Actions

</markdown>
<template>
  <z-space vertical>
    <z-time-picker v-model="ts1" :actions="['now', 'confirm']" />
    <z-time-picker v-model="ts2" :actions="['now']" />
    <z-time-picker v-model="ts3" :actions="null" />
  </z-space>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      ts1: ref(null),
      ts2: ref(861333934000),
      ts3: ref(861333934000)
    }
  }
})
</script>

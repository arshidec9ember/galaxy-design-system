<markdown>
# Actions
</markdown>

<template>
  <z-space vertical>
    <z-date-picker v-model="ts1" type="date" />
    <z-date-picker v-model="ts2" type="datetime" />
    <z-date-picker
      v-model="range1"
      update-value-on-close
      type="daterange"
      :actions="null"
    />
    <z-date-picker
      v-model="range2"
      update-value-on-close
      type="datetimerange"
      :actions="['clear']"
    />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      ts1: ref(null),
      ts2: ref(1183135260000),
      range1: ref(null),
      range2: ref(null)
    }
  }
})
</script>

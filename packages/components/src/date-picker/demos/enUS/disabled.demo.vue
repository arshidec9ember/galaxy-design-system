<markdown>
# Disabled
</markdown>

<template>
  <z-space vertical>
    <div><z-switch v-model="disabled" /> Disable</div>
    <z-date-picker v-model="date" type="date" :disabled="disabled" />
    <z-date-picker v-model="datetime" type="datetime" :disabled="disabled" />
    <z-date-picker v-model="daterange" :disabled="disabled" type="daterange" />
    <z-date-picker
      v-model="datetimerange"
      :disabled="disabled"
      type="datetimerange"
    />
    <z-switch v-model="disabled" />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      datetime: ref(null),
      date: ref(null),
      datetimerange: ref(null),
      daterange: ref(null),
      disabled: ref(true)
    }
  }
})
</script>

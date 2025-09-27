<markdown>
# Formatted value

</markdown>

<template>
  <pre>{{ formattedValue }}</pre>
  <z-date-picker
    v-model:formatted-value="formattedValue"
    value-format="yyyy-MM-dd HH:mm:ss"
    type="datetime"
    clearable
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      formattedValue: ref('2007-06-30 12:08:55')
    }
  }
})
</script>

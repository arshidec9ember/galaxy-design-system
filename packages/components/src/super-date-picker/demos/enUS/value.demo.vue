<markdown>
# Value

</markdown>
<template>
  <z-super-date-picker v-model:value="value" />
  <pre>value: {{ value }}</pre>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup () {
    const value = ref(null)
    return { value }
  }
})
</script>

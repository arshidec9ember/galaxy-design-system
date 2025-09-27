<markdown>
# Format

</markdown>
<template>
  <z-time-picker v-model="time" format="h:mm a" :actions="['confirm']" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      time: ref(null)
    }
  }
})
</script>

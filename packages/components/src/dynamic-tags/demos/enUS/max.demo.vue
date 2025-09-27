<markdown>
# Max tag count
</markdown>

<template>
  <z-dynamic-tags v-model="tags" :max="3" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      tags: ref(['teacher', 'programmer'])
    }
  }
})
</script>

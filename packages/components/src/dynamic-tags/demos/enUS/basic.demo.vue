<markdown>
# Basic
</markdown>

<template>
  <z-dynamic-tags v-model="tags" />
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

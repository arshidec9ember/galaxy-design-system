<markdown>
# Inverted

Spinner can be shown in an inverted color
</markdown>

<template>
  <div style="background-color: rgb(15, 27, 89)">
    <z-spinner :show="true" :inverted="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      show: ref(false)
    }
  }
})
</script>

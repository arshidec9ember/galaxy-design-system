<markdown>
# Basic
</markdown>

<template>
  <z-time :time="0" />
  <br>
  <z-time :time="time" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      time: new Date(0)
    }
  }
})
</script>

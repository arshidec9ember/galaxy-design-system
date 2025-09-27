<markdown>
# Type

`date`, `datetime` or `relative`.
</markdown>

<template>
  <z-time :time="0" type="date" />
  <br>
  <z-time :time="time" type="datetime" />
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

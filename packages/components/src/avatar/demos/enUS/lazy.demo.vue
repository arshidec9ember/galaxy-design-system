<markdown>
# Lazy load

You can use `lazy` to let image load after it enters viewport.
</markdown>

<template>
  <div
    id="image-scroll-container"
    style="overflow: auto; height: 100px; gap: 8px"
  >
    <z-space vertical>
      <z-avatar
        v-for="i of range"
        :key="i"
        size="small"
        :src="`https://robohash.org/a87ff679a2f3e71d9181a67b7542122c?set=set${i}&bgset=&size=400x400`"
        lazy
        :intersection-observer-options="{
          root: '#image-scroll-container'
        }"
      />
    </z-space>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      range: Array.from({ length: 10 }, (_, i) => i + 1)
    }
  }
})
</script>

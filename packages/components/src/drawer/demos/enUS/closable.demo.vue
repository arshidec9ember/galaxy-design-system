<markdown>
# Closable

Set `closable` on `z-drawer-content`.
</markdown>

<template>
  <z-button @click="show = true">
    Open
  </z-button>
  <z-drawer v-model:show="show" :width="502">
    <z-drawer-content
      title="Add Financial Institue(s)"
      description="Choose how you want to add your data and lets see what more can you do here"
      header-style="
      background: #FFEFDF;border-bottom: 0px"
      closable
    >
      Stoner is a 1965 novel by the American writer John Williams.
    </z-drawer-content>
  </z-drawer>
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

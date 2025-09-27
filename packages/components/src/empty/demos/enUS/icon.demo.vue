<markdown>
# Icon

Customize icon in empty.
</markdown>

<template>
  <z-empty description="Custom your icon">
    <template #icon>
      <z-icon>
        <ios-airplane />
      </z-icon>
    </template>
    <template #actions>
      <z-button size="medium">
        Find Something New
      </z-button>
    </template>
  </z-empty>
</template>

<script lang="ts">
import { IosAirplane } from '@vicons/ionicons4'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    IosAirplane
  }
})
</script>

<markdown>
# Icon

Add an icon in default slot.
</markdown>

<template>
  <z-rating color="#ff6d75">
    <z-icon size="20">
      <heart24-filled />
    </z-icon>
  </z-rating>
</template>

<script lang="ts">
import Heart24Filled from '@vicons/fluent/Heart24Filled'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Heart24Filled
  }
})
</script>

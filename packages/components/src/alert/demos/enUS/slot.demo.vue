<markdown>
# Slot
</markdown>

<template>
  <z-alert>
    <template #header>
      Default Text
    </template>
    <template #icon>
      <z-icon>
        <ios-airplane />
      </z-icon>
    </template>
    Be sure to use margin utilities to keep things nice and tidy.
  </z-alert>
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

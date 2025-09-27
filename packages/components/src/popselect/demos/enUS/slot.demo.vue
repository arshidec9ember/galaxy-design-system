<markdown>
# Action Slot

Is there anybody who needs slots in a select menu?
</markdown>

<template>
  <z-popselect v-model="value" :options="[]" trigger="click">
    <z-button>{{ value || 'Popselect' }}</z-button>
    <template #empty>
      Nothing to see, here is empty.
    </template>
    <template #action>
      If you click this demo, you may need it.
    </template>
  </z-popselect>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref('Empty')
    }
  }
})
</script>

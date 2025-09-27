<markdown>
# Overflow

Set `max` prop to handle overflow situation.
</markdown>

<template>
  <z-space :size="24" align="center">
    <z-badge :value="value" show-zero>
      <z-avatar />
    </z-badge>
    <z-badge :value="value" :max="99">
      <z-avatar />
    </z-badge>
    <z-badge :value="value" show-zero :max="100">
      <z-avatar />
    </z-badge>
    <z-badge :value="value" show-zero :max="10">
      <z-avatar />
    </z-badge>
    <z-button-group>
      <z-button @click="value = Math.min(16, value + 1)">
        <template #icon>
          <z-icon><md-add /></z-icon>
        </template>
      </z-button>
      <z-button @click="value = Math.max(0, value - 1)">
        <template #icon>
          <z-icon><md-remove /></z-icon>
        </template>
      </z-button>
    </z-button-group>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { MdAdd, MdRemove } from '@vicons/ionicons4'

export default defineComponent({
  components: {
    MdAdd,
    MdRemove
  },
  setup () {
    return {
      value: ref(101)
    }
  }
})
</script>

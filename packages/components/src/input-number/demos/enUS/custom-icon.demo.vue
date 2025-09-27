<markdown>
# Custom Icon
</markdown>

<template>
  <z-space vertical>
    <z-input-number v-model="value">
      <template #minus-icon>
        <z-icon :component="ArrowDownCircleOutline" />
      </template>
      <template #add-icon>
        <z-icon :component="ArrowUpCircleOutline" />
      </template>
    </z-input-number>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ArrowUpCircleOutline, ArrowDownCircleOutline } from '@vicons/ionicons5'

export default defineComponent({
  setup () {
    return {
      value: ref(0),
      ArrowUpCircleOutline,
      ArrowDownCircleOutline
    }
  }
})
</script>

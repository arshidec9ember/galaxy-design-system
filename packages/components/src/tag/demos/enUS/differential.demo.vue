<markdown>
# Differential icons

Success and Danger Tags have Differential icons
</markdown>

<template>
  <z-space>
    <z-tag color="success" :bordered="false">
      <template #icon>
        <z-icon><arrow-upward /></z-icon>
      </template>
      Active
    </z-tag>
    <z-tag color="error" :bordered="false">
      <template #icon>
        <z-icon><arrow-downward /></z-icon>
      </template>
      Inactive
    </z-tag>
  </z-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ArrowUpward, ArrowDownward } from '@zeta/icons'

export default defineComponent({
  components: {
    ArrowUpward,
    ArrowDownward
  }
})
</script>

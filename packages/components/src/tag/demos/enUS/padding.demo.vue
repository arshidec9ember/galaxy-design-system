<markdown>
# No Padded tags

Tags can have no padding when borderless
</markdown>

<template>
  <z-space>
    <z-tag
      :color="{ color: 'transparent', textColor: '#020D4D' }"
      :bordered="false"
      no-padding
    >
      <template #icon>
        <z-icon color="var(--gds-color-icon-warning)">
          <warning />
        </z-icon>
      </template>
      Inactive
    </z-tag>
  </z-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Warning } from '@zeta/icons'

export default defineComponent({
  components: {
    Warning
  }
})
</script>

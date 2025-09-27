<markdown>
# Tags with Label

Tags can have labels.
</markdown>

<template>
  <z-space>
    <z-tag :bordered="false">
      <template #label>
        Label:
      </template>
      Real Love</z-tag>
    <z-tag class="tags-demo" :bordered="false" color="success">
      <template #label>
        Label:
      </template>
      <template #icon>
        <z-icon
          color="var(--gds-color-icon-success)"
          size="16"
        ><warning /></z-icon>
      </template>
      <ZText variant="3-r" color="success">
        Active
      </ZText>
    </z-tag>
    <z-tag :bordered="false" color="warning">
      <template #label>
        Label:
      </template>
      Warning
    </z-tag>
    <z-tag :bordered="false" color="error">
      <template #label>
        Label:
      </template>
      Inactive
    </z-tag>
    <z-tag :bordered="false" color="info">
      <template #label>
        Label:
      </template>
      Info
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

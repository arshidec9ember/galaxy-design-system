<markdown>
# Full Width
</markdown>

<template>
  <z-button variant="filled" color="primary" full-width>
    Full Width Button
    <template #icon>
      <ZIcon>
        <add-icon />
      </ZIcon>
    </template>
  </z-button>
</template>

<script lang="ts">
import { Add as AddIcon } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    AddIcon
  }
})
</script>

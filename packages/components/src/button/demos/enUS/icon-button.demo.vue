<markdown>
# Use icons as buttons
</markdown>

<template>
  <z-space>
    <z-button variant="filled" color="primary" style="font-size: 24px">
      <z-icon>
        <add-icon />
      </z-icon>
    </z-button>
    <z-button variant="outlined" color="primary" style="font-size: 24px">
      <z-icon>
        <add-icon />
      </z-icon>
    </z-button>
    <z-button variant="light" color="primary" style="font-size: 24px">
      <z-icon>
        <add-icon />
      </z-icon>
    </z-button>
    <z-button variant="subtle" color="primary" style="font-size: 24px">
      <z-icon>
        <add-icon />
      </z-icon>
    </z-button>
  </z-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Add as AddIcon } from '@vicons/ionicons5'

export default defineComponent({
  components: {
    AddIcon
  }
})
</script>

<markdown>
# Shape

Buttons can have different shapes.
</markdown>

<template>
  <z-space>
    <z-button circle>
      <template #icon>
        <z-icon><add-icon /></z-icon>
      </template>
    </z-button>
    <z-button round>
      Round
    </z-button>
    <z-button>Rect</z-button>
  </z-space>
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

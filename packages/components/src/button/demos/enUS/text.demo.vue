<markdown>
# Text

There are `neutral`, `primary`, `info`, `success`, `warning` and `error` button types.
</markdown>

<template>
  <z-space>
    <z-button variant="text">
      Neutral
    </z-button>
    <z-button variant="text" color="primary">
      Primary
    </z-button>
    <z-button variant="text" color="info">
      Info
    </z-button>
    <z-button variant="text" color="success">
      Success
    </z-button>
    <z-button variant="text" color="error">
      Error
    </z-button>
    <z-button variant="text" color="warning">
      Warning
    </z-button>
    <z-button variant="text" circle>
      <template #icon>
        <z-icon><add-icon /></z-icon>
      </template>
    </z-button>
    <z-button variant="text" color="primary" circle>
      <template #icon>
        <z-icon><add-icon /></z-icon>
      </template>
    </z-button>
    <z-button variant="text" color="info" circle>
      <template #icon>
        <z-icon><add-icon /></z-icon>
      </template>
    </z-button>
    <z-button variant="text" color="success" circle>
      <template #icon>
        <z-icon><add-icon /></z-icon>
      </template>
    </z-button>
    <z-button variant="text" color="error" circle>
      <template #icon>
        <z-icon><add-icon /></z-icon>
      </template>
    </z-button>
    <z-button variant="text" color="warning" circle>
      <template #icon>
        <z-icon><add-icon /></z-icon>
      </template>
    </z-button>
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

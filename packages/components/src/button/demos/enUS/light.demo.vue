<markdown>
# Light
These buttons have light grey background

There are `neutral`, `primary`, `info`, `success`, `warning` and `error` button types.
</markdown>

<template>
  <z-space>
    <z-button variant="light">
      Neutral
    </z-button>
    <z-button variant="light" color="primary">
      Primary
    </z-button>
    <z-button variant="light" color="info">
      Info
    </z-button>
    <z-button variant="light" color="success">
      Success
    </z-button>
    <z-button variant="light" color="error">
      Error
    </z-button>
    <z-button variant="light" color="warning">
      Warning
    </z-button>
    <z-button variant="light" round>
      Neutral
    </z-button>
    <z-button variant="light" color="primary" round>
      Primary
    </z-button>
    <z-button variant="light" color="info" round>
      Info
    </z-button>
    <z-button variant="light" color="success" round>
      Success
    </z-button>
    <z-button variant="light" color="error" round>
      Error
    </z-button>
    <z-button variant="light" color="warning" round>
      Warning
    </z-button>
    <z-button variant="light" circle>
      <template #icon>
        <z-icon><add-icon /></z-icon>
      </template>
    </z-button>
    <z-button variant="light" color="primary" circle>
      <template #icon>
        <z-icon><add-icon /></z-icon>
      </template>
    </z-button>
    <z-button variant="light" color="info" circle>
      <template #icon>
        <z-icon><add-icon /></z-icon>
      </template>
    </z-button>
    <z-button variant="light" color="success" circle>
      <template #icon>
        <z-icon><add-icon /></z-icon>
      </template>
    </z-button>
    <z-button variant="light" color="error" circle>
      <template #icon>
        <z-icon><add-icon /></z-icon>
      </template>
    </z-button>
    <z-button variant="light" color="warning" circle>
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

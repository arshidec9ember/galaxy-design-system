<markdown>
# Filled
These buttons have filled backgrounds

Semantic colors include `neutral`, `primary`, `info`, `success`, `warning`, and `error` for button variations.
</markdown>

<template>
  <z-space>
    <z-button variant="filled">
      Neutral
    </z-button>
    <z-button variant="filled" color="primary">
      Primary
    </z-button>
    <z-button variant="filled" color="info">
      Info
    </z-button>
    <z-button variant="filled" color="success">
      Success
    </z-button>
    <z-button variant="filled" color="error">
      Error
    </z-button>
    <z-button variant="filled" color="warning">
      Warning
    </z-button>
    <z-button variant="filled" round>
      Neutral
    </z-button>
    <z-button variant="filled" color="primary" round>
      Primary
    </z-button>
    <z-button variant="filled" color="info" round>
      Info
    </z-button>
    <z-button variant="filled" color="success" round>
      Success
    </z-button>
    <z-button variant="filled" color="error" round>
      Error
    </z-button>
    <z-button variant="filled" color="warning" round>
      Warning
    </z-button>
    <z-button variant="filled" circle>
      <template #icon>
        <z-icon><add-icon /></z-icon>
      </template>
    </z-button>
    <z-button variant="filled" color="primary" circle>
      <template #icon>
        <z-icon><add-icon /></z-icon>
      </template>
    </z-button>
    <z-button variant="filled" color="info" circle>
      <template #icon>
        <z-icon><add-icon /></z-icon>
      </template>
    </z-button>
    <z-button variant="filled" color="success" circle>
      <template #icon>
        <z-icon><add-icon /></z-icon>
      </template>
    </z-button>
    <z-button variant="filled" color="error" circle>
      <template #icon>
        <z-icon><add-icon /></z-icon>
      </template>
    </z-button>
    <z-button variant="filled" color="warning" circle>
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

<markdown>
# Subtle
These buttons do not have any border or filled colors but have hover and pressed states

There are `neutral`, `primary`, `info`, `success`, `warning` and `error` button types.
</markdown>

<template>
  <z-space>
    <z-button variant="subtle">
      Neutral
    </z-button>
    <z-button variant="subtle" color="primary">
      Primary
    </z-button>
    <z-button variant="subtle" color="info">
      Info
    </z-button>
    <z-button variant="subtle" color="success">
      Success
    </z-button>
    <z-button variant="subtle" color="error">
      Error
    </z-button>
    <z-button variant="subtle" color="warning">
      Warning
    </z-button>
    <z-button variant="subtle" round>
      Default
    </z-button>
    <z-button variant="subtle" color="primary" round>
      Primary
    </z-button>
    <z-button variant="subtle" color="info" round>
      Info
    </z-button>
    <z-button variant="subtle" color="success" round>
      Success
    </z-button>
    <z-button variant="subtle" color="error" round>
      Error
    </z-button>
    <z-button variant="subtle" color="warning" round>
      Warning
    </z-button>
    <z-button variant="subtle" circle>
      <template #icon>
        <z-icon><add-icon /></z-icon>
      </template>
    </z-button>
    <z-button variant="subtle" color="primary" circle>
      <template #icon>
        <z-icon><add-icon /></z-icon>
      </template>
    </z-button>
    <z-button variant="subtle" color="info" circle>
      <template #icon>
        <z-icon><add-icon /></z-icon>
      </template>
    </z-button>
    <z-button variant="subtle" color="success" circle>
      <template #icon>
        <z-icon><add-icon /></z-icon>
      </template>
    </z-button>
    <z-button variant="subtle" color="error" circle>
      <template #icon>
        <z-icon><add-icon /></z-icon>
      </template>
    </z-button>
    <z-button variant="subtle" color="warning" circle>
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

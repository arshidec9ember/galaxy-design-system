<markdown>
# Outlined
These buttons have only the outlines and text as highlighted depending on the types

There are `neutral`, `primary`, `info`, `success`, `warning` and `error` button types.
</markdown>

<template>
  <z-space>
    <z-button variant="outlined">
      Neutral
    </z-button>
    <z-button variant="outlined" color="primary">
      Primary
    </z-button>
    <z-button variant="outlined" color="info">
      Info
    </z-button>
    <z-button variant="outlined" color="success">
      Success
    </z-button>
    <z-button variant="outlined" color="error">
      Error
    </z-button>
    <z-button variant="outlined" color="warning">
      Warning
    </z-button>
    <z-button variant="outlined" round>
      Default
    </z-button>
    <z-button variant="outlined" color="primary" round>
      Primary
    </z-button>
    <z-button variant="outlined" color="info" round>
      Info
    </z-button>
    <z-button variant="outlined" color="success" round>
      Success
    </z-button>
    <z-button variant="outlined" color="error" round>
      Error
    </z-button>
    <z-button variant="outlined" color="warning" round>
      Warning
    </z-button>
    <z-button variant="outlined" circle>
      <template #icon>
        <z-icon><add-icon /></z-icon>
      </template>
    </z-button>
    <z-button variant="outlined" color="primary" circle>
      <template #icon>
        <z-icon><add-icon /></z-icon>
      </template>
    </z-button>
    <z-button variant="outlined" color="info" circle>
      <template #icon>
        <z-icon><add-icon /></z-icon>
      </template>
    </z-button>
    <z-button variant="outlined" color="success" circle>
      <template #icon>
        <z-icon><add-icon /></z-icon>
      </template>
    </z-button>
    <z-button variant="outlined" color="error" circle>
      <template #icon>
        <z-icon><add-icon /></z-icon>
      </template>
    </z-button>
    <z-button variant="outlined" color="warning" circle>
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

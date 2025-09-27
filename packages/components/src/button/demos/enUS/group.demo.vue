<markdown>
# Button group

Buttons can be grouped with the similar variant or even different variants with different types as well.
</markdown>

<template>
  <z-space>
    <z-button-group vertical>
      <z-button round>
        <template #icon>
          <z-icon><add-icon /></z-icon>
        </template>
        Live a
      </z-button>
      <z-button variant="outlined">
        <template #icon>
          <z-icon><add-icon /></z-icon>
        </template>
        Sufficient
      </z-button>
      <z-button>
        <template #icon>
          <z-icon><add-icon /></z-icon>
        </template>
        Life
      </z-button>
    </z-button-group>
    <z-button-group vertical size="large">
      <z-button>
        <template #icon>
          <z-icon><add-icon /></z-icon>
        </template>
        With
      </z-button>
      <z-button>
        <template #icon>
          <z-icon><add-icon /></z-icon>
        </template>
        Enough
      </z-button>
      <z-button variant="outlined" round>
        <template #icon>
          <z-icon><add-icon /></z-icon>
        </template>
        Happiness
      </z-button>
    </z-button-group>
    <z-button-group size="small">
      <z-button round variant="filled" color="success">
        <template #icon>
          <z-icon><add-icon /></z-icon>
        </template>
        Life
      </z-button>
      <z-button variant="filled" color="warning">
        <template #icon>
          <z-icon><add-icon /></z-icon>
        </template>
        Is
      </z-button>
      <z-button round variant="filled" color="error">
        <template #icon>
          <z-icon><add-icon /></z-icon>
        </template>
        Good
      </z-button>
    </z-button-group>
    <z-button-group>
      <z-button variant="filled" color="primary">
        <template #icon>
          <z-icon><add-icon /></z-icon>
        </template>
        Eat
      </z-button>
      <z-button variant="filled" color="info">
        <template #icon>
          <z-icon><add-icon /></z-icon>
        </template>
        One More
      </z-button>
      <z-button round variant="outlined" color="success">
        <template #icon>
          <z-icon><add-icon /></z-icon>
        </template>
        Apple
      </z-button>
    </z-button-group>
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

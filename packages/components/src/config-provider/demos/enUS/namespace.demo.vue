<markdown>
# Namespace (class on detached DOM)

Some parts of component are detached to `document.body`. If you want to add a class to those detached elements, use `namespace` prop of `z-config-provider`. Open devtools to see detached part.
</markdown>

<template>
  <z-config-provider :namespace="ns">
    <z-tooltip placement="bottom" trigger="click">
      <template #trigger>
        <z-button @click="isActive = true">
          Activate Component with Detached Content
        </z-button>
      </template>
      <span>Detached Part</span>
    </z-tooltip>
  </z-config-provider>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      ns: ref('custom-app-namespace1'),
      isActive: ref(false)
    }
  }
})
</script>

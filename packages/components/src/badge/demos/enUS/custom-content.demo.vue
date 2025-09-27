<markdown>
# Customizing content

Insert some custom content in it.
</markdown>

<template>
  <z-space :size="24" align="center">
    <z-badge value="new">
      <z-avatar />
    </z-badge>
    <z-badge value="hot">
      <z-avatar />
    </z-badge>
    <z-badge processing>
      <z-avatar />
      <template #value>
        <z-icon :component="LockClosedOutline" />
      </template>
    </z-badge>
  </z-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { LockClosedOutline } from '@vicons/ionicons5'

export default defineComponent({
  setup () {
    return {
      LockClosedOutline
    }
  }
})
</script>

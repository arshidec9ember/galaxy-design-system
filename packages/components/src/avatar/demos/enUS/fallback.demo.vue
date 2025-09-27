<markdown>
# Fallback Icon

Show user avatar if loading fails.
</markdown>

<template>
  <z-space>
    <z-avatar>
      <z-icon>
        <Apartment />
      </z-icon>
    </z-avatar>
    <z-avatar round />
  </z-space>
</template>

<script lang="ts">
import { Apartment } from '@zeta/icons'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Apartment
  }
})
</script>

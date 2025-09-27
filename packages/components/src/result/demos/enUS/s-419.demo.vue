<markdown>
# 419
</markdown>

<template>
  <div>
    <z-radio-group v-model="variantModal">
      <z-radio-button
        v-for="variant in ['icon', 'image']"
        :key="variant"
        :value="variant"
      >
        {{ variant }}
      </z-radio-button>
    </z-radio-group>
  </div>
  <z-result
    :variant="variantModal"
    status="419"
    title="Session Expired"
    description="You were signed due to inactivity. Please sign in again to start a new session."
  >
    <template #actions>
      <z-button>Try Again</z-button>
    </template>
  </z-result>
</template>
<script>
import { ref } from 'vue'
export default {
  setup () {
    const variantModal = ref('icon')
    return {
      variantModal
    }
  }
}
</script>

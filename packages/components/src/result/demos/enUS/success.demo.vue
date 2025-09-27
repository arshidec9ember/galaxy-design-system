<markdown>
# Success
</markdown>

<template>
  <z-result
    :variant="variantModal"
    status="success"
    title="Success"
    description="child of failure"
  >
    <template #actions>
      <z-button size="medium">
        I like it
      </z-button>
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

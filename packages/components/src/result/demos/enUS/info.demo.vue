<markdown>
# Info
</markdown>

<template>
  <z-result
    :variant="variantModal"
    status="info"
    title="Information"
    description="In this era, info is about money and money is about info."
  >
    <template #actions>
      <z-button size="medium">
        I Want Information
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

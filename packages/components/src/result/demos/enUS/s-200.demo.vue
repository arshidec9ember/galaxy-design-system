<markdown>
# 200
</markdown>

<template>
  <z-result
    :variant="variantModal"
    status="200"
    title="success"
    description="Some of the doors are always close to you."
  >
    <template #actions>
      <z-button>Take It Easy</z-button>
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

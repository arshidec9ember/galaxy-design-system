<markdown>
# Warning
</markdown>

<template>
  <z-result
    :variant="variantModal"
    status="warning"
    title="Warning"
    description="People seldom see it until it comes true."
  >
    <template #actions>
      <z-button>Hmm, Truly Sad, Isn't It?</z-button>
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

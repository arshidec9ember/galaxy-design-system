<markdown>
# Default content slot
</markdown>

<template>
  <z-result
    :variant="variantModal"
    status="info"
    title="Information"
    description="In this era, info is about money and money is about info."
  >
    <div>
      In this era, info is about knowledge and knowledge is about info.
      <a href="https://google.com">Google</a>
    </div>
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

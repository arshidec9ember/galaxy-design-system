<markdown>
# 503
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
    status="503"
    title="503 Server Unavailable"
    description="We are currently unable to serve your request due to maintenance downtime or server overload. Try again later or contact support."
  >
    <template #actions>
      <z-button>Speard Money Out</z-button>
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

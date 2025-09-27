<markdown>
# 500
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
    status="500"
    title="500 Server Error"
    description="Server error may prove that you need hiring more developers."
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

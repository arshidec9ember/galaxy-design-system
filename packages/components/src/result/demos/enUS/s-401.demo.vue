<markdown>
# 401
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
    status="401"
    title="401 Not Found"
    description="You know life is always ridiculous."
  >
    <template #actions>
      <z-button>Find Something Funny</z-button>
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

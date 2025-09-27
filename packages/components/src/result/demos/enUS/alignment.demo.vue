<markdown>
# Align

You can use the `align` prop to align the content of the result.
</markdown>

<template>
  <z-radio-group v-model="alignment">
    <z-radio-button
      v-for="align in ['left', 'center', 'right']"
      :key="align"
      :value="align"
    >
      {{ align }}
    </z-radio-button>
  </z-radio-group>
  <br>
  <z-result
    :align="alignment"
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
    const alignment = ref('left')
    const variantModal = ref('icon')
    return {
      alignment,
      variantModal
    }
  }
}
</script>

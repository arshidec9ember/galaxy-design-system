<markdown>
# Size

Choose the size required for the group of radio
</markdown>

<template>
  <z-space vertical>
    <z-radio-group v-model="value" name="radiobuttongroup">
      <z-space>
        <z-radio value="small" size="small">
          Small
        </z-radio>
        <z-radio value="medium" size="medium">
          Medium
        </z-radio>
        <z-radio value="large" size="large">
          Large
        </z-radio>
      </z-space>
    </z-radio-group>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref('small')
    }
  }
})
</script>

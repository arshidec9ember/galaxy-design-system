<markdown>
# Limit input format

We can use `pattern` prop to limit input format. It accepts a regular expression. Use `allow-input` to limit input value to desired format. You can use it to achieve trim effect.
</markdown>

<template>
  <z-space vertical>
    <z-input
      type="text"
      :allow-input="onlyAllowNumber"
      placeholder="Only allow number"
    />
    <z-input
      type="textarea"
      :allow-input="noSideSpace"
      placeholder="No leading or trailing space"
    />
  </z-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      onlyAllowNumber: (value: string) => !value || /^\d+$/.test(value),
      noSideSpace: (value: string) => !/ /g.test(value)
    }
  }
})
</script>

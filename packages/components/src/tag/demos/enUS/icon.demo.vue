<markdown>
# Icon

Use icon in tag.
</markdown>

<template>
  <z-space>
    <z-tag color="success">
      Checked
      <template #icon>
        <z-icon :component="CheckmarkCircle" />
      </template>
    </z-tag>
    <z-tag round :bordered="false" color="success">
      Checked
      <template #icon>
        <z-icon :component="CheckmarkCircle" />
      </template>
    </z-tag>
  </z-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CheckmarkCircle } from '@vicons/ionicons5'

export default defineComponent({
  setup () {
    return {
      CheckmarkCircle
    }
  }
})
</script>

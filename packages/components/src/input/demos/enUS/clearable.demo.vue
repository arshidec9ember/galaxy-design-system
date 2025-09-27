<markdown>
# Clearable

Content can be cleared using `clearable` prop. Custom clear icon can be provided using `clear-icon` slot.
</markdown>

<template>
  <z-space vertical>
    <z-form>
      <z-input type="text" placeholder="Content is clearable" clearable />
      <z-input type="password" placeholder="Content is clearable" clearable />
      <z-input
        type="textarea"
        placeholder="Content is clearable"
        round
        clearable
      />
      <z-input type="text" placeholder="Custom clear icon" round clearable>
        <template #clear-icon>
          <z-icon :component="TrashBinOutline" />
        </template>
      </z-input>
    </z-form>
  </z-space>
</template>

<script lang="ts">
import { TrashBinOutline } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      TrashBinOutline
    }
  }
})
</script>

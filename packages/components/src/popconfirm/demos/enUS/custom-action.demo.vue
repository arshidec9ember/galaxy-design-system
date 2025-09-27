<markdown>
# Custom Action

You can customize the action of the popconfirm by using the `action` slot.
</markdown>

<template>
  <z-space>
    <z-popconfirm v-model:show="show">
      <template #trigger>
        <z-button>Quote</z-button>
      </template>
      Trigger the popconfirm by clicking the button, to hide the quote and the
      corresponding action.
      <template #action>
        <z-button size="small" @click="show = false">
          Maybe
        </z-button>
      </template>
    </z-popconfirm>
    <z-popconfirm positive-text="Oops!">
      <template #trigger>
        <z-button>Quote</z-button>
      </template>
      Trigger the popconfirm by clicking the button.
    </z-popconfirm>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      show: ref(false)
    }
  }
})
</script>

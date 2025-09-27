<markdown>
# Basic

The most basic usage of popconfirm is to show a
confirmation dialog when a user clicks on a button.
</markdown>

<template>
  <z-popconfirm
    @positive-click="handlePositiveClick"
    @negative-click="handleNegativeClick"
  >
    <template #trigger>
      <z-button>Quote</z-button>
    </template>
    Are you sure you want to delete this quote?
  </z-popconfirm>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handlePositiveClick () {
        message.info('Yes')
      },
      handleNegativeClick () {
        message.info('No')
      }
    }
  }
})
</script>

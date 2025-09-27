<markdown>
# Actions

Customize the action of the popconfirm by using the `action` slot.
</markdown>

<template>
  <z-space>
    <z-popconfirm
      @positive-click="handlePositiveClick"
      @negative-click="handleNegativeClick"
    >
      <template #trigger>
        <z-button>Quote</z-button>
      </template>
      Are you sure you want to delete this quote ?
    </z-popconfirm>
    <z-popconfirm :negative-text="null" @positive-click="handlePositiveClick">
      <template #trigger>
        <z-button>Only Confirm</z-button>
      </template>
      You can only confirm this action for a positive example ?
    </z-popconfirm>
    <z-popconfirm :positive-text="null" @negative-click="handleNegativeClick">
      <template #trigger>
        <z-button>Only Cancel</z-button>
      </template>
      You can only cancel this action!
    </z-popconfirm>
    <z-popconfirm :positive-text="null" :negative-text="null">
      <template #trigger>
        <z-button>Nothing</z-button>
      </template>
      You can do nothing.
    </z-popconfirm>
    <z-popconfirm>
      <template #trigger>
        <z-button>Custom action</z-button>
      </template>
      <template #action>
        Custom Action
      </template>
      Add any content to the default slot of popconfirm.
    </z-popconfirm>
  </z-space>
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

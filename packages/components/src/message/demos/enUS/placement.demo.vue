<markdown>
# Placement
</markdown>

<template>
  <z-message-provider :placement="placement">
    <Buttons @change-placement="changePlacement" />
  </z-message-provider>
</template>

<script lang="ts">
import { defineComponent, h, ref, VNode } from 'vue'
import { useMessage, ZButton } from '@zeta-gds/components'
import type { MessageProviderProps } from '@zeta-gds/components'

interface Item {
  placement: MessageProviderProps['placement']
  text: string
}
export const Buttons = defineComponent({
  emits: ['changePlacement'],
  setup () {
    const message = useMessage()
    const placementArray: Item[] = [
      { placement: 'top', text: 'Top' },
      { placement: 'bottom', text: 'Bottom' },
      { placement: 'top-left', text: 'TopLeft' },
      { placement: 'top-right', text: 'TopRight' },
      { placement: 'bottom-left', text: 'BottomLeft' },
      { placement: 'bottom-right', text: 'BottomRight' }
    ]
    return {
      message,
      placementArray
    }
  },
  render (): VNode[] {
    const { message, placementArray, $emit } = this
    return placementArray.map((item: Item) =>
      h(
        ZButton,
        {
          onClick: () => {
            $emit('changePlacement', item.placement)
            message.info(
              "In our pursuit of excellence, let's remain open to unexpected possibilities"
            )
          },
          style: {
            marginRight: '10px',
            marginBottom: '10px'
          }
        },
        { default: () => item.text }
      )
    )
  }
})

export default defineComponent({
  components: {
    Buttons
  },
  setup () {
    const placementRef = ref<MessageProviderProps['placement']>('top')
    return {
      placement: placementRef,
      changePlacement (val: MessageProviderProps['placement']) {
        placementRef.value = val
      }
    }
  }
})
</script>

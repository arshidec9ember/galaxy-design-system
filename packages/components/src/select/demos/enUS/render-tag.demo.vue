<markdown>
# Customize tag rendering

Give the tag a little color.
</markdown>

<template>
  <z-select
    v-model="value"
    multiple
    :render-option-tag="renderTag"
    :options="options"
  />
</template>

<script lang="ts">
import { defineComponent, ref, h } from 'vue'
import { ZTag, SelectRenderTag } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const renderTag: SelectRenderTag = ({ option, handleClose }) => {
      return h(
        ZTag,
        {
          type: option.type as 'success' | 'warning' | 'error',
          closable: true,
          onMousedown: (e: FocusEvent) => {
            e.preventDefault()
          },
          onClose: (e: MouseEvent) => {
            e.stopPropagation()
            handleClose()
          }
        },
        { default: () => option.label }
      )
    }
    return {
      value: ref([]),
      options: [
        {
          label: 'Daze today',
          value: 'value1',
          type: 'success'
        },
        {
          label: 'Work is not finished',
          value: 'value2',
          type: 'warning'
        },
        {
          label: 'Work overtime in the evening',
          value: 'value3',
          type: 'error'
        }
      ],
      renderTag
    }
  }
})
</script>

<markdown>
# Basic usage

If `label` is a render function, the `value` property will be used for matching.
</markdown>

<template>
  <z-mention :options="options" default-model-value="@" />
</template>

<script lang="ts">
import { defineComponent, h, VNodeChild } from 'vue'
import { ZAvatar, MentionOption } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    return {
      options: [
        {
          label: 'Poonam Agrawal',
          value: 'Poonam Agrawal'
        },
        {
          label: 'Sai Varudu',
          value: 'Sai Varudu23'
        },
        {
          label: 'Vishwajeet',
          value: 'Vishwajeet'
        },
        {
          label: 'Arindam Pradhan',
          value: 'Arindam Pradhan'
        },
        {
          label: (option: MentionOption): VNodeChild =>
            h('span', { style: 'display: flex; align-items: center;' }, [
              h(ZAvatar, {
                style: 'margin-right: 6px',
                size: 24
              }),
              option.value
            ]),
          value: 'Surya Prakash'
        }
      ]
    }
  }
})
</script>

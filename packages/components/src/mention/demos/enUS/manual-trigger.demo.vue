<markdown>
# Manually trigger focus and blur

You may want to trigger `focus` and `blur` manually?
</markdown>

<template>
  <z-space>
    <z-mention ref="myMention" :options="options" default-model-value="@" />
    <z-button @click="triggerFocus">
      Click to focus, and will blur after one second
    </z-button>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, h, ref, VNodeChild } from 'vue'
import { ZAvatar, MentionOption, MentionInst } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const myMentionRef = ref<MentionInst | null>(null)
    const triggerFocus = () => {
      myMentionRef.value?.focus()
      setTimeout(triggerBlur, 1000)
    }
    const triggerBlur = () => {
      myMentionRef.value?.blur()
    }
    return {
      myMention: myMentionRef,
      triggerFocus,
      triggerBlur,
      options: [
        {
          label: 'Poonam Agrawal',
          value: 'Poonam Agrawal'
        },
        {
          label: 'Sai Varudu',
          value: 'Sai Varudu'
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
              h(ZAvatar, { style: 'margin-right: 5px', size: 24 }),
              option.value
            ]),
          value: 'Surya Prakash'
        }
      ]
    }
  }
})
</script>

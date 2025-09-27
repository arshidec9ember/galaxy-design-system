<markdown>
# Render Option label

If the `option.label` property is not a string, the `option.value` property will be used for matching by default.
</markdown>

<template>
  <z-mention :options="options" :render-option-label="renderOptionLabel" />
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
          value: 'Poonam Agrawal',
          avatar:
            'https://www.gravatar.com/avatar/706f6f6e616d?s=200&r=pg&d=monsterid'
        },
        {
          label: 'Sai Varudu',
          value: 'Sai Varudu',
          avatar:
            'https://www.gravatar.com/avatar/73616920766172756475?s=200&r=pg&d=monsterid'
        },
        {
          label: 'Janaki',
          value: 'Janaki',
          avatar:
            'https://www.gravatar.com/avatar/6a616e616b69?s=200&r=pg&d=monsterid'
        },
        {
          label: 'Arindam Pradhan',
          value: 'Arindam Pradhan',
          avatar:
            'https://www.gravatar.com/avatar/6172696e64616d207072616468616e?s=200&r=pg&d=monsterid'
        },
        {
          label: 'Vishwajeet Kushmariya',
          value: 'Vishwajeet Kushmariya',
          avatar:
            'https://www.gravatar.com/avatar/7669736877616a656574206b7573686d6172697961?s=200&r=pg&d=monsterid'
        },
        {
          label: 'Surya',
          value: 'Surya',
          avatar:
            'https://www.gravatar.com/avatar/7375727961?s=200&r=pg&d=monsterid'
        }
      ],
      renderOptionLabel: (option: MentionOption): VNodeChild =>
        h('div', { style: 'display: flex; align-items: center;' }, [
          h(ZAvatar, {
            style: 'margin-right: 8px;',
            size: 24,
            round: true,
            src: option.avatar
          }),
          option.value
        ])
    }
  }
})
</script>

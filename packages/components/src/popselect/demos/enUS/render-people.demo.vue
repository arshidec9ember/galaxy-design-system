<markdown>
# Select Person
</markdown>

<template>
  <z-popselect
    :options="options"
    trigger="click"
    :flip="false"
    :tooltip="false"
    :render-option-label="renderLabel"
    scrollable
  >
    <template #default="{ option, value }">
      <z-button>
        <template #icon>
          <z-avatar :src="option?.avatar" :size="20" round />
        </template>
        {{ value || 'Popselect' }}
      </z-button>
    </template>
  </z-popselect>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { ZAvatar, ZText, SelectRenderLabel } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const renderLabel: SelectRenderLabel = (option) => {
      return h(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center'
          }
        },
        [
          h(ZAvatar, {
            src: option.avatar,
            round: true,
            size: 'small'
          }),
          h(
            'div',
            {
              style: {
                marginLeft: '12px',
                padding: '4px 0'
              }
            },
            [
              h('div', null, [option.label as string]),
              h(
                ZText,
                { depth: 3, tag: 'div' },
                {
                  default: () => 'description'
                }
              )
            ]
          )
        ]
      )
    }
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
      renderLabel
    }
  }
})
</script>

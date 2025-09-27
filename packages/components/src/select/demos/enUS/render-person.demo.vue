<markdown>
# Select person

</markdown>

<template>
  <z-space vertical>
    <z-select
      :options="options"
      :render-option-label="renderLabel"
      :render-option-tag="renderSingleSelectTag"
    />
    <z-select
      :options="options"
      :render-option-label="renderLabel"
      :render-option-tag="renderSingleSelectTag"
      filterable
    />
    <z-select
      multiple
      :options="options"
      :render-option-label="renderLabel"
      :render-option-tag="renderMultipleSelectTag"
    />
    <z-select
      multiple
      :options="options"
      :render-option-label="renderLabel"
      :render-option-tag="renderMultipleSelectTag"
      filterable
    />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import {
  ZAvatar,
  ZText,
  ZTag,
  SelectRenderTag,
  SelectRenderLabel
} from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const renderMultipleSelectTag: SelectRenderTag = ({
      option,
      handleClose
    }) => {
      return h(
        ZTag,
        {
          style: {
            padding: '0 6px 0 4px'
          },
          round: true,
          closable: true,
          onClose: (e) => {
            e.stopPropagation()
            handleClose()
          }
        },
        {
          default: () =>
            h(
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
                  size: 22,
                  style: {
                    marginRight: '4px'
                  }
                }),
                option.label as string
              ]
            )
        }
      )
    }
    const renderSingleSelectTag: SelectRenderTag = ({ option }) => {
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
            size: 24,
            style: {
              marginRight: '12px'
            }
          }),
          option.label as string
        ]
      )
    }
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
      renderMultipleSelectTag,
      renderSingleSelectTag,
      renderLabel
    }
  }
})
</script>

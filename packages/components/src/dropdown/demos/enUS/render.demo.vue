<markdown>
# Pure rendering content

You can just render something which is not related to options data by setting `type='render'` on option.
</markdown>

<template>
  <z-dropdown
    v-model:show="show"
    trigger="hover"
    :options="options"
    @select="handleSelect"
  >
    <z-button>Select a Cuisine or Dish
      <template #end>
        <z-icon
          :component="CaretDown12Filled"
          size="small"
          :style="{
            top: '-3px',
            transform: `rotate(${show ? 180 : 0}deg)`,
            transition:
              'color .3s var(--z-bezier), transform .3s var(--z-bezier)'
          }"
        />
      </template>
    </z-button>
  </z-dropdown>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { CaretDown12Filled } from '@vicons/fluent'
import { useMessage, ZAvatar, ZText } from '@zeta-gds/components'

function renderCustomHeader () {
  return h(
    'div',
    {
      style: 'display: flex; align-items: center; padding: 8px 12px;'
    },
    [
      h(ZAvatar, {
        round: true,
        style: 'margin-right: 12px;',
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/demo1.JPG'
      }),
      h('div', null, [
        h('div', null, [
          h(
            ZText,
            { depth: 2 },
            { default: () => 'Any content can be rendered' }
          )
        ])
      ])
    ]
  )
}

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      CaretDown12Filled,
      options: [
        {
          key: 'header',
          type: 'render',
          render: renderCustomHeader
        },
        {
          type: 'group',
          label: 'Cuisines and their Famous Dishes',
          key: 'main',
          children: [
            {
              label: 'Mexican',
              key: 'mexican'
            },
            {
              label: 'Indian',
              key: 'indian'
            },
            {
              label: 'Italian',
              key: 'italian'
            },
            {
              label: 'Dishes',
              key: 'dishes',
              children: [
                {
                  label: 'Risotto',
                  key: 'risotto'
                },
                {
                  label: 'Lasagna',
                  key: 'lasagna'
                }
              ]
            }
          ]
        }
      ],
      handleSelect (key: string | number) {
        message.info(String(key))
      }
    }
  }
})
</script>

<markdown>
# Batch rendering

Note: the `render-option-label` will take effect for group type labels, which can be set through `option.type`.
</markdown>

<template>
  <z-dropdown
    v-model:show="show"
    :options="options"
    placement="bottom-start"
    trigger="click"
    :render-option-label="renderDropdownLabel"
    :render-option-icon="renderDropdownIcon"
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
import { h, defineComponent } from 'vue'
import { CaretDown12Filled } from '@vicons/fluent'
import type { VNodeChild } from 'vue'
import { ZIcon } from '@zeta-gds/components'
import type { DropdownOption } from '@zeta-gds/components'
import { CashOutline as CashIcon } from '@vicons/ionicons5'

const options = [
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
]

export default defineComponent({
  setup () {
    return {
      options,
      CaretDown12Filled,
      renderDropdownLabel (option: DropdownOption) {
        if (option.type === 'group') {
          return option.label as VNodeChild
        }
        return h(
          'a',
          {
            href: '',
            target: '_blank'
          },
          {
            default: () => option.label as VNodeChild
          }
        )
      },
      renderDropdownIcon () {
        return h(ZIcon, null, {
          default: () => h(CashIcon)
        })
      }
    }
  }
})
</script>

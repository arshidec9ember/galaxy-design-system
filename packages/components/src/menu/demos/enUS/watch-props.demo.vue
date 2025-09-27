<markdown>
# Watch Props

Component will be updated after the prop defaultModelValue or defaultExpandedKeys is changed asynchronously.
</markdown>

<template>
  <z-space vertical>
    <z-space><z-switch v-model="collapsed" @update:model-value="handleChange" />Update
      default value</z-space>
    <z-layout has-sider>
      <z-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="60"
        :width="244"
        :collapsed="false"
      >
        <z-menu
          :default-model-value="activeKey"
          :default-expanded-keys="expandedKeys"
          :watch-props="['defaultModelValue', 'defaultExpandedKeys']"
          :collapsed="false"
          :options="menuOptions"
        />
      </z-layout-sider>
      <z-layout>
        <span>Content</span>
      </z-layout>
    </z-layout>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, h, ref, Component } from 'vue'
import { ZIcon } from '@zeta-gds/components'
import type { MenuOption } from '@zeta-gds/components'
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon
} from '@vicons/ionicons5'

function renderIcon (icon: Component) {
  return () => h(ZIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: 'Hear the Wind Sing',
    key: 'hear-the-wind-sing',
    icon: renderIcon(BookIcon)
  },
  {
    label: 'Pinball 1973',
    key: 'pinball-1973',
    icon: renderIcon(BookIcon),
    disabled: true,
    children: [
      {
        label: 'Rat',
        key: 'rat'
      }
    ]
  },
  {
    label: 'A Wild Sheep Chase',
    key: 'a-wild-sheep-chase',
    disabled: true,
    icon: renderIcon(BookIcon)
  },
  {
    label: 'Dance Dance Dance',
    key: 'Dance Dance Dance',
    icon: renderIcon(BookIcon),
    children: [
      {
        type: 'group',
        label: 'People',
        key: 'people',
        children: [
          {
            label: 'Narrator',
            key: 'narrator',
            icon: renderIcon(PersonIcon)
          },
          {
            label: 'Sheep Man',
            key: 'sheep-man',
            icon: renderIcon(PersonIcon)
          }
        ]
      },
      {
        label: 'Beverage',
        key: 'beverage',
        icon: renderIcon(WineIcon),
        children: [
          {
            label: 'Whisky',
            key: 'whisky'
          }
        ]
      },
      {
        label: 'Food',
        key: 'food',
        children: [
          {
            label: 'Sandwich',
            key: 'sandwich'
          }
        ]
      },
      {
        label: 'The past increases. The future recedes.',
        key: 'the-past-increases-the-future-recedes'
      }
    ]
  }
]

export default defineComponent({
  setup () {
    const activeKey = ref<string | null>('sandwich')
    const expandedKeys = ref<string[]>(['Dance Dance Dance', 'food'])
    return {
      activeKey,
      expandedKeys,
      collapsed: ref(false),
      menuOptions,
      handleChange (value: boolean) {
        activeKey.value = value ? 'whisky' : 'sandwich'
        expandedKeys.value = ['Dance Dance Dance', value ? 'beverage' : 'food']
      }
    }
  }
})
</script>

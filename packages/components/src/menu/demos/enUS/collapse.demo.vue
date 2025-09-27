<markdown>
# Collapsed menu

Use collapsable vertical menu with layout sider. Use `collapsed` to control collapse status of menu. You must set `collapsed-width` to make it collapse in a right manner. There are still some other collapse related props you can modify: `icon-size`, `collapsed-icon-size`. For details see API table at the bottom of the page.
</markdown>

<template>
  <z-space vertical>
    <z-switch v-model="collapsed" />
    <z-layout has-sider>
      <z-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="60"
        :width="244"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <z-menu
          v-model="activeKey"
          :collapsed="collapsed"
          :collapsed-icon-size="20"
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
    return {
      activeKey: ref<string | null>(null),
      collapsed: ref(true),
      menuOptions
    }
  }
})
</script>

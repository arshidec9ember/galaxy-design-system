<markdown>
# Customizing field

Various data would come from backend, you can customize `key`, `label` and `children`'s field name.
</markdown>

<template>
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
        :collapsed="collapsed"
        :collapsed-icon-size="20"
        :options="menuOptions"
        key-field="whateverKey"
        label-field="whateverLabel"
        children-field="whateverChildren"
      />
    </z-layout-sider>
    <z-layout />
  </z-layout>
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
    whateverLabel: 'Hear the Wind Sing',
    whateverKey: 'hear-the-wind-sing',
    icon: renderIcon(BookIcon)
  },
  {
    whateverLabel: 'Pinball 1973',
    whateverKey: 'pinball-1973',
    icon: renderIcon(BookIcon),
    disabled: true,
    whateverChildren: [
      {
        whateverLabel: 'Rat',
        whateverKey: 'rat'
      }
    ]
  },
  {
    whateverLabel: 'A Wild Sheep Chase',
    whateverKey: 'a-wild-sheep-chase',
    disabled: true,
    icon: renderIcon(BookIcon)
  },
  {
    whateverLabel: 'Dance Dance Dance',
    whateverKey: 'Dance Dance Dance',
    icon: renderIcon(BookIcon),
    whateverChildren: [
      {
        type: 'group',
        whateverLabel: 'People',
        whateverKey: 'people',
        whateverChildren: [
          {
            whateverLabel: 'Narrator',
            whateverKey: 'narrator',
            icon: renderIcon(PersonIcon)
          },
          {
            whateverLabel: 'Sheep Man',
            whateverKey: 'sheep-man',
            icon: renderIcon(PersonIcon)
          }
        ]
      },
      {
        whateverLabel: 'Beverage',
        whateverKey: 'beverage',
        icon: renderIcon(WineIcon),
        whateverChildren: [
          {
            whateverLabel: 'Whisky',
            whateverKey: 'whisky'
          }
        ]
      },
      {
        whateverLabel: 'Food',
        whateverKey: 'food',
        whateverChildren: [
          {
            whateverLabel: 'Sandwich',
            whateverKey: 'sandwich'
          }
        ]
      },
      {
        whateverLabel: 'The past increases. The future recedes.',
        whateverKey: 'the-past-increases-the-future-recedes'
      }
    ]
  }
]

export default defineComponent({
  setup () {
    return {
      collapsed: ref(true),
      menuOptions
    }
  }
})
</script>

<markdown>
# Sider placement

Sometimes you might want to put the collapsed sidebar on the right.
</markdown>

<template>
  <z-space vertical size="large">
    <z-layout has-sider>
      <z-layout-content content-style="padding: 24px;">
        Left Content Area
      </z-layout-content>
      <z-layout-sider
        alignment="right"
        collapse-mode="width"
        :collapsed-width="120"
        :native-scrollbar="true"
        :width="240"
        show-trigger="arrow-circle"
        content-style="padding: 24px;"
        bordered
      >
        <z-h2>Right Aside</z-h2>
        <p>
          Sunt culpa culpa velit tempor reprehenderit laboris mollit. Dolore
          laborum incididunt nostrud eu. Ex proident ut cillum deserunt laboris
          consectetur nulla nostrud.
        </p>
      </z-layout-sider>
    </z-layout>
    <z-layout has-sider>
      <z-layout-content content-style="padding: 24px;">
        Left Content Area
      </z-layout-content>
      <z-layout-sider
        alignment="right"
        collapse-mode="transform"
        :native-scrollbar="false"
        :collapsed-width="120"
        :width="240"
        show-trigger="bar"
        content-style="padding: 24px;"
        bordered
      >
        <z-h2>Custom scrollbar</z-h2>
      </z-layout-sider>
    </z-layout>
    <z-layout has-sider>
      <z-layout style="max-height: 320px" />
      <z-layout-sider
        alignment="right"
        bordered
        show-trigger
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :native-scrollbar="false"
        style="max-height: 320px"
      >
        <z-menu
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
        />
      </z-layout-sider>
    </z-layout>
  </z-space>
</template>
<script lang="ts">
import { h, defineComponent, Component } from 'vue'
import { ZIcon } from '@zeta-gds/components'
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon
} from '@vicons/ionicons5'

function renderIcon (icon: Component) {
  return () => h(ZIcon, null, { default: () => h(icon) })
}

const menuOptions = [
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
      menuOptions
    }
  }
})
</script>

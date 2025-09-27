<markdown>
# Usage of render-extra

The `render-extra` can be used to set items on the right of label for all the menu options
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
          :collapsed="collapsed"
          :collapsed-icon-size="20"
          :options="menuOptions"
          :render-icon="renderMenuIcon"
          :render-end="renderEnd"
        />
      </z-layout-sider>
      <z-layout>
        <span>Content</span>
      </z-layout>
    </z-layout>
  </z-space>
</template>

<script lang="ts">
import { h, ref, defineComponent } from 'vue'
import { ZIcon, ZTag } from '@zeta-gds/components'
import type { MenuOption } from '@zeta-gds/components'
import { BookmarkOutline } from '@vicons/ionicons5'

const menuOptions: MenuOption[] = [
  {
    label: 'Hear the Wind Sing',
    key: 'hear-the-wind-sing',
    href: 'https://en.wikipedia.org/wiki/Hear_the_Wind_Sing'
  },
  {
    label: 'Pinball 1973',
    key: 'pinball-1973',
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
    disabled: true
  },
  {
    label: 'Dance Dance Dance',
    key: 'Dance Dance Dance',
    children: [
      {
        type: 'group',
        label: 'People',
        key: 'people',
        children: [
          {
            label: 'Narrator',
            key: 'narrator'
          },
          {
            label: 'Sheep Man',
            key: 'sheep-man'
          }
        ]
      },
      {
        label: 'Beverage',
        key: 'beverage',
        children: [
          {
            label: 'Whisky',
            key: 'whisky',
            href: 'https://en.wikipedia.org/wiki/Whisky'
          }
        ]
      },
      {
        label: 'Food',
        key: 'food',
        children: [
          {
            label: 'Sandwich',
            key: 'sandwich',
            end: () => h(ZIcon, null, { default: () => h(BookmarkOutline) })
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
      menuOptions,
      collapsed: ref(true),
      renderEnd (option: MenuOption) {
        if (option.children && option.children?.length > 0) {
          return h(
            ZTag,
            { size: 'small' },
            { default: () => option.children?.length }
          )
        }
        // if in any of the options, end prop is present, it will set it as the item towards the right of label
        if (typeof option.end !== 'string') {
          return option.end?.()
        }
      },
      renderMenuIcon () {
        return h(ZIcon, null, { default: () => h(BookmarkOutline) })
      }
    }
  }
})
</script>

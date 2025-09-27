<markdown>
# View More Menu Items
</markdown>

<template>
  <z-space vertical>
    <z-layout has-sider>
      <z-layout-sider
        bordered
        :collapsed-width="20"
        :width="244"
        :inverted="true"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <z-menu
          :class="{
            'menu-collapsed': collapsed
          }"
          :collapsed-icon-size="20"
          :options="menuOptions"
          :render-label="renderMenuLabel"
          :render-icon="renderMenuIcon"
          :inverted="true"
        />
      </z-layout-sider>
      <z-layout>
        <span>Content</span>
      </z-layout>
    </z-layout>
  </z-space>
</template>

<script lang="ts">
import { h, defineComponent, Component } from 'vue'
import { ZIcon, ZTag } from '@zeta-gds/components'
import type { MenuOption } from '@zeta-gds/components'
import { BookmarkOutline } from '@vicons/ionicons5'

function renderIcon (icon: Component) {
  return () => h(ZIcon, null, { default: () => h(icon) })
}

function renderRightContent (count: number) {
  return () => h(ZTag, { size: 'small' }, { default: () => count })
}

const menuOptions: MenuOption[] = [
  {
    label: 'ITEM SUB HEADING 1',
    key: 'item-subheading-1',
    type: 'group',
    itemsToShow: 2,
    children: [
      {
        label: 'Level 1-0',
        key: '1level-1-0',
        icon: renderIcon(BookmarkOutline),
        end: renderRightContent(1),
        children: [
          {
            label: 'Level 2-0',
            key: '1level-2-0',
            children: [
              {
                label: 'Level 3-0',
                key: '1level-3-0'
              }
            ]
          },
          {
            label: 'Level 2-1',
            key: '1level-2-1'
          },
          {
            label: 'Level 2-2',
            key: '1level-2-2'
          }
        ]
      },
      {
        label: 'Level 1-1',
        key: '1level-1-1',
        icon: renderIcon(BookmarkOutline)
      },
      {
        label: 'Level 1-2',
        key: '1level-1-2',
        icon: renderIcon(BookmarkOutline)
      }
    ]
  },
  {
    key: 'divider',
    type: 'divider',
    size: true
  },
  {
    label: 'ITEM SUB HEADING 2',
    key: 'item-subheading-2',
    type: 'group',
    children: [
      {
        label: 'Level 1-0',
        key: '2level-1-0',
        icon: renderIcon(BookmarkOutline),
        children: [
          {
            label: 'Level 2-0',
            key: '2level-2-0',
            children: [
              {
                label: 'Level 3-0',
                key: '2level-3-0'
              }
            ]
          },
          {
            label: 'Level 2-1',
            key: '2level-2-1'
          },
          {
            label: 'Level 2-2',
            key: '2level-2-2'
          }
        ]
      },
      {
        label: 'Level 1-1',
        key: '2level-1-1',
        icon: renderIcon(BookmarkOutline)
      },
      {
        label: 'Level 1-2',
        key: '2level-1-2',
        icon: renderIcon(BookmarkOutline)
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

<style>
.menu-collapsed {
  opacity: 0;
  pointer-events: none;
}
</style>

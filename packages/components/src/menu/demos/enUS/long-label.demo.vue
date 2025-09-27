<markdown>
# Long label

Set `label` to render function that renders `z-ellipsis`.
</markdown>

<template>
  <z-layout has-sider>
    <z-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="20"
      :width="180"
      :inverted="true"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <z-menu
        :options="options"
        style="width: inherit"
        default-model-value="1"
        inverted
      />
    </z-layout-sider>
  </z-layout>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { ZEllipsis } from '@zeta-gds/components'
import type { MenuOption } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const options: MenuOption[] = [
      {
        label: () =>
          h(ZEllipsis, null, {
            default: () =>
              'The lights are extinguished. Matter is transformed and the heavens have shifted. Clay figures vanish into the sea.'
          }),
        key: '1'
      },
      {
        label: () =>
          h(ZEllipsis, null, {
            default: () =>
              'The darkness is like a boulder pressing down upon the breast.'
          }),
        key: '2'
      }
    ]
    return {
      options
    }
  }
})
</script>

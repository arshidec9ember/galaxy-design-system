<markdown>
# Async loading

Use `on-load` callback to load data. When loading async, all nodes with `isLeaf` set to `false` and `chilren`'s type is not `Array` will be reckon as unloaded nodes.
</markdown>

<template>
  <z-space vertical>
    <z-space align="center">
      <z-radio-group v-model="checkStrategy">
        <z-radio-button value="all">
          All
        </z-radio-button>
        <z-radio-button value="parent">
          Parent
        </z-radio-button>
        <z-radio-button value="child">
          Child
        </z-radio-button>
      </z-radio-group>
      <z-space><z-switch v-model="showPath" />Show Path</z-space>
      <z-space><z-switch v-model="cascade" />Cascade </z-space>
    </z-space>
    <z-tree-select
      v-model="value"
      multiple
      checkable
      :options="options"
      :cascade="cascade"
      :check-strategy="checkStrategy"
      :show-path="showPath"
      :allow-checking-not-loaded="cascade"
      :on-load="handleLoad"
    />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { TreeSelectOption } from '@zeta-gds/components'

function getChildren (option: TreeSelectOption) {
  const children = []
  for (let i = 0; i <= (option as { depth: number }).depth; ++i) {
    children.push({
      label: option.label + '-' + i,
      key: option.label + '-' + i,
      depth: (option as { depth: number }).depth + 1,
      isLeaf: option.depth === 3
    })
  }
  return children
}

export default defineComponent({
  setup () {
    return {
      checkStrategy: ref<'all' | 'parent' | 'child'>('all'),
      cascade: ref(false),
      showPath: ref(true),
      value: ref(null),
      options: ref([
        {
          label: 'l-0',
          key: 'v-0',
          depth: 1,
          isLeaf: false
        }
      ]),
      handleLoad (option: TreeSelectOption) {
        return new Promise<void>((resolve) => {
          window.setTimeout(() => {
            option.children = getChildren(option)
            resolve()
          }, 1000)
        })
      }
    }
  }
})
</script>

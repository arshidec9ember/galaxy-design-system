<markdown>
# Multiple (async)
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
      <z-space><z-switch v-model="cascade" />Cascade</z-space>
      <z-space><z-switch v-model="showPath" />Show Path</z-space>
      <z-space>
        <z-switch v-model="allowCheckingNotLoaded" />Allow Checking Not Loaded
      </z-space>
    </z-space>
    <z-cascader
      v-model="value"
      multiple
      placeholder="Select value"
      :options="options"
      :cascade="cascade"
      :check-strategy="checkStrategy"
      :show-path="showPath"
      :allow-checking-not-loaded="allowCheckingNotLoaded"
      remote
      :on-load="handleLoad"
    />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { CascaderOption } from '@zeta-gds/components'

function getChildren (option: CascaderOption) {
  const children = []
  for (let i = 0; i <= (option as { depth: number }).depth; ++i) {
    children.push({
      label: option.label + '-' + i,
      value: option.label + '-' + i,
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
      allowCheckingNotLoaded: ref(false),
      cascade: ref(true),
      showPath: ref(true),
      value: ref(null),
      options: ref([
        {
          label: 'l-0',
          value: 'v-0',
          depth: 1,
          isLeaf: false
        }
      ]),
      handleLoad (option: CascaderOption) {
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

<markdown>
# Single (async)
</markdown>

<template>
  <z-space vertical>
    <z-space>
      <z-space>
        <z-switch v-model="checkStrategyIsChild" />Child Check Strategy
      </z-space>
      <z-space><z-switch v-model="showPath" />Show Path</z-space>
    </z-space>
    <z-cascader
      v-model="value"
      placeholder="Select value"
      :options="options"
      :check-strategy="checkStrategyIsChild ? 'child' : 'all'"
      :show-path="showPath"
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
      checkStrategyIsChild: ref(true),
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

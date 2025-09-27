<markdown>
# Setting check strategy

Set the way to show checked options. `all` means showing all checked nodes. `parent` means showing all checked parent nodes when all child node are checked. `child` means showing all child nodes.
</markdown>

<template>
  <z-space vertical>
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

    <z-cascader
      multiple
      cascade
      :check-strategy="checkStrategy"
      :options="options"
      :default-model-value="['1-1-1-1', '1-1-2-1', '1-1-2-2', '1-1-2-3']"
      @update:model-value="handleUpdateValue"
    />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { CascaderOption } from '@zeta-gds/components'

function getOptions (depth = 4, iterator = 1, prefix = '') {
  const length = 3
  const options: CascaderOption[] = []
  for (let i = 1; i <= length; ++i) {
    if (iterator === 1) {
      options.push({
        value: `${i}`,
        label: `${i}`,
        disabled: i % 5 === 0,
        children: getOptions(depth, iterator + 1, '' + i)
      })
    } else if (iterator === depth) {
      options.push({
        value: `${prefix}-${i}`,
        label: `${prefix}-${i}`,
        disabled: i % 5 === 0
      })
    } else {
      options.push({
        value: `${prefix}-${i}`,
        label: `${prefix}-${i}`,
        disabled: i % 5 === 0,
        children: getOptions(depth, iterator + 1, `${prefix}-${i}`)
      })
    }
  }
  return options
}

export default defineComponent({
  setup () {
    return {
      checkStrategy: ref<'all' | 'child' | 'parent'>('all'),
      options: getOptions(),
      handleUpdateValue: (values: string | string[]) => {
        console.log(values)
      }
    }
  }
})
</script>

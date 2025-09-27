<markdown>
# Multiple

</markdown>
<template>
  <z-space vertical>
    <z-space>
      <z-space>
        <z-switch v-model="checkStrategyIsChild" />Child Check Strategy
      </z-space>
      <z-space><z-switch v-model="cascade" />Cascade</z-space>
      <z-space><z-switch v-model="showPath" />Show Path</z-space>
      <z-space><z-switch v-model="hoverTrigger" />Hover Trigger</z-space>
      <z-space><z-switch v-model="filterable" />Filterable</z-space>
      <z-space>
        <z-switch v-model="responsiveMaxTagCount" />Responsive MaxTagCount
      </z-space>
      <z-space>
        <z-switch v-model="clearFilterAfterSelect" />clearFilterAfterSelect
      </z-space>
    </z-space>
    <z-cascader
      v-model="value"
      multiple
      placeholder="Select value"
      clearable
      :max-tag-count="responsiveMaxTagCount ? 'responsive' : undefined"
      :expand-trigger="hoverTrigger ? 'hover' : 'click'"
      :options="options"
      :cascade="cascade"
      :check-strategy="checkStrategyIsChild ? 'child' : 'all'"
      :show-path="showPath"
      :filterable="filterable"
      :clear-filter-after-select="clearFilterAfterSelect"
      @update:model-value="handleUpdateValue"
    />
  </z-space>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { CascaderOption } from '@zeta-gds/components'

function getOptions (depth = 3, iterator = 1, prefix = '') {
  const length = 12
  const options: CascaderOption[] = []
  for (let i = 1; i <= length; ++i) {
    if (iterator === 1) {
      options.push({
        value: `v-${i}`,
        label: `l-${i}`,
        disabled: i % 5 === 0,
        children: getOptions(depth, iterator + 1, '' + String(i))
      })
    } else if (iterator === depth) {
      options.push({
        value: `v-${prefix}-${i}`,
        label: `l-${prefix}-${i}`,
        disabled: i % 5 === 0
      })
    } else {
      options.push({
        value: `v-${prefix}-${i}`,
        label: `l-${prefix}-${i}`,
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
      checkStrategyIsChild: ref(true),
      cascade: ref(true),
      showPath: ref(true),
      hoverTrigger: ref(false),
      value: ref(null),
      filterable: ref(false),
      responsiveMaxTagCount: ref(true),
      clearFilterAfterSelect: ref(true),
      options: getOptions(),
      handleUpdateValue (value: string[], options: CascaderOption[]) {
        console.log(value, options)
      }
    }
  }
})
</script>

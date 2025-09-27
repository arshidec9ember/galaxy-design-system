<markdown>
  # Show Line
  </markdown>

<template>
  <z-space vertical>
    <z-switch v-model="showLine" />
    <z-tree
      :show-line="showLine"
      :default-expanded-keys="defaultExpandedKeys"
      :data="data"
      checkable
      expand-on-click
      selectable
    />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { repeat } from 'seemly'
import { TreeOption } from '@zeta-gds/components'

function createData (level = 4, baseKey = ''): TreeOption[] | undefined {
  if (!level) return undefined
  return repeat(6 - level, undefined).map((_, index) => {
    const key = '' + baseKey + level + index
    return {
      label: createLabel(level),
      key,
      children: createData(level - 1, key)
    }
  })
}

function createLabel (level: number): string {
  if (level === 4) return 'The Tao gives birth to one'
  if (level === 3) return 'One gives birth to two.'
  if (level === 2) return 'Two gives birth to three.'
  if (level === 1) return 'Three gives birth to all things.'
  return ''
}

export default defineComponent({
  setup () {
    return {
      showLine: ref(false),
      data: createData(),
      defaultExpandedKeys: ref(['40', '4030', '403020'])
    }
  }
})
</script>

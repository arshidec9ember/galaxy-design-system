<markdown>
# Sizes

Add different type of sizes.
</markdown>

<template>
  <div :style="{ margin: '8px' }">
    <z-radio-group v-model="sizeModel">
      <z-radio-button
        v-for="size in ['x-small', 'small', 'medium', 'large', 'x-large']"
        :key="size"
        :value="size"
      >
        {{ size }}
      </z-radio-button>
    </z-radio-group>
  </div>

  <z-tree
    :size="sizeModel"
    block-line
    :data="data"
    :default-expanded-keys="defaultExpandedKeys"
    selectable
  />
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
  if (level === 4) return 'Out of Tao, One is born'
  if (level === 3) return 'Out of One, Two'
  if (level === 2) return 'Out of Two, Three'
  if (level === 1) return 'Out of Three, the created universe'
  return ''
}

export default defineComponent({
  setup () {
    const sizeModel = ref<'x-small' | 'small' | 'medium' | 'large' | 'x-large'>(
      'small'
    )
    return {
      sizeModel,
      data: createData(),
      defaultExpandedKeys: ref(['40', '41'])
    }
  }
})
</script>

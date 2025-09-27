<markdown>
# Batch rendering

As you can see, prefix, label, and suffix all have render functions.
</markdown>

<template>
  <z-tree
    block-line
    :data="data"
    :default-expanded-keys="defaultExpandedKeys"
    :render-option-start="renderPrefix"
    :render-option-label="renderLabel"
    :render-option-end="renderSuffix"
    :selectable="false"
    variant="underline"
  />
</template>

<script lang="ts">
import { h, defineComponent, ref } from 'vue'
import { ZButton, TreeOption } from '@zeta-gds/components'
import { repeat } from 'seemly'

function createData (level = 4, baseKey = ''): TreeOption[] | undefined {
  if (!level) return undefined
  return repeat(6 - level, undefined).map((_, index) => {
    const key = '' + baseKey + level + index
    return {
      label: createLabel(level),
      key,
      children: createData(level - 1, key),
      level
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

function renderPrefix ({ option }: { option: TreeOption }) {
  return h(
    ZButton,
    { variant: 'text', type: 'primary', size: 'small' },
    { default: () => `Prefix-${option.level}` }
  )
}

function renderLabel ({ option }: { option: TreeOption }) {
  return `${option.label} :)`
}

function renderSuffix ({ option }: { option: TreeOption }) {
  return h(
    ZButton,
    { variant: 'text', type: 'primary', size: 'small' },
    { default: () => `Suffix-${option.level}` }
  )
}

export default defineComponent({
  setup () {
    return {
      data: createData(),
      defaultExpandedKeys: ref(['40', '41']),
      renderPrefix,
      renderLabel,
      renderSuffix
    }
  }
})
</script>

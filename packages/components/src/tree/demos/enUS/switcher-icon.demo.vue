<markdown>
# Switcher icon

Use `render-option-expand-icon` prop to customize expand icon.
</markdown>

<template>
  <z-tree
    block-line
    :data="data"
    :default-expanded-keys="defaultExpandedKeys"
    :render-option-expand-icon="renderSwitcherIcon"
    selectable
  />
  <z-tree
    block-line
    :data="data"
    :default-expanded-keys="defaultExpandedKeys"
    :render-option-expand-icon="renderSwitcherIconWithExpaned"
    selectable
  />
</template>

<script lang="ts">
import { defineComponent, ref, h } from 'vue'
import { repeat } from 'seemly'
import { ZIcon, TreeOption } from '@zeta-gds/components'
import { ChevronForward, SunnyOutline, PlanetOutline } from '@vicons/ionicons5'

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
    return {
      data: createData(),
      defaultExpandedKeys: ref(['40', '41']),
      renderSwitcherIcon: () =>
        h(ZIcon, null, { default: () => h(ChevronForward) }),
      renderSwitcherIconWithExpaned: ({ expanded }: { expanded: boolean }) =>
        h(ZIcon, null, {
          default: () => h(expanded ? SunnyOutline : PlanetOutline)
        })
    }
  }
})
</script>

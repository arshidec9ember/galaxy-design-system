<markdown>
# Control option visibility

In some cases, different roles will see different options. You can use the `show` field to control the visibility of menu options.
</markdown>

<template>
  <z-space vertical>
    <z-switch v-model="accordion">
      <template #checked>
        Hide menu
      </template>
      <template #unchecked>
        Show menu
      </template>
    </z-switch>
    <z-menu :options="options" />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref, Component, h, computed } from 'vue'
import { ZIcon } from '@zeta-gds/components'
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon
} from '@vicons/ionicons5'

export default defineComponent({
  setup () {
    const accordionRef = ref(false)
    function renderIcon (icon: Component) {
      return () => h(ZIcon, null, { default: () => h(icon) })
    }
    const MenuOptions = computed(() => [
      {
        label: 'parent 1',
        icon: renderIcon(PersonIcon),
        key: '1',
        children: [
          {
            label: '1.1',
            key: '2'
          }
        ]
      },
      {
        label: 'parent 2',
        key: '3',
        icon: renderIcon(BookIcon),
        show: !accordionRef.value,
        children: [
          {
            label: '2.1',
            key: '4'
          },
          {
            label: '2.2',
            key: '5'
          },
          {
            label: '2.3',
            key: '6'
          }
        ]
      }
    ])
    return {
      accordion: accordionRef,
      options: MenuOptions
    }
  }
})
</script>

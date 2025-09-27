<markdown>
# Show selected option

In some scenes, menu's value is passed from outside. The component is hard to understand what behavior is expected. You can use `showOption` method to make specified option displayed.
</markdown>

<template>
  <z-space vertical>
    <z-switch v-model="accordion">
      <template #checked>
        Accrodion
      </template>
      <template #unchecked>
        Normal
      </template>
    </z-switch>
    <z-button @click="selectAndExpand('1')">
      Select 1st child
    </z-button>
    <z-button @click="selectAndExpand('2')">
      Select 2nd child
    </z-button>
    <z-button @click="selectAndExpand('3')">
      Select 3rd child
    </z-button>
    <z-menu
      ref="menuInstRef"
      v-model="selectedKey"
      :options="options"
      :accordion="accordion"
    />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { MenuInst } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const accordionRef = ref(false)
    const selectedKeyRef = ref('1')
    const menuInstRef = ref<MenuInst | null>(null)
    const selectAndExpand = (key: string) => {
      selectedKeyRef.value = key
      menuInstRef.value?.showOption(key)
    }
    return {
      menuInstRef,
      selectAndExpand,
      accordion: accordionRef,
      selectedKey: selectedKeyRef,
      options: [
        {
          label: '1 parent',
          key: '1 parent',
          children: [
            {
              label: '1',
              key: '1'
            }
          ]
        },
        {
          label: '2 parent',
          key: '2 parent',
          children: [
            {
              label: '2',
              key: '2'
            }
          ]
        },
        {
          label: '3 parent',
          key: '3 parent',
          children: [
            {
              label: '3',
              key: '3'
            }
          ]
        }
      ]
    }
  }
})
</script>

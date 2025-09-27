<markdown>
# Sections Position

Internal Sections of Buttons can be aligned using the default CSS justify-content property
</markdown>

<template>
  <z-space vertical>
    <z-space>Center</z-space>
    <z-button variant="filled" color="primary" justify="center" full-width>
      Button
      <template #start>
        <ZIcon size="20">
          <add-icon />
        </ZIcon>
      </template>
      <template #end>
        <ZIcon size="20">
          <add-icon />
        </ZIcon>
      </template>
    </z-button>
    <z-divider />
    <z-space>Space-Between</z-space>
    <z-button
      variant="filled"
      color="primary"
      justify="space-between"
      full-width
    >
      Button
      <template #start>
        <ZIcon size="20">
          <add-icon />
        </ZIcon>
      </template>
      <template #end>
        <ZIcon size="20">
          <add-icon />
        </ZIcon>
      </template>
    </z-button>
    <z-divider />
    <z-space>Space-Evenly</z-space>
    <z-button
      variant="filled"
      color="primary"
      justify="space-evenly"
      full-width
    >
      Button
      <template #start>
        <ZIcon size="20">
          <add-icon />
        </ZIcon>
      </template>
      <template #end>
        <ZIcon size="20">
          <add-icon />
        </ZIcon>
      </template>
    </z-button>
  </z-space>
</template>

<script lang="ts">
import { Add as AddIcon } from '@vicons/ionicons5'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    AddIcon
  },
  setup () {
    const justifyRef = ref<'center' | 'space-between' | 'space-evenly'>(
      'space-evenly'
    )
    return {
      justifyValue: justifyRef,
      justify: ['center', 'space-between', 'space-evenly']
    }
  }
})
</script>

<markdown>
# Expand

The additional breadcrumb items are hidden when you click on the ellipses, and they become visible.
</markdown>

<template>
  <z-space vertical>
    <z-switch v-model="active">
      <template #checked>
        Remove breadcrumb-item.
      </template>
      <template #unchecked>
        Add breadcrumb-item(v-if).
      </template>
    </z-switch>
    <z-breadcrumb :max-items="4" :items-before-collapse="2">
      <z-breadcrumb-item> Item 1 </z-breadcrumb-item>
      <z-breadcrumb-item> Item 2 </z-breadcrumb-item>
      <z-breadcrumb-item v-if="active">
        Item 3
      </z-breadcrumb-item>
      <z-breadcrumb-item> Item 4 </z-breadcrumb-item>
      <z-breadcrumb-item> Item 5 </z-breadcrumb-item>
    </z-breadcrumb>
    <z-breadcrumb :max-items="2" :items-after-collapse="2">
      <z-breadcrumb-item>
        <template #start>
          <z-icon :component="Film" />
        </template>Film 1
      </z-breadcrumb-item>
      <z-breadcrumb-item>
        <template #start>
          <z-icon :component="Film" />
        </template>Film 2
      </z-breadcrumb-item>
      <z-breadcrumb-item>
        <template #start>
          <z-icon :component="Film" />
        </template>Film 3
      </z-breadcrumb-item>
      <z-breadcrumb-item>
        <template #start>
          <z-icon :component="Film" />
        </template>Film 4
      </z-breadcrumb-item>
      <z-breadcrumb-item>
        <template #start>
          <z-icon :component="Film" />
        </template>Film 5
      </z-breadcrumb-item>
    </z-breadcrumb>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Film } from '@vicons/ionicons5'

export default defineComponent({
  setup () {
    const active = ref(false)
    return {
      Film,
      active
    }
  }
})
</script>

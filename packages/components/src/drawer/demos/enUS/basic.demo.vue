<markdown>
# Basic
</markdown>

<template>
  <z-button-group>
    <z-button @click="activate('top')">
      Top
    </z-button>
    <z-button @click="activate('right')">
      Right
    </z-button>
    <z-button @click="activate('bottom')">
      Bottom
    </z-button>
    <z-button @click="activate('left')">
      Left
    </z-button>
  </z-button-group>
  <z-drawer v-model:show="active" :width="502" :placement="placement">
    <z-drawer-content
      title="Add Financial Institue(s)"
      description="Choose how you want to add your data and lets see what more can you do here"
      header-style="
      background: #FFEFDF;border-bottom: 0px"
    >
      Stoner is a 1965 novel by the American writer John Williams.
    </z-drawer-content>
  </z-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { DrawerPlacement } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const active = ref(false)
    const placement = ref<DrawerPlacement>('right')
    const activate = (place: DrawerPlacement) => {
      active.value = true
      placement.value = place
    }
    return {
      active,
      placement,
      activate
    }
  }
})
</script>

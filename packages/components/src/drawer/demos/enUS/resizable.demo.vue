<markdown>
# Resizable drawer

Remeber to use `default-width` or `default-height` with `resizable`.
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
  <z-drawer
    v-model:show="active"
    :default-width="502"
    :placement="placement"
    resizable
  >
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
    const activeRef = ref(false)
    const placementRef = ref<DrawerPlacement>('right')
    const activate = (place: DrawerPlacement) => {
      activeRef.value = true
      placementRef.value = place
    }
    return {
      active: activeRef,
      placement: placementRef,
      activate
    }
  }
})
</script>

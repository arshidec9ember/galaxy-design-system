<markdown>
# Customize display area

You can customize display area by `to` prop. Remember to set `:trap-focus="false"` and `:block-scroll="false"`, otherwise content outside drawer won't be focusable and body won't be scrollable.
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
  <div
    id="drawer-target"
    style="
      position: relative;
      width: 100%;
      height: 300px;
      border: 1px solid rgba(128, 128, 128, 0.2);
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    "
  >
    Target Area
  </div>
  <z-drawer
    v-model:show="active"
    :width="200"
    :height="200"
    :placement="placement"
    :trap-focus="false"
    to="#drawer-target"
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

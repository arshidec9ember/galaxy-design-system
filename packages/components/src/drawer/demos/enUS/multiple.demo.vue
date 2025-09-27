<markdown>
# Multiple drawers
</markdown>

<template>
  <z-button @click="doShowOuter">
    Come on!
  </z-button>
  <z-drawer v-model:show="showOuter" :width="502">
    <z-drawer-content
      title="Add Financial Institue(s)"
      description="Choose how you want to add your data and lets see what more can you do here"
      header-style="
      background: #FFEFDF;border-bottom: 0px"
    >
      Stoner is a 1965 novel by the American writer John Williams.
      <template #footer>
        <z-button color="primary" variant="filled" @click="doShowInner">
          Come on Again!
        </z-button>
      </template>
    </z-drawer-content>
    <z-drawer v-model:show="showInner" :width="251">
      <z-drawer-content
        title="Add Financial Institue(s)"
        description="Choose how you want to add your data and lets see what more can you do here"
        header-style="
      background: #FFEFDF;border-bottom: 0px"
      >
        Stoner is a 1965 novel by the American writer John Williams.
      </z-drawer-content>
    </z-drawer>
  </z-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const showOuterRef = ref(false)
    const showInnerRef = ref(false)
    return {
      showOuter: showOuterRef,
      showInner: showInnerRef,
      doShowOuter () {
        showOuterRef.value = true
      },
      doShowInner () {
        showInnerRef.value = true
      }
    }
  }
})
</script>

<markdown>
# Update bar manually

Since `z-tabs` renders children directly, it can't understand your intention to update active tab. In some edge cases, you need to update bar position manually.
</markdown>

<template>
  <z-space vertical>
    <z-button @click="handleClick">
      Select Tab A
    </z-button>
    <z-tabs ref="tabsInstRef" v-model="value">
      <z-tab v-for="tab in tabs" :key="tab" :name="tab">
        I'm {{ tab }}
      </z-tab>
    </z-tabs>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref } from 'vue'
import { TabsInst } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const tabsInstRef = ref<TabsInst | null>(null)
    const tabsRef = ref(['a', 'b'])
    const valueRef = ref('a')
    const handleClick = () => {
      tabsRef.value.reverse()
      valueRef.value = 'a'
      nextTick(() => tabsInstRef.value?.syncBarPosition())
    }
    return {
      tabsInstRef,
      tabs: tabsRef,
      value: valueRef,
      handleClick
    }
  }
})
</script>

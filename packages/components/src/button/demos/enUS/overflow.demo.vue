<markdown>
# Button Overflow

Button Overflow has the ability to show additional buttons in a popover as a list when specified with maximum buttons to be displayed
</markdown>

<figma
  src="https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?type=design&node-id=24643-94194&mode=design&t=ouOH9S78UaqBesEq-0"
></figma>

<template>
  <z-space>
    <z-button-overflow :max-items="maxItems" size="medium">
      <z-button
        variant="filled"
        color="primary"
        @click="buttonClick('primary')"
      ><template #icon>
        <z-icon><log-in-icon /></z-icon> </template>This is primary Action</z-button>
      <z-button
        variant="outlined"
        @click="buttonClick('link')"
      ><template #icon>
        <z-icon><log-in-icon /></z-icon> </template>This is link Action</z-button>
      <z-button @click="buttonClick('info')"><template #icon>
        <z-icon><log-in-icon /></z-icon> </template>This is info Action</z-button>
      <z-button @click="buttonClick('success')"><template #icon>
        <z-icon><log-in-icon /></z-icon> </template>This is success Action</z-button>
      <z-button @click="buttonClick('action')"><template #icon>
        <z-icon><log-in-icon /></z-icon> </template>This is action Action</z-button>
      <z-button @click="buttonClick('danger')"><template #icon>
        <z-icon><log-in-icon /></z-icon> </template>This is danger Action</z-button>
    </z-button-overflow>
  </z-space>
</template>
<script lang="ts">
import { useMessage } from '@zeta-gds/components'
import { LogInOutline as LogInIcon } from '@vicons/ionicons5'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    LogInIcon
  },
  setup () {
    const message = useMessage()
    const maxItemsRef = ref(3)

    return {
      buttonClick (event: string) {
        message.info(event)
      },
      maxItems: maxItemsRef
    }
  }
})
</script>

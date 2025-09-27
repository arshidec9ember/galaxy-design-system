<markdown>
# Click on item header
</markdown>

<template>
  <z-accordion @item-header-click="handleItemHeaderClick">
    <z-accordion-item name="1">
      <template #header>
        Bronze
      </template>
      <div>Okay</div>
    </z-accordion-item>
    <z-accordion-item name="2">
      <template #header>
        Silver
      </template>
      <div>Good</div>
    </z-accordion-item>
    <z-accordion-item name="3">
      <template #header>
        Gold
      </template>
      <div>Excellent</div>
    </z-accordion-item>
  </z-accordion>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from '@zeta-gds/components'
import type { AccordionProps } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    const handleItemHeaderClick: AccordionProps['onItemHeaderClick'] = ({
      name,
      expanded
    }) => {
      message.info(`Name: ${name}, Expanded: ${expanded}`)
    }
    return {
      handleItemHeaderClick
    }
  }
})
</script>

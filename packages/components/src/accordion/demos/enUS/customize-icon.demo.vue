<markdown>
# Customize icon

We can customize the arrow
</markdown>

<template>
  <z-accordion>
    <template #header-end>
      <z-icon><cash-icon /></z-icon>
    </template>
    <template #arrow>
      <z-icon size="16px">
        <chevron-forward />
      </z-icon>
    </template>
    <z-accordion-item title="Bronze" name="1">
      <div>good</div>
    </z-accordion-item>
    <z-accordion-item title="Silver" name="2">
      <div>nice</div>
    </z-accordion-item>
    <z-accordion-item title="Gold" name="3">
      <div>very good</div>
    </z-accordion-item>
  </z-accordion>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CashOutline as CashIcon, ChevronForward } from '@vicons/ionicons5'

export default defineComponent({
  components: {
    CashIcon,
    ChevronForward
  }
})
</script>

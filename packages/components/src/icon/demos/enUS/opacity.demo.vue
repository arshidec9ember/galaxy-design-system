<markdown>
# Opacity

To match different text color levels, icon provides a `opacity` property.
</markdown>

<template>
  <z-icon :component="CashOutline" size="40" opacity="intense" />
  <z-icon :component="CashOutline" size="40" opacity="strong" />
  <z-icon :component="CashOutline" size="40" opacity="moderate" />
  <z-icon :component="CashOutline" size="40" opacity="mild" />
  <z-icon :component="CashOutline" size="40" opacity="subtle" />
  <br>
  <z-icon :component="CashOutline" size="40" :opacity="0.2" />
  <z-icon :component="CashOutline" size="40" :opacity="0.3" />
  <z-icon :component="CashOutline" size="40" :opacity="0.4" />
  <z-icon :component="CashOutline" size="40" :opacity="0.7" />
  <z-icon :component="CashOutline" size="40" :opacity="0.9" />
</template>

<script lang="ts">
import { CashOutline } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      CashOutline
    }
  }
})
</script>

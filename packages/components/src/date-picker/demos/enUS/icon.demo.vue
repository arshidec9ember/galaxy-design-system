<markdown>
# Icon
</markdown>

<template>
  <z-space vertical>
    <z-date-picker type="date">
      <template #date-icon>
        <z-icon :size="16" :component="RocketOutline" />
      </template>
      <template #prev-year>
        <z-icon :size="16" :component="ChevronBackCircle" />
      </template>
      <template #prev-month>
        <z-icon :size="16" :component="ChevronBackCircleOutline" />
      </template>
      <template #next-month>
        <z-icon :size="16" :component="ChevronForwardCircleOutline" />
      </template>
      <template #next-year>
        <z-icon :size="16" :component="ChevronForwardCircle" />
      </template>
    </z-date-picker>
    <z-date-picker type="daterange">
      <template #separator>
        <z-icon :size="16" :component="TrendingUpSharp" />
      </template>
      <template #date-icon>
        <z-icon :size="16" :component="RocketOutline" />
      </template>
    </z-date-picker>
  </z-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  TrendingUpSharp,
  RocketOutline,
  ChevronBackCircle,
  ChevronBackCircleOutline,
  ChevronForwardCircle,
  ChevronForwardCircleOutline
} from '@vicons/ionicons5'

export default defineComponent({
  setup () {
    return {
      TrendingUpSharp,
      RocketOutline,
      ChevronBackCircle,
      ChevronBackCircleOutline,
      ChevronForwardCircle,
      ChevronForwardCircleOutline
    }
  }
})
</script>

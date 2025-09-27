<markdown>
# Shortcuts

You can customize some shorcut buttons.
</markdown>

<template>
  <z-space vertical>
    <z-space>
      <div>
        <z-switch v-model="showShortcuts" />
        {{ 'Show Shortcut' }}
      </div>
      <div>
        <z-switch v-model="isCustomShortcut" :disabled="!showShortcuts" />
        {{ 'Custom Configuration' }}
      </div>
    </z-space>
    <z-date-picker
      v-model="ts1"
      type="date"
      :shortcuts="isCustomShortcut ? shortcuts : undefined"
      :show-shortcuts="showShortcuts"
    />
    <z-date-picker
      v-model="ts2"
      type="datetime"
      :shortcuts="isCustomShortcut ? shortcuts : undefined"
      :show-shortcuts="showShortcuts"
    />
    <z-date-picker
      v-model="range1"
      type="daterange"
      :shortcuts="isCustomShortcut ? rangeShortcuts : undefined"
      :show-shortcuts="showShortcuts"
    />
    <z-date-picker
      v-model="range2"
      type="datetimerange"
      :shortcuts="isCustomShortcut ? rangeShortcuts : undefined"
      :show-shortcuts="showShortcuts"
    />
    <z-date-picker
      v-model="m1"
      type="month"
      :shortcuts="isCustomShortcut ? shortcuts : undefined"
      :show-shortcuts="showShortcuts"
    />
    <z-date-picker
      v-model="m2"
      type="monthrange"
      :shortcuts="isCustomShortcut ? rangeShortcuts : undefined"
      :show-shortcuts="showShortcuts"
    />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      ts1: ref(null),
      ts2: ref(1183135260000),
      m1: ref(null),
      m2: ref(null),
      range1: ref(null),
      range2: ref(null),
      showShortcuts: ref(false),
      isCustomShortcut: ref(false),
      shortcuts: {
        'Honey birthday': 1631203200000,
        Yesterday: () => new Date().getTime() - 24 * 60 * 60 * 1000
      },
      rangeShortcuts: {
        'Happy holiday': [1629216000000, 1631203200000] as const,
        'Last 2 hours': () => {
          const cur = new Date().getTime()
          return [cur - 2 * 60 * 60 * 1000, cur] as const
        }
      }
    }
  }
})
</script>

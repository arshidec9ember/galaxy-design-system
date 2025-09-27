<markdown>
# Dark View
</markdown>

<template>
  <z-json-viewer
    :data="data"
    :show-line-number="true"
    scrollable
    :show-icon="false"
    :dark-theme="true"
    :height="370"
    :collapsed-on-click-brackets="false"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup () {
    return {
      data: [
        {
          id: '0001',
          type: 'donut',
          batters: {
            batter: [
              { id: '1001', type: 'Regular' },
              { id: '1002', type: 'Chocolate' }
            ]
          }
        }
      ]
    }
  }
})
</script>

<markdown>
# Show Line Number

</markdown>
<template>
  <z-json-viewer
    :data="data"
    :show-icon="false"
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
          name: 'Cake',
          ppu: 0.55,
          batters: {
            batter: [
              { id: '1001', type: 'Regular' },
              { id: '1002', type: 'Chocolate' },
              { id: '1003', type: 'Blueberry' },
              { id: '1004', type: "Devil's Food" }
            ]
          }
        }
      ]
    }
  }
})
</script>

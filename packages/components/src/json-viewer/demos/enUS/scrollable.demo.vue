<markdown>
# Scrollable

Show data with scrolling effect if size of data is greater than height of container
</markdown>

<template>
  <z-json-viewer :data="data" :height="460" scrollable copyable />
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
        },
        {
          id: '0002',
          type: 'donut',
          name: 'Raised',
          ppu: 0.55,
          batters: {
            batter: [{ id: '1001', type: 'Regular' }]
          },
          topping: [
            { id: '5001', type: 'None' },
            { id: '5002', type: 'Glazed' },
            { id: '5005', type: 'Sugar' },
            { id: '5003', type: 'Chocolate' },
            { id: '5004', type: 'Maple' }
          ]
        }
      ]
    }
  }
})
</script>

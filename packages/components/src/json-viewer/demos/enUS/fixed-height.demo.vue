<markdown>
# Show More/ Show Less

Max height of container will change only when click on show-More button.

</markdown>

<template>
  <div style="overflow: auto">
    <z-json-viewer :data="data" :height="200" :show-length="true" />
  </div>
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
          },
          topping: [
            { id: '5001', type: 'None' },
            { id: '5002', type: 'Glazed' },
            { id: '5005', type: 'Sugar' },
            { id: '5007', type: 'Powdered Sugar' },
            { id: '5006', type: 'Chocolate with Sprinkles' },
            { id: '5003', type: 'Chocolate' },
            { id: '5004', type: 'Maple' }
          ]
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
        },
        {
          id: '0003',
          type: 'donut',
          name: 'Old Fashioned',
          ppu: 0.55,
          batters: {
            batter: [
              { id: '1001', type: 'Regular' },
              { id: '1002', type: 'Chocolate' }
            ]
          },
          topping: [
            { id: '5001', type: 'None' },
            { id: '5002', type: 'Glazed' },
            { id: '5003', type: 'Chocolate' },
            { id: '5004', type: 'Maple' }
          ]
        }
      ]
    }
  }
})
</script>

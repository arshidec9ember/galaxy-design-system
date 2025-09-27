<markdown>
# Tooltip

with `tooltip` prop, you can add a tooltip to the label of the field

</markdown>

<template>
  <z-facade>
    <template v-if="avatar" #avatar>
      <z-avatar round size="small" name="Expansion Panel" />
    </template>
    <template v-if="header" #header>
      Bank Information
    </template>
    <template v-if="description" #description>
      Unlocking Banking Insights 🔍
    </template>
    <z-card size="small">
      <z-details-view
        :data="data"
        :options="{
          accordionProps: { bordered: false }
        }"
        :overrides="overrides"
      />
    </z-card>
  </z-facade>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const avatar = ref(true)
const header = ref(true)
const description = ref(true)
const data = ref({
  tooltipContent: 'Information related to the Status Data Field',
  'status.type': 'success',
  indicator: 'dot',
  arrayOfPrimitive: ['hello', 'world', 'testing', 4, 5, 6],
  label: 'Active',
  emphasis: 'transparent',
  emphasis2: 'transparent',
  level1: {
    ad: 1,
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
    ],
    emphasis2: 'transparent',
    level2: {
      ad: 1,
      emphasis2: 'transparent',
      level3: {
        ad: 1,
        emphasis2: 'transparent'
      }
    }
  },
  'short.list': [
    {
      ad: 1,
      indicator: 'dot',
      label: 'Active',
      emphasis: 'transparent',
      emphasis2: 'transparent'
    },
    {
      ad: 1,
      indicator: 'dot',
      label: 'Active',
      emphasis: 'transparent',
      emphasis2: 'transparent'
    },
    {
      ad: 1,
      indicator: 'dot',
      label: 'Active',
      emphasis: 'transparent',
      emphasis2: 'transparent'
    }
  ],
  'long.list': [
    {
      ad: 1,
      indicator: 'dot',
      label: 'Active',
      emphasis: 'transparent',
      emphasis2: 'transparent'
    },
    {
      ad: 1,
      indicator: 'dot',
      label: 'Active',
      emphasis: 'transparent',
      emphasis2: 'transparent'
    },
    {
      ad: 1,
      indicator: 'dot',
      label: 'Active',
      emphasis: 'transparent',
      emphasis2: 'transparent'
    },
    {
      ad: 1,
      indicator: 'dot',
      label: 'Active',
      emphasis: 'transparent',
      emphasis2: 'transparent'
    },
    {
      ad: 1,
      indicator: 'dot',
      label: 'Active',
      emphasis: 'transparent',
      emphasis2: 'transparent'
    },
    {
      ad: 1,
      indicator: 'dot',
      label: 'Active',
      emphasis: 'transparent',
      emphasis2: 'transparent'
    },
    {
      ad: 1,
      indicator: 'dot',
      label: 'Active',
      emphasis: 'transparent',
      emphasis2: 'transparent'
    },
    {
      ad: 1,
      indicator: 'dot',
      label: 'Active',
      emphasis: 'transparent',
      emphasis2: 'transparent'
    },
    {
      ad: 1,
      indicator: 'dot',
      label: 'Active',
      emphasis: 'transparent',
      emphasis2: 'transparent'
    }
  ]
})

const overrides = ref({
  '$.*': {
    options: {
      tooltip: (key: string) => {
        return key
      }
    }
  }
})
</script>

<style>
.view-content {
  margin: 0;
}
</style>

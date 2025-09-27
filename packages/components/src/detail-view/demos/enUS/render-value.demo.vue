<markdown>
  # Render Value

With `render-value` prop, you can customize the value of the data field. This prop accepts a function that returns a VNode. The function receives the value of the data field as an argument. This prop is useful when you want to render a custom component in place of the default value.

</markdown>

<template>
  <z-facade>
    <template v-if="avatar" #avatar>
      <z-avatar round size="small" name="Expansion Panel" />
    </template>
    <template v-if="header" #header>
      Bank Information
    </template>
    <template v-if="headerExtra" #header-end>
      <z-button size="small" @click="addNode">
        Save
        <template #icon>
          <save />
        </template>
      </z-button>
    </template>
    <template v-if="description" #description>
      Unlocking Banking Insights 🔍
    </template>
    <z-card size="small">
      <z-details-view
        :data="data"
        :render-value="renderValue"
        :options="{
          accordionProps: { bordered: false }
        }"
      />
    </z-card>
  </z-facade>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import { Save } from '@zeta/icons'
import { ZAvatar, ZCard, ZTag, DetailsViewData } from '@zeta-gds/components'

const avatar = ref(true)
const header = ref(true)
const headerExtra = ref(true)
const description = ref(true)

const data = ref({
  tooltipContent: 'Information related to the Status Data Field',
  'status.type': 'success',
  indicator: 'dot',
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

const addNode = () => {
  data.value['short.list'].push({
    ad: Date.now(),
    indicator: 'dot',
    label: 'Active',
    emphasis: 'transparent',
    emphasis2: 'transparent'
  })
}

const renderValue = function (value: DetailsViewData) {
  return h(
    ZTag,
    {
      color: 'success'
    },
    {
      default: () => value
    }
  )
}
</script>

<style>
.view-content {
  margin: 0;
}
</style>

<markdown>
# Right Aligned Value

With `render-value` prop, you can customize the value of the data field. This prop accepts a function that returns a VNode. The function receives the value of the data field as an argument. This prop is useful when you want to render a custom component in place of the default value.

</markdown>

<template>
  <z-facade>
    <template v-if="avatar" #avatar>
      <z-avatar round size="small" name="Expansion Panel" />
    </template>
    <template v-if="header" #header> Bank Information </template>
    <template v-if="description" #description>
      Unlocking Banking Insights 🔍
    </template>
    <z-card size="small">
      <z-details-view
        :data="data"
        :render-value="renderValue"
        :overrides="overrides"
        :options="{
          accordionProps: { bordered: false }
        }"
      />
    </z-card>
  </z-facade>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import { ZAvatar, ZCard, ZText, DetailsViewData } from '@zeta-gds/components'

const avatar = ref(true)
const header = ref(true)
const description = ref(true)

const data = ref({
  accountInfo: '',
  principalOutstanding: 450,
  interest: 50,
  fee: 0,
  others: 0,
  summary: {
    loanOutstandingBalance: 480,
    interestTillDate: 50
  }
})

const overrides = {
  '$.summary': {
    labelStyles: {
      display: 'none'
    },
    labelClass: 'hello',
    nodeStyles: {
      backgroundColor: '#f2f5ff'
    }
  },
  '$.summary.*': {
    labelStyles: {
      padding: '0'
    }
  },
  '$.accountInfo': {
    renderNode: function ({ data }: any) {
      return h(
        'div',
        {
          style: {
            color: 'black',
            padding: '7px',
            fontWeight: 'bold'
          }
        },
        {
          default: () => 'Account Information'
        }
      )
    }
  }
}

const renderValue = function (value: DetailsViewData) {
  return h(
    'div',
    {
      style: {
        textAlign: 'right'
      }
    },
    [
      h(
        ZText,
        {
          strong: true
        },
        {
          default: () => `₹ ${value}`
        }
      )
    ]
  )
}
</script>

<style>
.view-content {
  margin: 0;
}
</style>

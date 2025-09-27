<markdown>
  # Customization

  Using overrides, you can customize the appearance of the detail view. This includes adding custom components, changing the appearance of existing components, and more.
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
import { Save } from '@zeta/icons'
import { ZLink, ZAvatar, ZBadge } from '@zeta-gds/components'

const avatar = ref(true)
const header = ref(true)
const headerExtra = ref(true)
const description = ref(true)
const data = ref({
  basicInfo: '',
  tooltipContent: 'Information related to the Status Data Field',
  status: 'Active',
  user: 'John Doe',
  ID: 'ACCIN000001',
})
const overrides = {
  '$.status': {
    prefixValue: () => {
      return h(
        ZBadge,
        {
          dot: true,
          color: 'success',
          offset: [0, 6]
        }
      )
    }
  },
  '$.user': {
    prefixValue: () => {
      return h(
        ZAvatar,
        {
          round: true,
          size: 24,
          name: 'John Doe',
          src: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          style: {
            marginRight: '8px'
          }
        },
        {
          default: () => 'John Doe'
        }
      )
    }
  },
  '$.ID': {
    formatValue: (label: string) => {
      return h(
        ZLink,
        {
          href: '#',
          style: {
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 500,
            color: '#2a4ff0'
          },
        },
        {
          default: () => label
        }
      )
    }
  },
  '$.basicInfo': {
    renderNode: function () {
      return h(
        'div',
        {
          style: {
            padding: '7px',
            fontWeight: '500'
          },
        },
        {
          default: () => 'Basic Info'
        }
      )
    }
  },
}

const addNode = () => {
  data.value['short.list'].push({
    ad: Date.now(),
    indicator: 'dot',
    label: 'Active',
    emphasis: 'transparent',
    emphasis2: 'transparent'
  })
}
</script>

<style>
.view-content {
  margin: 0;
}
</style>

<markdown>
  # Accordion

This is the default view of the `z-details-view` component. It is a simple and clean view that can be used to display data in a structured manner.

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
      <z-button size="small">
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
        render-type="accordion"
        :height="300"
        :options="{
          renderType: 'accordion',
          accordionLevelLimit: 2,
          arrayDirection: 'horizontal',
          accordionProps: { bordered: false }
        }"
      />
    </z-card>
  </z-facade>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Save } from '@zeta/icons'

const avatar = ref(true)
const header = ref(true)
const headerExtra = ref(true)
const description = ref(true)
const data = ref({
  name: 'Magical Stuff',
  type: 'success',
  'Basic info': [
    { key: 'Name', value: 'John Doev', type: 'text' },
    {
      key: 'Description',
      value:
        'This file contains configuration details such as keys and identifiers, for the services you just enabled.',
      type: 'text'
    }
  ],
  Achievements: {
    Title: 'John Doev',
    User: {
      value: 'John Doe',
      props: {
        size: 'small'
      }
    },
    'Peer 1': {
      User: 'ACCIN0000001',
      Status: {
        type: 'success',
        indicator: 'dot',
        label: 'Active',
        emphasis: 'transparent'
      }
    }
  },
  Activities: {
    Title: 'John Doev',
    User: {
      value: 'John Doe',
      props: {
        size: 'small'
      }
    },
    'Peer 1': {
      User: 'ACCIN0000001',
      Status: {
        type: 'success',
        indicator: 'dot',
        label: 'Active',
        emphasis: 'transparent'
      }
    }
  },
  References: {
    Title: 'John Doev',
    User: {
      value: 'John Doe',
      props: {
        size: 'small'
      }
    },
    'Peer 1': {
      User: 'ACCIN0000001',
      Status: {
        type: 'success',
        indicator: 'dot',
        label: 'Active',
        emphasis: 'transparent'
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

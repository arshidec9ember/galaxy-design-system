<markdown>
  # Modifications

  The same card that can be composed in different ways.
  As composite cards each serving their own purpose.
  </markdown>

<template>
  <z-row>
    <z-col :span="12">
      <z-checkbox v-model="stripe">
        Stripe
      </z-checkbox>
    </z-col>
    <z-col :span="12">
      <z-checkbox v-model="action">
        Action
      </z-checkbox>
    </z-col>
  </z-row>
  <z-row>
    <z-col :span="12">
      <z-checkbox v-model="header">
        Header
      </z-checkbox>
    </z-col>
    <z-col :span="12">
      <z-checkbox v-model="headerEnd">
        Header End
      </z-checkbox>
    </z-col>
  </z-row>
  <z-row>
    <z-col :span="12">
      <z-checkbox v-model="description">
        Description
      </z-checkbox>
    </z-col>
    <z-col :span="12">
      <z-checkbox v-model="subtext">
        Subtext
      </z-checkbox>
    </z-col>
  </z-row>
  <z-divider />
  <!-- Card component here -->
  <z-card
    :divider="{
      action: 'inset'
    }"
  >
    <z-card-media v-if="stripe" style="height: 8px; background: #ff96aa" />
    <z-card-header v-if="header">
      Card Header
      <template v-if="headerEnd" #end>
        <z-dropdown
          placement="bottom-start"
          trigger="click"
          size="small"
          :options="options"
          @select="handleSelect"
        >
          <z-button size="small" style="padding: 8px">
            <z-icon size="12">
              <more-horiz />
            </z-icon>
          </z-button>
        </z-dropdown>
      </template>
    </z-card-header>
    <z-card-header v-if="subtext" style="padding: 0 16px">
      <sub v-if="subtext">Second header</sub>
    </z-card-header>
    <z-card-content v-if="description">
      Card Content
    </z-card-content>
    <z-card-action v-if="action">
      <z-space>
        <z-button variant="filled" color="primary" size="small">
          Primary
        </z-button>
        <z-button color="neutral" size="small">
          Secondary
        </z-button>
        <z-dropdown
          placement="bottom-start"
          trigger="click"
          size="small"
          :options="options"
          @select="handleSelect"
        >
          <z-button size="small" style="padding: 8px">
            <z-icon size="12">
              <more-horiz />
            </z-icon>
          </z-button>
        </z-dropdown>
      </z-space>
    </z-card-action>
  </z-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { MoreHoriz } from '@zeta/icons'
import { useMessage } from '@zeta-gds/components'

const options = [
  {
    label: 'Jay Gatsby',
    key: 'jay gatsby'
  },
  {
    label: 'Daisy Buchanan',
    key: 'daisy buchanan'
  },
  {
    type: 'divider',
    key: 'd1'
  },
  {
    label: 'Nick Carraway',
    key: 'nick carraway'
  },
  {
    label: 'Others',
    key: 'others1',
    children: [
      {
        label: 'Jordan Baker',
        key: 'jordan baker'
      },
      {
        label: 'Tom Buchanan',
        key: 'tom buchanan'
      },
      {
        label: 'Others',
        key: 'others2',
        children: [
          {
            label: 'Chicken',
            key: 'chicken'
          },
          {
            label: 'Vegan',
            key: 'vegan'
          }
        ]
      }
    ]
  }
]

const message = useMessage()
const handleSelect = (key: string | number) => {
  message.info(String(key))
}

const stripe = ref(true)
const header = ref(true)
const headerEnd = ref(true)
const description = ref(true)
const action = ref(true)
const subtext = ref(true)
</script>

<style>
.z-card {
  max-width: 300px;
}

.inverse {
  color: white;
}
</style>

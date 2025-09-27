<markdown>
# Vertical Card

Card can have a vertical.
</markdown>

<template>
  <z-card
    :divider="{
      action: true
    }"
  >
    <z-card-header>
      <z-icon :size="24" color="var(--z-color-target)">
        <aperture />
      </z-icon>
      <template #end>
        <z-dropdown
          trigger="hover"
          placement="bottom-start"
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
    <z-card-content class="z-card-content--vertical">
      <z-tag class="z-tag--vertical">
        Label
      </z-tag>
      <z-facade class="z-facade--color">
        <template #header>
          Card Title
        </template>
        <template #description>
          <sub>SUBTEXT</sub>
        </template>
        <z-ellipsis expand-trigger="click" line-clamp="2" :tooltip="false">
          Lorem ipsum dolor sit amet adipiscing elit, <br>
          consectetur adipiscing elit sed do eiusmod tempor <br>
          sed do eiusmod tempor incididunt Ut enim ad minim veniam<br>
          Ut enim ad minim veniam, exercitation ullamco <br>
          quis nostrud exercitation ullamco <br>
        </z-ellipsis>
        <template #footer>
          <z-tag type="success">
            Label
          </z-tag>
        </template>
      </z-facade>
    </z-card-content>
    <z-card-action>
      <z-space>
        <z-button variant="filled" color="primary" size="small">
          Primary
        </z-button>
        <z-button size="small">
          Edit
        </z-button>
      </z-space>
    </z-card-action>
  </z-card>
</template>
<script lang="ts" setup>
import { MoreHoriz } from '@zeta/icons'
import { Aperture } from '@vicons/ionicons5'
import { ref } from 'vue'
import { useMessage } from '@zeta-gds/components'

const message = useMessage()

const options = ref([
  {
    label: 'Marina Bay Sands',
    key: 'Marina Bay Sands'
  },
  {
    label: "Brown's Hotel, London",
    key: "Brown's Hotel, London"
  },
  {
    label: 'Atlantis Bahamas, Nassau',
    key: 'Atlantis Bahamas, Nassau'
  },
  {
    label: 'The Beverly Hills Hotel, Los Angeles',
    key: 'The Beverly Hills Hotel, Los Angeles'
  }
])

const handleSelect = (key: string) => {
  message.info(String(key))
}
</script>
<style>
.z-card-content--vertical {
  padding-top: 0px;
}
.z-tag--vertical {
  margin-bottom: 8px;
}
.z-facade--color {
  color: var(--z-text-color);
}
</style>

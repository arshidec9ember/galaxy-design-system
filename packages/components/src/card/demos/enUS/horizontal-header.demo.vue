<markdown>
# Content Indented Card

Card can have a horizontal header. You can use this in combination with grid.
</markdown>

<template>
  <z-card>
    <z-card-content>
      <z-facade content-indented>
        <template #avatar>
          <!-- --z-text-color-target a property of card -->
          <z-icon :size="32" color="var(--z-text-color-target)">
            <aperture />
          </z-icon>
        </template>
        <template #header>
          Card Title
        </template>
        <template #header-end>
          <z-tag :bordered="false">
            Bank Firm
          </z-tag>
        </template>
        <template #description>
          SUBTEXT
        </template>
        <z-ellipsis expand-trigger="click" line-clamp="2" :tooltip="false">
          Lorem ipsum dolor sit amet adipiscing elit, <br>
          consectetur adipiscing elit sed do eiusmod tempor <br>
          sed do eiusmod tempor incididunt Ut enim ad minim veniam<br>
          Ut enim ad minim veniam, exercitation ullamco <br>
          quis nostrud exercitation ullamco <br>
        </z-ellipsis>
        <template #footer>
          <z-tag color="success">
            Active
          </z-tag>
        </template>
        <template #action>
          <z-space>
            <z-button variant="filled" color="primary" size="small">
              Primary
            </z-button>
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
          </z-space>
        </template>
      </z-facade>
    </z-card-content>
  </z-card>
</template>
<script lang="ts" setup>
import { Aperture } from '@vicons/ionicons5'
import { MoreHoriz } from '@zeta/icons'
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

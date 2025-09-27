<markdown>
  # Plain Page Header

  A plain Page Header with Title, Description and Action buttons
  </markdown>

<template>
  <z-page-header class="example-border">
    <template #title>
      <z-space align="center" class="test-gap">
        Dispute- A/c No. 6257015680132987
        <z-icon>
          <attach-file />
        </z-icon>
        <z-tag> Assess </z-tag>
        <z-tag :color="{ color: 'transparent' }" :bordered="false">
          <template #icon>
            <z-icon color="#2A4FF0">
              <access-time-filled />
            </z-icon>
          </template>
          In Progress
        </z-tag>
      </z-space>
    </template>
    <template #actions>
      <z-space>
        <z-button-group>
          <z-button> Unclaim Task </z-button>
          <z-dropdown :options="buttonOptions">
            <z-button>
              <z-icon>
                <keyboard-arrow-down />
              </z-icon>
            </z-button>
          </z-dropdown>
        </z-button-group>
      </z-space>
    </template>
    <template #description>
      <z-space align="center">
        <span> Request ID: CSR0001 </span>
        ·
        <z-space align="center">
          <z-avatar
            :size="26"
            round
            src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <span> Briana Forbes (me) </span>
        </z-space>
        ·
        <span> Task Created 07 May 2023, 12:34 PM </span>
      </z-space>
    </template>
  </z-page-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AttachFile, AccessTimeFilled, KeyboardArrowDown } from '@zeta/icons'

export default defineComponent({
  components: {
    AttachFile,
    AccessTimeFilled,
    KeyboardArrowDown
  },
  setup () {
    return {
      buttonOptions: [
        {
          label: 'Task 1',
          key: '1'
        },
        {
          label: 'Task 2',
          key: '2'
        }
      ]
    }
  }
})
</script>

<style>
.example-border {
  border: 1px solid rgba(212, 215, 230, 1);
  border-radius: 5px;
}
</style>

<markdown>
# Basic Page Banner

A basic page banner.
</markdown>

<template>
  <z-page-header description="A podcast to improve designs">
    <template #title>
      <a
        href="https://anyway.fm/"
        style="text-decoration: none; color: inherit"
      >
        Anyway.FM
      </a>
    </template>
    <template #navigation>
      <z-breadcrumb>
        <z-breadcrumb-item>Podcast</z-breadcrumb-item>
        <z-breadcrumb-item>Best Collection</z-breadcrumb-item>
        <z-breadcrumb-item>Ultimate Best Collection</z-breadcrumb-item>
        <z-breadcrumb-item>Anyway.FM</z-breadcrumb-item>
      </z-breadcrumb>
    </template>
    <template #avatar>
      <z-avatar
        src="https://cdnimg103.lizhi.fm/user/2017/02/04/2583325032200238082_160x160.jpg"
      />
    </template>
    <template #actions>
      <z-space>
        <z-button variant="filled" color="primary">
          Refresh
        </z-button>
        <z-dropdown :options="options" placement="bottom-start">
          <z-button :bordered="false">
            ···
          </z-button>
        </z-dropdown>
      </z-space>
    </template>
    <template #footer>
      As of April 3, 2021
    </template>
  </z-page-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handleBack () {
        message.info('[onBack]')
      },
      options: [
        {
          label: 'More episodes',
          key: '1'
        },
        {
          label: 'More episodes',
          key: '2'
        },
        {
          label: 'More episodes',
          key: '3'
        }
      ]
    }
  }
})
</script>

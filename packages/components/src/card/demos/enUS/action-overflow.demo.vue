<markdown>
# Action Overflow

Card with it's sub-component.
</markdown>

<template>
  <z-card
    :divider="{
      action: 'inset'
    }"
  >
    <z-card-header>Basic</z-card-header>
    <z-card-content>Card Content</z-card-content>
    <z-card-footer>Card Footer</z-card-footer>
    <z-card-action>
      <z-space>
        <z-button-overflow :max-items="2" size="small">
          <z-button
            variant="filled"
            color="primary"
            @click="message.info('primary')"
          ><template #icon>
            <z-icon><log-in-icon /></z-icon> </template>Primary</z-button>
          <z-button
            variant="outlined"
            @click="message.info('link')"
          ><template #icon>
            <z-icon><log-in-icon /></z-icon> </template>Link</z-button>
          <z-button @click="message.info('info')"><template #icon>
            <z-icon><log-in-icon /></z-icon> </template>This is info Action</z-button>
          <z-button @click="message.info('success')"><template #icon>
            <z-icon><log-in-icon /></z-icon> </template>This is success Action</z-button>
          <z-button @click="message.info('action')"><template #icon>
            <z-icon><log-in-icon /></z-icon> </template>This is action Action</z-button>
          <z-button @click="message.info('danger')"><template #icon>
            <z-icon><log-in-icon /></z-icon> </template>This is danger Action</z-button>
        </z-button-overflow>
      </z-space>
    </z-card-action>
  </z-card>
</template>

<script setup lang="ts">
import { LogInOutline as LogInIcon } from '@vicons/ionicons5'
import { useMessage } from '@zeta-gds/components'
const message = useMessage()
</script>

<markdown>
# Basic

Use `createDiscreteApi` to create series of API.
</markdown>

<template>
  <z-space>
    <z-button @click="handleThemeChangeClick">
      theme: {{ theme }}
    </z-button>
    <z-button @click="handleMessageTriggerClick">
      message
    </z-button>
    <z-button @click="handleNotificationTriggerClick">
      notification
    </z-button>
    <z-button @click="handleDialogTriggerClick">
      dialog
    </z-button>
    <z-button @click="handleLoadingBarTriggerClick">
      loadingBar
    </z-button>
  </z-space>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import {
  createDiscreteApi,
  ConfigProviderProps,
  darkTheme,
  lightTheme
} from '@zeta-gds/components'

const themeRef = ref<'light' | 'dark'>('light')
const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
  theme: themeRef.value === 'light' ? lightTheme : darkTheme
}))

const { message, notification, dialog, loadingBar } = createDiscreteApi(
  ['message', 'dialog', 'notification', 'loadingBar'],
  {
    configProviderProps: configProviderPropsRef
  }
)

export default defineComponent({
  setup () {
    return {
      theme: themeRef,
      handleThemeChangeClick () {
        if (themeRef.value === 'light') themeRef.value = 'dark'
        else themeRef.value = 'light'
      },
      handleMessageTriggerClick () {
        message.info('Message')
      },
      handleNotificationTriggerClick () {
        notification.create({ title: 'Notification' })
      },
      handleDialogTriggerClick () {
        dialog.info({ title: 'Dialog' })
      },
      handleLoadingBarTriggerClick () {
        loadingBar.start()
        setTimeout(() => {
          loadingBar.finish()
        }, 1000)
      }
    }
  }
})
</script>

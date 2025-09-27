<markdown>
# Controls Slot

This demo showcases the `#controls` slot for custom action controls in the panel.
</markdown>

<template>
  <z-space vertical>
    <div style="height: 500px; border: 1px solid #e0e0e0; border-radius: 8px">
      <z-panel
        title="Custom Controls Demo"
        description="Demonstrating custom action controls in the panel"
      >
        <template v-if="showCustomControls" #controls>
          <z-button
            size="small"
            variant="filled"
            type="primary"
            @click="onSave"
          >
            <z-icon size="16">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.33333 14C2.96667 14 2.65278 13.8694 2.39167 13.6083C2.13056 13.3472 2 13.0333 2 12.6667V3.33333C2 2.96667 2.13056 2.65278 2.39167 2.39167C2.65278 2.13056 2.96667 2 3.33333 2H10.7833C10.9611 2 11.1306 2.03333 11.2917 2.1C11.4528 2.16667 11.5944 2.26111 11.7167 2.38333L13.6167 4.28333C13.7389 4.40556 13.8333 4.54722 13.9 4.70833C13.9667 4.86944 14 5.03889 14 5.21667V12.6667C14 13.0333 13.8694 13.3472 13.6083 13.6083C13.3472 13.8694 13.0333 14 12.6667 14H3.33333ZM12.6667 5.23333L10.7667 3.33333H3.33333V12.6667H12.6667V5.23333ZM8 12C8.55556 12 9.02778 11.8056 9.41667 11.4167C9.80556 11.0278 10 10.5556 10 10C10 9.44444 9.80556 8.97222 9.41667 8.58333C9.02778 8.19444 8.55556 8 8 8C7.44444 8 6.97222 8.19444 6.58333 8.58333C6.19444 8.97222 6 9.44444 6 10C6 10.5556 6.19444 11.0278 6.58333 11.4167C6.97222 11.8056 7.44444 12 8 12ZM4.66667 6.66667H9.33333C9.52222 6.66667 9.68056 6.60278 9.80833 6.475C9.93611 6.34722 10 6.18889 10 6V4.66667C10 4.47778 9.93611 4.31944 9.80833 4.19167C9.68056 4.06389 9.52222 4 9.33333 4H4.66667C4.47778 4 4.31944 4.06389 4.19167 4.19167C4.06389 4.31944 4 4.47778 4 4.66667V6C4 6.18889 4.06389 6.34722 4.19167 6.475C4.31944 6.60278 4.47778 6.66667 4.66667 6.66667ZM3.33333 5.23333V12.6667V3.33333V5.23333Z"
                  fill="currentColor"
                />
              </svg>
            </z-icon>
          </z-button>
        </template>

        <div class="panel-content" style="padding: 16px">
          <z-title variant="5-m">
            Custom Action Controls Demo
          </z-title>
        </div>
      </z-panel>
    </div>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    const showCustomControls = ref(true)
    const showAdvancedControls = ref(true)
    const showContextualControls = ref(true)
    const controlTheme = ref('mixed')
    const pendingChanges = ref(3)
    const autoSaveEnabled = ref(false)
    const lastAction = ref('')

    const advancedOptions = [
      { label: 'Import Data', value: 'import' },
      { label: 'Batch Process', value: 'batch' },
      { type: 'divider' },
      { label: 'Clone Panel', value: 'clone' },
      { label: 'Reset to Default', value: 'reset' }
    ]

    function onSave () {
      lastAction.value = 'Save'
      pendingChanges.value = 0
      message.success('Content saved successfully!')
    }

    function onPublish () {
      lastAction.value = 'Publish'
      pendingChanges.value = 0
      message.success('Content published!')
    }

    function onPreview () {
      lastAction.value = 'Preview'
      message.info('Opening preview...')
    }

    function onExport () {
      lastAction.value = 'Export'
      message.info('Exporting content...')
    }

    function onAdvancedAction (value: string) {
      lastAction.value = `Advanced: ${value}`
      message.info(`Advanced action: ${value}`)
    }

    function onSettings () {
      lastAction.value = 'Settings'
      message.info('Opening settings panel...')
    }

    function onDiscardChanges () {
      lastAction.value = 'Discard Changes'
      pendingChanges.value = 0
      message.warning('All pending changes discarded')
    }

    function toggleAutoSave () {
      autoSaveEnabled.value = !autoSaveEnabled.value
      lastAction.value = `Auto-save ${
        autoSaveEnabled.value ? 'enabled' : 'disabled'
      }`
      message.success(
        `Auto-save ${autoSaveEnabled.value ? 'enabled' : 'disabled'}`
      )
    }

    function simulateChanges () {
      pendingChanges.value += Math.floor(Math.random() * 3) + 1
      message.info(`Simulated ${pendingChanges.value} pending changes`)
    }

    function resetState () {
      pendingChanges.value = 0
      autoSaveEnabled.value = false
      lastAction.value = ''
      message.success('State reset')
    }

    return {
      showCustomControls,
      showAdvancedControls,
      showContextualControls,
      controlTheme,
      pendingChanges,
      autoSaveEnabled,
      lastAction,
      advancedOptions,
      onSave,
      onPublish,
      onPreview,
      onExport,
      onAdvancedAction,
      onSettings,
      onDiscardChanges,
      toggleAutoSave,
      simulateChanges,
      resetState,
      message
    }
  }
})
</script>

<style scoped>
.panel-content {
  padding: 16px;
  height: 100%;
  overflow-y: auto;
}

.custom-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
</style>

<markdown>
# Events
</markdown>

<template>
  <z-space vertical>
    <div><z-switch v-model="disabled" /> Disable</div>
    <z-date-picker
      v-model="datetime"
      type="datetime"
      :disabled="disabled"
      @blur="onBlur1"
      @update:model-value="onChange1"
    />
    <z-date-picker
      v-model="date"
      type="date"
      :disabled="disabled"
      @blur="onBlur2"
      @update:model-value="onChange2"
    />
    <z-date-picker
      v-model="datetimerange"
      :disabled="disabled"
      type="datetimerange"
      @blur="onBlur3"
      @update:model-value="onChange3"
    />
    <z-date-picker
      v-model="daterange"
      :disabled="disabled"
      type="daterange"
      @blur="onBlur4"
      @update:model-value="onChange4"
    />
    <z-date-picker
      v-model="daterange"
      :disabled="disabled"
      type="daterange"
      @clear="onClear"
      @confirm="onConfirm"
    />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      datetime: ref(1183135260000),
      date: ref(null),
      datetimerange: ref(null),
      daterange: ref(null),
      disabled: ref(false),
      onBlur1 () {
        message.info('Blur-1')
      },
      onChange1 (v: number) {
        message.info('Change-1 ' + v)
      },
      onBlur2 () {
        message.error('Blur-2')
      },
      onChange2 (v: number) {
        message.error('Change-2 ' + v)
      },
      onBlur3 () {
        message.warning('Blur-3')
      },
      onChange3 (v: number) {
        message.warning('Change-3 ' + v)
      },
      onBlur4 () {
        message.success('Blur-4')
      },
      onChange4 (v: number) {
        message.success('Change-4 ' + v)
      },
      onClear () {
        message.info('Clear-5')
      },
      onConfirm (value: number | number[] | null) {
        message.info('Confirm-5 ' + value)
      }
    }
  }
})
</script>

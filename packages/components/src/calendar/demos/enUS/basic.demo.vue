<markdown>
# Basic

A basic calender.
</markdown>

<template>
  <z-calendar
    v-model="value"
    #="{ year, month, date }"
    :is-date-disabled="isDateDisabled"
    @update:model-value="handleUpdateValue"
  >
    {{ year }}-{{ month }}-{{ date }}
  </z-calendar>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage } from '@zeta-gds/components'
import { isYesterday, addDays } from 'date-fns/esm'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      value: ref(addDays(Date.now(), 1).valueOf()),
      handleUpdateValue (
        _: number,
        { year, month, date }: { year: number; month: number; date: number }
      ) {
        message.success(`${year}-${month}-${date}`)
      },
      isDateDisabled (timestamp: number) {
        if (isYesterday(timestamp)) {
          return true
        }
        return false
      }
    }
  }
})
</script>

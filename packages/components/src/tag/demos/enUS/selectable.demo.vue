<markdown>
  # Selectable

  It can be Checkable.
  </markdown>

<template>
  <z-space>
    <z-tag :checked="true" checkable disabled>
      Real Love
    </z-tag>
    <z-tag
      v-model:checked="checked"
      checkable
      closable
      round
      @update-checked="click"
      @close="handleClose"
    >
      <template #icon>
        <z-icon><info-filled-circle /></z-icon>
      </template>
      Neutral
    </z-tag>
    <z-tag
      v-model:checked="checked"
      checkable
      color="info"
      closable
      round
      @update-checked="click"
      @close="handleClose"
    >
      <template #icon>
        <z-icon><info-filled-circle /></z-icon>
      </template>
      Info
    </z-tag>
    <z-tag
      v-model:checked="checked"
      color="success"
      checkable
      round
      closable
      @update-checked="click"
      @close="handleClose"
    >
      <template #icon>
        <z-icon><check-circle /></z-icon>
      </template>
      Active
    </z-tag>
    <z-tag
      v-model:checked="checked"
      color="warning"
      checkable
      closable
      round
      @update-checked="click"
      @close="handleClose"
    >
      <template #icon>
        <z-icon><warning /></z-icon>
      </template>
      Warning
    </z-tag>
    <z-tag
      v-model:checked="checked"
      color="error"
      checkable
      closable
      round
      @update-checked="click"
      @close="handleClose"
    >
      <template #icon>
        <z-icon><dangerous /></z-icon>
      </template>
      InActive
    </z-tag>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { CheckCircle, Warning, Dangerous, InfoFilledCircle } from '@zeta/icons'
import { useMessage } from '@zeta-gds/components'

export default defineComponent({
  components: {
    CheckCircle,
    Warning,
    Dangerous,
    InfoFilledCircle
  },
  setup () {
    const message = useMessage()
    return {
      checked: ref(false),
      click () {
        message.info('tag checked')
      },
      handleClose () {
        message.info('tag close')
      }
    }
  }
})
</script>

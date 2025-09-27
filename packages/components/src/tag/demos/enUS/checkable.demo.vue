<markdown>
  # Checkable

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
      Yes It Is
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
      Active
    </z-tag>
    <z-tag
      v-model:checked="checked"
      color="warning"
      checkable
      round
      @update-checked="click"
      @close="handleClose"
    >
      Warning
    </z-tag>
    <z-tag
      v-model:checked="checked"
      color="error"
      checkable
      round
      @update-checked="click"
      @close="handleClose"
    >
      InActive
    </z-tag>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage } from '@zeta-gds/components'

export default defineComponent({
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

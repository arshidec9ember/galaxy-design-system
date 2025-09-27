<markdown>
# Switch Field
</markdown>

<template>
  <z-form
    ref="formRef"
    :model="model"
    :rules="rules"
    label-placement="left"
    label-align="left"
    :size="size"
    :show-indicator="false"
    label-width="auto"
    :style="{
      maxWidth: '640px'
    }"
  >
    <z-form-item
      help-message="This is help message"
      description="This is description"
      label="Switch"
      path="switchValue"
    >
      <z-switch v-model="model.switchValue" />
    </z-form-item>

    <pre>{{ JSON.stringify(model, null, 2) }} </pre>
  </z-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { FormInst } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const formRef = ref<FormInst | null>(null)
    return {
      formRef,
      size: ref('medium'),
      model: ref({
        switchValue: false
      })
    }
  }
})
</script>

<markdown>
# I18n

Form's rule supports `renderMessage`. You can use it to render your message.
</markdown>

<template>
  <z-space vertical>
    <z-radio-group v-model="locale">
      <z-space>
        <z-radio label="English" value="English" />
      </z-space>
    </z-radio-group>
    <z-form :model="model" :rules="rules">
      <z-form-item
        help-message="This is help message"
        description="This is description"
        label="Input something to remove error"
        path="input"
      >
        <z-input v-model="model.input" />
      </z-form-item>
    </z-form>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { FormRules } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const localeRef = ref('English')
    const rules: FormRules = {
      input: {
        required: true,
        trigger: ['focus', 'input'],
        renderMessage: () => {
          return 'English error'
        }
      }
    }
    const modelRef = ref({
      input: ''
    })
    return {
      rules,
      model: modelRef,
      locale: localeRef
    }
  }
})
</script>

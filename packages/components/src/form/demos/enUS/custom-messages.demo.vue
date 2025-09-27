<markdown>
# Custom messages

You can define custom messages that are used instead of the standard ones.
</markdown>

<template>
  <z-form
    ref="formRef"
    :model="formValue"
    :rules="rules"
    :validate-messages="messages"
  >
    <z-form-item
      help-message="This is help message"
      description="This is description"
      label="Name"
      path="user.name"
    >
      <z-input v-model="formValue.user.name" placeholder="Input Name" />
    </z-form-item>
    <z-form-item>
      <z-button @click="handleValidateClick">
        Validate
      </z-button>
    </z-form-item>
  </z-form>

  <pre>{{ JSON.stringify(formValue, null, 2) }}
</pre>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { FormInst, useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const formRef = ref<FormInst | null>(null)
    const message = useMessage()
    return {
      formRef,
      formValue: ref({
        user: {
          name: ''
        }
      }),
      messages: {
        required: '%s is really really required'
      },
      rules: {
        user: {
          name: {
            required: true,
            trigger: 'blur'
          }
        }
      },
      handleValidateClick (e: MouseEvent) {
        e.preventDefault()
        formRef.value?.validate((errors) => {
          if (!errors) {
            message.success('Valid')
          } else {
            console.log(errors)
            message.error('Invalid')
          }
        })
      }
    }
  }
})
</script>

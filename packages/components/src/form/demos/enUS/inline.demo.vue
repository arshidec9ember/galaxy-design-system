<markdown>
# Inline form

An example of an inline form.
</markdown>

<template>
  <z-radio-group v-model="size" name="left-size" style="margin-bottom: 12px">
    <z-radio-button value="small">
      Small
    </z-radio-button>
    <z-radio-button value="medium">
      Medium
    </z-radio-button>
    <z-radio-button value="large">
      Large
    </z-radio-button>
  </z-radio-group>
  <z-form
    ref="formRef"
    inline
    :label-width="80"
    :model="formValue"
    :rules="rules"
    :size="size"
  >
    <z-form-item
      help-message="This is help message"
      description="This is description"
      label="Name"
      path="user.name"
    >
      <z-input v-model="formValue.user.name" placeholder="Input Name" />
    </z-form-item>
    <z-form-item
      help-message="This is help message"
      description="This is description"
      :help-message-props="{ placement: 'bottom' }"
      label="Age"
      path="user.age"
    >
      <z-input v-model="formValue.user.age" placeholder="Input Age" />
    </z-form-item>
    <z-form-item
      help-message="This is help message"
      description="This is description"
      label="Phone"
      path="phone"
    >
      <z-input v-model="formValue.phone" placeholder="Phone Number" />
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
      size: ref<'small' | 'medium' | 'large'>('medium'),
      formValue: ref({
        user: {
          name: '',
          age: ''
        },
        phone: ''
      }),
      rules: {
        user: {
          name: {
            required: true,
            message: 'Please input your name',
            trigger: 'blur'
          },
          age: {
            required: true,
            message: 'Please input your age',
            trigger: ['input', 'blur']
          }
        },
        phone: {
          required: true,
          message: 'Please input your number',
          trigger: ['input']
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

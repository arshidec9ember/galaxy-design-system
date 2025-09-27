<markdown>
# Async validation

Supports async when the provided validator returns a `Promise`.
</markdown>

<template>
  <z-form
    ref="formRef"
    inline
    :label-width="80"
    :model="formValue"
    :rules="rules"
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
      label="Age"
      path="user.age"
    >
      <z-input v-model="formValue.user.age" placeholder="Input Age" />
    </z-form-item>
    <z-form-item
      help-message="This is help message"
      description="This is description"
      label="Adress"
      path="user.address"
    >
      <z-input v-model="formValue.user.address" placeholder="Input Address" />
    </z-form-item>
    <z-form-item
      help-message="This is help message"
      description="This is description"
      label="Phone"
      path="phone"
    >
      <z-input v-model="formValue.phone" placeholder="Phone Number" />
    </z-form-item>
    <z-form-item
      v-model="formValue.phone"
      help-message="This is help message"
      description="This is description"
    >
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
import {
  FormInst,
  FormItemRule,
  FormValidationError,
  useMessage
} from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const formRef = ref<FormInst | null>(null)
    const message = useMessage()
    return {
      formRef,
      formValue: ref({
        user: {
          name: 'name',
          age: '15',
          address: '0'
        },
        phone: '1251550092'
      }),
      rules: {
        user: {
          name: {
            required: true,
            trigger: 'blur',
            validator: (rule: FormItemRule, value: string) => {
              return new Promise<void>((resolve, reject) => {
                if (value !== 'testName') {
                  reject(Error('error name')) // reject with error message
                } else {
                  resolve()
                }
              })
            }
          },
          age: {
            required: true,
            trigger: 'input',
            validator: (rule: FormItemRule, value: number) => {
              return new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                  if (value <= 16) {
                    reject(Error('error age'))
                  } else {
                    resolve()
                  }
                }, 3000)
              })
            }
          }
        },
        phone: {
          required: true,
          trigger: ['input'],
          validator: (rule: FormItemRule, value: string) => {
            return /^[1]+[3,8]+\d{9}$/.test(value)
          }
        }
      },
      handleValidateClick (e: MouseEvent) {
        e.preventDefault()
        const messageReactive = message.loading('Verifying', {
          duration: 0
        })
        formRef.value?.validate(
          (errors: Array<FormValidationError> | undefined) => {
            if (!errors) {
              message.success('Valid')
            } else {
              message.error('Invalid')
              console.log('errors', errors)
            }
            messageReactive.destroy()
          }
        )
      }
    }
  }
})
</script>

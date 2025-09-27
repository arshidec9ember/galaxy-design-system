<markdown>
# With custom content
</markdown>

<template>
  <z-popover trigger="hover" placement="bottom-start">
    <template #trigger>
      <z-button> Hover </z-button>
    </template>
    <z-form
      ref="formRef"
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
        <z-button
          size="small"
          color="primary"
          variant="filled"
          @click="handleValidateClick"
        >
          Validate
        </z-button>
      </z-form-item>
    </z-form>
  </z-popover>
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

<markdown>
# Customizing rules

Sometimes builtin triggers don't meet your needs. You can customize these validations by setting a custom trigger in the rules and manually triggering the validation.
</markdown>

<template>
  <z-form ref="formRef" :model="model" :rules="rules">
    <z-form-item
      help-message="This is help message"
      description="This is description"
      path="age"
      label="Age"
    >
      <z-input v-model="model.age" @keydown.enter.prevent />
    </z-form-item>
    <z-form-item
      help-message="This is help message"
      description="This is description"
      path="password"
      label="Password"
    >
      <z-input
        v-model="model.password"
        type="password"
        @input="handlePasswordInput"
        @keydown.enter.prevent
      />
    </z-form-item>
    <z-form-item
      ref="rPasswordFormItemRef"
      first
      path="reenteredPassword"
      label="Re-enter Password"
    >
      <z-input
        v-model="model.reenteredPassword"
        :disabled="!model.password"
        type="password"
        @keydown.enter.prevent
      />
    </z-form-item>
    <z-row :gutter="[0, 24]">
      <z-col :span="24">
        <div style="display: flex; justify-content: flex-end">
          <z-button
            :disabled="model.age === null"
            round
            color="primary"
            @click="handleValidateButtonClick"
          >
            Validate
          </z-button>
        </div>
      </z-col>
    </z-row>
  </z-form>

  <pre>{{ JSON.stringify(model, null, 2) }}
</pre>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  FormInst,
  FormItemInst,
  FormItemRule,
  FormValidationError,
  useMessage,
  FormRules
} from '@zeta-gds/components'

interface ModelType {
  age: string | null
  password: string | null
  reenteredPassword: string | null
}

export default defineComponent({
  setup () {
    const formRef = ref<FormInst | null>(null)
    const rPasswordFormItemRef = ref<FormItemInst | null>(null)
    const message = useMessage()
    const modelRef = ref<ModelType>({
      age: null,
      password: null,
      reenteredPassword: null
    })
    function validatePasswordStartWith (
      rule: FormItemRule,
      value: string
    ): boolean {
      return (
        !!modelRef.value.password &&
        modelRef.value.password.startsWith(value) &&
        modelRef.value.password.length >= value.length
      )
    }
    function validatePasswordSame (rule: FormItemRule, value: string): boolean {
      return value === modelRef.value.password
    }
    const rules: FormRules = {
      age: [
        {
          required: true,
          validator (rule: FormItemRule, value: string) {
            if (!value) {
              return new Error('Age is required')
            } else if (!/^\d*$/.test(value)) {
              return new Error('Age should be an integer')
            } else if (Number(value) < 18) {
              return new Error('Age should be above 18')
            }
            return true
          },
          trigger: ['input', 'blur']
        }
      ],
      password: [
        {
          required: true,
          message: 'Password is required'
        }
      ],
      reenteredPassword: [
        {
          required: true,
          message: 'Re-entered password is required',
          trigger: ['input', 'blur']
        },
        {
          validator: validatePasswordStartWith,
          message: 'Password is not same as re-entered password!',
          trigger: 'input'
        },
        {
          validator: validatePasswordSame,
          message: 'Password is not same as re-entered password!',
          trigger: ['blur', 'password-input']
        }
      ]
    }
    return {
      formRef,
      rPasswordFormItemRef,
      model: modelRef,
      rules,
      handlePasswordInput () {
        if (modelRef.value.reenteredPassword) {
          rPasswordFormItemRef.value?.validate({ trigger: 'password-input' })
        }
      },
      handleValidateButtonClick (e: MouseEvent) {
        e.preventDefault()
        formRef.value?.validate(
          (errors: Array<FormValidationError> | undefined) => {
            if (!errors) {
              message.success('Valid')
            } else {
              console.log(errors)
              message.error('Invalid')
            }
          }
        )
      }
    }
  }
})
</script>

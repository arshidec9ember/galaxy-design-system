<markdown>
# Apply partial rules

During the validation, you may not want to validate all items. You can use the second parameter of `form.validate` to control which rules to be applied.
</markdown>

<template>
  <z-space vertical>
    <z-space>
      <z-button @click="validatePartial">
        Check first field
      </z-button>
      <z-button @click="validateAll">
        Check all fields
      </z-button>
      <z-button @click="clear">
        Restore validation
      </z-button>
    </z-space>
    <z-form ref="formInstRef" :model="model" :rules="rules">
      <z-form-item
        help-message="This is help message"
        description="This is description"
        label="Min length 3"
        path="fieldA"
      >
        <z-input v-model="model.fieldA" />
      </z-form-item>
      <z-form-item
        help-message="This is help message"
        description="This is description"
        label="Min length 2"
        path="fieldB"
      >
        <z-input v-model="model.fieldB" />
      </z-form-item>
    </z-form>
  </z-space>
</template>

<script lang="ts">
import { FormInst } from '@zeta-gds/components'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const formInstRef = ref<FormInst | null>(null)
    return {
      clear () {
        formInstRef.value?.restoreValidation()
      },
      validateAll () {
        formInstRef.value?.validate((errors) => {
          if (errors) {
            console.error(errors)
          }
        })
      },
      validatePartial () {
        formInstRef.value?.validate(
          (errors) => {
            if (errors) {
              console.error(errors)
            }
          },
          (rule) => {
            return rule?.key === 'a'
          }
        )
      },
      formInstRef,
      model: ref({
        fieldA: '',
        fieldB: ''
      }),
      rules: {
        fieldA: {
          key: 'a',
          required: true,
          min: 3,
          message: 'Min length is 3'
        },
        fieldB: {
          required: true,
          min: 2,
          message: 'Min length is 2'
        }
      }
    }
  }
})
</script>

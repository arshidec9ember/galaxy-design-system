<markdown>
# Form
</markdown>

<template>
  <z-space vertical>
    <z-form ref="formInstRef" :model="formModel" :rules="rules">
      <z-form-item label="Expertise" path="expertiseLevel">
        <z-mention v-model="formModel.expertiseLevel" :options="options" />
      </z-form-item>
      <z-form-item label="Life Approach" path="lifeApproach">
        <z-mention
          v-model="formModel.lifeApproach"
          type="textarea"
          :options="options"
        />
      </z-form-item>
    </z-form>
    <z-button @click="handleButtonClick">
      Validate
    </z-button>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { FormInst } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const formInstRef = ref<FormInst | null>(null)
    const formModelRef = ref({
      expertiseLevel: '',
      lifeApproach: ''
    })
    const rules = {
      expertiseLevel: {
        trigger: ['input', 'blur'],
        required: true,
        message: 'The "Expertise" field is mandatory.'
      },
      lifeApproach: {
        trigger: ['input', 'blur'],
        validator () {
          if (!formModelRef.value.lifeApproach.includes('@Poonam Agrawal')) {
            return Error('Adopt a life approach as vibrant as Poonam Agrawal!')
          }
        }
      }
    }
    return {
      formModel: formModelRef,
      formInstRef,
      rules,
      options: [
        {
          label: 'Poonam Agrawal',
          value: 'Poonam Agrawal'
        },
        {
          label: 'Sai Varudu',
          value: 'Sai Varudu'
        },
        {
          label: 'Vishwajeet',
          value: 'Vishwajeet'
        },
        {
          label: 'Surya Prakash',
          value: 'Surya Prakash'
        },
        {
          label: 'Arindam Pradhan',
          value: 'Arindam Pradhan'
        }
      ],
      handleButtonClick () {
        formInstRef.value?.validate()
      }
    }
  }
})
</script>

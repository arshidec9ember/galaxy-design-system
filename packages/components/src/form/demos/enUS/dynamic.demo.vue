<markdown>
# Dynamic form

Delete or add form items dynamically.
</markdown>

<template>
  <z-form ref="formRef" :model="dynamicForm" :style="{ maxWidth: '640px' }">
    <z-form-item
      label="name"
      path="name"
      :rule="{
        required: true,
        message: 'Please input Name',
        trigger: ['input', 'blur']
      }"
    >
      <z-input v-model="dynamicForm.name" clearable />
    </z-form-item>

    <z-form-item
      v-for="(item, index) in dynamicForm.hobbies"
      :key="index"
      :label="`hobby${index + 1}`"
      :path="`hobbies[${index}].hobby`"
      :rule="{
        required: true,
        message: `Please input hobby${index + 1}`,
        trigger: ['input', 'blur']
      }"
    >
      <z-input v-model="item.hobby" clearable />
      <z-button style="margin-left: 12px" @click="removeItem(index)">
        Remove
      </z-button>
    </z-form-item>

    <z-form-item>
      <z-space>
        <z-button type="button" @click="handleValidateClick">
          Validate
        </z-button>
        <z-button type="button" @click="addItem">
          New hobby
        </z-button>
      </z-space>
    </z-form-item>
  </z-form>
</template>

<script lang="ts">
import { FormInst } from '@zeta-gds/components'
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  setup () {
    const formRef = ref<FormInst | null>(null)

    const dynamicForm = reactive({
      name: '',
      hobbies: [{ hobby: '' }]
    })

    const removeItem = (index: number) => {
      dynamicForm.hobbies.splice(index, 1)
    }

    const addItem = () => {
      dynamicForm.hobbies.push({ hobby: '' })
    }

    const handleValidateClick = () => {
      formRef.value?.validate((errors) => {
        if (!errors) {
          console.log('success')
        } else {
          console.log(errors)
        }
      })
    }

    return {
      formRef,
      dynamicForm,
      addItem,
      removeItem,
      handleValidateClick
    }
  }
})
</script>

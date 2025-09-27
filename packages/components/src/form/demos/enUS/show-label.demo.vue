<markdown>
# Show / hide label

If `show-label` will default to `true` if not set and inherit `z-form`'s `show-label`.
</markdown>

<template>
  <z-space vertical>
    <z-space>Form:<z-switch v-model="formShowLabel" /></z-space>
    <z-space>Form Item:<z-switch v-model="formItemShowLabel" /></z-space>
    <z-form ref="formRef" :model="formValue" :show-label="formShowLabel">
      <z-form-item
        label="Name"
        path="user.name"
        :optional="true"
        :show-label="formItemShowLabel"
      >
        <z-input v-model="formValue.user.name" placeholder="Input Name" />
      </z-form-item>
      <z-form-item
        help-message="This is help message"
        description="This is description"
        label="Age"
        :optional="true"
        path="user.age"
      >
        <z-input v-model="formValue.user.age" placeholder="Input Age" />
      </z-form-item>
      <z-form-item
        help-message="This is help message"
        description="This is description"
        label="Phone"
        path="user.phone"
      >
        <z-input v-model="formValue.phone" placeholder="Input Phone" />
      </z-form-item>
    </z-form>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const formRef = ref(null)
    const formShowLabel = ref(true)
    const formItemShowLabel = ref(true)
    return {
      formRef,
      formValue: ref({
        user: {
          name: '',
          age: ''
        },
        phone: ''
      }),
      formShowLabel,
      formItemShowLabel,
      switchStyle: {
        marginBottom: '12px'
      }
    }
  }
})
</script>

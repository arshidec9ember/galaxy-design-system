<markdown>
# Input group

Input group is a wrapper to group multiple inputs, select, date picker, time picker, etc.

</markdown>

<template>
  <z-space vertical>
    <z-input-group>
      <z-input :style="{ width: '33%' }" />
      <z-input-number :style="{ width: '33%' }" />
      <z-input :style="{ width: '33%' }" />
    </z-input-group>
    <z-input-group>
      <z-input-group-label>https://www.</z-input-group-label>
      <z-input :style="{ width: '33%' }" />
      <z-input-group-label>.com</z-input-group-label>
    </z-input-group>
    <z-input-group>
      <z-select :style="{ width: '33%' }" :options="selectOptions" />
      <z-cascader :style="{ width: '33%' }" :options="cascaderOptions" />
      <z-select :style="{ width: '33%' }" multiple :options="selectOptions" />
    </z-input-group>
    <z-input-group>
      <z-button color="primary">
        Search
      </z-button>
      <z-input :style="{ width: '50%' }" />
      <z-button color="primary" variant="outlined">
        Search
      </z-button>
    </z-input-group>
    <z-input-group>
      <z-date-picker />
      <z-time-picker />
    </z-input-group>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      selectOptions: ref([
        {
          label: 'option',
          value: 'option'
        }
      ]),
      cascaderOptions: ref([
        {
          label: 'option-1',
          value: 'option-1',
          children: [
            {
              label: 'option-1-1',
              value: 'option-1-1'
            }
          ]
        }
      ])
    }
  }
})
</script>

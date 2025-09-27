<markdown>
# Customizing input content

You can customize the input content by using the `default` slot. that will receive an object with the following properties: `index`, `value`, `update`. The `value` is the value of the current item, and the `update` is a function that will update the value of the current item. The `default` slot must return a single root element.
</markdown>

<template>
  <z-dynamic-input v-model="customValue" :on-create="onCreate">
    <template #create-button-default>
      Add whatever you want
    </template>
    <template #default="{ value }">
      <div style="display: flex; align-items: center; width: 100%">
        <z-checkbox v-model="value.isCheck" style="margin-right: 12px" />
        <z-input-number
          v-model="value.num"
          style="margin-right: 12px; width: 160px"
        />
        <z-input v-model="value.string" type="text" />
      </div>
    </template>
  </z-dynamic-input>
  <pre>{{ JSON.stringify(customValue, null, 2) }}</pre>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      customValue: ref([
        {
          isCheck: true,
          num: 1,
          string: 'A String'
        }
      ]),
      onCreate () {
        return {
          isCheck: false,
          num: 1,
          string: 'A String'
        }
      }
    }
  }
})
</script>

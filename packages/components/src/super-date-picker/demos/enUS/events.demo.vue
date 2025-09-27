<markdown>
# On-update:value & on-change events

</markdown>
<template>
  <z-super-date-picker @update:value="onUpdateValue" @change="onChange" />
  <pre>updateValue: {{ updateValue }} | changeValue: {{ changeValue }}</pre>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup () {
    const updateValue = ref(null)
    const changeValue = ref(null)
    function onUpdateValue (val: number) {
      updateValue.value = val
    }
    function onChange (val: number) {
      changeValue.value = val
    }
    return { updateValue, changeValue, onUpdateValue, onChange }
  }
})
</script>

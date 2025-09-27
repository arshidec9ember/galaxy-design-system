<markdown>
# Event
</markdown>

<template>
  <z-space item-style="display: flex;" vertical>
    <z-checkbox
      v-model="checked"
      label="Event"
      @update:checked="handleCheckedChange"
    />
    <z-checkbox-group v-model="cities" @update:model-value="handleUpdateValue">
      <z-space item-style="display: flex;" align="center">
        <z-checkbox value="Mumbai" label="Mumbai" />
        <z-checkbox value="Bangalore" label="Bangalore" />
        <z-checkbox value="Hyderabad" label="Hyderabad" />
        <z-checkbox value="Chennai" label="Chennai" />
      </z-space>
    </z-checkbox-group>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const checkedRef = ref(false)
    const citiesRef = ref<(string | number)[] | null>(null)
    const message = useMessage()
    return {
      checked: checkedRef,
      cities: citiesRef,
      handleCheckedChange (checked: boolean) {
        checkedRef.value = checked
        message.info(JSON.stringify(checked))
      },
      handleUpdateValue (value: (string | number)[]) {
        citiesRef.value = value
        message.info(JSON.stringify(value))
      }
    }
  }
})
</script>

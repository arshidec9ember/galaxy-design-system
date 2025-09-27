<markdown>
# Customizing input or trigger element

You can replace a dynamic-tags input or trigger element with another component.
</markdown>

<template>
  <z-dynamic-tags v-model="tags">
    <template #input="{ submit, deactivate }">
      <z-select
        ref="autoCompleteInstRef"
        size="small"
        :options="options"
        placeholder="Email"
        :clear-after-select="true"
        filterable
        remote
        @search="inputValue = $event"
        @update:model-value="submit($event)"
        @blur="deactivate"
      />
    </template>
    <template #trigger="{ activate, disabled }">
      <z-button
        size="small"
        color="primary"
        variant="outlined"
        border-style="dashed"
        :disabled="disabled"
        @click="activate()"
      >
        <template #icon>
          <z-icon>
            <Add />
          </z-icon>
        </template>
        New Tag
      </z-button>
    </template>
  </z-dynamic-tags>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, nextTick } from 'vue'
import { AutoCompleteInst } from '@zeta-gds/components'
import Add from '@vicons/ionicons5/Add'

export default defineComponent({
  components: {
    Add
  },
  setup () {
    const autoCompleteInstRef = ref<AutoCompleteInst | null>(null)
    watch(autoCompleteInstRef, (value) => {
      if (value) nextTick(() => value.focus())
    })
    const inputValueRef = ref('')
    const options = computed(() => {
      if (inputValueRef.value === null) {
        return []
      }
      const prefix = inputValueRef.value.split('@')[0]
      const inputSuffix = inputValueRef.value.split('@')[1]
      if (inputSuffix) {
        return [
          {
            label: prefix + '@' + inputSuffix,
            value: prefix + '@' + inputSuffix
          }
        ]
      }
      return ['@gmail.com', '@123.com', '@abcd.com'].map((suffix) => {
        return {
          label: prefix + suffix,
          value: prefix + suffix
        }
      })
    })
    return {
      autoCompleteInstRef,
      tags: ref(['Teacher', 'Programmer']),
      inputValue: inputValueRef,
      options
    }
  }
})
</script>

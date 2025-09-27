<markdown>
# Custom trigger prefix

Use `prefix` to set the trigger character(s).[#, @]
</markdown>

<template>
  <z-mention :options="options" :prefix="['@', '#']" @search="handleSearch" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { MentionOption } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const atOptions = [
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
        label: 'Arindam Pradhan',
        value: 'Arindam Pradhan'
      },
      {
        label: 'Surya Prakash',
        value: 'Surya Prakash'
      }
    ]
    const sharpOptions = [
      {
        label: 'Dharmendra',
        value: 'Dharmendra'
      },
      {
        label: 'Abhijeet',
        value: 'Abhijeet'
      },
      {
        label: 'Nishchay',
        value: 'Nishchay'
      },
      {
        label: 'Mayur',
        value: 'Mayur'
      },
      {
        label: 'Janaki',
        value: 'Janaki'
      }
    ]
    const optionsRef = ref<MentionOption[]>([])
    return {
      options: optionsRef,
      handleSearch (_: string, prefix: string) {
        if (prefix === '@') {
          optionsRef.value = atOptions
        } else {
          optionsRef.value = sharpOptions
        }
      }
    }
  }
})
</script>

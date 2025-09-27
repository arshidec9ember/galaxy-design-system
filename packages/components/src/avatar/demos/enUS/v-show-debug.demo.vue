<markdown>
# v-show debug

</markdown>

<template>
  <z-space vertical item-style="line-height: 0;">
    <z-space>
      <z-button @click="toggle">
        toggle
      </z-button>
      <z-avatar v-show="isShow">
        {{ value }}
      </z-avatar>
      <z-avatar v-if="isShow" round>
        {{ value }}
      </z-avatar>
    </z-space>
    <z-input v-model="value" />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUpdated, ref } from 'vue'

export default defineComponent({
  setup () {
    const isShow = ref(false)
    const toggle = () => {
      isShow.value = !isShow.value
    }
    onMounted(() => {
      console.log('world')
    })

    onUpdated(() => {
      console.log('hello')
    })
    return {
      value: ref('Oasis111'),
      toggle,
      isShow
    }
  }
})
</script>

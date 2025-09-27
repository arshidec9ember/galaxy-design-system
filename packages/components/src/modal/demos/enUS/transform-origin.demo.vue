<markdown>
# Transform origin

Although the emerging animation from your click position is cool, sometimes we need a plain animation which occurs from the center of the screen. You can set `transfrom-origin` to `'center'` to achieve it.
</markdown>

<template>
  <z-space>
    <z-button @click="showModal = true">
      Nothing
    </z-button>
    <z-modal v-model:show="showModal" transform-origin="center">
      <z-card-standard
        style="width: 600px"
        title="Okay"
        :bordered="false"
        size="x-large"
        role="dialog"
        aria-modal="true"
      >
        <template #header-extra>
          Great
        </template>
        Fine
        <template #footer>
          Nice
        </template>
      </z-card-standard>
    </z-modal>
  </z-space>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      showModal: ref(false)
    }
  }
})
</script>

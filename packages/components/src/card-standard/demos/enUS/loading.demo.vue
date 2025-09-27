<markdown>
# Loading

Use `z-skeleton` to simulate loading effect.
</markdown>

<template>
  <z-space vertical>
    <z-switch v-model="loading" />
    <z-card-standard>
      <template #header>
        <z-skeleton v-if="loading" viewBox="0 0 1000 80" :speed="2">
          <rect x="0" y="30" rx="1" ry="1" width="370" height="50" />
        </z-skeleton>
        <template v-else>
          Lorem Ipsum
        </template>
      </template>
      <z-skeleton v-if="loading" viewBox="0 0 1000 400" :speed="2">
        <rect x="0" y="0" rx="1" ry="1" width="800" height="35" />
        <rect x="0" y="70" rx="1" ry="1" width="800" height="35" />
        <rect x="0" y="140" rx="1" ry="1" width="800" height="35" />
        <rect x="0" y="210" rx="1" ry="1" width="800" height="35" />
        <rect x="0" y="280" rx="1" ry="1" width="800" height="35" />
        <rect x="0" y="350" rx="1" ry="1" width="800" height="35" />
      </z-skeleton>
      <template v-else>
        Lorem ipsum dolor sit amet,<br>
        consectetur adipiscing elit,<br>
        sed do eiusmod tempor incididunt<br>
        ut labore et dolore magna aliqua.<br>
        Ut enim ad minim veniam,<br>
        quis nostrud exercitation ullamco
      </template>
    </z-card-standard>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      loading: ref(true)
    }
  }
})
</script>

<style>
.z-card {
  max-width: 300px;
}
</style>

<markdown>
# Loading

Buttons can have loading states.
We also have the prop to set the inline loading.
</markdown>

<template>
  <z-space vertical>
    <z-h6>Inline</z-h6>
    <z-space align="center">
      <z-button
        variant="filled"
        color="primary"
        :loading="loading"
        loading-type="inline"
        @click="handleClick"
      >
        <template #icon>
          <z-icon>
            <add-icon />
          </z-icon>
        </template>
        Click Me
      </z-button>
      <z-button
        :loading="loading"
        loading-type="inline"
        icon-placement="start"
        @click="handleClick"
      >
        Click Me
      </z-button>
      <z-button
        variant="outlined"
        color="info"
        :loading="loading"
        loading-type="inline"
        @click="handleClick"
      >
        <template #icon>
          <z-icon>
            <add-icon />
          </z-icon>
        </template>
        Click Me
      </z-button>
      <z-button
        variant="text"
        color="error"
        :loading="loading"
        loading-type="inline"
        icon-placement="start"
        @click="handleClick"
      >
        Click Me
      </z-button>
      <z-button
        variant="outlined"
        color="warning"
        :loading="loading"
        loading-type="inline"
        border-style="dashed"
        @click="handleClick"
      >
        <template #icon>
          <z-icon>
            <add-icon />
          </z-icon>
        </template>
        Click Me
      </z-button>
    </z-space>
    <z-h6>Overlay</z-h6>
    <z-space align="center">
      <z-button
        variant="filled"
        color="primary"
        :loading="loading"
        loading-type="overlay"
        @click="handleClick"
      >
        <template #icon>
          <z-icon>
            <add-icon />
          </z-icon>
        </template>
        Click Me
      </z-button>
      <z-button
        :loading="loading"
        loading-type="overlay"
        icon-placement="start"
        @click="handleClick"
      >
        Click Me
      </z-button>
      <z-button
        variant="outlined"
        color="info"
        :loading="loading"
        loading-type="overlay"
        @click="handleClick"
      >
        <template #icon>
          <z-icon>
            <add-icon />
          </z-icon>
        </template>
        Click Me
      </z-button>
      <z-button
        variant="text"
        color="error"
        :loading="loading"
        loading-type="overlay"
        icon-placement="start"
        @click="handleClick"
      >
        Click Me
      </z-button>
      <z-button
        variant="outlined"
        color="warning"
        :loading="loading"
        loading-type="overlay"
        border-style="dashed"
        @click="handleClick"
      >
        <template #icon>
          <z-icon>
            <add-icon />
          </z-icon>
        </template>
        Click Me
      </z-button>
    </z-space>
  </z-space>
</template>

<script lang="ts">
import { Add as AddIcon } from '@vicons/ionicons5'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    AddIcon
  },
  setup () {
    const loadingRef = ref(false)
    return {
      handleClick () {
        loadingRef.value = true
        setTimeout(() => {
          loadingRef.value = false
        }, 2000)
      },
      loading: loadingRef
    }
  }
})
</script>

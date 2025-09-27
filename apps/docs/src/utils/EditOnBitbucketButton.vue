<template>
  <z-button
    class="edit-button"
    :theme-overrides="
      quaternary
        ? {
          paddingXSmall: '4px',
          heightXSmall: '14px'
        }
        : undefined
    "
    :variant="quaternary ? 'subtle' : 'text'"
    :size="size"
    @click="navigateToBitbucket"
  >
    <template #icon>
      <z-icon>
        <edit-icon />
      </z-icon>
    </template>
  </z-button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { ButtonProps } from '@zeta-gds/components'
import EditIcon from '@vicons/fluent/Compose16Regular.js'
import { blobUrl } from './bitbucket-url'

export default defineComponent({
  name: 'EditOnBitbucketButton',
  components: {
    EditIcon
  },
  props: {
    relativeUrl: {
      type: String,
      required: true
    },
    text: Boolean,
    quaternary: Boolean,
    size: {
      type: String as PropType<ButtonProps['size']>,
      default: 'x-small'
    }
  },
  setup (props) {
    return {
      navigateToBitbucket () {
        window.location.href = blobUrl + props.relativeUrl
      }
    }
  }
})
</script>

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
    :size="size"
    variant="link"
    :href="url"
    target="_blank"
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
  name: 'EditOnGithubButton',
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
      url: blobUrl + props.relativeUrl
    }
  }
})
</script>

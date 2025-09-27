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
    @click="navigateToFigma"
  >
    <template #icon>
      <z-icon>
        <FigmaLogo />
      </z-icon>
    </template>
  </z-button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { ButtonProps } from '@zeta-gds/components'
import FigmaLogo from './FigmaLogo'

export default defineComponent({
  name: 'EditOnBitbucketButton',
  components: {
    FigmaLogo
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
      navigateToFigma () {
        window.open(props.relativeUrl, '_blank')
      }
    }
  }
})
</script>

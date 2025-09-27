<markdown>
# Use loading bar locally

You can set mount target of loading by `to` prop.
</markdown>

<template>
  <z-loading-bar-provider
    :to="loadingBarTargetRef"
    container-style="position: absolute;"
  >
    <div
      ref="loadingBarTargetRef"
      style="
        position: absolute;
        inset: 0;
        border-radius: var(--z-border-radius);
        overflow: hidden;
        pointer-events: none;
      "
    />
    <loading-bar-trigger />
  </z-loading-bar-provider>
</template>

<script lang="ts">
import { defineComponent, h, ref } from 'vue'
import { ZButton } from '../../../button'
import { ZSpace } from '../../../space'
import { useLoadingBar } from '../../src/use-loading-bar'

export default defineComponent({
  components: {
    LoadingBarTrigger: defineComponent({
      setup () {
        const loadingBar = useLoadingBar()
        return () => {
          return h(ZSpace, null, {
            default: () => [
              h(
                ZButton,
                { onClick: () => loadingBar.start() },
                { default: () => 'Start' }
              ),
              h(
                ZButton,
                { onClick: () => loadingBar.finish() },
                { default: () => 'Finish' }
              )
            ]
          })
        }
      }
    })
  },
  setup () {
    return {
      loadingBarTargetRef: ref<undefined | HTMLElement>(undefined)
    }
  }
})
</script>

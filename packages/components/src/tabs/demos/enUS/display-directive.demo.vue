<markdown>
# Display directive

You can set tab-panel's display directive to `if` or `show`. When use `show`, the tab-panel's content won't be reset after tab changes. When use `show:lazy`, the display effect is the same as `show`, but the content will be lazily loaded.
</markdown>

<template>
  <z-tabs default-model-value="show">
    <z-tab-pane name="show" display-directive="show" tab="show">
      <show-input />
    </z-tab-pane>
    <z-tab-pane name="if" display-directive="if" tab="if">
      <if-input />
    </z-tab-pane>
    <z-tab-pane name="show:lazy" display-directive="show:lazy" tab="show:lazy">
      <show-lazy-input />
    </z-tab-pane>
  </z-tabs>
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import { ZInput } from '@zeta-gds/components'

const showInput = defineComponent({
  render () {
    return h(ZInput, {
      placeholder: "My content won't be reset"
    })
  }
})

const ifInput = defineComponent({
  render () {
    return h(ZInput, {
      placeholder: 'My content will be reset'
    })
  }
})

const showLazyInput = defineComponent({
  render () {
    return h(ZInput, {
      placeholder:
        'I will delay loading, and my content will not be reset afterwards'
    })
  }
})

export default defineComponent({
  components: {
    showInput,
    ifInput,
    showLazyInput
  }
})
</script>

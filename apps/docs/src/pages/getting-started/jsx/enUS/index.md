<!--anchor:on-->

# JSX & TSX

## Enable JSX & TSX

For how to enable JSX & TSX, please look at your toolchain's docs.

## Use Component

We recommend importing components directly when using JSX.

```js
import { defineComponent } from 'vue'
import { ZButton } from '@zeta-gds/components'

export default defineComponent({
  render () {
    return <ZButton>{{ default: () => 'Star Kirby' }}</ZButton>
  }
})
```

## Props look like @update:\*

In @zeta-gds/components, all props look like `on-update:*` has a corresponding `onUpdate*` prop (since in JSX `on-update:*` and `onUpdate:*` are not valid prop names).

If you find it doesn't exist, I must have forgotten to make it. Please create an issue or PR.

For example, `<z-select @update:model-value="..." />` in template can be written in `<ZSelect onUpdateValue={...} />`.

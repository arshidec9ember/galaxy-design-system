# Loading Bar
Loading Bar

### CautionAlert

<z-space vertical size="large">

<z-alert title="Prerequisite" color="warning" :bordered="false">
  If you want to use loading bar, you need to wrap the component where you call related methods inside <z-text code>z-loading-bar-provider</z-text> and inject <z-text code>loadingBar</z-text>.
</z-alert>

```html
<!-- App.vue -->
<z-loading-bar-provider>
  <content />
</z-loading-bar-provider>
```

```js
import { defineComponent } from 'vue'
import { useLoadingBar } from '@zeta-gds/components'

// content
export default defineComponent({
  setup () {
    const loadingBar = useLoadingBar()
    return {
      loading () {
        loadingBar.start()
      }
    }
  }
})
```

</z-space>

## Demos

```demo
basic.vue
container.vue
```

## API

### LoadingBarProvider Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| container-style | `string \| object` | `undefined` | Style of the loading bar container. |
| loading-bar-style | `{ loading?: string \| object, error?: string \| object }` | `undefined` | Style of the loading bar. |
| to | `string \| HTMLElement \| false` | `undefined` | Mount target of loading bar. |

### loadingBar Injection Methods

| Name | Type | Description |
| --- | --- | --- |
| error | `() => void` | Callback function for loading bar error. |
| finish | `() => void` | The callback function when the loading bar finishes loading. |
| start | `() => void` | Callback function for loading bar to start loading. |

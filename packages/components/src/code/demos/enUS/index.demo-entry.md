# Code

## Prequisites

<z-alert title="Note" color="warning" style="margin-bottom: 16px;" :bordered="false">
  Due to package size, Galaxy Design Components doesn't include highlight.js. If you want to use Code, make sure you have set highlightjs before using it.
</z-alert>

The following code shows how to set hljs of Code. Importing highlight.js on demand is recommonded, because it can significantly reduce bundle size of your app.

```html
<template>
  <z-config-provider :hljs="hljs">
    <my-app />
  </z-config-provider>
</template>

<script>
  import { defineComponent } from 'vue'
  import hljs from 'highlight.js/lib/core'
  import javascript from 'highlight.js/lib/languages/javascript'

  hljs.registerLanguage('javascript', javascript)

  export default defineComponent({
    setup() {
      return {
        hljs
      }
    }
  })
</script>
```

<!--single-column-->

## Demos

```demo
basic.vue
line-numbers.vue
```

## Customization

```customization
inline.vue
softwrap.vue
trim.vue
xml.vue
```

## API

### Code Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| code | `string` | `''` | Incoming code string. |
| hljs | `Object` | `undefined` | If you want to set hljs locally, pass it using this prop. |
| inline | `boolean` | `false` | Whether the code is displayed as inline. |
| language | `string` | `undefined` | Code language in highlightjs. |
| show-line-numbers | `boolean` | `false` | Whether to show line numbers. Won't work if `inline` or `word-wrap` is `true`. |
| trim | `boolean` | `true` | Whether to display trimmed code. |
| word-wrap | `boolean` | `false` | Whether to display word-wrapped code. |

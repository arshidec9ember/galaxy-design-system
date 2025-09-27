# Equation

No one will think of that a component library should have this component. However a friend of me need this.

<z-alert title="Note" color="warning" style="margin-bottom: 16px;" :bordered="false">
  Due to package size, Galaxy Design Components doesn't include katex. If you want to use Equation, make sure you have setup katex before using it.
</z-alert>

The following code shows how to setup katex for Equation.

```html
<template>
  <z-config-provider :katex="katex">
    <my-app />
  </z-config-provider>
</template>

<script>
  import { defineComponent } from 'vue'
  import katex from 'katex'
  import 'katex/dist/katex.css'

  export default defineComponent({
    setup() {
      return {
        katex
      }
    }
  })
</script>
```

## Demos

```demo
basic.vue
katex-options.vue
```

## API

### Equation Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| katex | `object` | `undefined` | Katex | 2.34.0 |
| katex-options | `object` | `undefined` | Katex options for the equation. | 2.34.0 |
| value | `string` | `undefined` | Latex expression of the equation. | 2.34.0 |

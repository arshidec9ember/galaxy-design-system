# Import on Demand (Tree Shaking)

Galaxy Design Components supports tree shaking for components, locales and themes.

By default the component theme is light, locale is enUS, and no extra imports are needed.

For more info about theming, see [Customizing Theme](customize-theme).

## Import Directly

```html
<script>
  import { defineComponent } from 'vue'
  import {
    ZConfigProvider,
    ZInput,
    ZDatePicker,
    ZSpace
  } from '@zeta-gds/components'
  // theme
  import { createTheme, inputDark, datePickerDark } from '@zeta-gds/components'
  // locale & dateLocale
  import { zhCN, dateZhCN } from '@zeta-gds/components'

  export default defineComponent({
    components: {
      ZConfigProvider,
      ZInput,
      ZDatePicker,
      ZSpace
    },
    setup() {
      return {
        darkTheme: createTheme([inputDark, datePickerDark]),
        zhCN,
        dateZhCN
      }
    }
  })
</script>

<template>
  <z-config-provider :theme="darkTheme" :locale="zhCN" :date-locale="dateZhCN">
    <z-space vertical>
      <z-input />
      <z-date-picker />
    </z-space>
  </z-config-provider>
</template>

<style>
  body {
    background: black;
  }
</style>
```

## Auto Import with `vite`

You can use the `unplugin-auto-import` plugin to automatically import API.

If you develop using SFC, you can use the `unplugin-vue-components` plugin along with the resolver provided by `@zeta-gds/component-resolver` to automatically import components on demand.The plugin will automatically parse the components used in the template and import the components.

### Usage

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

interface ComponentResolver {
  type: 'component'
  resolve: (name: string) => { name: string; from: string } | undefined
}

/**
 * Resolver for GDS
 * @description This resolver is used to resolve GDS components and auto import them
 */
export function GDSComponentsResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(/^(Z[A-Z]|z-[a-z])/)) {
        return { name, from: '@zeta-gds/components' }
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        {
          '@zeta-gds/components': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }
      ]
    }),
    Components({
      resolvers: [GDSComponentsResolver()]
    })
  ]
})
```

## Auto Import with `webpack`

The same can be achieved in webpack configuration using `vue-cli-service`.

### Usage

```js
// vue.config.js
const { defineConfig } = require('@vue/cli-service')

function GDSComponentsResolver () {
  return {
    type: 'component',
    resolve: (name) => {
      if (name.match(/^(Z[A-Z]|z-[a-z])/)) {
        return { name, from: '@zeta-gds/components' }
      }
    }
  }
}

module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      require('unplugin-auto-import/webpack').default({
        imports: [
          'vue',
          {
            '@zeta-gds/components': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar'
            ]
          }
        ]
      }),
      require('unplugin-vue-components/webpack').default({
        resolvers: [GDSComponentsResolver()]
      })
    ]
  }
})
```

## Install on Demand Globally

```js
import { createApp } from 'vue'
import {
  // create Galaxy Design Components
  create,
  // component
  ZButton
} from '@zeta-gds/components'

const ZetaGalaxyComponents = create({
  components: [ZButton]
})

const app = createApp()
app.use(ZetaGalaxyComponents)
```

After the installation, you can use the components you installed in SFC like this.

```html
<template>
  <z-button>@zeta-gds/components</z-button>
</template>
```

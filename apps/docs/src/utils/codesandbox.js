import { getParameters } from 'codesandbox/lib/api/define'
import componentPkg from '../../../../packages/components/package.json'
import iconsPkg from '../../../../packages/components/node_modules/@zeta/icons/package.json'
import aphroditeThemePkg from '../../../../themes/aphrodite/package.json'
import pkg from '../../package.json'

const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Galaxy Design Components Demo</title>
    <style>
      body {
        padding: 24px;
      }
    </style>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
`

const appVue = `<template>
<theme-config-provider>
  <z-loading-bar-provider>
    <z-message-provider>
      <z-notification-provider>
        <z-dialog-provider>
          <demo />
        </z-dialog-provider>
      </z-notification-provider>
    </z-message-provider>
  </z-loading-bar-provider>
</theme-config-provider>
</template>

<script>
import { defineComponent } from "vue";
import Demo from "./Demo.vue";
import { ThemeConfigProvider } from '@zeta-gds/themes.aphrodite';

export default defineComponent({
components: {
  ThemeConfigProvider,
  Demo,
},
});
</script>`

const mainJs = `import { createApp } from "vue";
import components from "@zeta-gds/components";
import App from "./App.vue";

const app = createApp(App);

app.use(components);

app.mount("#app");
`

function getDeps (code) {
  return (code.match(/from '([^']+)'\n/g) || [])
    .map((v) => v.slice(6, v.length - 2))
    .reduce((prevV, dep) => {
      prevV[dep] = 'latest'
      return prevV
    }, {})
}

export function getCodeSandboxParams (code) {
  return getParameters({
    files: {
      'package.json': {
        content: {
          dependencies: {
            ...getDeps(code),
            vue: '~3.3',
            '@zeta-gds/components': `https://hercules-assets.mum1-pp.zetaapps.in/gds-docs/${pkg.version}/zeta-gds-components-${componentPkg.version}.tgz`,
            '@zeta-gds/themes.aphrodite': `https://hercules-assets.mum1-pp.zetaapps.in/gds-docs/${pkg.version}/zeta-gds-themes.aphrodite-${aphroditeThemePkg.version}.tgz`,
            '@zeta/icons': `https://hercules-assets.mum1-pp.zetaapps.in/gds-docs/${pkg.version}/zeta-icons-${iconsPkg.version}.tgz`
          },
          devDependencies: {
            '@vue/cli-plugin-babel': '~4.5.0',
            typescript: '~4.6.3'
          }
        }
      },
      'index.html': {
        content: indexHtml
      },
      'src/Demo.vue': {
        content: code
      },
      'src/App.vue': {
        content: appVue
      },
      'src/main.js': {
        content: mainJs
      }
    }
  })
}

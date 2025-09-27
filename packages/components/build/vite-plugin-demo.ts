import createVuePlugin from '@vitejs/plugin-vue'
import getTransformedVueSrc from './utils/get-demo-by-path'
import createCssrPlugin from './vite-plugin-css-render'
import siteIndexTransFormPlugin from './vite-plugin-index-tranform'
import tsconfigPaths from 'vite-tsconfig-paths'
import { type Plugin } from 'vite'

const fileRegex = /\.(md|vue)$/

const vuePlugin: Plugin | any = createVuePlugin({
  include: [/\.vue$/, /\.md$/]
})

const createDemoPlugin = (): Plugin[] => {
  const demoVitePlugin: Plugin = {
    name: 'demo-vite',
    async transform (_, id) {
      if (fileRegex.test(id)) {
        return await getTransformedVueSrc(id)
      }
    },
    async handleHotUpdate (ctx) {
      const { file } = ctx
      if (fileRegex.test(file)) {
        const code = await getTransformedVueSrc(file)
        return vuePlugin.handleHotUpdate({
          ...ctx,
          read: () => code
        })
      }
    }
  }

  const cssrPlugin = createCssrPlugin()
  const tsconfigPathsPlugin = tsconfigPaths()

  return [
    tsconfigPathsPlugin,
    siteIndexTransFormPlugin,
    demoVitePlugin,
    vuePlugin,
    cssrPlugin
  ]
}

export default createDemoPlugin

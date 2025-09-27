import type { Plugin } from 'vite'
import { resolve } from 'node:path'

const transformIndexHtml = (code: string): string => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return code.replace(/__INDEX__/, resolve('./src/index.prod.js'))
    default:
      return code.replace(/__INDEX__/, resolve('./src/index.dev.js'))
  }
}

const demoIndexTransFormPlugin: Plugin = {
  name: 'demo-transform',
  enforce: 'pre',
  // vite build is production will not invoke `transformIndexHtml`
  transform (code: string, id: string) {
    if (id.endsWith('.html')) {
      return { code: transformIndexHtml(code), map: null }
    }
  },
  transformIndexHtml
}

export default demoIndexTransFormPlugin

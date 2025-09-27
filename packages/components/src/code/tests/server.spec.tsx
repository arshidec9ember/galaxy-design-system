/**
 * @jest-environment node
 */
import { h, createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { setup } from './../../_utils/css-render/vue3-ssr'
import { ZCode } from '..'
import { ZConfigProvider } from '../../config-provider'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'

hljs.registerLanguage('javascript', javascript)

describe('SSR', () => {
  it('works', async () => {
    const app = createSSRApp(() => (
      <ZConfigProvider hljs={hljs}>
        {{
          default: () => <ZCode />
        }}
      </ZConfigProvider>
    ))
    setup(app)
    try {
      await renderToString(app)
    } catch (e) {
      expect(e).not.toBeTruthy()
    }
  })
})

import { h, createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { setup } from './../../_utils/css-render/vue3-ssr'
import { ZWatermark } from '..'

describe('SSR', () => {
  it('works', async () => {
    const app = createSSRApp(() => <ZWatermark />)
    setup(app)
    try {
      await renderToString(app)
    } catch (e) {
      expect(e).not.toBeTruthy()
    }
  })
})
